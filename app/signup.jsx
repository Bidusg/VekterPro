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
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import { registrer } from '../services/auth';
import { oversettAuthFeil, SocialButtons } from './login';
import { googleSignIn, appleSignIn, isAppleSignInAvailable } from '../services/socialAuth';

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    } catch (e) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Apple-registrering feilet', e.message);
      }
    }
  }

  return (
    <View style={styles.safe}>
      <StatusBar style="light" backgroundColor="#0d1b3e" translucent={false} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 20 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image
            source={require('../assets/icon.png')}
            style={styles.logo}
            resizeMode="cover"
          />

          {/* App name */}
          <Text style={styles.appName}>Vektereksamen</Text>

          {/* Heading */}
          <Text style={styles.heading}>Opprett konto</Text>
          <Text style={styles.subtitle}>Lag en konto for å lagre fremgangen din</Text>

          {/* Fornavn + Etternavn side om side */}
          <View style={[styles.nameRow, { marginTop: 32 }]}>
            <View style={styles.nameField}>
              <Text style={styles.label}>Fornavn</Text>
              <TextInput
                style={styles.input}
                placeholder="Ola"
                placeholderTextColor="#4a5568"
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
                placeholderTextColor="#4a5568"
                value={etternavn}
                onChangeText={setEtternavn}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* E-post */}
          <Text style={[styles.label, { marginTop: 12 }]}>E-post</Text>
          <TextInput
            style={styles.input}
            placeholder="navn@epost.no"
            placeholderTextColor="#4a5568"
            value={epost}
            onChangeText={setEpost}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          {/* Passord */}
          <Text style={[styles.label, { marginTop: 12 }]}>Passord</Text>
          <TextInput
            style={styles.input}
            placeholder="Minst 6 tegn"
            placeholderTextColor="#4a5568"
            value={passord}
            onChangeText={setPassord}
            secureTextEntry
          />

          {/* Bekreft passord */}
          <Text style={[styles.label, { marginTop: 12 }]}>Bekreft passord</Text>
          <TextInput
            style={styles.input}
            placeholder="Gjenta passordet"
            placeholderTextColor="#4a5568"
            value={bekreftPassord}
            onChangeText={setBekreftPassord}
            secureTextEntry
          />

          {/* Registrer deg */}
          <Animated.View style={[{ marginTop: 24 }, { transform: [{ scale: ctaScale }] }]}>
            <TouchableOpacity
              style={styles.cta}
              onPress={onRegister}
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
                  : <Text style={styles.ctaText}>Registrer deg</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <View style={[styles.divider, { marginTop: 24 }]}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>eller</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Sosiale knapper */}
          <View style={{ marginTop: 16 }}>
            <SocialButtons
              onGoogle={onGoogleRegister}
              onApple={onAppleRegister}
              googleBusy={googleBusy}
              showApple={appleAvailable}
            />
          </View>

          {/* Footer */}
          <View style={[styles.footer, { marginTop: 24 }]}>
            <Text style={styles.footerText}>Har du allerede konto? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.footerLink}>Logg inn</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0d1b3e' },
  scroll: {
    paddingHorizontal: 28,
    paddingBottom: 48,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignSelf: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: -0.3,
  },

  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#8892a4',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },

  nameRow: { flexDirection: 'row', gap: 10 },
  nameField: { flex: 1 },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8892a4',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  cta: { borderRadius: 14, overflow: 'hidden' },
  ctaGrad: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '800' },

  divider: { flexDirection: 'row', alignItems: 'center' },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  dividerText: { color: '#4a5568', fontSize: 13, marginHorizontal: 12 },

  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#8892a4', fontSize: 14 },
  footerLink: { color: '#6C63FF', fontSize: 14, fontWeight: '700' },
});
