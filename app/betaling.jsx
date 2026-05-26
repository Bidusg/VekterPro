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
import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { useAppStore } from '../store/StoreContext';

const APPLE_PAY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 210.2" fill="white"><path d="M93.6,27.1C87.6,34.2,78,39.8,68.4,39c-1.2-9.6,3.5-19.8,9-26.1c6-7.3,16.5-12.5,25-12.9C103.4,10,99.5,19.8,93.6,27.1 M102.3,40.9c-13.9-0.8-25.8,7.9-32.4,7.9c-6.7,0-16.8-7.5-27.8-7.3c-14.3,0.2-27.6,8.3-34.9,21.2c-15,25.8-3.9,64,10.6,85c7.1,10.4,15.6,21.8,26.8,21.4c10.6-0.4,14.8-6.9,27.6-6.9c12.9,0,16.6,6.9,27.8,6.7c11.6-0.2,18.9-10.4,26-20.8c8.1-11.8,11.4-23.3,11.6-23.9c-0.2-0.2-22.4-8.7-22.6-34.3c-0.2-21.4,17.5-31.6,18.3-32.2C123.3,42.9,107.7,41.3,102.3,40.9 M182.6,11.9v155.9h24.2v-53.3h33.5c30.6,0,52.1-21,52.1-51.4c0-30.4-21.1-51.2-51.3-51.2H182.6z M206.8,32.3h27.9c21,0,33,11.2,33,30.9c0,19.7-12,31-33.1,31h-27.8V32.3z M336.6,169c15.2,0,29.3-7.7,35.7-19.9h0.5v18.7h22.4V90.2c0-22.5-18-37-45.7-37c-25.7,0-44.7,14.7-45.4,34.9h21.8c1.8-9.6,10.7-15.9,22.9-15.9c14.8,0,23.1,6.9,23.1,19.6v8.6l-30.2,1.8c-28.1,1.7-43.3,13.2-43.3,33.2C298.4,155.6,314.1,169,336.6,169z M343.1,150.5c-12.9,0-21.1-6.2-21.1-15.7c0-9.8,7.9-15.5,23-16.4l26.9-1.7v8.8C371.9,140.1,359.5,150.5,343.1,150.5z M425.1,210.2c23.6,0,34.7-9,44.4-36.3L512,54.7h-24.6l-28.5,92.1h-0.5l-28.5-92.1h-25.3l41,113.5l-2.2,6.9c-3.7,11.7-9.7,16.2-20.4,16.2c-1.9,0-5.6-0.2-7.1-0.4v18.7C417.3,210,423.3,210.2,425.1,210.2z"/></svg>`;

const VIPPS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163.5 66.1"><path fill="#FF5B24" d="M28,22l5.1,14.9l5-14.9H44l-8.8,22.1h-4.4L22,22H28z"/><path fill="#FF5B24" d="M57.3,40.6c3.7,0,5.8-1.8,7.8-4.4c1.1-1.4,2.5-1.7,3.5-0.9s1.1,2.3,0,3.7c-2.9,3.8-6.6,6.1-11.3,6.1c-5.1,0-9.6-2.8-12.7-7.7c-0.9-1.3-0.7-2.7,0.3-3.4s2.5-0.4,3.4,1C50.5,38.3,53.5,40.6,57.3,40.6z M64.2,28.3c0,1.8-1.4,3-3,3s-3-1.2-3-3s1.4-3,3-3C62.8,25.3,64.2,26.6,64.2,28.3z"/><path fill="#FF5B24" d="M78.3,22v3c1.5-2.1,3.8-3.6,7.2-3.6c4.3,0,9.3,3.6,9.3,11.3c0,8.1-4.8,12-9.8,12c-2.6,0-5-1-6.8-3.5v10.6h-5.4V22H78.3z M78.3,33c0,4.5,2.6,6.9,5.5,6.9c2.8,0,5.6-2.2,5.6-6.9c0-4.6-2.8-6.8-5.6-6.8C81,26.2,78.3,28.3,78.3,33z"/><path fill="#FF5B24" d="M104.3,22v3c1.5-2.1,3.8-3.6,7.2-3.6c4.3,0,9.3,3.6,9.3,11.3c0,8.1-4.8,12-9.8,12c-2.6,0-5-1-6.8-3.5v10.6h-5.4V22H104.3z M104.3,33c0,4.5,2.6,6.9,5.5,6.9c2.8,0,5.6-2.2,5.6-6.9c0-4.6-2.8-6.8-5.6-6.8C106.9,26.2,104.3,28.3,104.3,33z"/><path fill="#FF5B24" d="M132.3,21.4c4.5,0,7.7,2.1,9.1,7.3l-4.9,0.8c-0.1-2.6-1.7-3.5-4.1-3.5c-1.8,0-3.2,0.8-3.2,2.1c0,1,0.7,2,2.8,2.4l3.7,0.7c3.6,0.7,5.6,3.1,5.6,6.3c0,4.8-4.3,7.2-8.4,7.2c-4.3,0-9.1-2.2-9.8-7.6l4.9-0.8c0.3,2.8,2,3.8,4.8,3.8c2.1,0,3.5-0.8,3.5-2.1c0-1.2-0.7-2.1-3-2.5l-3.4-0.6c-3.6-0.7-5.8-3.2-5.8-6.4C124.2,23.5,128.7,21.4,132.3,21.4z"/></svg>`;

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
    borderColorSelected: 'rgba(255,255,255,0.5)',
  },
  {
    id: 'vipps',
    label: 'Vipps',
    sublabel: 'Betal raskt og enkelt med Vipps',
    bg: '#ffffff',
    bgSelected: '#f8f8f8',
    textColor: '#FF5B24',
    borderColor: 'rgba(255,91,36,0.2)',
    borderColorSelected: '#FF5B24',
  },
  {
    id: 'card',
    label: 'Kort',
    sublabel: 'Visa, Mastercard og andre kort',
    bg: '#0d1b3e',
    bgSelected: '#0d1b3e',
    textColor: '#D4AF37',
    borderColor: '#1a2a52',
    borderColorSelected: '#D4AF37',
  },
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
          <View style={styles.methodRow}>
            {PAYMENT_METHODS.map((m) => {
              const selected = paymentMethod === m.id;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[
                    styles.methodCard,
                    {
                      backgroundColor: selected ? m.bgSelected : m.bg,
                      borderColor: selected ? m.borderColorSelected : m.borderColor,
                    },
                  ]}
                  onPress={() => setPaymentMethod(m.id)}
                  activeOpacity={0.82}
                >
                  <View style={styles.methodCardIcon}>
                    {m.id === 'apple' && (
                      <SvgXml xml={APPLE_PAY_SVG} width={68} height={28} />
                    )}
                    {m.id === 'vipps' && (
                      <SvgXml xml={VIPPS_SVG} width={58} height={24} />
                    )}
                    {m.id === 'card' && (
                      <Text style={{ fontSize: 26 }}>💳</Text>
                    )}
                  </View>
                  <Text style={[styles.methodCardLabel, { color: m.textColor }]}>{m.label}</Text>
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
                : { backgroundColor: 'rgba(255,91,36,0.08)', borderColor: 'rgba(255,91,36,0.25)' },
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

  methodRow: { flexDirection: 'row', gap: 10 },
  methodCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    borderWidth: 1.5,
  },
  methodCardIcon: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  methodCardLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5, textAlign: 'center' },

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
