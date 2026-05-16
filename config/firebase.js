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

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

let _auth;
try {
  _auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch {
  _auth = getAuth(app);
}

export const auth = _auth;
export const db = getFirestore(app);
