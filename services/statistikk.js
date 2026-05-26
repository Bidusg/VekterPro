import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit as fbLimit,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { withTimeout } from './firebaseUtils';

const _cache = {};

function dagsformat(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export async function registrerSvar(userId, kategori, riktig) {
  if (!userId || !kategori) return;
  try {
    const dag = dagsformat();
    const dagRef = doc(db, 'users', userId, 'dagligStat', dag);
    const katRef = doc(db, 'users', userId, 'kategoriStat', kategori);

    const [dagSnap, katSnap] = await withTimeout(Promise.all([getDoc(dagRef), getDoc(katRef)]));
    const dagData = dagSnap.exists() ? dagSnap.data() : { riktig: 0, totalt: 0 };
    const katData = katSnap.exists() ? katSnap.data() : { riktig: 0, totalt: 0 };

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

    await withTimeout(Promise.all([setDoc(dagRef, nyDag), setDoc(katRef, nyKat)]));
  } catch (e) {
    console.error('[stat] registrerSvar feil:', e.message);
  }
}

export async function registrerEksamensforsok(userId, score, antall) {
  if (!userId) return;
  try {
    await withTimeout(addDoc(collection(db, 'users', userId, 'eksamensforsok'), {
      dato: serverTimestamp(),
      score,
      antall,
      bestatt: score >= 75,
    }));
  } catch (e) {
    console.error('[stat] registrerEksamensforsok feil:', e.message);
  }
}

export async function hentDagligStat(userId, dager = 30) {
  if (!userId) return [];
  const cacheKey = `dagligStat_${userId}_${dager}`;
  try {
    const snap = await withTimeout(getDocs(
      query(collection(db, 'users', userId, 'dagligStat'), orderBy('dato', 'desc'), fbLimit(dager))
    ));
    const items = snap.docs.map((d) => d.data()).reverse();
    _cache[cacheKey] = items;
    return items;
  } catch (e) {
    console.error('[stat] hentDagligStat feil:', e.message);
    return _cache[cacheKey] ?? [];
  }
}

export async function hentKategoriStat(userId) {
  if (!userId) return [];
  const cacheKey = `kategoriStat_${userId}`;
  try {
    const snap = await withTimeout(getDocs(collection(db, 'users', userId, 'kategoriStat')));
    const items = snap.docs.map((d) => d.data());
    _cache[cacheKey] = items;
    return items;
  } catch (e) {
    console.error('[stat] hentKategoriStat feil:', e.message);
    return _cache[cacheKey] ?? [];
  }
}

export async function hentEksamensforsok(userId) {
  if (!userId) return { antall: 0, bestattPct: 0, forsok: [] };
  const cacheKey = `eksamensforsok_${userId}`;
  try {
    const snap = await withTimeout(getDocs(
      query(collection(db, 'users', userId, 'eksamensforsok'), orderBy('dato', 'desc'))
    ));
    const forsok = snap.docs.map((d) => d.data());
    const antall = forsok.length;
    const bestattAntall = forsok.filter((f) => f.bestatt).length;
    const bestattPct = antall > 0 ? Math.round((bestattAntall / antall) * 100) : 0;
    const result = { antall, bestattPct, forsok };
    _cache[cacheKey] = result;
    return result;
  } catch (e) {
    console.error('[stat] hentEksamensforsok feil:', e.message);
    return _cache[cacheKey] ?? { antall: 0, bestattPct: 0, forsok: [] };
  }
}

export async function hentTotalAntallSvar(userId) {
  const dager = await hentDagligStat(userId, 365);
  return dager.reduce((s, d) => s + (d.totalt || 0), 0);
}
