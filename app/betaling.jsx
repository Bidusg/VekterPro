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
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
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
  {
    id: 'apple',
    label: 'Apple Pay',
    sublabel: 'Betal med Face ID eller Touch ID',
    bg: '#000000',
    bgSelected: '#111111',
    textColor: '#ffffff',
    borderColor: 'rgba(255,255,255,0.12)',
    borderColorSelected: 'rgba(255,255,255,0.45)',
  },
  {
    id: 'vipps',
    label: 'Vipps',
    sublabel: 'Betal raskt og enkelt med Vipps',
    bg: '#FF5B24',
    bgSelected: '#e84e1a',
    textColor: '#ffffff',
    borderColor: 'transparent',
    borderColorSelected: '#ffffff',
  },
  {
    id: 'card',
    label: 'Kortbetaling',
    sublabel: 'Visa, Mastercard og andre kort',
    bg: '#0d1b3e',
    bgSelected: '#0d1b3e',
    textColor: '#D4AF37',
    borderColor: '#D4AF37',
    borderColorSelected: '#f0cc55',
  },
];

function ApplePayIcon({ size = 22, color = '#fff' }) {
  return <Text style={{ fontSize: size, color, lineHeight: size + 4 }}></Text>;
}

function VippsIcon({ size = 22 }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: size * 0.55, lineHeight: size * 0.7 }}>🟠</Text>
    </View>
  );
}

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

  const activePlan = PLANS.find((p) => p.id === selectedPlan);
  const activeMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>VekterEksamen</Text>
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
          <View style={styles.methodList}>
            {PAYMENT_METHODS.map((m) => {
              const selected = paymentMethod === m.id;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[
                    styles.methodTile,
                    {
                      backgroundColor: selected ? m.bgSelected : m.bg,
                      borderColor: selected ? m.borderColorSelected : m.borderColor,
                    },
                  ]}
                  onPress={() => setPaymentMethod(m.id)}
                  activeOpacity={0.82}
                >
                  {/* Left: icon + text */}
                  <View style={styles.methodTileLeft}>
                    {m.id === 'apple' && (
                      <View style={styles.methodIconWrap}>
                        <ApplePayIcon size={24} color="#fff" />
                      </View>
                    )}
                    {m.id === 'vipps' && (
                      <View style={[styles.methodIconWrap, { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10 }]}>
                        <Text style={{ fontSize: 20, lineHeight: 24 }}>🟠</Text>
                      </View>
                    )}
                    {m.id === 'card' && (
                      <View style={[styles.methodIconWrap, { backgroundColor: 'rgba(212,175,55,0.15)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)' }]}>
                        <MaterialIcons name="credit-card" size={22} color="#D4AF37" />
                      </View>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.methodTileLabel, { color: m.textColor }]}>{m.label}</Text>
                      <Text style={[styles.methodTileSub, { color: m.id === 'card' ? 'rgba(212,175,55,0.7)' : 'rgba(255,255,255,0.6)' }]}>
                        {m.sublabel}
                      </Text>
                    </View>
                  </View>

                  {/* Right: checkmark or circle */}
                  <View style={[
                    styles.methodCheck,
                    selected && { backgroundColor: m.id === 'card' ? '#D4AF37' : '#fff', borderColor: 'transparent' },
                  ]}>
                    {selected && (
                      <Text style={{ color: m.id === 'card' ? '#0d1b3e' : m.bg, fontSize: 12, fontWeight: '900' }}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
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

        {/* Apple Pay / Vipps info */}
        {(paymentMethod === 'apple' || paymentMethod === 'vipps') && (
          <View style={styles.section}>
            <View style={[
              styles.walletInfo,
              paymentMethod === 'apple'
                ? { backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.1)' }
                : { backgroundColor: 'rgba(255,91,36,0.12)', borderColor: 'rgba(255,91,36,0.3)' },
            ]}>
              <Text style={styles.walletIcon}>
                {paymentMethod === 'apple' ? '' : '🟠'}
              </Text>
              <Text style={styles.walletText}>
                {paymentMethod === 'apple'
                  ? 'Du vil bli bedt om å bekrefte med Face ID eller Touch ID for å fullføre betalingen.'
                  : 'Du vil bli sendt til Vipps-appen for å godkjenne betalingen.'}
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
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.ctaText}>
                Betal {activePlan?.price} med {activeMethod?.label} →
              </Text>
            )}
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

  methodList: { gap: 10 },
  methodTile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1.5,
  },
  methodTileLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  methodIconWrap: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodTileLabel: { fontSize: 16, fontWeight: '800', letterSpacing: -0.2, marginBottom: 2 },
  methodTileSub: { fontSize: 11, fontWeight: '500' },
  methodCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

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
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  walletIcon: { fontSize: 36, marginBottom: 10 },
  walletText: { fontSize: 14, color: '#8b9ab5', textAlign: 'center', lineHeight: 20 },

  ctaSection: { paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' },
  ctaButton: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C63FF',
    marginBottom: 12,
  },
  ctaButtonDisabled: { opacity: 0.7 },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  disclaimer: { fontSize: 11, color: '#4a4a6a', textAlign: 'center' },
});
