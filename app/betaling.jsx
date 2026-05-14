import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useAppStore } from '../store/StoreContext';

const PLANS = [
  {
    id: 'week',
    label: '1 uke',
    price: '189 kr',
    description: 'Perfekt for siste innspurt',
    popular: false,
  },
  {
    id: 'twoweeks',
    label: '2 uker',
    price: '299 kr',
    description: 'Mest populær – god tid til å øve',
    popular: true,
  },
  {
    id: 'month',
    label: '1 måned',
    price: '399 kr',
    description: 'Full forberedelse uten stress',
    popular: false,
  },
];

const PAYMENT_METHODS = [
  { id: 'apple', label: 'Apple Pay', icon: '' },
  { id: 'google', label: 'Google Pay', icon: 'G' },
  { id: 'card', label: 'Kort', icon: '💳' },
];

export default function BetalingScreen() {
  const router = useRouter();
  const { purchasePlan } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState('twoweeks');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [kortnummer, setKortnummer] = useState('');
  const [utlopsdato, setUtlopsdato] = useState('');
  const [cvc, setCvc] = useState('');
  const [busy, setBusy] = useState(false);

  function formatKortnummer(val) {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  function formatUtlopsdato(val) {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }

  async function onBetaling() {
    if (paymentMethod === 'card') {
      const rawKort = kortnummer.replace(/\s/g, '');
      if (rawKort.length < 16) {
        Alert.alert('Ugyldig kort', 'Fyll inn et gyldig kortnummer (16 siffer)');
        return;
      }
      if (utlopsdato.length < 5) {
        Alert.alert('Ugyldig dato', 'Fyll inn utløpsdato (MM/ÅÅ)');
        return;
      }
      if (cvc.length < 3) {
        Alert.alert('Ugyldig CVC', 'Fyll inn en gyldig CVC-kode');
        return;
      }
    }

    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 1400));
      await purchasePlan(selectedPlan);
      router.replace('/(tabs)/hjem');
    } catch (e) {
      Alert.alert('Betaling feilet', 'Noe gikk galt. Prøv igjen.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>VekterPro</Text>
          <Text style={styles.heading}>Velg din tilgang</Text>
          <Text style={styles.subtitle}>Engangsbetaling – ingen abonnement</Text>
        </View>

        {/* Plans */}
        <View style={styles.section}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
                plan.popular && styles.planCardPopular,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.8}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>MEST POPULÆR</Text>
                </View>
              )}
              <View style={styles.planRow}>
                <View>
                  <Text style={styles.planLabel}>{plan.label}</Text>
                  <Text style={styles.planDesc}>{plan.description}</Text>
                </View>
                <View style={styles.planPriceBox}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                </View>
              </View>
              <View style={[styles.planRadio, selectedPlan === plan.id && styles.planRadioSelected]}>
                {selectedPlan === plan.id && <View style={styles.planRadioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Betalingsmetode</Text>
          <View style={styles.methodRow}>
            {PAYMENT_METHODS.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[styles.methodBtn, paymentMethod === m.id && styles.methodBtnSelected]}
                onPress={() => setPaymentMethod(m.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.methodIcon}>{m.icon}</Text>
                <Text style={[styles.methodLabel, paymentMethod === m.id && styles.methodLabelSelected]}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Card fields */}
        {paymentMethod === 'card' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kortinformasjon</Text>

            <Text style={styles.label}>Kortnummer</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="#4a4a6a"
              value={kortnummer}
              onChangeText={(v) => setKortnummer(formatKortnummer(v))}
              keyboardType="numeric"
              maxLength={19}
            />

            <View style={styles.cardRow}>
              <View style={styles.cardField}>
                <Text style={styles.label}>Utløpsdato</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/ÅÅ"
                  placeholderTextColor="#4a4a6a"
                  value={utlopsdato}
                  onChangeText={(v) => setUtlopsdato(formatUtlopsdato(v))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={styles.cardField}>
                <Text style={styles.label}>CVC</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor="#4a4a6a"
                  value={cvc}
                  onChangeText={(v) => setCvc(v.replace(/\D/g, '').slice(0, 4))}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        )}

        {/* Apple Pay / Google Pay message */}
        {(paymentMethod === 'apple' || paymentMethod === 'google') && (
          <View style={styles.section}>
            <View style={styles.walletInfo}>
              <Text style={styles.walletIcon}>
                {paymentMethod === 'apple' ? '' : 'G'}
              </Text>
              <Text style={styles.walletText}>
                Du vil bli sendt til {paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} for å fullføre betalingen.
              </Text>
            </View>
          </View>
        )}

        {/* Pay button */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={[styles.ctaButton, busy && styles.ctaButtonDisabled]}
            onPress={onBetaling}
            disabled={busy}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#6C63FF', '#4ECDC4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              {busy ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.ctaText}>
                  Betal {PLANS.find((p) => p.id === selectedPlan)?.price} →
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>Sikker betaling · Ingen binding · Pengene-tilbake-garanti</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { paddingBottom: 40 },

  header: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 24 },
  logoText: { fontSize: 28, fontWeight: '900', color: '#fff', letterSpacing: -0.5, marginBottom: 12 },
  heading: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#8b9ab5' },

  section: { paddingHorizontal: 20, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 12 },

  planCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    position: 'relative',
    overflow: 'hidden',
  },
  planCardSelected: {
    borderColor: '#6C63FF',
    backgroundColor: 'rgba(108,99,255,0.08)',
  },
  planCardPopular: {
    borderColor: 'rgba(108,99,255,0.3)',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#6C63FF',
    borderBottomLeftRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  popularBadgeText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  planRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planLabel: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 2 },
  planDesc: { fontSize: 12, color: '#8b9ab5' },
  planPriceBox: {
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  planPrice: { fontSize: 18, fontWeight: '800', color: '#6C63FF' },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4a4a6a',
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planRadioSelected: { borderColor: '#6C63FF' },
  planRadioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#6C63FF' },

  methodRow: { flexDirection: 'row', gap: 10 },
  methodBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  methodBtnSelected: {
    borderColor: '#6C63FF',
    backgroundColor: 'rgba(108,99,255,0.1)',
  },
  methodIcon: { fontSize: 20, marginBottom: 4 },
  methodLabel: { fontSize: 12, fontWeight: '600', color: '#8b9ab5' },
  methodLabelSelected: { color: '#6C63FF' },

  label: { fontSize: 13, fontWeight: '600', color: '#8b9ab5', marginBottom: 6, marginLeft: 2 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#fff',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardRow: { flexDirection: 'row', gap: 10 },
  cardField: { flex: 1 },

  walletInfo: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  walletIcon: { fontSize: 36, marginBottom: 10 },
  walletText: { fontSize: 14, color: '#8b9ab5', textAlign: 'center', lineHeight: 20 },

  ctaSection: { paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' },
  ctaButton: { width: '100%', borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  ctaButtonDisabled: { opacity: 0.7 },
  ctaGradient: { paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
  disclaimer: { fontSize: 11, color: '#4a4a6a', textAlign: 'center' },
});
