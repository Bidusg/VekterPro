import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState, useMemo } from 'react';
import { useAppStore } from '../../store/StoreContext';
import { LAEREBOK } from '../../data/laerebok';
import { MODULES } from '../../data/modules';
import { hentLesteModuler } from '../../services/laeringsfremgang';

export default function LaerebokTab() {
  const router = useRouter();
  const { userId } = useAppStore();
  const [search, setSearch] = useState('');
  const [lest, setLest] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      let alive = true;
      hentLesteModuler(userId).then((l) => {
        if (alive) { setLest(l); setLoading(false); }
      });
      return () => { alive = false; };
    }, [userId])
  );

  const moduler = useMemo(() => {
    return MODULES.map((mod) => {
      const data = LAEREBOK[mod.id];
      if (!data) return null;
      return { ...mod, tittel: data.tittel, timer: data.timer, innhold: data.innhold };
    }).filter(Boolean);
  }, []);

  const filtrert = useMemo(() => {
    if (!search.trim()) return moduler;
    const s = search.toLowerCase();
    return moduler.filter((m) => {
      if (m.tittel.toLowerCase().includes(s)) return true;
      if (m.name.toLowerCase().includes(s)) return true;
      // Søk i innhold
      const tekstAlt = Object.values(m.innhold || {})
        .map((sek) => `${sek.tittel} ${sek.tekst}`).join(' ').toLowerCase();
      return tekstAlt.includes(s);
    });
  }, [search, moduler]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>📖 Lærebok</Text>
        <Text style={styles.sub}>Nasjonal grunnutdanning – 15 moduler</Text>

        <TextInput
          style={styles.search}
          placeholder="Søk etter begreper, kapitler..."
          placeholderTextColor="#4a4a6a"
          value={search}
          onChangeText={setSearch}
        />

        {loading ? (
          <ActivityIndicator color="#6C63FF" style={{ marginTop: 30 }} />
        ) : filtrert.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Ingen treff for «{search}»</Text>
          </View>
        ) : (
          filtrert.map((mod) => {
            const erLest = lest.includes(mod.id);
            return (
              <TouchableOpacity
                key={mod.id}
                style={styles.modCard}
                activeOpacity={0.85}
                onPress={() => router.push(`/laerebok/${mod.id}`)}
              >
                <View style={[styles.iconBg, { backgroundColor: mod.color + '22' }]}>
                  <Text style={styles.icon}>{mod.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.modHeader}>
                    <Text style={styles.modNum}>Modul {mod.num}</Text>
                    {erLest && <Text style={styles.lestBadge}>✓ Lest</Text>}
                  </View>
                  <Text style={styles.modTittel} numberOfLines={2}>{mod.tittel}</Text>
                  <Text style={styles.modMeta}>⏱ {mod.timer} time{mod.timer !== 1 ? 'r' : ''}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
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
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  sub: { fontSize: 13, color: '#8b9ab5', marginBottom: 16 },
  search: {
    backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14,
    color: '#fff', marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  modCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 10,
  },
  iconBg: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 24 },
  modHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  modNum: { color: '#6C63FF', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  lestBadge: { color: '#2ECC71', fontSize: 11, fontWeight: '700' },
  modTittel: { color: '#fff', fontSize: 14, fontWeight: '700', marginTop: 2 },
  modMeta: { color: '#8b9ab5', fontSize: 11, marginTop: 4 },
  arrow: { color: '#4a4a6a', fontSize: 28 },
  empty: { padding: 30, alignItems: 'center' },
  emptyText: { color: '#8b9ab5', fontSize: 13 },
});
