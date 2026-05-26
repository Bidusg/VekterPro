import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FEATURES = [
  { text: '633+ øvingsspørsmål' },
  { text: 'Komplett digital lærebok' },
  { text: 'Flashcards og feilbank' },
];

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.safe}>
      <StatusBar style="light" backgroundColor="#0d1b3e" translucent={false} />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 56, paddingBottom: insets.bottom + 36 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Image
          source={require('../assets/icon.png')}
          style={styles.logo}
          resizeMode="cover"
        />

        {/* Title */}
        <Text style={styles.title}>VekterEksamen</Text>
        <Text style={styles.subtitle}>Bestå vektereksamen{'\n'}på første forsøk</Text>

        {/* Feature list */}
        <View style={styles.features}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={styles.featureCheck}>
                <Text style={styles.featureCheckText}>✓</Text>
              </View>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => router.push('/signup')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Kom i gang</Text>
        </TouchableOpacity>

        {/* Login link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Har du allerede konto? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.footerLink}>Logg inn</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0d1b3e' },
  scroll: {
    paddingHorizontal: 28,
    alignItems: 'center',
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 44,
  },

  features: {
    width: '100%',
    marginBottom: 44,
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  featureCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212,175,55,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureCheckText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '900',
  },
  featureText: {
    fontSize: 16,
    color: '#d0d8e8',
    fontWeight: '600',
  },

  ctaBtn: {
    width: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  ctaText: {
    color: '#0d1b3e',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: { color: '#8892a4', fontSize: 14 },
  footerLink: { color: '#D4AF37', fontSize: 14, fontWeight: '700' },
});
