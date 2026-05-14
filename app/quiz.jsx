import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore as useStore } from '../store/StoreContext';
import { QUESTIONS } from '../data/questions';
import { getModule, getQuestionsForModule } from '../data/modules';
import { hentForklaring, finnInnholdForKategori } from '../data/helpers';
import { registrerFeilSvar, registrerRiktigSvar } from '../services/feilbank';
import { registrerSvar, registrerEksamensforsok } from '../services/statistikk';
import { registrerAktivitet } from '../services/streak';
import { settSistKategori } from '../services/laeringsfremgang';
import { fullførDagligUtfordring } from '../services/dailyChallenge';
import { useState, useEffect, useRef } from 'react';

const { width } = Dimensions.get('window');
const EXAM_COUNT = 80;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Stokker rekkefølgen på svaralternativene og oppdaterer ans-indeksen
// så den fortsatt peker på det riktige svaret.
function shuffleOptions(q) {
  const indices = q.opts.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return {
    ...q,
    opts: indices.map((i) => q.opts[i]),
    ans: indices.indexOf(q.ans),
  };
}

// ─── LES MER MODAL ────────────────────────────────────────────────────────────
function LesMerModal({ visible, onClose, cat }) {
  const innhold = cat ? finnInnholdForKategori(cat) : [];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={modal.container}>
        <View style={modal.header}>
          <Text style={modal.title}>📖 Lærebok</Text>
          <TouchableOpacity style={modal.closeBtn} onPress={onClose}>
            <Text style={modal.closeBtnText}>Lukk</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={modal.scroll} showsVerticalScrollIndicator={false}>
          {innhold.length === 0 ? (
            <Text style={modal.emptyText}>Ingen faglig innhold funnet for denne kategorien.</Text>
          ) : (
            innhold.map((seksjon, i) => (
              <View key={i} style={modal.section}>
                {i === 0 && (
                  <Text style={modal.modulTitle}>{seksjon.modulTittel}</Text>
                )}
                <Text style={modal.sectionTitle}>{seksjon.tittel}</Text>
                <Text style={modal.sectionText}>{seksjon.tekst}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

// ─── RESULT SCREEN ───────────────────────────────────────────────────────────
function ResultScreen({ questions, answers, onRestart, onHome }) {
  const correct = questions.filter((q, i) => answers[i] === q.ans).length;
  const pct = Math.round((correct / questions.length) * 100);
  const passed = pct >= 75;
  const wrong = questions.filter((q, i) => answers[i] !== q.ans && answers[i] !== undefined);

  const [lesMerCat, setLesMerCat] = useState(null);

  return (
    <>
      <ScrollView contentContainerStyle={res.scroll}>
        <LinearGradient
          colors={passed ? ['#1a3a2a', '#0f1f17'] : ['#3a1a1a', '#1f0f0f']}
          style={res.hero}
        >
          <Text style={res.verdict}>{passed ? '🏆 BESTÅTT' : '❌ IKKE BESTÅTT'}</Text>
          <Text style={res.score}>{pct}%</Text>
          <Text style={res.sub}>
            {correct} av {questions.length} riktige · Grense: 75%
          </Text>
        </LinearGradient>

        {wrong.length > 0 && (
          <View style={res.wrongSection}>
            <Text style={res.wrongTitle}>Feil svar ({wrong.length})</Text>
            {wrong.map((q) => {
              const userAnswer = answers[questions.indexOf(q)];
              const forklaring = hentForklaring(q.id, userAnswer, q.ans);

              return (
                <View key={q.id} style={res.wrongCard}>
                  <Text style={res.wrongQ}>{q.q}</Text>
                  <Text style={res.wrongCorrect}>✓ {q.opts[q.ans]}</Text>

                  {forklaring?.feilForklaring && (
                    <View style={res.forklaringBoks}>
                      <Text style={res.forklaringFeil}>✗ {forklaring.feilForklaring}</Text>
                    </View>
                  )}

                  {forklaring?.kilde && (
                    <Text style={res.kilde}>📖 Kilde: {forklaring.kilde}</Text>
                  )}

                  <TouchableOpacity
                    style={res.lesMerBtn}
                    onPress={() => setLesMerCat(q.cat)}
                  >
                    <Text style={res.lesMerBtnText}>Les mer i læreboken →</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        <View style={res.btnRow}>
          <TouchableOpacity style={res.btn} onPress={onRestart}>
            <Text style={res.btnText}>Ta om igjen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[res.btn, res.btnHome]} onPress={onHome}>
            <Text style={res.btnText}>Hjem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LesMerModal
        visible={lesMerCat !== null}
        cat={lesMerCat}
        onClose={() => setLesMerCat(null)}
      />
    </>
  );
}

// ─── MAIN QUIZ ────────────────────────────────────────────────────────────────
export default function QuizScreen() {
  const router = useRouter();
  const { mode, module: moduleId, feilbankIds, dailyIds } = useLocalSearchParams();
  const { progress, seenQuestions, userId, updateProgress, markQuestionSeen, resetSeenQuestions } = useStore();

  const isExam = mode === 'exam';
  const isDaily = mode === 'daily';
  const aktivModul = !isExam && !isDaily && moduleId ? getModule(moduleId) : null;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [currentForklaring, setCurrentForklaring] = useState(null);
  const [lesMerCat, setLesMerCat] = useState(null);
  const [done, setDone] = useState(false);
  const [removedIds, setRemovedIds] = useState(new Set()); // qId-er fjernet fra feilbank denne økten
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const erFeilbankØving = !isExam && !!feilbankIds;
  const erDaglig = isDaily && !!dailyIds;

  useEffect(() => {
    buildQuestions();
  }, []);

  function buildQuestions() {
    let pool = QUESTIONS;

    if (isDaily && dailyIds) {
      const ids = String(dailyIds).split(',');
      // Behold rekkefølgen fra dailyIds (allerede tilfeldig valgt)
      pool = ids.map((id) => QUESTIONS.find((q) => String(q.id) === id)).filter(Boolean);
      setQuestions(pool.map(shuffleOptions));
      return;
    }

    if (!isExam && feilbankIds) {
      // Øving fra feilbank: kun de valgte spørsmåls-id-ene
      const ids = String(feilbankIds).split(',');
      pool = QUESTIONS.filter((q) => ids.includes(String(q.id)));
    } else if (!isExam && aktivModul) {
      pool = getQuestionsForModule(aktivModul.id, QUESTIONS);
    }

    if (isExam) {
      let unseen = pool.filter((q) => !seenQuestions.includes(q.id));
      if (unseen.length < EXAM_COUNT) {
        resetSeenQuestions();
        unseen = pool;
      }
      const selected = shuffle(unseen).slice(0, EXAM_COUNT).map(shuffleOptions);
      setQuestions(selected);
    } else {
      setQuestions(shuffle(pool).map(shuffleOptions));
    }
  }

  function animateTransition(cb) {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    cb();
  }

  function loggSvarStat(q, riktig) {
    // Statistikk + streak + sist-kategori (kun ved første svar)
    if (!userId) return;
    registrerSvar(userId, q.cat, riktig);
    registrerAktivitet(userId);
    if (q.cat) settSistKategori(userId, q.cat);
  }

  function handleAnswer(optIdx) {
    const q = questions[current];
    const erFørsteSvar = answers[current] === undefined;

    if (isExam) {
      // Eksamen: registrer svar. Auto-advance kun ved første svar – hvis brukeren
      // går tilbake og endrer, oppdateres svaret uten å hoppe videre.
      setAnswers((prev) => ({ ...prev, [current]: optIdx }));
      markQuestionSeen(q.id);

      // Skriv til feilbank kun ved første svar (unngå støy ved retting)
      if (erFørsteSvar) {
        const riktig = optIdx === q.ans;
        console.log('[quiz] EKSAMEN svar – riktig:', riktig, 'userId:', userId, 'qId:', q.id);
        if (riktig) {
          registrerRiktigSvar(userId, q);
        } else {
          registrerFeilSvar(userId, q);
        }
        loggSvarStat(q, riktig);
      }

      if (erFørsteSvar) {
        setTimeout(() => {
          if (current + 1 >= questions.length) {
            setDone(true);
          } else {
            animateTransition(() => setCurrent((p) => p + 1));
          }
        }, 600);
      }
    } else {
      // Øving: vis tilbakemelding og forklaring
      const correct = optIdx === q.ans;
      setAnswers((prev) => ({ ...prev, [current]: optIdx }));
      setShowFeedback(correct ? 'correct' : 'wrong');

      // Spor fremgang per modul (kun ved første svar for å unngå dobbeltelling)
      if (erFørsteSvar && aktivModul) {
        updateProgress(aktivModul.id, correct);
      }

      // Skriv til feilbank
      if (erFørsteSvar) {
        console.log('[quiz] ØVING svar – riktig:', correct, 'userId:', userId, 'qId:', q.id);
        loggSvarStat(q, correct);
        if (correct) {
          registrerRiktigSvar(userId, q).then((res) => {
            if (res?.fjernet && erFeilbankØving) {
              console.log('[quiz] fjerner spørsmål', q.id, 'fra denne øktens pool');
              setRemovedIds((prev) => {
                const next = new Set(prev);
                next.add(q.id);
                return next;
              });
            }
          });
        } else {
          registrerFeilSvar(userId, q);
        }
      }

      const forklaring = hentForklaring(q.id, optIdx, q.ans);
      setCurrentForklaring(forklaring);

      if (correct) {
        // Auto-advance kun ved riktig svar
        setTimeout(() => {
          goToNext();
        }, 1400);
      }
      // Feil svar: ingen auto-advance – brukeren må lese og trykke Neste
    }
  }

  function finnNesteIndex(start) {
    // Finn neste indeks som ikke er fjernet fra denne øktens pool
    let i = start;
    while (i < questions.length && removedIds.has(questions[i].id)) i++;
    if (i < questions.length) return i;
    // Wrap-around: lett fra starten
    i = 0;
    while (i < questions.length && removedIds.has(questions[i].id)) i++;
    return i < questions.length ? i : -1;
  }

  function goToNext() {
    setShowFeedback(null);
    setCurrentForklaring(null);

    if (isExam) {
      if (current + 1 >= questions.length) setDone(true);
      else animateTransition(() => setCurrent((p) => p + 1));
      return;
    }

    if (erDaglig) {
      // Daglig utfordring: fast slutt etter 10 spørsmål
      if (current + 1 >= questions.length) setDone(true);
      else animateTransition(() => setCurrent((p) => p + 1));
      return;
    }

    const neste = finnNesteIndex(current + 1);

    if (neste === -1) {
      // Alle spørsmål er fjernet fra pool – feilbank-økten er ferdig
      if (erFeilbankØving) {
        router.replace('/feilbank');
      } else {
        animateTransition(() => { setCurrent(0); setAnswers({}); });
      }
      return;
    }

    if (neste <= current) {
      // Wrappet rundt – nullstill svar for ny runde
      animateTransition(() => { setCurrent(neste); setAnswers({}); });
    } else {
      animateTransition(() => setCurrent(neste));
    }
  }

  function goNext() {
    goToNext();
  }

  function goPrev() {
    if (current > 0) {
      setShowFeedback(null);
      setCurrentForklaring(null);
      animateTransition(() => setCurrent((p) => p - 1));
    }
  }

  function handleRestart() {
    setAnswers({});
    setCurrent(0);
    setDone(false);
    setShowFeedback(null);
    setCurrentForklaring(null);
    buildQuestions();
  }

  // Lagre resultat én gang når eksamen/daglig er fullført
  const lagretRef = useRef(false);
  useEffect(() => {
    if (!done) return;
    if (lagretRef.current) return;
    lagretRef.current = true;
    const correct = questions.filter((q, i) => answers[i] === q.ans).length;
    const pct = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    if (isExam) {
      registrerEksamensforsok(userId, pct, questions.length);
    } else if (erDaglig) {
      fullførDagligUtfordring(userId, pct, questions.length);
    }
  }, [done]);

  if (done && (isExam || erDaglig)) {
    return (
      <SafeAreaView style={styles.safe}>
        <ResultScreen
          questions={questions}
          answers={answers}
          onRestart={handleRestart}
          onHome={() => router.replace('/(tabs)/hjem')}
        />
      </SafeAreaView>
    );
  }

  if (questions.length === 0) return null;

  const q = questions[current];
  const selectedAnswer = answers[current];
  const progress_pct = ((current + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.modeLabel} numberOfLines={1}>
            {isExam
              ? '🎓 Eksamen'
              : aktivModul
                ? `${aktivModul.icon} Modul ${aktivModul.num}`
                : '📚 Øving'}
          </Text>
          <Text style={styles.progress}>
            {current + 1} / {questions.length}
          </Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarBg}>
        <Animated.View
          style={[styles.progressBarFill, { width: `${progress_pct}%` }]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Question */}
          <View style={styles.questionCard}>
            <Text style={styles.questionNum}>Spørsmål {current + 1}</Text>
            <Text style={styles.questionText}>{q.q}</Text>
          </View>

          {/* Options */}
          <View style={styles.options}>
            {q.opts.map((opt, idx) => {
              let optStyle = styles.option;
              let optTextStyle = styles.optionText;

              if (!isExam && showFeedback && selectedAnswer !== undefined) {
                if (idx === q.ans) {
                  optStyle = [styles.option, styles.optionCorrect];
                  optTextStyle = [styles.optionText, styles.optionTextCorrect];
                } else if (idx === selectedAnswer) {
                  optStyle = [styles.option, styles.optionWrong];
                  optTextStyle = [styles.optionText, styles.optionTextWrong];
                }
              } else if (isExam && selectedAnswer === idx) {
                optStyle = [styles.option, styles.optionSelected];
                optTextStyle = [styles.optionText, styles.optionTextSelected];
              } else if (!isExam && selectedAnswer === idx && !showFeedback) {
                optStyle = [styles.option, styles.optionSelected];
                optTextStyle = [styles.optionText, styles.optionTextSelected];
              }

              // I eksamen kan brukeren alltid endre svar (også når de går tilbake).
              // I øvingsmodus låses valgene mens feedback vises.
              const disabled = !isExam && showFeedback !== null;

              return (
                <TouchableOpacity
                  key={idx}
                  style={optStyle}
                  onPress={() => handleAnswer(idx)}
                  disabled={disabled}
                  activeOpacity={0.75}
                >
                  <View style={styles.optionLetter}>
                    <Text style={styles.optionLetterText}>
                      {['A', 'B', 'C', 'D'][idx]}
                    </Text>
                  </View>
                  <Text style={optTextStyle}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Feedback + forklaring (kun øvingsmodus) */}
          {!isExam && showFeedback && (
            <View style={styles.feedbackContainer}>
              {/* Riktig/feil-banner */}
              <View style={[styles.feedbackBar, showFeedback === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong]}>
                <Text style={styles.feedbackText}>
                  {showFeedback === 'correct'
                    ? '✅ Riktig!'
                    : `❌ Feil. Riktig svar: ${q.opts[q.ans]}`}
                </Text>
              </View>

              {/* Forklaring ved feil svar */}
              {showFeedback === 'wrong' && currentForklaring?.feilForklaring && (
                <View style={styles.forklaringBoks}>
                  <Text style={styles.forklaringLabel}>Hvorfor?</Text>
                  <Text style={styles.forklaringTekst}>{currentForklaring.feilForklaring}</Text>
                </View>
              )}

              {/* Kilde */}
              {currentForklaring?.kilde && (
                <Text style={styles.kildeText}>📖 Kilde: {currentForklaring.kilde}</Text>
              )}

              {/* Les mer-knapp */}
              <TouchableOpacity
                style={styles.lesMerBtn}
                onPress={() => setLesMerCat(q.cat)}
              >
                <Text style={styles.lesMerBtnText}>Les mer i læreboken →</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navBtn, current === 0 && styles.navBtnDisabled]}
          onPress={goPrev}
          disabled={current === 0}
        >
          <Text style={styles.navBtnText}>← Forrige</Text>
        </TouchableOpacity>

        {(!isExam || showFeedback || selectedAnswer !== undefined) && (
          <TouchableOpacity style={styles.navBtnPrimary} onPress={goNext}>
            <Text style={styles.navBtnPrimaryText}>
              {current + 1 >= questions.length ? 'Fullfør' : 'Neste →'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Les mer modal */}
      <LesMerModal
        visible={lesMerCat !== null}
        cat={lesMerCat}
        onClose={() => setLesMerCat(null)}
      />
    </SafeAreaView>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center', alignItems: 'center',
  },
  backBtnText: { color: '#fff', fontSize: 16 },
  headerCenter: { flex: 1, alignItems: 'center' },
  modeLabel: { fontSize: 14, fontWeight: '700', color: '#fff' },
  progress: { fontSize: 12, color: '#8b9ab5', marginTop: 2 },

  progressBarBg: { height: 3, backgroundColor: 'rgba(255,255,255,0.08)', marginHorizontal: 16 },
  progressBarFill: { height: 3, backgroundColor: '#6C63FF', borderRadius: 2 },

  scroll: { padding: 20, paddingBottom: 120 },

  questionCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  questionNum: { fontSize: 12, color: '#6C63FF', fontWeight: '700', marginBottom: 8, letterSpacing: 1 },
  questionText: { fontSize: 18, color: '#fff', fontWeight: '600', lineHeight: 26 },

  options: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 14,
  },
  optionSelected: { borderColor: '#6C63FF', backgroundColor: 'rgba(108,99,255,0.12)' },
  optionCorrect: { borderColor: '#2ECC71', backgroundColor: 'rgba(46,204,113,0.1)' },
  optionWrong: { borderColor: '#E74C3C', backgroundColor: 'rgba(231,76,60,0.1)' },

  optionLetter: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center', alignItems: 'center',
  },
  optionLetterText: { fontSize: 13, fontWeight: '800', color: '#8b9ab5' },

  optionText: { flex: 1, fontSize: 15, color: '#c8d0e0', lineHeight: 21 },
  optionTextSelected: { color: '#fff' },
  optionTextCorrect: { color: '#2ECC71', fontWeight: '600' },
  optionTextWrong: { color: '#E74C3C' },

  feedbackContainer: { marginTop: 16, gap: 10 },

  feedbackBar: {
    borderRadius: 12,
    padding: 14,
  },
  feedbackCorrect: { backgroundColor: 'rgba(46,204,113,0.15)', borderWidth: 1, borderColor: 'rgba(46,204,113,0.3)' },
  feedbackWrong: { backgroundColor: 'rgba(231,76,60,0.12)', borderWidth: 1, borderColor: 'rgba(231,76,60,0.3)' },
  feedbackText: { color: '#fff', fontSize: 14, lineHeight: 20, fontWeight: '600' },

  forklaringBoks: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  forklaringLabel: { fontSize: 11, color: '#8b9ab5', fontWeight: '700', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' },
  forklaringTekst: { fontSize: 14, color: '#c8d0e0', lineHeight: 21 },

  kildeText: { fontSize: 12, color: '#8b9ab5', fontStyle: 'italic' },

  lesMerBtn: {
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.3)',
    alignSelf: 'flex-start',
  },
  lesMerBtnText: { color: '#6C63FF', fontSize: 13, fontWeight: '700' },

  navBar: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    paddingBottom: 28,
    backgroundColor: '#0f0f1a',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  navBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
  },
  navBtnDisabled: { opacity: 0.3 },
  navBtnText: { color: '#8b9ab5', fontSize: 14, fontWeight: '600' },
  navBtnPrimary: {
    flex: 1, paddingVertical: 14, borderRadius: 12,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
  },
  navBtnPrimaryText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});

const res = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  hero: { borderRadius: 20, padding: 36, alignItems: 'center', marginBottom: 24 },
  verdict: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 8 },
  score: { fontSize: 72, fontWeight: '900', color: '#fff' },
  sub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  wrongSection: { marginBottom: 24 },
  wrongTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 12 },
  wrongCard: {
    backgroundColor: 'rgba(231,76,60,0.08)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.2)',
    gap: 8,
  },
  wrongQ: { fontSize: 14, color: '#fff', lineHeight: 20, fontWeight: '600' },
  wrongCorrect: { fontSize: 13, color: '#2ECC71' },

  forklaringBoks: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.15)',
  },
  forklaringFeil: { fontSize: 13, color: '#ffb3ae', lineHeight: 19 },

  kilde: { fontSize: 11, color: '#8b9ab5', fontStyle: 'italic' },

  lesMerBtn: {
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.3)',
    alignSelf: 'flex-start',
  },
  lesMerBtnText: { color: '#6C63FF', fontSize: 12, fontWeight: '700' },

  btnRow: { flexDirection: 'row', gap: 12 },
  btn: {
    flex: 1, paddingVertical: 16, borderRadius: 14,
    backgroundColor: '#6C63FF', alignItems: 'center',
  },
  btnHome: { backgroundColor: 'rgba(255,255,255,0.08)' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});

const modal = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  title: { fontSize: 20, fontWeight: '800', color: '#fff' },
  closeBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  scroll: { padding: 20, paddingBottom: 60 },
  emptyText: { color: '#8b9ab5', fontSize: 15, textAlign: 'center', marginTop: 40 },
  modulTitle: {
    fontSize: 13, color: '#6C63FF', fontWeight: '700',
    letterSpacing: 1, textTransform: 'uppercase',
    marginBottom: 16,
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 10 },
  sectionText: { fontSize: 14, color: '#c8d0e0', lineHeight: 22 },
});
