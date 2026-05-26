import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useState, useMemo } from 'react';
import { useAppStore } from '../../store/StoreContext';
import { hentLesteModuler } from '../../services/laeringsfremgang';
import LAEREBOK_DATA from '../../data/laerebok.json';

const GOLD = '#F4C542';
const NAVY = '#1e4d8c';

export default function LaerebokTab() {
  const router = useRouter();
  const { userId } = useAppStore();
  const insets = useSafeAreaInsets();
  const scrollPb = 56 + insets.bottom + 16;
  const [search, setSearch] = useState('');
  const [lest, setLest] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!userId) { setLoading(false); return; }
      let alive = true;
      const task = InteractionManager.runAfterInteractions(() => {
        hentLesteModuler(userId).then((l) => {
          if (alive) { setLest(l); setLoading(false); }
        }).catch(() => {
          if (alive) setLoading(false);
        });
      });
      return () => {
        alive = false;
        task.cancel();
      };
    }, [userId])
  );

  const filtrert = useMemo(() => {
    if (!search.trim()) return LAEREBOK_DATA;
    const s = search.toLowerCase();
    return LAEREBOK_DATA.filter((kap) => {
      if (kap.tittel.toLowerCase().includes(s)) return true;
      return kap.seksjoner?.some((sek) => sek.tittel?.toLowerCase().includes(s));
    });
  }, [search]);

  const totaltLest = lest.filter((id) => id.startsWith('kap')).length;
  const prosent = Math.round((totaltLest / LAEREBOK_DATA.length) * 100);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: scrollPb }]} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Lærebok</Text>
            <Text style={styles.sub}>Nasjonal grunnutdanning – 15 kapitler</Text>
          </View>
          <View style={styles.progBadge}>
            <Text style={styles.progBadgeNum}>{totaltLest}</Text>
            <Text style={styles.progBadgeSub}>/15</Text>
          </View>
        </View>

        {/* Samlet fremdrift */}
        <View style={styles.overallTrack}>
          <View style={[styles.overallFill, { width: `${prosent}%` }]} />
        </View>
        <Text style={styles.overallPct}>{prosent}% fullført</Text>

        {/* Søk */}
        <TextInput
          style={styles.search}
          placeholder="Søk etter kapittel eller tema..."
          placeholderTextColor="#4a4a6a"
          value={search}
          onChangeText={setSearch}
        />

        {loading ? (
          <ActivityIndicator color={GOLD} style={{ marginTop: 30 }} />
        ) : filtrert.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Ingen treff for «{search}»</Text>
          </View>
        ) : (
          filtrert.map((kap) => {
            const erLest = lest.includes(kap.id);
            return (
              <TouchableOpacity
                key={kap.id}
                style={[styles.card, erLest && styles.cardLest]}
                activeOpacity={0.8}
                onPress={() => router.push(`/laerebok/${kap.id}`)}
              >
                {/* Gull kapittel-sirkel */}
                <View style={[styles.numCircle, erLest && styles.numCircleLest]}>
                  <Text style={styles.numText}>{kap.nummer}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTittel} numberOfLines={2}>{kap.tittel}</Text>
                  <View style={styles.cardMeta}>
                    <MaterialIcons name="schedule" size={11} color="#8b9ab5" />
                    <Text style={styles.cardTimer}>{kap.timer} time{kap.timer !== 1 ? 'r' : ''}</Text>
                    {erLest && (
                      <View style={styles.lestPill}>
                        <Text style={styles.lestPillTxt}>✓ Lest</Text>
                      </View>
                    )}
                  </View>
                  {/* Fremdriftslinje per kort */}
                  <View style={styles.progTrack}>
                    <View style={[styles.progFill, { width: erLest ? '100%' : '0%' }]} />
                  </View>
                </View>

                <MaterialIcons name="chevron-right" size={22} color="#4a4a6a" />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { padding: 20 },

  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 12,
  },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  sub: { fontSize: 12, color: '#8b9ab5', marginTop: 2 },
  progBadge: {
    flexDirection: 'row', alignItems: 'baseline',
    backgroundColor: 'rgba(244,197,66,0.12)',
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: 'rgba(244,197,66,0.3)',
  },
  progBadgeNum: { color: GOLD, fontSize: 22, fontWeight: '900' },
  progBadgeSub: { color: 'rgba(244,197,66,0.6)', fontSize: 13, fontWeight: '600' },

  overallTrack: {
    height: 4, backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2, marginBottom: 4,
  },
  overallFill: { height: '100%', backgroundColor: GOLD, borderRadius: 2 },
  overallPct: { color: '#8b9ab5', fontSize: 11, marginBottom: 16 },

  search: {
    backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14,
    color: '#fff', marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },

  card: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(30, 77, 140, 0.1)',
    borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: 'rgba(30, 77, 140, 0.22)',
    marginBottom: 10,
  },
  cardLest: {
    backgroundColor: 'rgba(244,197,66,0.06)',
    borderColor: 'rgba(244,197,66,0.22)',
  },

  numCircle: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: GOLD,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: GOLD, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35, shadowRadius: 5, elevation: 4,
    flexShrink: 0,
  },
  numCircleLest: { backgroundColor: '#b8941e' },
  numText: { color: '#0f0f1a', fontSize: 16, fontWeight: '900' },

  cardBody: { flex: 1 },
  cardTittel: { color: '#fff', fontSize: 14, fontWeight: '700', lineHeight: 20 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
  cardTimer: { color: '#8b9ab5', fontSize: 11, marginRight: 4 },
  lestPill: {
    backgroundColor: 'rgba(244,197,66,0.15)',
    borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2,
  },
  lestPillTxt: { color: GOLD, fontSize: 10, fontWeight: '700' },

  progTrack: {
    height: 3, backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 2, marginTop: 8,
  },
  progFill: { height: '100%', backgroundColor: GOLD, borderRadius: 2 },

  empty: { padding: 30, alignItems: 'center' },
  emptyText: { color: '#8b9ab5', fontSize: 13 },
});
