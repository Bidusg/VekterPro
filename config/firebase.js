import { initializeApp, getApps } from 'firebase/app';
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

export const db = getFirestore(app);
