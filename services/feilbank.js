import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { withTimeout } from './firebaseUtils';

const RIKTIG_PA_RAD_FOR_FJERN = 3;
const _cache = {};

function feilbankRef(userId, spørsmålId) {
  return doc(db, 'users', userId, 'feilbank', String(spørsmålId));
}

export async function registrerFeilSvar(userId, q) {
  if (!userId || !q || q.id === undefined) return;
  const ref = feilbankRef(userId, q.id);
  try {
    const snap = await withTimeout(getDoc(ref));
    const data = snap.exists() ? snap.data() : { antallFeil: 0, antallRiktig: 0, riktigPåRad: 0 };
    await withTimeout(setDoc(ref, {
      spørsmål: q.q,
      kategori: q.cat,
      antallFeil: (data.antallFeil ?? 0) + 1,
      antallRiktig: data.antallRiktig ?? 0,
      riktigPåRad: 0,
      sisstFeil: serverTimestamp(),
    }));
  } catch (e) {
    console.error('[feilbank] registrerFeilSvar feil:', e.message);
  }
}

export async function registrerRiktigSvar(userId, q) {
  if (!userId) return;
  const ref = feilbankRef(userId, q.id);
  try {
    const snap = await withTimeout(getDoc(ref));
    if (!snap.exists()) return;
    const data = snap.data();
    const nyRiktigPåRad = (data.riktigPåRad ?? 0) + 1;

    if (nyRiktigPåRad >= RIKTIG_PA_RAD_FOR_FJERN) {
      await withTimeout(deleteDoc(ref));
      return { fjernet: true };
    }
    await withTimeout(setDoc(ref, {
      ...data,
      antallRiktig: (data.antallRiktig ?? 0) + 1,
      riktigPåRad: nyRiktigPåRad,
    }));
    return { fjernet: false, riktigPåRad: nyRiktigPåRad };
  } catch (e) {
    console.error('[feilbank] registrerRiktigSvar feil:', e.message);
  }
}

export async function hentFeilbank(userId) {
  if (!userId) return [];
  const cacheKey = `feilbank_${userId}`;
  try {
    const snap = await withTimeout(getDocs(collection(db, 'users', userId, 'feilbank')));
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    _cache[cacheKey] = items;
    return items;
  } catch (e) {
    console.error('[feilbank] hentFeilbank feil:', e.message);
    return _cache[cacheKey] ?? [];
  }
}
