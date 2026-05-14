// Daglig utfordring: 10 tilfeldige spørsmål, kun én gang per dag.
// Lagres i users/{uid}/dagligUtfordring/{YYYY-MM-DD}.
import firestore from '@react-native-firebase/firestore';

function dagsformat(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function utfordringRef(userId, dato = dagsformat()) {
  return firestore().collection('users').doc(userId).collection('dagligUtfordring').doc(dato);
}

/** Returnerer { fullført: bool, score?: number, dato } */
export async function hentDagensStatus(userId) {
  if (!userId) return { fullført: false };
  try {
    const snap = await utfordringRef(userId).get();
    if (!snap.exists) return { fullført: false, dato: dagsformat() };
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
    await utfordringRef(userId).set({
      dato: dagsformat(),
      score,
      antall,
      bestatt: score >= 75,
      fullført: firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.error('[daglig] fullførDagligUtfordring feil:', e.message);
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
