import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { withTimeout } from './firebaseUtils';

const _cache = {};

function streakRef(userId) {
  return doc(db, 'users', userId, 'meta', 'streak');
}

function dagsformat(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function dagerMellom(d1, d2) {
  const a = new Date(d1).setHours(0, 0, 0, 0);
  const b = new Date(d2).setHours(0, 0, 0, 0);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export async function hentStreak(userId) {
  if (!userId) return { current: 0, longest: 0, sistAktiv: null };
  const cacheKey = `streak_${userId}`;
  try {
    const snap = await withTimeout(getDoc(streakRef(userId)));
    if (!snap.exists()) return { current: 0, longest: 0, sistAktiv: null };
    const data = snap.data();
    _cache[cacheKey] = data;
    return data;
  } catch (e) {
    console.error('[streak] hentStreak feil:', e.message);
    return _cache[cacheKey] ?? { current: 0, longest: 0, sistAktiv: null };
  }
}

export async function registrerAktivitet(userId) {
  if (!userId) return;
  try {
    const ref = streakRef(userId);
    const snap = await withTimeout(getDoc(ref));
    const idag = dagsformat();
    const data = snap.exists() ? snap.data() : { current: 0, longest: 0, sistAktiv: null };

    if (data.sistAktiv === idag) return data;

    let nyCurrent = 1;
    if (data.sistAktiv) {
      const diff = dagerMellom(data.sistAktiv, idag);
      if (diff === 1) nyCurrent = (data.current || 0) + 1;
      else nyCurrent = 1;
    }

    const oppdatert = {
      current: nyCurrent,
      longest: Math.max(nyCurrent, data.longest || 0),
      sistAktiv: idag,
      oppdatert: serverTimestamp(),
    };
    await withTimeout(setDoc(ref, oppdatert));
    return oppdatert;
  } catch (e) {
    console.error('[streak] registrerAktivitet feil:', e.message);
  }
}
