import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export async function registrer(epost, passord, navn) {
  const cred = await createUserWithEmailAndPassword(auth, epost, passord);
  await updateProfile(cred.user, { displayName: navn });
  await setDoc(doc(db, 'users', cred.user.uid), {
    navn,
    epost,
    opprettet: serverTimestamp(),
  });
  try {
    await sendEmailVerification(cred.user);
  } catch (_) {}
  return cred.user;
}

export async function loggInn(epost, passord) {
  const cred = await signInWithEmailAndPassword(auth, epost, passord);
  return cred.user;
}

export function loggUt() {
  return signOut(auth);
}

export function lyttPaaAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function hentProfil(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function oppdaterBetaling(uid, plan, expiry) {
  await setDoc(doc(db, 'users', uid), {
    isPaid: true,
    plan,
    expiry,
    betaltTidspunkt: serverTimestamp(),
  }, { merge: true });
}
