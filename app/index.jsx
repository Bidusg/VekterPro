import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useRef, useCallback } from 'react';

function useSpringPress() {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = useCallback(
    () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, tension: 300, friction: 20 }).start(),
    []
  );
  const onPressOut = useCallback(
    () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 20 }).start(),
    []
  );
  return { scale, onPressIn, onPressOut };
}

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const registerSpring = useSpringPress();
  const loginSpring = useSpringPress();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 20 }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1b3e" />

      {/* Logo */}
      <View style={styles.logoSection}>
        <View style={styles.logoMark}>
          <Text style={styles.logoEmoji}>👮</Text>
        </View>
        <Text style={styles.appName}>VekterEksamen</Text>
        <Text style={styles.tagline}>Bestå vektereksamen på første forsøk</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>633</Text>
          <Text style={styles.statLabel}>Spørsmål</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>15</Text>
          <Text style={styles.statLabel}>Kapitler</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>75%</Text>
          <Text style={styles.statLabel}>Grense</Text>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <Animated.View style={{ transform: [{ scale: registerSpring.scale }] }}>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => router.push('/signup')}
            activeOpacity={1}
            onPressIn={registerSpring.onPressIn}
            onPressOut={registerSpring.onPressOut}
          >
            <Text style={styles.registerBtnText}>Registrer deg</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: loginSpring.scale }] }}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push('/login')}
            activeOpacity={1}
            onPressIn={loginSpring.onPressIn}
            onPressOut={loginSpring.onPressOut}
          >
            <Text style={styles.loginBtnText}>Logg inn</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.disclaimer}>
          Engangsbetaling · Ingen abonnement · Sikker betaling
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1b3e',
    paddingHorizontal: 28,
    justifyContent: 'space-between',
  },

  logoSection: { alignItems: 'center' },
  logoMark: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: 'rgba(212,175,55,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(212,175,55,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoEmoji: { fontSize: 38 },
  appName: { fontSize: 36, fontWeight: '900', color: '#fff', letterSpacing: -0.5, marginBottom: 8 },
  tagline: { fontSize: 15, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 22 },

  statsRow: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.2)',
    backgroundColor: 'rgba(212,175,55,0.05)',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '900', color: '#D4AF37', letterSpacing: -0.5 },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4, fontWeight: '600' },
  statDivider: { width: 1, backgroundColor: 'rgba(212,175,55,0.2)' },

  ctaSection: { gap: 12 },
  registerBtn: {
    backgroundColor: '#D4AF37',
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
  },
  registerBtnText: { color: '#0d1b3e', fontSize: 17, fontWeight: '900', letterSpacing: 0.2 },
  loginBtn: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(212,175,55,0.5)',
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginBtnText: { color: '#D4AF37', fontSize: 17, fontWeight: '700' },
  disclaimer: { fontSize: 11, color: 'rgba(255,255,255,0.28)', textAlign: 'center' },
});
