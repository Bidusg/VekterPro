import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/StoreContext';
import { hentLesteModuler, markerLest, avmarkerLest } from '../../services/laeringsfremgang';
import LAEREBOK_DATA from '../../data/laerebok.json';

const GOLD = '#F4C542';
const NAVY_TEXT = '#7EAADC';

// ─── Innholds-renderer ────────────────────────────────────────────────────────

function Block({ block, prefix }) {
  switch (block.type) {
    case 'h3':
      return (
        <View style={s.h3Block}>
          <Text style={s.h3}>{block.tittel}</Text>
          {block.innhold?.map((b, i) => (
            <Block key={`${prefix}-${i}`} block={b} prefix={`${prefix}-${i}`} />
          ))}
        </View>
      );

    case 'tekst': {
      const t = block.tekst || '';
      if (t.startsWith('📌') || t.startsWith('✅')) {
        return (
          <View style={s.infobox}>
            <Text style={s.infoboxText}>{t}</Text>
          </View>
        );
      }
      if (t.startsWith('⚠️')) {
        return (
          <View style={s.warningBox}>
            <View style={s.warningBorder} />
            <Text style={s.warningText}>{t}</Text>
          </View>
        );
      }
      return <Text style={s.tekst}>{t}</Text>;
    }

    case 'punktliste':
      return (
        <View style={s.listeBlock}>
          {block.items?.map((item, i) => (
            <View key={i} style={s.listeRow}>
              <Text style={s.bullet}>•</Text>
              <Text style={s.listeTekst}>{item}</Text>
            </View>
          ))}
        </View>
      );

    case 'nummerert':
      return (
        <View style={s.listeBlock}>
          {block.items?.map((item, i) => (
            <View key={i} style={s.listeRow}>
              <Text style={s.numBullet}>{i + 1}.</Text>
              <Text style={s.listeTekst}>{item}</Text>
            </View>
          ))}
        </View>
      );

    default:
      return null;
  }
}

// ─── Kapittel-skjerm ──────────────────────────────────────────────────────────

export default function KapittelScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userId } = useAppStore();
  const [erLest, setErLest] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const scrollRef = useRef(null);
  const markedRef = useRef(false);

  const kapittel = LAEREBOK_DATA.find((k) => k.id === id);
  const currentIndex = LAEREBOK_DATA.findIndex((k) => k.id === id);
  const prevKap = currentIndex > 0 ? LAEREBOK_DATA[currentIndex - 1] : null;
  const nextKap = currentIndex < LAEREBOK_DATA.length - 1 ? LAEREBOK_DATA[currentIndex + 1] : null;

  // Reset state når kapittelet endres
  useEffect(() => {
    setScrollProgress(0);
    setTocOpen(false);
    markedRef.current = false;
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      let alive = true;
      hentLesteModuler(userId).then((l) => {
        if (alive) setErLest(l.includes(id));
      });
      return () => { alive = false; };
    }, [userId, id])
  );

  function handleScroll(event) {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollable = contentSize.height - layoutMeasurement.height;
    if (scrollable <= 0) return;
    const progress = Math.min(1, contentOffset.y / scrollable);
    setScrollProgress(progress);

    // Auto-marker som lest ved 90% av innholdet
    if (progress >= 0.9 && !markedRef.current && !erLest && userId && kapittel) {
      markedRef.current = true;
      markerLest(userId, id);
      setErLest(true);
    }
  }

  async function toggleLest() {
    if (!userId) return;
    if (erLest) {
      await avmarkerLest(userId, id);
      markedRef.current = false;
      setErLest(false);
    } else {
      await markerLest(userId, id);
      markedRef.current = true;
      setErLest(true);
    }
  }

  function navigerTil(kap) {
    router.push(`/laerebok/${kap.id}`);
  }

  if (!kapittel) {
    return (
      <SafeAreaView style={s.safe}>
        <TouchableOpacity style={s.backCircle} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={s.notFound}>Kapittel ikke funnet</Text>
      </SafeAreaView>
    );
  }

  const pct = Math.round(scrollProgress * 100);

  return (
    <SafeAreaView style={s.safe}>

      {/* Scroll-fremdriftslinje */}
      <View style={s.progressBar}>
        <View style={[s.progressFill, { width: `${pct}%` }]} />
      </View>

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backCircle} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerKap}>KAPITTEL {kapittel.nummer}  ·  {pct}%</Text>
          <Text style={s.headerTittel} numberOfLines={1}>{kapittel.tittel}</Text>
        </View>
        <TouchableOpacity
          style={[s.lestBtn, erLest && s.lestBtnActive]}
          onPress={toggleLest}
        >
          <Text style={[s.lestBtnTxt, erLest && s.lestBtnTxtActive]}>
            {erLest ? '✓ Lest' : 'Lest?'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* TOC Accordion */}
      <TouchableOpacity style={s.tocHeader} onPress={() => setTocOpen(!tocOpen)} activeOpacity={0.8}>
        <View style={s.tocHeaderLeft}>
          <MaterialIcons name="list" size={16} color={GOLD} />
          <Text style={s.tocHeaderTxt}>Innholdsfortegnelse</Text>
        </View>
        <MaterialIcons
          name={tocOpen ? 'expand-less' : 'expand-more'}
          size={20}
          color="#8b9ab5"
        />
      </TouchableOpacity>
      {tocOpen && (
        <View style={s.tocList}>
          {kapittel.seksjoner?.map((sek, i) => (
            <Text key={i} style={s.tocItem}>
              <Text style={s.tocNum}>{i + 1}. </Text>
              {sek.tittel}
            </Text>
          ))}
        </View>
      )}

      {/* Scrollbart innhold */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        {/* Kapittel-tittelkort */}
        <View style={s.kapHeader}>
          <View style={s.kapNumCircle}>
            <Text style={s.kapNum}>{kapittel.nummer}</Text>
          </View>
          <Text style={s.kapTittel}>{kapittel.tittel}</Text>
          <Text style={s.kapMeta}>
            <MaterialIcons name="schedule" size={12} color="#8b9ab5" />
            {' '}{kapittel.timer} time{kapittel.timer !== 1 ? 'r' : ''}
          </Text>
        </View>

        {/* Seksjoner (h2) */}
        {kapittel.seksjoner?.map((seksjon, si) => (
          <View key={si} style={s.h2Block}>
            <Text style={s.h2}>{seksjon.tittel}</Text>
            <View style={s.h2Line} />
            {seksjon.innhold?.map((block, bi) => (
              <Block key={`${si}-${bi}`} block={block} prefix={`${si}-${bi}`} />
            ))}
          </View>
        ))}

        {/* Forrige / Neste navigasjon */}
        <View style={s.navRow}>
          {prevKap ? (
            <TouchableOpacity
              style={s.navBtn}
              onPress={() => navigerTil(prevKap)}
              activeOpacity={0.8}
            >
              <MaterialIcons name="chevron-left" size={20} color={GOLD} />
              <View style={s.navContent}>
                <Text style={s.navLabel}>Forrige kapittel</Text>
                <Text style={s.navTittel} numberOfLines={2}>{prevKap.tittel}</Text>
              </View>
            </TouchableOpacity>
          ) : <View style={{ flex: 1 }} />}

          {nextKap ? (
            <TouchableOpacity
              style={[s.navBtn, s.navBtnRight]}
              onPress={() => navigerTil(nextKap)}
              activeOpacity={0.8}
            >
              <View style={[s.navContent, { alignItems: 'flex-end' }]}>
                <Text style={s.navLabel}>Neste kapittel</Text>
                <Text style={s.navTittel} numberOfLines={2}>{nextKap.tittel}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={GOLD} />
            </TouchableOpacity>
          ) : <View style={{ flex: 1 }} />}
        </View>

        <TouchableOpacity style={s.tilbakeBtn} onPress={() => router.back()}>
          <Text style={s.tilbakeTxt}>← Tilbake til oversikt</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Stiler ──────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },

  progressBar: { height: 3, backgroundColor: 'rgba(255,255,255,0.06)' },
  progressFill: { height: '100%', backgroundColor: GOLD },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  backCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center', alignItems: 'center', flexShrink: 0,
  },
  headerCenter: { flex: 1 },
  headerKap: { color: GOLD, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  headerTittel: { color: '#fff', fontSize: 13, fontWeight: '700', marginTop: 1 },
  lestBtn: {
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8,
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(108,99,255,0.3)',
    flexShrink: 0,
  },
  lestBtnActive: {
    backgroundColor: 'rgba(244,197,66,0.15)',
    borderColor: 'rgba(244,197,66,0.4)',
  },
  lestBtnTxt: { color: '#6C63FF', fontWeight: '800', fontSize: 11 },
  lestBtnTxtActive: { color: GOLD },

  tocHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: 'rgba(244,197,66,0.04)',
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  tocHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tocHeaderTxt: { color: '#c8d0e0', fontWeight: '600', fontSize: 13 },
  tocList: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 20, paddingVertical: 10,
  },
  tocItem: { color: '#8b9ab5', fontSize: 13, lineHeight: 26 },
  tocNum: { color: GOLD, fontWeight: '700' },

  scroll: { padding: 20, paddingBottom: 60 },

  kapHeader: { alignItems: 'center', marginBottom: 32 },
  kapNumCircle: {
    width: 68, height: 68, borderRadius: 34, backgroundColor: GOLD,
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
    shadowColor: GOLD, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
  },
  kapNum: { color: '#0f0f1a', fontSize: 28, fontWeight: '900' },
  kapTittel: {
    color: '#fff', fontSize: 22, fontWeight: '900',
    textAlign: 'center', lineHeight: 30,
  },
  kapMeta: { color: '#8b9ab5', fontSize: 12, marginTop: 8 },

  // h2
  h2Block: { marginBottom: 30 },
  h2: { color: NAVY_TEXT, fontSize: 17, fontWeight: '800', marginBottom: 5 },
  h2Line: { height: 2, width: 40, backgroundColor: GOLD, borderRadius: 1, marginBottom: 14 },

  // h3
  h3Block: { marginBottom: 16 },
  h3: { color: GOLD, fontSize: 14, fontWeight: '700', marginBottom: 6 },

  // Tekst
  tekst: { color: '#c8d0e0', fontSize: 14, lineHeight: 23, marginBottom: 10 },

  // Infobox (📌 / ✅)
  infobox: {
    backgroundColor: 'rgba(30, 100, 200, 0.12)',
    borderWidth: 1, borderColor: 'rgba(30, 100, 200, 0.28)',
    borderRadius: 10, padding: 12, marginBottom: 10,
  },
  infoboxText: { color: '#a8c8f0', fontSize: 14, lineHeight: 22 },

  // Advarsel (⚠️)
  warningBox: {
    flexDirection: 'row', marginBottom: 10,
    backgroundColor: 'rgba(231, 76, 60, 0.07)',
    borderRadius: 10, overflow: 'hidden',
  },
  warningBorder: { width: 4, backgroundColor: '#E74C3C' },
  warningText: { flex: 1, color: '#f5a89a', fontSize: 14, lineHeight: 22, padding: 12 },

  // Lister
  listeBlock: { marginBottom: 10 },
  listeRow: { flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' },
  bullet: { color: GOLD, fontSize: 18, width: 20, lineHeight: 22 },
  numBullet: { color: GOLD, fontSize: 13, fontWeight: '700', width: 24, marginTop: 4 },
  listeTekst: { flex: 1, color: '#c8d0e0', fontSize: 14, lineHeight: 22 },

  // Navigasjon
  navRow: {
    flexDirection: 'row', gap: 10,
    marginTop: 36, marginBottom: 14,
  },
  navBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(30, 77, 140, 0.14)',
    borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: 'rgba(30, 77, 140, 0.28)',
  },
  navBtnRight: { justifyContent: 'flex-end' },
  navContent: { flex: 1 },
  navLabel: { color: '#8b9ab5', fontSize: 10, fontWeight: '600', marginBottom: 3 },
  navTittel: { color: '#fff', fontSize: 12, fontWeight: '700', lineHeight: 17 },

  tilbakeBtn: { alignItems: 'center', paddingVertical: 8 },
  tilbakeTxt: { color: '#4a4a6a', fontSize: 13 },

  notFound: { color: '#8b9ab5', textAlign: 'center', marginTop: 40 },
});
