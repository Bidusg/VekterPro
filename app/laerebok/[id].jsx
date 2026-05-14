import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { useAppStore } from '../../store/StoreContext';
import { LAEREBOK } from '../../data/laerebok';
import { getModule } from '../../data/modules';
import { hentLesteModuler, markerLest, avmarkerLest } from '../../services/laeringsfremgang';

export default function LaerebokReader() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userId } = useAppStore();
  const [erLest, setErLest] = useState(false);

  const data = LAEREBOK[id];
  const mod = getModule(id);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      hentLesteModuler(userId).then((l) => setErLest(l.includes(id)));
    }, [userId, id])
  );

  async function toggleLest() {
    if (!userId) return;
    if (erLest) {
      await avmarkerLest(userId, id);
      setErLest(false);
    } else {
      await markerLest(userId, id);
      setErLest(true);
    }
  }

  if (!data || !mod) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backTxt}>←</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.empty}>Modul ikke funnet</Text>
      </SafeAreaView>
    );
  }

  const seksjoner = Object.entries(data.innhold || {});

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerNum}>Modul {mod.num}</Text>
        <TouchableOpacity style={[styles.lestBtn, erLest && styles.lestBtnActive]} onPress={toggleLest}>
          <Text style={[styles.lestBtnTxt, erLest && styles.lestBtnTxtActive]}>
            {erLest ? '✓ Lest' : 'Marker som lest'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[mod.color + '33', mod.color + '11']} style={styles.heroCard}>
          <Text style={styles.heroIcon}>{mod.icon}</Text>
          <Text style={styles.heroTitle}>{data.tittel}</Text>
          <Text style={styles.heroMeta}>⏱ {data.timer} time{data.timer !== 1 ? 'r' : ''} · {data.kategorier?.join(', ')}</Text>
        </LinearGradient>

        {seksjoner.map(([key, sek]) => (
          <View key={key} style={styles.seksjon}>
            <Text style={styles.seksjonTittel}>{sek.tittel}</Text>
            <Text style={styles.seksjonTekst}>{sek.tekst}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.bottomBtn, erLest ? styles.bottomBtnDone : styles.bottomBtnDo]}
          onPress={toggleLest}
        >
          <Text style={styles.bottomBtnTxt}>
            {erLest ? '✓ Markert som lest' : 'Marker som lest'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center', alignItems: 'center',
  },
  backTxt: { color: '#fff', fontSize: 20 },
  headerNum: { color: '#6C63FF', fontWeight: '800', fontSize: 13 },
  lestBtn: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10,
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(108,99,255,0.3)',
  },
  lestBtnActive: { backgroundColor: 'rgba(46,204,113,0.15)', borderColor: 'rgba(46,204,113,0.4)' },
  lestBtnTxt: { color: '#6C63FF', fontWeight: '700', fontSize: 12 },
  lestBtnTxtActive: { color: '#2ECC71' },

  scroll: { padding: 20, paddingBottom: 40 },
  heroCard: { padding: 20, borderRadius: 18, marginBottom: 20, alignItems: 'center' },
  heroIcon: { fontSize: 48, marginBottom: 8 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 6 },
  heroMeta: { color: '#8b9ab5', fontSize: 12, textAlign: 'center' },

  seksjon: { marginBottom: 24 },
  seksjonTittel: { color: '#6C63FF', fontSize: 16, fontWeight: '800', marginBottom: 8 },
  seksjonTekst: { color: '#c8d0e0', fontSize: 14, lineHeight: 22 },

  bottomBtn: { padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 12 },
  bottomBtnDo: { backgroundColor: '#6C63FF' },
  bottomBtnDone: { backgroundColor: 'rgba(46,204,113,0.2)', borderWidth: 1, borderColor: '#2ECC71' },
  bottomBtnTxt: { color: '#fff', fontWeight: '800', fontSize: 14 },
  empty: { color: '#8b9ab5', textAlign: 'center', marginTop: 40 },
});
