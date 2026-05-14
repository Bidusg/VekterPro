// Web-versjon – bruker Firebase JS SDK.
import { doc, getDoc, getDocs, setDoc, deleteDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase.web';

export async function markerLest(userId, moduleId) {
  if (!userId || !moduleId) return;
  try {
    await setDoc(doc(db, 'users', userId, 'lestModuler', moduleId), {
      moduleId,
      lestDato: serverTimestamp(),
    });
  } catch (e) {
    console.error('[fremgang] markerLest feil:', e.message);
  }
}

export async function avmarkerLest(userId, moduleId) {
  if (!userId || !moduleId) return;
  try {
    await deleteDoc(doc(db, 'users', userId, 'lestModuler', moduleId));
  } catch (e) {
    console.error('[fremgang] avmarkerLest feil:', e.message);
  }
}

export async function hentLesteModuler(userId) {
  if (!userId) return [];
  try {
    const snap = await getDocs(collection(db, 'users', userId, 'lestModuler'));
    return snap.docs.map((d) => d.id);
  } catch (e) {
    console.error('[fremgang] hentLesteModuler feil:', e.message);
    return [];
  }
}

export async function settSistKategori(userId, kategori) {
  if (!userId || !kategori) return;
  try {
    await setDoc(doc(db, 'users', userId, 'meta', 'sistKategori'), {
      kategori,
      tid: serverTimestamp(),
    });
  } catch (e) {
    console.error('[fremgang] settSistKategori feil:', e.message);
  }
}

export async function hentSistKategori(userId) {
  if (!userId) return null;
  try {
    const snap = await getDoc(doc(db, 'users', userId, 'meta', 'sistKategori'));
    return snap.exists() ? snap.data().kategori : null;
  } catch (e) {
    return null;
  }
}
