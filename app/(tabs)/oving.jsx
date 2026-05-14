import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../store/StoreContext';
import { QUESTIONS } from '../../data/questions';
import { MODULES, getQuestionsForModule } from '../../data/modules';

const { width } = Dimensions.get('window');

export default function OvingTab() {
  const router = useRouter();
  const { progress } = useAppStore();

  function modStats(modId) {
    const p = progress[modId];
    if (!p || p.total === 0) return { pct: 0 };
    return { pct: Math.round((p.correct / p.total) * 100) };
  }

  function pctColor(pct) {
    if (pct >= 75) return '#2ECC71';
    if (pct >= 50) return '#F39C12';
    return '#E74C3C';
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>📚 Øving</Text>
        <Text style={styles.sub}>Velg en modul for å øve</Text>

        <TouchableOpacity
          style={styles.flashBtn}
          onPress={() => router.push('/flashcards')}
          activeOpacity={0.85}
        >
          <Text style={styles.flashIcon}>🃏</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.flashTitle}>Flashcards</Text>
            <Text style={styles.flashSub}>Øv med kort – swipe / trykk</Text>
          </View>
          <Text style={styles.flashArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feilBtn}
          onPress={() => router.push('/feilbank')}
          activeOpacity={0.85}
        >
          <Text style={styles.flashIcon}>📕</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.flashTitle}>Feilbank</Text>
            <Text style={styles.flashSub}>Øv på spørsmålene du tar feil på</Text>
          </View>
          <Text style={styles.feilArrow}>→</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>15 kompetansemål</Text>

        <View style={styles.grid}>
          {MODULES.map((mod) => {
            const stats = modStats(mod.id);
            const qs = getQuestionsForModule(mod.id, QUESTIONS);
            return (
              <TouchableOpacity
                key={mod.id}
                style={styles.card}
                onPress={() => router.push({ pathname: '/quiz', params: { mode: 'practice', module: mod.id } })}
                activeOpacity={0.85}
              >
                <View style={styles.numBadge}>
                  <Text style={styles.numText}>{mod.num}</Text>
                </View>
                <View style={[styles.iconBg, { backgroundColor: mod.color + '22' }]}>
                  <Text style={styles.icon}>{mod.icon}</Text>
                </View>
                <Text style={styles.name} numberOfLines={2}>{mod.name}</Text>
                <Text style={styles.count}>{qs.length} spørsmål</Text>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${stats.pct}%`, backgroundColor: pctColor(stats.pct) }]} />
                </View>
                <Text style={[styles.pct, { color: pctColor(stats.pct) }]}>
                  {progress[mod.id]?.total > 0 ? `${stats.pct}%` : '—'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  sub: { fontSize: 13, color: '#8b9ab5', marginBottom: 16 },

  flashBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderRadius: 14, padding: 16, marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(78,205,196,0.25)',
  },
  feilBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(231,76,60,0.1)',
    borderRadius: 14, padding: 16, marginBottom: 24,
    borderWidth: 1, borderColor: 'rgba(231,76,60,0.25)',
  },
  flashIcon: { fontSize: 26 },
  flashTitle: { color: '#fff', fontWeight: '800', fontSize: 14 },
  flashSub: { color: '#8b9ab5', fontSize: 12, marginTop: 2 },
  flashArrow: { color: '#4ECDC4', fontSize: 22, fontWeight: '700' },
  feilArrow: { color: '#E74C3C', fontSize: 22, fontWeight: '700' },

  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: (width - 52) / 2,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    position: 'relative',
  },
  numBadge: {
    position: 'absolute', top: 10, right: 10,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center', alignItems: 'center',
  },
  numText: { color: '#8b9ab5', fontSize: 11, fontWeight: '800' },
  iconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: 22 },
  name: { color: '#fff', fontSize: 13, fontWeight: '700', lineHeight: 17, marginBottom: 2 },
  count: { color: '#8b9ab5', fontSize: 11, marginBottom: 8 },
  barBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 4 },
  barFill: { height: 4, borderRadius: 2 },
  pct: { fontSize: 12, fontWeight: '700' },
});
