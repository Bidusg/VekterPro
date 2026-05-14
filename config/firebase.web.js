// Firebase JS SDK – brukes kun på web (metro velger .web.js automatisk).
// Hent web-config fra Firebase Console → Prosjektinnstillinger → Apper → Web.
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY,
  authDomain: 'vektereksamen.firebaseapp.com',
  projectId: 'vektereksamen',
  storageBucket: 'vektereksamen.firebasestorage.app',
  messagingSenderId: '351385798526',
  appId: process.env.EXPO_PUBLIC_FIREBASE_WEB_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

let _auth;
try {
  _auth = initializeAuth(app, { persistence: browserLocalPersistence });
} catch {
  _auth = getAuth(app);
}

export const auth = _auth;
export const db = getFirestore(app);
