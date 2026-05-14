import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { useAppStore } from '../../store/StoreContext';
import { hentEksamensforsok } from '../../services/statistikk';

export default function EksamenTab() {
  const router = useRouter();
  const { userId } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [forsok, setForsok] = useState({ antall: 0, bestattPct: 0, forsok: [] });

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      let alive = true;
      hentEksamensforsok(userId).then((d) => {
        if (alive) { setForsok(d); setLoading(false); }
      });
      return () => { alive = false; };
    }, [userId])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>🎯 Eksamen</Text>
        <Text style={styles.sub}>Realistisk eksamenssimulering</Text>

        <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.heroCard}>
          <Text style={styles.heroTitle}>Vektereksamen</Text>
          <View style={styles.heroRow}>
            <View style={styles.heroBox}><Text style={styles.heroNum}>80</Text><Text style={styles.heroLbl}>Spørsmål</Text></View>
            <View style={styles.heroBox}><Text style={styles.heroNum}>75%</Text><Text style={styles.heroLbl}>For å bestå</Text></View>
            <View style={styles.heroBox}><Text style={styles.heroNum}>—</Text><Text style={styles.heroLbl}>Ingen tid</Text></View>
          </View>
          <Text style={styles.heroNote}>Du får ikke vite om svaret er riktig før du har levert.</Text>
        </LinearGradient>

        <TouchableOpacity
          style={styles.startBtn}
          activeOpacity={0.85}
          onPress={() => router.push({ pathname: '/quiz', params: { mode: 'exam' } })}
        >
          <LinearGradient colors={['#6C63FF', '#4ECDC4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.startGrad}>
            <Text style={styles.startText}>Start eksamen →</Text>
          </LinearGradient>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator color="#6C63FF" style={{ marginTop: 30 }} />
        ) : (
          <>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNum}>{forsok.antall}</Text>
                <Text style={styles.statLbl}>Forsøk</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: forsok.bestattPct >= 50 ? '#2ECC71' : '#E74C3C' }]}>
                  {forsok.bestattPct}%
                </Text>
                <Text style={styles.statLbl}>Bestått-rate</Text>
              </View>
            </View>

            {forsok.forsok.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Tidligere forsøk</Text>
                {forsok.forsok.slice(0, 10).map((f, i) => {
                  const dato = f.dato?.toDate ? f.dato.toDate() : null;
                  return (
                    <View key={i} style={styles.attemptRow}>
                      <Text style={[styles.attemptIcon, { color: f.bestatt ? '#2ECC71' : '#E74C3C' }]}>
                        {f.bestatt ? '✓' : '✗'}
                      </Text>
                      <Text style={styles.attemptDato}>
                        {dato ? dato.toLocaleDateString('no-NO') : '—'}
                      </Text>
                      <Text style={[styles.attemptScore, { color: f.bestatt ? '#2ECC71' : '#E74C3C' }]}>
                        {f.score}%
                      </Text>
                    </View>
                  );
                })}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  sub: { fontSize: 13, color: '#8b9ab5', marginBottom: 20 },
  heroCard: { borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  heroTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 16 },
  heroRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  heroBox: { flex: 1, alignItems: 'center' },
  heroNum: { color: '#6C63FF', fontSize: 24, fontWeight: '900' },
  heroLbl: { color: '#8b9ab5', fontSize: 11, marginTop: 2 },
  heroNote: { color: '#8b9ab5', fontSize: 12, lineHeight: 17 },
  startBtn: { borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  startGrad: { paddingVertical: 18, alignItems: 'center' },
  startText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statBox: { flex: 1, padding: 16, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center' },
  statNum: { fontSize: 26, fontWeight: '900', color: '#fff' },
  statLbl: { color: '#8b9ab5', fontSize: 11, marginTop: 2 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 12 },
  attemptRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginBottom: 6,
  },
  attemptIcon: { fontSize: 18, fontWeight: '900' },
  attemptDato: { flex: 1, color: '#c8d0e0', fontSize: 13 },
  attemptScore: { fontSize: 14, fontWeight: '800' },
});
