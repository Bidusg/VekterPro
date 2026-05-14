// Daglig utfordring: 10 tilfeldige spørsmål, kun én gang per dag.
// Lagres i users/{uid}/dagligUtfordring/{YYYY-MM-DD}.
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

function dagsformat(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function utfordringRef(userId, dato = dagsformat()) {
  return doc(db, 'users', userId, 'dagligUtfordring', dato);
}

/** Returnerer { fullført: bool, score?: number, dato } */
export async function hentDagensStatus(userId) {
  if (!userId) return { fullført: false };
  try {
    const snap = await getDoc(utfordringRef(userId));
    if (!snap.exists()) return { fullført: false, dato: dagsformat() };
    const data = snap.data();
    return { fullført: true, ...data };
  } catch (e) {
    console.error('[daglig] hentDagensStatus feil:', e.message);
    return { fullført: false };
  }
}

export async function fullførDagligUtfordring(userId, score, antall) {
  if (!userId) return;
  try {
    await setDoc(utfordringRef(userId), {
      dato: dagsformat(),
      score,
      antall,
      bestatt: score >= 75,
      fullført: serverTimestamp(),
    });
  } catch (e) {
    console.error('[daglig] fullf\u00f8rDagligUtfordring feil:', e.message);
  }
}

/** Velg 10 tilfeldige spørsmål til dagens utfordring. */
export function velgDagensSporsmaal(alleSporsmaal, antall = 10) {
  const a = [...alleSporsmaal];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, antall);
}
