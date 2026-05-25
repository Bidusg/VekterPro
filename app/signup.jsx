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
import { useState, useEffect, useRef } from 'react';
import { registrer } from '../services/auth';
import { oversettAuthFeil, SocialButtons } from './login';
import { googleSignIn, appleSignIn, isAppleSignInAvailable } from '../services/socialAuth';

export default function SignupScreen() {
  const router = useRouter();
  const [fornavn, setFornavn] = useState('');
  const [etternavn, setEtternavn] = useState('');
  const [epost, setEpost] = useState('');
  const [passord, setPassord] = useState('');
  const [bekreftPassord, setBekreftPassord] = useState('');
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);
  const ctaScale = useRef(new Animated.Value(1)).current;

  const onCtaPressIn = () => Animated.spring(ctaScale, { toValue: 0.97, useNativeDriver: true, tension: 300, friction: 20 }).start();
  const onCtaPressOut = () => Animated.spring(ctaScale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 20 }).start();

  useEffect(() => {
    isAppleSignInAvailable().then(setAppleAvailable);
  }, []);

  async function onRegister() {
    if (!fornavn || !etternavn || !epost || !passord || !bekreftPassord) {
      Alert.alert('Mangler felt', 'Fyll inn alle felt');
      return;
    }
    if (passord.length < 6) {
      Alert.alert('Passord for kort', 'Passord må ha minst 6 tegn');
      return;
    }
    if (passord !== bekreftPassord) {
      Alert.alert('Passord stemmer ikke', 'Passordene er ikke like');
      return;
    }
    setBusy(true);
    try {
      const fullNavn = `${fornavn.trim()} ${etternavn.trim()}`;
      await registrer(epost.trim(), passord, fullNavn);
      router.replace('/betaling');
    } catch (e) {
      Alert.alert('Registrering feilet', oversettAuthFeil(e.code) || e.message);
    } finally {
      setBusy(false);
    }
  }

  async function onGoogleRegister() {
    setGoogleBusy(true);
    try {
      await googleSignIn();
    } catch (err) {
      Alert.alert('Google-registrering feilet', err.message);
    } finally {
      setGoogleBusy(false);
    }
  }

  async function onAppleRegister() {
    try {
      await appleSignIn();
      // AuthGate håndterer navigering (ny bruker → /betaling)
    } catch (e) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Apple-registrering feilet', e.message);
      }
    }
  }

  return (
    <View style={styles.safe}>
      <StatusBar style="light" backgroundColor="#0f0f1a" translucent={false} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>

            <View style={styles.logoWrap}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoEmoji}>👮</Text>
              </View>
              <Text style={styles.logoText}>VekterPro</Text>
            </View>

            <Text style={styles.heading}>Opprett konto</Text>
            <Text style={styles.subtitle}>Lag en konto for å lagre fremgangen din</Text>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.nameRow}>
                <View style={styles.nameField}>
                  <Text style={styles.label}>Fornavn</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ola"
                    placeholderTextColor="#4a4a6a"
                    value={fornavn}
                    onChangeText={setFornavn}
                    autoCapitalize="words"
                  />
                </View>
                <View style={styles.nameField}>
                  <Text style={styles.label}>Etternavn</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nordmann"
                    placeholderTextColor="#4a4a6a"
                    value={etternavn}
                    onChangeText={setEtternavn}
                    autoCapitalize="words"
                  />
                </View>
              </View>

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
                placeholder="Minst 6 tegn"
                placeholderTextColor="#4a4a6a"
                value={passord}
                onChangeText={setPassord}
                secureTextEntry
              />

              <Text style={styles.label}>Bekreft passord</Text>
              <TextInput
                style={styles.input}
                placeholder="Gjenta passordet"
                placeholderTextColor="#4a4a6a"
                value={bekreftPassord}
                onChangeText={setBekreftPassord}
                secureTextEntry
              />

              <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
                <TouchableOpacity style={styles.cta} onPress={onRegister} disabled={busy} activeOpacity={1} onPressIn={onCtaPressIn} onPressOut={onCtaPressOut}>
                  <LinearGradient colors={['#6C63FF', '#4ECDC4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGrad}>
                    {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.ctaText}>Registrer deg</Text>}
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

            {/* Sosiale knapper — under primærknapp */}
            <SocialButtons
              onGoogle={onGoogleRegister}
              onApple={onAppleRegister}
              googleBusy={googleBusy}
              showApple={appleAvailable}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Har du allerede konto? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.footerLink}>Logg inn</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { flexGrow: 1 },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32 },

  logoWrap: { alignItems: 'center', marginBottom: 20 },
  logoIcon: {
    width: 64, height: 64, borderRadius: 16,
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(108,99,255,0.3)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  logoEmoji: { fontSize: 32 },
  logoText: { fontSize: 28, fontWeight: '900', color: '#fff', letterSpacing: -0.5 },

  heading: { fontSize: 22, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#8b9ab5', textAlign: 'center', marginBottom: 20 },

  form: { marginBottom: 16 },
  nameRow: { flexDirection: 'row', gap: 10 },
  nameField: { flex: 1 },
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

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#8b9ab5', fontSize: 14 },
  footerLink: { color: '#6C63FF', fontSize: 14, fontWeight: '700' },
});
