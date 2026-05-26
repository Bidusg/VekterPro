import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import { loggInn } from '../services/auth';
import { googleSignIn, appleSignIn, isAppleSignInAvailable } from '../services/socialAuth';

function GoogleG({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </Svg>
  );
}

export function SocialButtons({ onGoogle, onApple, googleBusy = false, showApple = true }) {
  return (
    <View style={socialStyles.row}>
      <TouchableOpacity
        style={[socialStyles.btn, googleBusy && socialStyles.btnBusy, !showApple && { flex: 1 }]}
        onPress={onGoogle}
        disabled={googleBusy}
        activeOpacity={0.8}
      >
        {googleBusy
          ? <ActivityIndicator size="small" color="#EA4335" />
          : (
            <>
              <GoogleG size={20} />
              <Text style={socialStyles.btnText}>Google</Text>
            </>
          )
        }
      </TouchableOpacity>

      {showApple && (
        <TouchableOpacity style={[socialStyles.btn, socialStyles.btnApple]} onPress={onApple} activeOpacity={0.8}>
          <AntDesign name="apple" size={20} color="#fff" />
          <Text style={[socialStyles.btnText, { color: '#fff' }]}>Apple</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const socialStyles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  btnBusy: { opacity: 0.7 },
  btnApple: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
});

export function oversettAuthFeil(code) {
  switch (code) {
    case 'auth/invalid-email': return 'Ugyldig e-postadresse.';
    case 'auth/user-not-found':
    case 'auth/invalid-credential': return 'Feil e-post eller passord.';
    case 'auth/wrong-password': return 'Feil passord.';
    case 'auth/weak-password': return 'Passord må ha minst 6 tegn.';
    case 'auth/email-already-in-use': return 'E-posten er allerede i bruk.';
    case 'auth/network-request-failed': return 'Ingen nettforbindelse.';
    default: return null;
  }
}

export default function LoginScreen() {
  const router = useRouter();
  const [epost, setEpost] = useState('');
  const [passord, setPassord] = useState('');
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);
  const insets = useSafeAreaInsets();
  const ctaScale = useRef(new Animated.Value(1)).current;

  const onCtaPressIn = () => Animated.spring(ctaScale, { toValue: 0.97, useNativeDriver: true, tension: 300, friction: 20 }).start();
  const onCtaPressOut = () => Animated.spring(ctaScale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 20 }).start();

  useEffect(() => {
    isAppleSignInAvailable().then(setAppleAvailable);
  }, []);

  async function onLogin() {
    if (!epost || !passord) {
      Alert.alert('Mangler felt', 'Fyll inn e-post og passord');
      return;
    }
    setBusy(true);
    try {
      await loggInn(epost.trim(), passord);
    } catch (e) {
      Alert.alert('Innlogging feilet', oversettAuthFeil(e.code) || e.message);
    } finally {
      setBusy(false);
    }
  }

  async function onGoogleLogin() {
    setGoogleBusy(true);
    try {
      await googleSignIn();
    } catch (err) {
      Alert.alert('Google-innlogging feilet', err.message);
    } finally {
      setGoogleBusy(false);
    }
  }

  async function onAppleLogin() {
    try {
      await appleSignIn();
    } catch (e) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Apple-innlogging feilet', e.message);
      }
    }
  }

  return (
    <View style={styles.safe}>
      <StatusBar style="light" backgroundColor="#0d1b3e" translucent={false} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={[styles.container, { paddingTop: insets.top + 40 }]}>

            {/* Logo + header */}
            <View style={styles.header}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoEmoji}>👮</Text>
              </View>
              <Text style={styles.logoText}>VekterEksamen</Text>
              <Text style={styles.subtitle}>Logg inn på kontoen din</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Text style={styles.label}>E-post</Text>
              <TextInput
                style={styles.input}
                placeholder="navn@epost.no"
                placeholderTextColor="#4a4a6a"
                value={epost}
                onChangeText={setEpost}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Text style={styles.label}>Passord</Text>
              <TextInput
                style={styles.input}
                placeholder="Ditt passord"
                placeholderTextColor="#4a4a6a"
                value={passord}
                onChangeText={setPassord}
                secureTextEntry
              />
              <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
                <TouchableOpacity
                  style={styles.cta}
                  onPress={onLogin}
                  disabled={busy}
                  activeOpacity={1}
                  onPressIn={onCtaPressIn}
                  onPressOut={onCtaPressOut}
                >
                  <LinearGradient
                    colors={['#6C63FF', '#4ECDC4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ctaGrad}
                  >
                    {busy
                      ? <ActivityIndicator color="#fff" />
                      : <Text style={styles.ctaText}>Logg inn</Text>
                    }
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>eller</Text>
              <View style={styles.dividerLine} />
            </View>

            <SocialButtons
              onGoogle={onGoogleLogin}
              onApple={onAppleLogin}
              googleBusy={googleBusy}
              showApple={appleAvailable}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Har du ikke konto? </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.footerLink}>Registrer deg</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0d1b3e' },
  scroll: { flexGrow: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 36,
  },

  header: { alignItems: 'center', marginBottom: 36 },
  logoIcon: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(108,99,255,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoEmoji: { fontSize: 42 },
  logoText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#8b9ab5',
    textAlign: 'center',
  },

  form: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#8b9ab5', marginBottom: 8, marginLeft: 2 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cta: { borderRadius: 14, overflow: 'hidden', marginTop: 4 },
  ctaGrad: { paddingVertical: 17, alignItems: 'center' },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '800' },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  dividerText: { color: '#4a4a6a', fontSize: 13, marginHorizontal: 12 },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  footerText: { color: '#8b9ab5', fontSize: 14 },
  footerLink: { color: '#6C63FF', fontSize: 14, fontWeight: '700' },
});
