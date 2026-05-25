import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppStore as useStore } from '../store/StoreContext';
import { useRef, useEffect, useCallback } from 'react';

const { width } = Dimensions.get('window');

const FEATURES = [
  { icon: 'quiz',         text: '389 spørsmål' },
  { icon: 'menu-book',    text: 'Eksamensmodus' },
  { icon: 'flash-on',     text: 'Flashcards' },
  { icon: 'bar-chart',    text: 'Fremgang' },
  { icon: 'group',        text: 'Øvingsmodus' },
  { icon: 'emoji-events', text: 'Bestått/ikke bestått' },
];

function useEntrance(delay = 0) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      delay,
      useNativeDriver: true,
      friction: 14,
      tension: 120,
    }).start();
  }, []);
  return anim;
}

function FadeSlide({ delay = 0, fromY = 20, children, style }) {
  const anim = useEntrance(delay);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: anim,
          transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [fromY, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

function useSpringPress() {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = useCallback(() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, tension: 300, friction: 20 }).start(), []);
  const onPressOut = useCallback(() => Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 20 }).start(), []);
  return { scale, onPressIn, onPressOut };
}

export default function LandingScreen() {
  const router = useRouter();
  const { loading } = useStore();
  const registerSpring = useSpringPress();
  const loginSpring = useSpringPress();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <StatusBar style="light" backgroundColor="#1a1a2e" translucent={false} />
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f0f1a']} style={styles.container}>

        {/* Hero */}
        <FadeSlide delay={0} fromY={-16} style={styles.heroSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>👮 NORSK VEKTEREKSAMEN</Text>
          </View>
          <Text style={styles.heroTitle}>VekterPro</Text>
          <Text style={styles.heroSubtitle}>Bestå vektereksamen på første forsøk</Text>
        </FadeSlide>

        {/* Stats */}
        <FadeSlide delay={150} fromY={16} style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>333</Text>
            <Text style={styles.statLabel}>Spørsmål</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>19</Text>
            <Text style={styles.statLabel}>Kategorier</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>75%</Text>
            <Text style={styles.statLabel}>Grense</Text>
          </View>
        </FadeSlide>

        {/* Features */}
        <FadeSlide delay={300} fromY={16} style={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <MaterialIcons name={f.icon} size={20} color="#6C63FF" />
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </FadeSlide>

        {/* CTA */}
        <FadeSlide delay={450} fromY={20} style={styles.ctaSection}>
          <Animated.View style={{ transform: [{ scale: registerSpring.scale }] }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/signup')}
              activeOpacity={1}
              onPressIn={registerSpring.onPressIn}
              onPressOut={registerSpring.onPressOut}
            >
              <LinearGradient
                colors={['#6C63FF', '#4ECDC4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaGradient}
              >
                <Text style={styles.registerText}>Registrer deg</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: loginSpring.scale }] }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/login')}
              activeOpacity={1}
              onPressIn={loginSpring.onPressIn}
              onPressOut={loginSpring.onPressOut}
            >
              <Text style={styles.loginText}>Logg inn</Text>
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.disclaimer}>Engangsbetaling · Ingen abonnement · Sikker betaling</Text>
        </FadeSlide>

      </LinearGradient>
    </View>
  );
}

const CARD_W = (width - 52) / 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  loadingContainer: { flex: 1, backgroundColor: '#0f0f1a', justifyContent: 'center', alignItems: 'center' },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },

  heroSection: { alignItems: 'center' },
  badge: {
    backgroundColor: 'rgba(108,99,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.4)',
    marginBottom: 10,
  },
  badgeText: { color: '#a09dff', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  heroTitle: { fontSize: 42, fontWeight: '900', color: '#ffffff', letterSpacing: -1, marginBottom: 4 },
  heroSubtitle: { fontSize: 14, color: '#8b9ab5', textAlign: 'center', lineHeight: 20 },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: '#6C63FF' },
  statLabel: { fontSize: 11, color: '#8b9ab5', marginTop: 1 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 6 },

  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  featureCard: {
    width: CARD_W,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: { fontSize: 12, color: '#c8d0e0', flex: 1, lineHeight: 16 },

  ctaSection: {},
  registerButton: { width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 10 },
  ctaGradient: { paddingVertical: 15, alignItems: 'center', justifyContent: 'center' },
  registerText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  loginButton: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(108,99,255,0.5)',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginText: { color: '#6C63FF', fontSize: 16, fontWeight: '700' },
  disclaimer: { fontSize: 11, color: '#4a4a6a', textAlign: 'center' },
});
