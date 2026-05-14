import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StoreProvider, useAppStore } from '../store/StoreContext';
import { sjekkOgBeOmTillatelse, planleggDagligVarsel } from '../services/notifications';

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
  );
}
