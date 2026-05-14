/**
 * Social authentication (Google + Apple) for VekterPro.
 *
 * OPPSETT:
 *   1. Kopier .env.example → .env og fyll inn dine Google Client IDs.
 *   2. For Apple: sett usesAppleSignIn: true i app.json (allerede gjort).
 *   3. Bygg appen med EAS eller expo prebuild for native sign-in.
 */
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  getAdditionalUserInfo,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useEffect } from 'react';

// Nødvendig for at OAuth-nettleseren lukkes ordentlig etter innlogging
WebBrowser.maybeCompleteAuthSession();

// ─── Google Sign-In ───────────────────────────────────────────────────────────

/**
 * React-hook som håndterer hele Google OAuth-flyten.
 * Kall den på toppnivå i komponenten (ikke i en handler).
 *
 * @param {object} opts
 * @param {(result: {user, isNewUser}) => void} opts.onSuccess
 * @param {(error: Error) => void}              opts.onError
 * @returns {{ request, promptAsync }}
 */
export function useGoogleAuth({ onSuccess, onError }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // Les klient-IDer fra .env (EXPO_PUBLIC_* er tilgjengelig i klientkode)
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (!response) return;

    if (response.type === 'success') {
      // Hent token fra svaret – format varierer mellom plattformer
      const idToken =
        response.params?.id_token ??
        response.authentication?.idToken ??
        null;
      const accessToken =
        response.params?.access_token ??
        response.authentication?.accessToken ??
        null;

      if (!idToken && !accessToken) {
        onError?.(
          new Error(
            'Google returnerte ingen token. Kontroller OAuth-oppsettet i .env.'
          )
        );
        return;
      }

      const credential = idToken
        ? GoogleAuthProvider.credential(idToken, accessToken)
        : GoogleAuthProvider.credential(null, accessToken);

      signInWithCredential(auth, credential)
        .then(async (result) => {
          const isNew = getAdditionalUserInfo(result)?.isNewUser ?? false;
          if (isNew) {
            await setDoc(doc(db, 'users', result.user.uid), {
              navn: result.user.displayName || '',
              epost: result.user.email || '',
              opprettet: serverTimestamp(),
            });
          }
          onSuccess?.({ user: result.user, isNewUser: isNew });
        })
        .catch((err) => onError?.(err));
    } else if (response.type === 'error') {
      onError?.(
        new Error(response.error?.message ?? 'Google-innlogging feilet')
      );
    }
    // type === 'cancel' → brukeren lukket vinduet; gjør ingenting
  }, [response]);

  return { request, promptAsync };
}

// ─── Apple Sign-In ────────────────────────────────────────────────────────────

/**
 * Returnerer true hvis Apple Sign In er tilgjengelig på enheten.
 * (Alltid false på Android og web.)
 */
export async function isAppleSignInAvailable() {
  if (Platform.OS !== 'ios') return false;
  return AppleAuthentication.isAvailableAsync();
}

/**
 * Gjennomfører Apple Sign In og returnerer { user, isNewUser }.
 * Kast feil videre til kallstedet for brukervennlig melding.
 */
export async function appleSignIn() {
  if (Platform.OS !== 'ios') {
    throw new Error('Apple Sign In er kun tilgjengelig på iOS.');
  }

  const available = await AppleAuthentication.isAvailableAsync();
  if (!available) {
    throw new Error('Apple Sign In er ikke tilgjengelig på denne enheten.');
  }

  // Apple gir kun navn og e-post første gang brukeren samtykker
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

  const provider = new OAuthProvider('apple.com');
  const firebaseCredential = provider.credential({ idToken: identityToken });
  const result = await signInWithCredential(auth, firebaseCredential);

  const isNew = getAdditionalUserInfo(result)?.isNewUser ?? false;

  if (isNew) {
    const { givenName, familyName } = appleCredential.fullName ?? {};
    const navn = [givenName, familyName].filter(Boolean).join(' ');
    if (navn) {
      await updateProfile(result.user, { displayName: navn });
    }
    await setDoc(doc(db, 'users', result.user.uid), {
      navn: navn || result.user.displayName || '',
      epost: result.user.email || appleCredential.email || '',
      opprettet: serverTimestamp(),
    });
  }

  return { user: result.user, isNewUser: isNew };
}
