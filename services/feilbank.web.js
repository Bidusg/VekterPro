// Web-versjon – bruker Firebase JS SDK.
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase.web';

const RIKTIG_PA_RAD_FOR_FJERN = 3;

function feilbankRef(userId, spørsmålId) {
  return doc(db, 'users', userId, 'feilbank', String(spørsmålId));
}

export async function registrerFeilSvar(userId, q) {
  if (!userId || !q || q.id === undefined) return;
  const ref = feilbankRef(userId, q.id);
  try {
    const snap = await getDoc(ref);
    const data = snap.exists() ? snap.data() : { antallFeil: 0, antallRiktig: 0, riktigPåRad: 0 };
    await setDoc(ref, {
      spørsmål: q.q,
      kategori: q.cat,
      antallFeil: (data.antallFeil ?? 0) + 1,
      antallRiktig: data.antallRiktig ?? 0,
      riktigPåRad: 0,
      sisstFeil: serverTimestamp(),
    });
  } catch (e) {
    console.error('[feilbank] registrerFeilSvar feil:', e.message);
  }
}

export async function registrerRiktigSvar(userId, q) {
  if (!userId) return;
  const ref = feilbankRef(userId, q.id);
  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const data = snap.data();
    const nyRiktigPåRad = (data.riktigPåRad ?? 0) + 1;
    if (nyRiktigPåRad >= RIKTIG_PA_RAD_FOR_FJERN) {
      await deleteDoc(ref);
      return { fjernet: true };
    }
    await setDoc(ref, { ...data, antallRiktig: (data.antallRiktig ?? 0) + 1, riktigPåRad: nyRiktigPåRad });
    return { fjernet: false, riktigPåRad: nyRiktigPåRad };
  } catch (e) {
    console.error('[feilbank] registrerRiktigSvar feil:', e.message);
  }
}

export async function hentFeilbank(userId) {
  if (!userId) return [];
  try {
    const snap = await getDocs(collection(db, 'users', userId, 'feilbank'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('[feilbank] hentFeilbank feil:', e.message);
    return [];
  }
}
