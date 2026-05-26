import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  InteractionManager,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useMemo, useState } from 'react';
import { useAppStore } from '../../store/StoreContext';
import { hentStreak } from '../../services/streak';
import { hentKategoriStat } from '../../services/statistikk';
import { hentFeilbank } from '../../services/feilbank';
import { hentSistKategori } from '../../services/laeringsfremgang';
import { hentDagensStatus } from '../../services/dailyChallenge';
import { loggUt } from '../../services/auth';
import { MODULES } from '../../data/modules';
import { hjemCache } from '../../services/tabCache';
import SkeletonBox from '../../components/SkeletonBox';

function tidsbasertHilsen() {
  const t = new Date().getHours();
  if (t < 11) return 'God morgen';
  if (t < 17) return 'God ettermiddag';
  return 'God kveld';
}

function findKatModul(kat) {
  return MODULES.find((m) => m.kategorier.includes(kat));
}

function HjemSkeleton() {
  return (
    <View style={skStyles.wrap}>
      <SkeletonBox height={80} borderRadius={18} style={skStyles.mb16} />
      <SkeletonBox height={72} borderRadius={16} style={skStyles.mb12} />
      <SkeletonBox height={62} borderRadius={14} style={skStyles.mb20} />
      <SkeletonBox width={110} height={18} borderRadius={6} style={skStyles.mb10} />
      <SkeletonBox height={48} borderRadius={12} style={skStyles.mb8} />
      <SkeletonBox height={48} borderRadius={12} style={skStyles.mb8} />
      <SkeletonBox height={48} borderRadius={12} style={skStyles.mb8} />
      <SkeletonBox width={110} height={18} borderRadius={6} style={skStyles.sectionGap} />
      <SkeletonBox height={48} borderRadius={12} style={skStyles.mb8} />
      <SkeletonBox height={48} borderRadius={12} style={skStyles.mb8} />
    </View>
  );
}

const skStyles = StyleSheet.create({
  wrap: { paddingTop: 4 },
  mb8: { marginBottom: 8 },
  mb10: { marginBottom: 10 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  sectionGap: { marginTop: 6, marginBottom: 10 },
});

export default function HjemTab() {
  const router = useRouter();
  const { userId, navn } = useAppStore();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollPb = 56 + insets.bottom + 16;

  const isSmall = height < 700;
  const padding = isSmall ? 16 : 20;
  const greetingSize = isSmall ? 20 : 22;

  const initData = hjemCache.data;
  const [loading, setLoading] = useState(!initData);
  const [streak, setStreak] = useState(initData?.streak || { current: 0, longest: 0 });
  const [katStats, setKatStats] = useState(initData?.katStats || []);
  const [feilbankPerKat, setFeilbankPerKat] = useState(initData?.feilbankPerKat || {});
  const [sistKat, setSistKat] = useState(initData?.sistKat || null);
  const [dagligStatus, setDagligStatus] = useState(initData?.dagligStatus || { fullført: false });

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      let alive = true;
      const task = InteractionManager.runAfterInteractions(() => {
        if (!hjemCache.data) setLoading(true);
        Promise.all([
          hentStreak(userId),
          hentKategoriStat(userId),
          hentFeilbank(userId),
          hentSistKategori(userId),
          hentDagensStatus(userId),
        ]).then(([s, k, f, sk, d]) => {
          if (!alive) return;
          const grupper = f.reduce((acc, e) => {
            const c = e.kategori || 'Ukjent';
            acc[c] = (acc[c] || 0) + 1;
            return acc;
          }, {});
          hjemCache.data = { streak: s, katStats: k, feilbankPerKat: grupper, sistKat: sk, dagligStatus: d };
          setStreak(s);
          setKatStats(k);
          setFeilbankPerKat(grupper);
          setSistKat(sk);
          setDagligStatus(d);
          setLoading(false);
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

  const sterkeste = useMemo(
    () => [...katStats].filter((k) => k.totalt >= 3).sort((a, b) => b.score - a.score).slice(0, 3),
    [katStats],
  );
  const svakeste = useMemo(
    () => [...katStats].filter((k) => k.totalt >= 3).sort((a, b) => a.score - b.score).slice(0, 3),
    [katStats],
  );
  const størsteFeilbankKat = useMemo(
    () => Object.entries(feilbankPerKat).sort((a, b) => b[1] - a[1])[0],
    [feilbankPerKat],
  );

  const startDagens = useCallback(() => {
    if (dagligStatus.fullført) {
      Alert.alert('Allerede fullført', `Du fullførte dagens utfordring (${dagligStatus.score}%). Kom tilbake i morgen!`);
      return;
    }
    router.push('/daglig');
  }, [dagligStatus, router]);

  const fortsett = useCallback(() => {
    if (sistKat) {
      const mod = findKatModul(sistKat);
      if (mod) {
        router.push({ pathname: '/quiz', params: { mode: 'practice', module: mod.id } });
        return;
      }
    }
    router.push('/(tabs)/oving');
  }, [sistKat, router]);

  const logout = useCallback(() => {
    Alert.alert('Logg ut', 'Vil du logge ut?', [
      { text: 'Avbryt', style: 'cancel' },
      { text: 'Logg ut', style: 'destructive', onPress: loggUt },
    ]);
  }, []);

  const devReset = useCallback(async () => {
    await AsyncStorage.clear();
    await loggUt();
    router.replace('/index');
  }, [router]);

  return (
    <SafeAreaView style={styles.safe}>
      {__DEV__ && (
        <TouchableOpacity style={styles.devReset} onPress={devReset}>
          <Text style={styles.devResetText}>🔄 Reset</Text>
        </TouchableOpacity>
      )}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: padding, paddingTop: padding, paddingBottom: scrollPb }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { fontSize: greetingSize }]}>
              {tidsbasertHilsen()}{navn ? `, ${navn}` : ''}!
            </Text>
            <Text style={styles.sub}>Klar for å lære i dag?</Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>⏻</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <HjemSkeleton />
        ) : (
          <>
            {/* Streak */}
            <LinearGradient colors={['#3a2a1a', '#1f150f']} style={styles.streakCard}>
              <Text style={styles.streakIcon}>🔥</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.streakNum}>{streak.current} dager</Text>
                <Text style={styles.streakLbl}>på rad – fortsett sånn!</Text>
              </View>
              <View style={styles.bestBox}>
                <Text style={styles.bestLbl}>Beste</Text>
                <Text style={styles.bestNum}>{streak.longest}</Text>
              </View>
            </LinearGradient>

            {/* Daglig utfordring CTA */}
            <TouchableOpacity onPress={startDagens} activeOpacity={0.85} style={styles.ctaWrap}>
              <LinearGradient colors={['#6C63FF', '#4ECDC4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGrad}>
                <Text style={styles.ctaIcon}>🎯</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.ctaTitle}>{dagligStatus.fullført ? 'Fullført i dag ✓' : 'Start dagens utfordring'}</Text>
                  <Text style={styles.ctaSub}>
                    {dagligStatus.fullført ? `Score: ${dagligStatus.score}%` : '10 tilfeldige spørsmål'}
                  </Text>
                </View>
                <Text style={styles.ctaArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Fortsett der du slapp */}
            <TouchableOpacity onPress={fortsett} style={styles.continueBtn} activeOpacity={0.85}>
              <Text style={styles.continueIcon}>↩</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.continueTitle}>Fortsett der du slapp</Text>
                <Text style={styles.continueSub}>{sistKat || 'Velg en kategori i Øving-fanen'}</Text>
              </View>
            </TouchableOpacity>

            {/* Snarveier: Flashcards og Feilbank */}
            <View style={styles.shortcutRow}>
              <TouchableOpacity style={styles.shortcutCard} onPress={() => router.push('/flashcards')} activeOpacity={0.85}>
                <Text style={styles.shortcutIcon}>🃏</Text>
                <Text style={styles.shortcutTitle}>Flashcards</Text>
                <Text style={styles.shortcutSub}>Øv med kort</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shortcutCard} onPress={() => router.push('/feilbank')} activeOpacity={0.85}>
                <Text style={styles.shortcutIcon}>❌</Text>
                <Text style={styles.shortcutTitle}>Feilbank</Text>
                <Text style={styles.shortcutSub}>Feil du har gjort</Text>
              </TouchableOpacity>
            </View>

            {/* Anbefalt */}
            {størsteFeilbankKat && (
              <View style={styles.recommendCard}>
                <Text style={styles.recommendTitle}>💡 Anbefalt i dag</Text>
                <Text style={styles.recommendText}>
                  Du har <Text style={styles.recommendBold}>{størsteFeilbankKat[1]} spørsmål</Text> i feilbanken din fra <Text style={styles.recommendBold}>{størsteFeilbankKat[0]}</Text>. Vil du øve?
                </Text>
                <TouchableOpacity style={styles.recommendBtn} onPress={() => router.push('/feilbank')}>
                  <Text style={styles.recommendBtnText}>Gå til feilbank →</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Sterk i */}
            {sterkeste.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>💪 Sterk i</Text>
                {sterkeste.map((k) => (
                  <KatRow key={k.kategori} kat={k} accent="#2ECC71" />
                ))}
              </>
            )}

            {/* Svak i */}
            {svakeste.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>🎯 Svak i</Text>
                {svakeste.map((k) => (
                  <KatRow key={k.kategori} kat={k} accent="#E74C3C" />
                ))}
              </>
            )}

            {katStats.length === 0 && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Svar på noen spørsmål i Øving eller Eksamen for å se din statistikk her.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const KatRow = memo(function KatRow({ kat, accent }) {
  const router = useRouter();
  const mod = findKatModul(kat.kategori);
  return (
    <TouchableOpacity
      style={styles.katRow}
      onPress={() => mod && router.push({ pathname: '/quiz', params: { mode: 'practice', module: mod.id } })}
    >
      <Text style={styles.katIcon}>{mod?.icon ?? '📘'}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.katName}>{kat.kategori}</Text>
        <Text style={styles.katMeta}>{kat.riktig}/{kat.totalt} riktige</Text>
      </View>
      <Text style={[styles.katScore, { color: accent }]}>{kat.score}%</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontWeight: '900', color: '#fff' },
  sub: { fontSize: 13, color: '#8b9ab5', marginTop: 2 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.07)', justifyContent: 'center', alignItems: 'center' },
  iconBtnText: { color: '#8b9ab5', fontSize: 18 },

  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(243,156,18,0.25)',
  },
  streakIcon: { fontSize: 36 },
  streakNum: { fontSize: 22, fontWeight: '900', color: '#fff' },
  streakLbl: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  bestBox: { alignItems: 'center' },
  bestLbl: { fontSize: 10, color: '#8b9ab5' },
  bestNum: { fontSize: 18, fontWeight: '800', color: '#F39C12' },

  ctaWrap: { borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  ctaGrad: { flexDirection: 'row', alignItems: 'center', padding: 18, gap: 14 },
  ctaIcon: { fontSize: 30 },
  ctaTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  ctaSub: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
  ctaArrow: { color: '#fff', fontSize: 22, fontWeight: '700' },

  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 20,
  },
  continueIcon: { fontSize: 22, color: '#6C63FF' },
  continueTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  continueSub: { color: '#8b9ab5', fontSize: 12, marginTop: 2 },

  recommendCard: {
    backgroundColor: 'rgba(108,99,255,0.08)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.25)',
    marginBottom: 24,
  },
  recommendTitle: { color: '#a09dff', fontSize: 13, fontWeight: '800', marginBottom: 6 },
  recommendText: { color: '#c8d0e0', fontSize: 13, lineHeight: 18 },
  recommendBold: { color: '#fff', fontWeight: '800' },
  recommendBtn: { marginTop: 10, alignSelf: 'flex-start' },
  recommendBtnText: { color: '#6C63FF', fontWeight: '700', fontSize: 13 },

  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 10, marginTop: 6 },
  katRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginBottom: 8,
  },
  katIcon: { fontSize: 22 },
  katName: { color: '#fff', fontSize: 13, fontWeight: '700' },
  katMeta: { color: '#8b9ab5', fontSize: 11, marginTop: 1 },
  katScore: { fontSize: 16, fontWeight: '800' },

  emptyBox: { padding: 20, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.04)', marginTop: 8 },
  emptyText: { color: '#8b9ab5', fontSize: 13, textAlign: 'center', lineHeight: 18 },

  shortcutRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  shortcutCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  shortcutIcon: { fontSize: 28, marginBottom: 8 },
  shortcutTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  shortcutSub: { color: '#8b9ab5', fontSize: 11, marginTop: 3 },

  devReset: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
    backgroundColor: 'rgba(220,30,30,0.85)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  devResetText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
