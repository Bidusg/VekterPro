// Statistikk-tjeneste: lagrer/leser brukerens statistikk i Firestore.
// Strukturer:
//   users/{uid}/dagligStat/{YYYY-MM-DD}     – {dato, riktig, totalt, score%}
//   users/{uid}/kategoriStat/{kategori}     – {kategori, riktig, totalt, score%}
//   users/{uid}/eksamensforsok/{auto-id}    – {dato, score%, bestått, antall}
import firestore from '@react-native-firebase/firestore';

function dagsformat(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

/** Registrer ett besvart spørsmål (oppdaterer dag + kategori). */
export async function registrerSvar(userId, kategori, riktig) {
  if (!userId || !kategori) return;
  try {
    const dag = dagsformat();
    const dagRef = firestore().collection('users').doc(userId).collection('dagligStat').doc(dag);
    const katRef = firestore().collection('users').doc(userId).collection('kategoriStat').doc(kategori);

    const [dagSnap, katSnap] = await Promise.all([dagRef.get(), katRef.get()]);
    const dagData = dagSnap.exists ? dagSnap.data() : { riktig: 0, totalt: 0 };
    const katData = katSnap.exists ? katSnap.data() : { riktig: 0, totalt: 0 };

    const nyDag = {
      dato: dag,
      riktig: dagData.riktig + (riktig ? 1 : 0),
      totalt: dagData.totalt + 1,
    };
    nyDag.score = nyDag.totalt > 0 ? Math.round((nyDag.riktig / nyDag.totalt) * 100) : 0;

    const nyKat = {
      kategori,
      riktig: katData.riktig + (riktig ? 1 : 0),
      totalt: katData.totalt + 1,
    };
    nyKat.score = nyKat.totalt > 0 ? Math.round((nyKat.riktig / nyKat.totalt) * 100) : 0;

    await Promise.all([dagRef.set(nyDag), katRef.set(nyKat)]);
  } catch (e) {
    console.error('[stat] registrerSvar feil:', e.message);
  }
}

/** Registrer et fullført eksamensforsøk. */
export async function registrerEksamensforsok(userId, score, antall) {
  if (!userId) return;
  try {
    await firestore().collection('users').doc(userId).collection('eksamensforsok').add({
      dato: firestore.FieldValue.serverTimestamp(),
      score,
      antall,
      bestatt: score >= 75,
    });
  } catch (e) {
    console.error('[stat] registrerEksamensforsok feil:', e.message);
  }
}

export async function hentDagligStat(userId, dager = 30) {
  if (!userId) return [];
  try {
    const snap = await firestore()
      .collection('users').doc(userId).collection('dagligStat')
      .orderBy('dato', 'desc')
      .limit(dager)
      .get();
    return snap.docs.map((d) => d.data()).reverse();
  } catch (e) {
    console.error('[stat] hentDagligStat feil:', e.message);
    return [];
  }
}

export async function hentKategoriStat(userId) {
  if (!userId) return [];
  try {
    const snap = await firestore().collection('users').doc(userId).collection('kategoriStat').get();
    return snap.docs.map((d) => d.data());
  } catch (e) {
    console.error('[stat] hentKategoriStat feil:', e.message);
    return [];
  }
}

export async function hentEksamensforsok(userId) {
  if (!userId) return { antall: 0, bestattPct: 0, forsok: [] };
  try {
    const snap = await firestore()
      .collection('users').doc(userId).collection('eksamensforsok')
      .orderBy('dato', 'desc')
      .get();
    const forsok = snap.docs.map((d) => d.data());
    const antall = forsok.length;
    const bestattAntall = forsok.filter((f) => f.bestatt).length;
    const bestattPct = antall > 0 ? Math.round((bestattAntall / antall) * 100) : 0;
    return { antall, bestattPct, forsok };
  } catch (e) {
    console.error('[stat] hentEksamensforsok feil:', e.message);
    return { antall: 0, bestattPct: 0, forsok: [] };
  }
}

export async function hentTotalAntallSvar(userId) {
  const dager = await hentDagligStat(userId, 365);
  return dager.reduce((s, d) => s + (d.totalt || 0), 0);
}
