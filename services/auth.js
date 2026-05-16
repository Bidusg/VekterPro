import auth from '@react-native-firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function registrer(epost, passord, navn) {
  const cred = await auth().createUserWithEmailAndPassword(epost, passord);
  await cred.user.updateProfile({ displayName: navn });
  await setDoc(doc(db, 'users', cred.user.uid), {
    navn,
    epost,
    opprettet: serverTimestamp(),
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
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}
