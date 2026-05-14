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
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useState, useEffect } from 'react';
import { loggInn } from '../services/auth';
import { googleSignIn, appleSignIn, isAppleSignInAvailable } from '../services/socialAuth';

// ─── Google G logo (offisiell 4-farges SVG) ───────────────────────────────────
function GoogleG({ size = 26 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </Svg>
  );
}

// ─── Delte sosiale knapper (gjenbrukes i signup.jsx) ─────────────────────────
export function SocialButtons({ onGoogle, onApple, googleBusy = false, showApple = true }) {
  return (
    <View style={socialStyles.row}>
      <TouchableOpacity
        style={[socialStyles.circle, googleBusy && socialStyles.circleBusy]}
        onPress={onGoogle}
        disabled={googleBusy}
        activeOpacity={0.8}
      >
        {googleBusy ? <ActivityIndicator size="small" color="#EA4335" /> : <GoogleG size={26} />}
      </TouchableOpacity>

      {showApple && (
        <TouchableOpacity style={[socialStyles.circle, socialStyles.circleApple]} onPress={onApple} activeOpacity={0.8}>
          <AntDesign name="apple" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const socialStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 4 },
  circle: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 6, elevation: 4,
  },
  circleBusy: { opacity: 0.7 },
  circleApple: {
    backgroundColor: '#111',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
});

// ─── Feilmeldinger fra Firebase ───────────────────────────────────────────────
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

// ─── LoginScreen ──────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const router = useRouter();
  const [epost, setEpost] = useState('');
  const [passord, setPassord] = useState('');
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);

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
      router.replace('/');
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
      // AuthGate håndterer navigering
    } catch (e) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Apple-innlogging feilet', e.message);
      }
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>

            <View style={styles.logoWrap}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoEmoji}>👮</Text>
              </View>
              <Text style={styles.logoText}>VekterPro</Text>
            </View>

            <Text style={styles.heading}>Logg inn på kontoen din</Text>
            <Text style={styles.subtitle}>Velkommen tilbake. Fortsett der du slapp.</Text>

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
              <TouchableOpacity style={styles.cta} onPress={onLogin} disabled={busy} activeOpacity={0.85}>
                <LinearGradient colors={['#6C63FF', '#4ECDC4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGrad}>
                  {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.ctaText}>Logg inn</Text>}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>eller</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sosiale knapper — under primærknapp */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { flexGrow: 1 },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32 },

  logoWrap: { alignItems: 'center', marginBottom: 24 },
  logoIcon: {
    width: 64, height: 64, borderRadius: 16,
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(108,99,255,0.3)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  logoEmoji: { fontSize: 32 },
  logoText: { fontSize: 28, fontWeight: '900', color: '#fff', letterSpacing: -0.5 },

  heading: { fontSize: 22, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#8b9ab5', textAlign: 'center', marginBottom: 24 },

  form: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#8b9ab5', marginBottom: 6, marginLeft: 2 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: '#fff', marginBottom: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  cta: { borderRadius: 14, overflow: 'hidden', marginTop: 4 },
  ctaGrad: { paddingVertical: 16, alignItems: 'center' },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '800' },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  dividerText: { color: '#4a4a6a', fontSize: 13, marginHorizontal: 12 },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  footerText: { color: '#8b9ab5', fontSize: 14 },
  footerLink: { color: '#6C63FF', fontSize: 14, fontWeight: '700' },
});
