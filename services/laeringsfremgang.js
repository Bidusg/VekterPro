// Lagrer hvilke lærebok-moduler brukeren har markert som lest.
// Struktur: users/{uid}/lestModuler/{moduleId} = { lestDato }
// Lagrer også "sist øvd kategori" for "Fortsett der du slapp".
import firestore from '@react-native-firebase/firestore';

export async function markerLest(userId, moduleId) {
  if (!userId || !moduleId) return;
  try {
    await firestore().collection('users').doc(userId).collection('lestModuler').doc(moduleId).set({
      moduleId,
      lestDato: firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.error('[fremgang] markerLest feil:', e.message);
  }
}

export async function avmarkerLest(userId, moduleId) {
  if (!userId || !moduleId) return;
  try {
    await firestore().collection('users').doc(userId).collection('lestModuler').doc(moduleId).delete();
  } catch (e) {
    console.error('[fremgang] avmarkerLest feil:', e.message);
  }
}

export async function hentLesteModuler(userId) {
  if (!userId) return [];
  try {
    const snap = await firestore().collection('users').doc(userId).collection('lestModuler').get();
    return snap.docs.map((d) => d.id);
  } catch (e) {
    console.error('[fremgang] hentLesteModuler feil:', e.message);
    return [];
  }
}

export async function settSistKategori(userId, kategori) {
  if (!userId || !kategori) return;
  try {
    await firestore().collection('users').doc(userId).collection('meta').doc('sistKategori').set({
      kategori,
      tid: firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.error('[fremgang] settSistKategori feil:', e.message);
  }
}

export async function hentSistKategori(userId) {
  if (!userId) return null;
  try {
    const snap = await firestore().collection('users').doc(userId).collection('meta').doc('sistKategori').get();
    return snap.exists ? snap.data().kategori : null;
  } catch (e) {
    return null;
  }
}
