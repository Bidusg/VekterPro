// Streak-tjeneste: dager på rad brukeren har vært aktiv.
// Lagres i users/{uid}/meta/streak.
import firestore from '@react-native-firebase/firestore';

function streakRef(userId) {
  return firestore().collection('users').doc(userId).collection('meta').doc('streak');
}

function dagsformat(date = new Date()) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function dagerMellom(d1, d2) {
  const a = new Date(d1).setHours(0, 0, 0, 0);
  const b = new Date(d2).setHours(0, 0, 0, 0);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export async function hentStreak(userId) {
  if (!userId) return { current: 0, longest: 0, sistAktiv: null };
  try {
    const snap = await streakRef(userId).get();
    if (!snap.exists) return { current: 0, longest: 0, sistAktiv: null };
    return snap.data();
  } catch (e) {
    console.error('[streak] hentStreak feil:', e.message);
    return { current: 0, longest: 0, sistAktiv: null };
  }
}

/**
 * Kall denne hver gang brukeren gjør en aktivitet (svarer på spørsmål, fullfører quiz).
 * Oppdaterer streak basert på dagens dato vs sist aktive dato.
 */
export async function registrerAktivitet(userId) {
  if (!userId) return;
  try {
    const ref = streakRef(userId);
    const snap = await ref.get();
    const idag = dagsformat();
    const data = snap.exists ? snap.data() : { current: 0, longest: 0, sistAktiv: null };

    if (data.sistAktiv === idag) return data; // allerede registrert i dag

    let nyCurrent = 1;
    if (data.sistAktiv) {
      const diff = dagerMellom(data.sistAktiv, idag);
      if (diff === 1) nyCurrent = (data.current || 0) + 1;
      else nyCurrent = 1; // streak brutt
    }

    const oppdatert = {
      current: nyCurrent,
      longest: Math.max(nyCurrent, data.longest || 0),
      sistAktiv: idag,
      oppdatert: firestore.FieldValue.serverTimestamp(),
    };
    await ref.set(oppdatert);
    return oppdatert;
  } catch (e) {
    console.error('[streak] registrerAktivitet feil:', e.message);
  }
}
