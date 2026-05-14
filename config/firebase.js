// Firebase-oppsett for VekterPro (JS SDK – fungerer i Expo Go).
import { initializeApp, getApps } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCpGlzdbdAldEtSdmllR-QsslmYGFKTGUs',
  authDomain: 'vekterpro.firebaseapp.com',
  projectId: 'vekterpro',
  storageBucket: 'vekterpro.firebasestorage.app',
  messagingSenderId: '684830607512',
  appId: '1:684830607512:web:8926fb81d18997336aa8ed',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
console.log('[firebase] app initialisert:', app.name);

// initializeAuth kan kun kalles én gang per app – fall tilbake ved Fast Refresh.
let _auth;
try {
  _auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  console.log('[firebase] auth initialisert med AsyncStorage-persistens');
} catch {
  _auth = getAuth(app);
  console.log('[firebase] auth allerede initialisert, brukte getAuth');
}
export const auth = _auth;

// Firestore – memory cache fungerer i RN; vi får offline-lesninger innen
// samme session. AsyncStorage-baserte data (progress, payment) gir true offline.
export const db = getFirestore(app);
console.log('[firebase] firestore klar');
