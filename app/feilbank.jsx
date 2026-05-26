import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo, useState, useRef } from 'react';
import { useAppStore as useStore } from '../store/StoreContext';
import { hentFeilbank } from '../services/feilbank';
import { MODULES } from '../data/modules';

function findModulForKategori(kategori) {
  return MODULES.find((m) => m.kategorier.includes(kategori));
}

function KatCard({ kat, items, onØv }) {
  const mod = findModulForKategori(kat);
  return (
    <View style={styles.katCard}>
      <View style={styles.katHeader}>
        <View style={styles.katHeaderLeft}>
          <Text style={styles.katIcon}>{mod?.icon ?? '📚'}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.katName}>{kat}</Text>
            <Text style={styles.katMeta}>{items.length} spørsmål</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.katBtn} onPress={onØv}>
          <Text style={styles.katBtnText}>Øv</Text>
        </TouchableOpacity>
      </View>

      {items.map((e) => (
        <View key={e.id} style={styles.qRow}>
          <Text style={styles.qText} numberOfLines={2}>{e.spørsmål}</Text>
          <View style={styles.qStats}>
            <Text style={styles.qFeil}>✗ {e.antallFeil}</Text>
            {e.riktigPåRad > 0 && (
              <Text style={styles.qStreak}>🔥 {e.riktigPåRad}/3</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

export default function FeilbankScreen() {
  const router = useRouter();
  const { userId } = useStore();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const bigBtnScale = useRef(new Animated.Value(1)).current;

  const onBigBtnIn = () => Animated.spring(bigBtnScale, { toValue: 0.97, useNativeDriver: true, tension: 300, friction: 20 }).start();
  const onBigBtnOut = () => Animated.spring(bigBtnScale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 20 }).start();

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      let alive = true;
      setLoading(true);
      hentFeilbank(userId)
        .then((data) => {
          if (alive) { setEntries(data); setLoading(false); }
        })
        .catch(() => { if (alive) setLoading(false); });
      return () => { alive = false; };
    }, [userId])
  );

  const grupper = useMemo(() => entries.reduce((acc, e) => {
    const k = e.kategori || 'Ukjent';
    if (!acc[k]) acc[k] = [];
    acc[k].push(e);
    return acc;
  }, {}), [entries]);

  const kategorier = useMemo(() => Object.keys(grupper).sort(), [grupper]);

  function øvAlle() {
    if (entries.length === 0) return;
    router.push({ pathname: '/quiz', params: { mode: 'practice', feilbankIds: entries.map((e) => e.id).join(',') } });
  }

  function øvKategori(kat) {
    router.push({ pathname: '/quiz', params: { mode: 'practice', feilbankIds: grupper[kat].map((e) => e.id).join(',') } });
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Fast header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Feilbank</Text>
        <View style={{ width: 36 }} />
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color="#6C63FF" size="large" />
        </View>
      ) : (
        <FlatList
          data={kategorier}
          keyExtractor={(kat) => kat}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <LinearGradient colors={['#3a1a1a', '#1f0f0f']} style={styles.hero}>
                <Text style={styles.heroNum}>{entries.length}</Text>
                <Text style={styles.heroLabel}>spørsmål du må jobbe med</Text>
                <Text style={styles.heroSub}>
                  Svar riktig 3 ganger på rad for å fjerne et spørsmål fra feilbanken
                </Text>
              </LinearGradient>

              {entries.length > 0 && (
                <>
                  <Animated.View style={{ transform: [{ scale: bigBtnScale }] }}>
                    <TouchableOpacity style={styles.bigBtn} onPress={øvAlle} activeOpacity={1} onPressIn={onBigBtnIn} onPressOut={onBigBtnOut}>
                      <LinearGradient
                        colors={['#6C63FF', '#4ECDC4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.bigBtnGradient}
                      >
                        <Text style={styles.bigBtnText}>Øv på alle ({entries.length})</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>
                  <Text style={styles.sectionTitle}>Per kategori</Text>
                </>
              )}
            </>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>🎉</Text>
              <Text style={styles.emptyTitle}>Tom feilbank!</Text>
              <Text style={styles.emptyText}>
                Du har ingen feil spørsmål akkurat nå. Når du svarer feil i quiz eller eksamen, dukker spørsmålene opp her.
              </Text>
            </View>
          )}
          renderItem={({ item: kat }) => (
            <KatCard
              kat={kat}
              items={grupper[kat]}
              onØv={() => øvKategori(kat)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center', alignItems: 'center',
  },
  backBtnText: { color: '#fff', fontSize: 18 },
  title: { fontSize: 18, fontWeight: '800', color: '#fff' },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { padding: 20, paddingBottom: 40 },

  hero: {
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.2)',
  },
  heroNum: { fontSize: 56, fontWeight: '900', color: '#fff' },
  heroLabel: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  heroSub: { fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 12, textAlign: 'center', lineHeight: 17 },

  emptyCard: {
    backgroundColor: 'rgba(46,204,113,0.08)',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(46,204,113,0.2)',
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#2ECC71', marginBottom: 8 },
  emptyText: { fontSize: 13, color: '#c8d0e0', textAlign: 'center', lineHeight: 19 },

  bigBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 24 },
  bigBtnGradient: { paddingVertical: 16, alignItems: 'center' },
  bigBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#fff', marginBottom: 12 },

  katCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  katHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    marginBottom: 8,
  },
  katHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  katIcon: { fontSize: 24 },
  katName: { fontSize: 14, fontWeight: '700', color: '#fff' },
  katMeta: { fontSize: 11, color: '#8b9ab5', marginTop: 1 },
  katBtn: {
    backgroundColor: 'rgba(108,99,255,0.18)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.3)',
  },
  katBtnText: { color: '#6C63FF', fontSize: 12, fontWeight: '700' },

  qRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 12 },
  qText: { flex: 1, fontSize: 12, color: '#c8d0e0', lineHeight: 17 },
  qStats: { alignItems: 'flex-end', gap: 2 },
  qFeil: { fontSize: 11, color: '#E74C3C', fontWeight: '700' },
  qStreak: { fontSize: 10, color: '#F39C12', fontWeight: '600' },
});
