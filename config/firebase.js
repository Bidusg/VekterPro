import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY,
  authDomain: 'vektereksamen.firebaseapp.com',
  projectId: 'vektereksamen',
  storageBucket: 'vektereksamen.firebasestorage.app',
  messagingSenderId: '351385798526',
  appId: process.env.EXPO_PUBLIC_FIREBASE_WEB_APP_ID,
};

let app;
try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
} catch (e) {
  console.error('[firebase] initializeApp feil:', e.message);
  // If a prior instance exists (e.g. hot-reload race), reuse it
  app = getApps()[0];
}

let _auth;
try {
  _auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch {
  _auth = getAuth(app);
}

let _db;
try {
  _db = getFirestore(app);
} catch (e) {
  console.error('[firebase] getFirestore feil:', e.message);
}

export const auth = _auth;
export const db = _db;
