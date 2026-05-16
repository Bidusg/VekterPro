import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import { db } from '../config/firebase';

GoogleSignin.configure({
  webClientId: '351385798526-m1q9qpi8cnqhl7ar5td89d4eolfjdqf0.apps.googleusercontent.com',
  iosClientId: '351385798526-3064vhmr2sjopmdekggq9c0aebaldkfe.apps.googleusercontent.com',
});

// ─── Google Sign-In ───────────────────────────────────────────────────────────

export async function googleSignIn() {
  await GoogleSignin.hasPlayServices();
  const { data } = await GoogleSignin.signIn();
  const credential = auth.GoogleAuthProvider.credential(data.idToken);
  const result = await auth().signInWithCredential(credential);

  const snap = await getDoc(doc(db, 'users', result.user.uid));
  if (!snap.exists()) {
    await setDoc(doc(db, 'users', result.user.uid), {
      navn: result.user.displayName || '',
      epost: result.user.email || '',
      opprettet: serverTimestamp(),
    });
  }

  return { user: result.user, isNewUser: !snap.exists() };
}

// ─── Apple Sign-In ────────────────────────────────────────────────────────────

export async function isAppleSignInAvailable() {
  if (Platform.OS !== 'ios') return false;
  return AppleAuthentication.isAvailableAsync();
}

export async function appleSignIn() {
  if (Platform.OS !== 'ios') {
    throw new Error('Apple Sign In er kun tilgjengelig på iOS.');
  }

  const available = await AppleAuthentication.isAvailableAsync();
  if (!available) {
    throw new Error('Apple Sign In er ikke tilgjengelig på denne enheten.');
  }

  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  const { identityToken } = appleCredential;
  if (!identityToken) {
    throw new Error('Apple returnerte ingen identity token.');
  }

  const credential = auth.AppleAuthProvider.credential(identityToken);
  const result = await auth().signInWithCredential(credential);

  const snap = await getDoc(doc(db, 'users', result.user.uid));
  const isNew = !snap.exists();

  if (isNew) {
    const { givenName, familyName } = appleCredential.fullName ?? {};
    const navn = [givenName, familyName].filter(Boolean).join(' ');
    if (navn) {
      await result.user.updateProfile({ displayName: navn });
    }
    await setDoc(doc(db, 'users', result.user.uid), {
      navn: navn || result.user.displayName || '',
      epost: result.user.email || appleCredential.email || '',
      opprettet: serverTimestamp(),
    });
  }

  return { user: result.user, isNewUser: isNew };
}
