import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { memo, useCallback, useMemo, useState } from 'react';
import { useAppStore } from '../../store/StoreContext';
import {
  hentDagligStat,
  hentKategoriStat,
  hentEksamensforsok,
  hentTotalAntallSvar,
} from '../../services/statistikk';
import { hentStreak } from '../../services/streak';

const chartConfig = {
  backgroundGradientFrom: '#1a1a2e',
  backgroundGradientTo: '#16213e',
  color: (o = 1) => `rgba(108,99,255,${o})`,
  labelColor: () => '#8b9ab5',
  decimalPlaces: 0,
  propsForDots: { r: '3', strokeWidth: '1', stroke: '#6C63FF' },
  propsForBackgroundLines: { stroke: 'rgba(255,255,255,0.05)' },
};

const EMPTY_DATA = {
  dager: [],
  kat: [],
  eks: { antall: 0, bestattPct: 0 },
  total: 0,
  streak: { current: 0, longest: 0 },
};

export default function StatistikkTab() {
  const { userId } = useAppStore();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isSmall = height < 700;
  const padding = isSmall ? 16 : 20;
  const scrollPb = 56 + insets.bottom + 16;
  const chartW = width - padding * 2;
  const boxWidth = (width - padding * 2 - 10) / 2;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(EMPTY_DATA);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      let alive = true;
      setLoading(true);
      Promise.all([
        hentDagligStat(userId, 14),
        hentKategoriStat(userId),
        hentEksamensforsok(userId),
        hentTotalAntallSvar(userId),
        hentStreak(userId),
      ]).then(([dager, kat, eks, total, streak]) => {
        if (!alive) return;
        setData({ dager, kat, eks, total, streak });
        setLoading(false);
      }).catch(() => {
        if (alive) setLoading(false);
      });
      return () => { alive = false; };
    }, [userId])
  );

  const linjeData = useMemo(() => data.dager.length > 0 ? {
    labels: data.dager.map((d) => d.dato.slice(5)),
    datasets: [{ data: data.dager.map((d) => d.score) }],
  } : null, [data.dager]);

  const topKat = useMemo(
    () => [...data.kat].filter((k) => k.totalt >= 1).sort((a, b) => b.totalt - a.totalt).slice(0, 8),
    [data.kat],
  );
  const barData = useMemo(() => topKat.length > 0 ? {
    labels: topKat.map((k) => k.kategori.slice(0, 6)),
    datasets: [{ data: topKat.map((k) => k.score) }],
  } : null, [topKat]);

  const sortedKat = useMemo(
    () => [...data.kat].sort((a, b) => b.score - a.score),
    [data.kat],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={sortedKat}
        keyExtractor={(k) => k.kategori}
        contentContainerStyle={{ paddingHorizontal: padding, paddingTop: padding, paddingBottom: scrollPb }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            {/* Tittel med spinner */}
            <View style={styles.titleRow}>
              <Text style={styles.title}>📊 Statistikk</Text>
              {loading && <ActivityIndicator size="small" color="#6C63FF" />}
            </View>
            <Text style={styles.sub}>Din fremgang over tid</Text>

            {/* Tall-rad */}
            <View style={styles.statGrid}>
              <StatBox icon="📝" num={data.total} lbl="Spørsmål totalt" boxWidth={boxWidth} />
              <StatBox icon="🎯" num={data.eks.antall} lbl="Eksamensforsøk" boxWidth={boxWidth} />
              <StatBox icon="✅" num={`${data.eks.bestattPct}%`} lbl="Beståttrate" color="#2ECC71" boxWidth={boxWidth} />
              <StatBox icon="🔥" num={data.streak.longest} lbl="Beste streak" color="#F39C12" boxWidth={boxWidth} />
            </View>

            {/* Linjegraf */}
            <Text style={styles.chartTitle}>Score siste 14 dager</Text>
            {linjeData ? (
              <LineChart
                data={linjeData}
                width={chartW}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withInnerLines
                fromZero
              />
            ) : (
              <View style={styles.emptyChart}>
                <Text style={styles.emptyText}>Svar på noen spørsmål for å se grafen</Text>
              </View>
            )}

            {/* Bar-chart */}
            <Text style={styles.chartTitle}>Score per kategori</Text>
            {barData ? (
              <BarChart
                data={barData}
                width={chartW}
                height={220}
                chartConfig={chartConfig}
                fromZero
                yAxisSuffix="%"
                style={styles.chart}
                verticalLabelRotation={30}
              />
            ) : (
              <View style={styles.emptyChart}>
                <Text style={styles.emptyText}>Ingen kategoridata enda</Text>
              </View>
            )}

            {sortedKat.length > 0 && (
              <Text style={styles.chartTitle}>Alle kategorier</Text>
            )}
          </>
        )}
        renderItem={({ item: k }) => (
          <View style={styles.katRow}>
            <Text style={styles.katName}>{k.kategori}</Text>
            <View style={styles.katBarBg}>
              <View style={[styles.katBarFill, {
                width: `${k.score}%`,
                backgroundColor: k.score >= 75 ? '#2ECC71' : k.score >= 50 ? '#F39C12' : '#E74C3C',
              }]} />
            </View>
            <Text style={styles.katScore}>{k.score}%</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const StatBox = memo(function StatBox({ icon, num, lbl, color = '#6C63FF', boxWidth }) {
  return (
    <View style={[styles.statBox, { width: boxWidth }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statNum, { color }]}>{num}</Text>
      <Text style={styles.statLbl}>{lbl}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },

  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  sub: { fontSize: 13, color: '#8b9ab5', marginBottom: 20 },

  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  statBox: {
    padding: 14, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  statIcon: { fontSize: 18, marginBottom: 4 },
  statNum: { fontSize: 22, fontWeight: '900' },
  statLbl: { color: '#8b9ab5', fontSize: 11, marginTop: 2 },

  chartTitle: { color: '#fff', fontSize: 15, fontWeight: '800', marginTop: 12, marginBottom: 10 },
  chart: { borderRadius: 14, marginBottom: 8 },
  emptyChart: {
    height: 100, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.04)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  emptyText: { color: '#8b9ab5', fontSize: 13 },

  katRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  katName: { width: 120, color: '#c8d0e0', fontSize: 12 },
  katBarBg: { flex: 1, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.06)' },
  katBarFill: { height: 8, borderRadius: 4 },
  katScore: { width: 40, textAlign: 'right', color: '#fff', fontWeight: '700', fontSize: 12 },
});
