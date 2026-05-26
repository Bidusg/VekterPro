import { doc, getDoc, getDocs, setDoc, deleteDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { withTimeout } from './firebaseUtils';

const _cache = {};

export async function markerLest(userId, moduleId) {
  if (!userId || !moduleId) return;
  try {
    await withTimeout(setDoc(doc(db, 'users', userId, 'lestModuler', moduleId), {
      moduleId,
      lestDato: serverTimestamp(),
    }));
  } catch (e) {
    console.error('[fremgang] markerLest feil:', e.message);
  }
}

export async function avmarkerLest(userId, moduleId) {
  if (!userId || !moduleId) return;
  try {
    await withTimeout(deleteDoc(doc(db, 'users', userId, 'lestModuler', moduleId)));
  } catch (e) {
    console.error('[fremgang] avmarkerLest feil:', e.message);
  }
}

export async function hentLesteModuler(userId) {
  if (!userId) return [];
  const cacheKey = `lesteModuler_${userId}`;
  try {
    const snap = await withTimeout(getDocs(collection(db, 'users', userId, 'lestModuler')));
    const items = snap.docs.map((d) => d.id);
    _cache[cacheKey] = items;
    return items;
  } catch (e) {
    console.error('[fremgang] hentLesteModuler feil:', e.message);
    return _cache[cacheKey] ?? [];
  }
}

export async function settSistKategori(userId, kategori) {
  if (!userId || !kategori) return;
  try {
    await withTimeout(setDoc(doc(db, 'users', userId, 'meta', 'sistKategori'), {
      kategori,
      tid: serverTimestamp(),
    }));
  } catch (e) {
    console.error('[fremgang] settSistKategori feil:', e.message);
  }
}

export async function hentSistKategori(userId) {
  if (!userId) return null;
  const cacheKey = `sistKategori_${userId}`;
  try {
    const snap = await withTimeout(getDoc(doc(db, 'users', userId, 'meta', 'sistKategori')));
    const result = snap.exists() ? snap.data().kategori : null;
    _cache[cacheKey] = result;
    return result;
  } catch (e) {
    console.error('[fremgang] hentSistKategori feil:', e.message);
    return _cache[cacheKey] ?? null;
  }
}
