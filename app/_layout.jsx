import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StoreProvider, useAppStore } from '../store/StoreContext';
import { sjekkOgBeOmTillatelse, planleggDagligVarsel } from '../services/notifications';

SplashScreen.preventAutoHideAsync().catch(() => {});

if (__DEV__) {
  console.log('--- VekterPro oppstart ---');
  console.log('FIREBASE_API_KEY:', process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY ? 'finnes' : 'MANGLER');
  console.log('FIREBASE_APP_ID:', process.env.EXPO_PUBLIC_FIREBASE_WEB_APP_ID ? 'finnes' : 'MANGLER');
  console.log('GOOGLE_CLIENT_ID:', process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ? 'finnes' : 'MANGLER');
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, componentStack: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] krasj:', error?.message, info?.componentStack);
    this.setState({ componentStack: info?.componentStack ?? null });
  }

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message ?? 'Ukjent feil';
      const stack = this.state.componentStack ?? '';
      return (
        <ScrollView
          style={ebStyles.scroll}
          contentContainerStyle={ebStyles.container}
        >
          <Text style={ebStyles.icon}>⚠️</Text>
          <Text style={ebStyles.title}>Appen krasjet</Text>

          <View style={ebStyles.errorBox}>
            <Text style={ebStyles.errorLabel}>Feilmelding</Text>
            <Text style={ebStyles.errorMsg} selectable>{msg}</Text>
          </View>

          {stack ? (
            <View style={ebStyles.stackBox}>
              <Text style={ebStyles.errorLabel}>Komponent-stack</Text>
              <Text style={ebStyles.stackText} selectable>{stack.trim()}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={ebStyles.btn}
            onPress={() => this.setState({ hasError: false, error: null, componentStack: null })}
          >
            <Text style={ebStyles.btnText}>Prøv igjen</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const ebStyles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#0f0f1a' },
  container: { padding: 28, paddingTop: 60, paddingBottom: 40, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 20 },
  errorBox: {
    width: '100%', backgroundColor: 'rgba(231,76,60,0.1)',
    borderWidth: 1, borderColor: 'rgba(231,76,60,0.35)',
    borderRadius: 12, padding: 14, marginBottom: 12,
  },
  stackBox: {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12, padding: 14, marginBottom: 24,
  },
  errorLabel: { color: '#E74C3C', fontSize: 11, fontWeight: '800', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 },
  errorMsg: { color: '#fff', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  stackText: { color: '#8b9ab5', fontSize: 11, lineHeight: 16, fontFamily: 'monospace' },
  btn: { backgroundColor: '#6C63FF', paddingHorizontal: 28, paddingVertical: 13, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

const ADMIN_EMAILS = ['kidus.fisseha002@gmail.com'];

function SplashOverlay() {
  const { authReady } = useAppStore();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const pulseAnim = useRef(new Animated.Value(0.85)).current;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});

    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.4, duration: 850, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.85, duration: 850, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  useEffect(() => {
    if (!authReady) return;
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 450,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  }, [authReady]);

  if (!visible) return null;

  return (
    <Animated.View style={[splashStyles.container, { opacity: fadeAnim }]}>
      <Animated.Image
        source={require('../assets/icon.png')}
        style={[splashStyles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
      <Text style={splashStyles.appName}>VekterEksamen</Text>
      <Animated.View style={[splashStyles.pulse, { transform: [{ scale: pulseAnim }] }]} />
    </Animated.View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0d1b3e',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 120, height: 120, borderRadius: 28 },
  appName: { color: '#fff', fontSize: 28, fontWeight: '900', marginTop: 24, letterSpacing: 0.5 },
  pulse: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#D4AF37',
    marginTop: 40,
  },
});

function AuthGate() {
  const { authReady, userId, epost, loading, isPaid } = useAppStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!authReady || loading) return;
    const inAuth = segments[0] === 'login' || segments[0] === 'signup';
    const inLanding = segments[0] === undefined || segments[0] === 'index';
    const inPayment = segments[0] === 'betaling';

    if (!userId) {
      if (!inAuth && !inLanding) router.replace('/');
    } else if (ADMIN_EMAILS.includes(epost)) {
      if (inAuth || inLanding || inPayment) router.replace('/(tabs)/hjem');
    } else if (!isPaid) {
      if (!inPayment) router.replace('/betaling');
    } else {
      if (inAuth || inLanding || inPayment) router.replace('/(tabs)/hjem');
    }
  }, [authReady, userId, epost, loading, isPaid, segments]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const ok = await sjekkOgBeOmTillatelse();
      if (ok) await planleggDagligVarsel();
    })();
  }, [userId]);

  return null;
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0f0f1a' }}>
        <StoreProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#0f0f1a' },
              animation: 'fade',
            }}
          />
          <AuthGate />
          <SplashOverlay />
        </StoreProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
