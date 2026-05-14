// Daglig utfordring – 10 spørsmål, kun én gang per dag.
// Bruker eksisterende quiz-logikk (registrerer i feilbank/statistikk via quiz.jsx).
// Denne skjermen håndterer kun preselect + redirect til quiz med faste spørsmåls-id-er.
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../store/StoreContext';
import { hentDagensStatus, velgDagensSporsmaal } from '../services/dailyChallenge';
import { QUESTIONS } from '../data/questions';

export default function DagligScreen() {
  const router = useRouter();
  const { userId } = useAppStore();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!userId) return;
    hentDagensStatus(userId).then(setStatus);
  }, [userId]);

  function start() {
    const valgt = velgDagensSporsmaal(QUESTIONS, 10);
    const ids = valgt.map((q) => q.id).join(',');
    router.replace({ pathname: '/quiz', params: { mode: 'daily', dailyIds: ids } });
  }

  if (!status) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator color="#6C63FF" style={{ marginTop: 60 }} />
      </SafeAreaView>
    );
  }

  if (status.fullført) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.bigIcon}>🎉</Text>
          <Text style={styles.title}>Fullført i dag!</Text>
          <Text style={styles.score}>Score: {status.score}%</Text>
          <Text style={styles.sub}>Kom tilbake i morgen for en ny utfordring.</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/(tabs)/hjem')}>
            <Text style={styles.backTxt}>Tilbake til Hjem</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.bigIcon}>🎯</Text>
        <Text style={styles.title}>Dagens utfordring</Text>
        <Text style={styles.sub}>10 tilfeldige spørsmål – tar bare et par minutter</Text>

        <TouchableOpacity onPress={start} style={styles.cta} activeOpacity={0.85}>
          <LinearGradient colors={['#6C63FF', '#4ECDC4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGrad}>
            <Text style={styles.ctaTxt}>Start nå →</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancel}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  bigIcon: { fontSize: 72, marginBottom: 18 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 8, textAlign: 'center' },
  sub: { fontSize: 14, color: '#8b9ab5', marginBottom: 32, textAlign: 'center', lineHeight: 20 },
  score: { color: '#6C63FF', fontWeight: '900', fontSize: 22, marginBottom: 8 },
  cta: { width: '100%', borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  ctaGrad: { paddingVertical: 18, alignItems: 'center' },
  ctaTxt: { color: '#fff', fontWeight: '800', fontSize: 16 },
  cancel: { color: '#8b9ab5', fontSize: 14, padding: 8 },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  backTxt: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
