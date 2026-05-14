// E-post/passord-autentisering for VekterPro.
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function registrer(epost, passord, navn) {
  const cred = await auth().createUserWithEmailAndPassword(epost, passord);
  await cred.user.updateProfile({ displayName: navn });
  await firestore().collection('users').doc(cred.user.uid).set({
    navn,
    epost,
    opprettet: firestore.FieldValue.serverTimestamp(),
  });
  return cred.user;
}

export async function loggInn(epost, passord) {
  const cred = await auth().signInWithEmailAndPassword(epost, passord);
  return cred.user;
}

export function loggUt() {
  return auth().signOut();
}

export function lyttPaaAuth(callback) {
  return auth().onAuthStateChanged(callback);
}

export async function hentProfil(uid) {
  const snap = await firestore().collection('users').doc(uid).get();
  return snap.exists ? snap.data() : null;
}
