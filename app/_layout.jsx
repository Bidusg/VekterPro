import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { StoreProvider, useAppStore } from '../store/StoreContext';
import { sjekkOgBeOmTillatelse, planleggDagligVarsel } from '../services/notifications';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] krasj:', error?.message, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={ebStyles.container}>
          <Text style={ebStyles.icon}>⚠️</Text>
          <Text style={ebStyles.title}>Noe gikk galt</Text>
          <Text style={ebStyles.msg}>
            Appen støtte på en uventet feil. Prøv å starte den på nytt.
          </Text>
          <TouchableOpacity
            style={ebStyles.btn}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={ebStyles.btnText}>Prøv igjen</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const ebStyles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#0f0f1a',
    justifyContent: 'center', alignItems: 'center', padding: 32,
  },
  icon: { fontSize: 48, marginBottom: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 8 },
  msg: { color: '#8b9ab5', fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  btn: { backgroundColor: '#6C63FF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

function AuthGate() {
  const { authReady, userId, loading, isPaid } = useAppStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!authReady || loading) return;
    const inAuth = segments[0] === 'login' || segments[0] === 'signup';
    const inLanding = segments[0] === undefined || segments[0] === 'index';
    const inPayment = segments[0] === 'betaling';
    const inTabs = segments[0] === '(tabs)';

    if (!userId) {
      // Uautentisert: kun landing og auth-sider er tillatt
      if (!inAuth && !inLanding) router.replace('/');
    } else if (!isPaid) {
      // Innlogget men ikke betalt: send til betalingssiden
      if (!inPayment) router.replace('/betaling');
    } else {
      // Innlogget og betalt: send til dashboard
      if (inAuth || inLanding || inPayment) router.replace('/(tabs)/hjem');
    }
  }, [authReady, userId, loading, isPaid, segments]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const ok = await sjekkOgBeOmTillatelse();
      if (ok) await planleggDagligVarsel();
    })();
  }, [userId]);

  if (!authReady || loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f0f1a', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#6C63FF" size="large" />
      </View>
    );
  }
  return null;
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StoreProvider>
          <StatusBar style="light" />
          <AuthGate />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#0f0f1a' },
              animation: 'fade',
            }}
          />
        </StoreProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
