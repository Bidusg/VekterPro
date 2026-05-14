import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useAppStore as useStore } from '../store/StoreContext';
import { QUESTIONS, CATEGORIES } from '../data/questions';
import { useState, useRef, useEffect } from 'react';

const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 600; // px/s – rask kort-swipe trigger også fly-off
const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = height * 0.42;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardsScreen() {
  const router = useRouter();
  const { flashcardState, updateFlashcardState } = useStore();

  const [cards, setCards] = useState(() => shuffle(QUESTIONS));
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState('all');

  const flipAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Swipe shared values
  const swipeX = useSharedValue(0);
  const swipeRot = useSharedValue(0);
  const greenOpacity = useSharedValue(0);
  const redOpacity = useSharedValue(0);

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: swipeX.value },
      { rotate: `${swipeRot.value}deg` },
    ],
  }));

  const greenOverlayStyle = useAnimatedStyle(() => ({
    opacity: greenOpacity.value,
  }));

  const redOverlayStyle = useAnimatedStyle(() => ({
    opacity: redOpacity.value,
  }));

  // Background card scale/translate driven by swipe distance
  const bgCardStyle = useAnimatedStyle(() => {
    const progress = Math.min(Math.abs(swipeX.value) / SWIPE_THRESHOLD, 1);
    return {
      transform: [
        { scale: interpolate(progress, [0, 1], [0.94, 1], Extrapolation.CLAMP) },
        { translateY: interpolate(progress, [0, 1], [12, 0], Extrapolation.CLAMP) },
      ],
      opacity: interpolate(progress, [0, 1], [0.55, 0.85], Extrapolation.CLAMP),
    };
  });

  const displayed = filter === 'unsure'
    ? cards.filter((q) => flashcardState[q.id] !== 'knew')
    : cards;

  const q = displayed[current];
  const nextQ = displayed[(current + 1) % displayed.length];
  const cat = q ? CATEGORIES.find((c) => c.id === q.cat) : null;
  const nextCat = nextQ ? CATEGORIES.find((c) => c.id === nextQ.cat) : null;

  const knewCount = displayed.filter((c) => flashcardState[c.id] === 'knew').length;
  const unsureCount = displayed.filter((c) => flashcardState[c.id] !== 'knew').length;

  useEffect(() => {
    setFlipped(false);
    flipAnim.setValue(0);
  }, [current]);

  function handleFlip() {
    const toValue = flipped ? 0 : 1;
    Animated.spring(flipAnim, {
      toValue,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  }

  // Called after swipe animation completes (on UI thread via callback)
  function advanceAfterSwipe(state) {
    updateFlashcardState(q.id, state);
    if (current + 1 >= displayed.length) {
      setCurrent(0);
      setCards((prev) => shuffle(prev));
    } else {
      setCurrent((p) => p + 1);
    }
    setFlipped(false);
    flipAnim.setValue(0);
  }

  // Used for skip/action buttons (with slide animation)
  function handleMark(state) {
    updateFlashcardState(q.id, state);
    goNext();
  }

  function goNext() {
    if (current + 1 >= displayed.length) {
      setCurrent(0);
      setCards((prev) => shuffle(prev));
    } else {
      Animated.sequence([
        Animated.timing(slideAnim, { toValue: -width, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: width, duration: 0, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
      setCurrent((p) => p + 1);
    }
    setFlipped(false);
    flipAnim.setValue(0);
  }

  const pan = Gesture.Pan()
    .minDistance(5)
    .onUpdate((e) => {
      swipeX.value = e.translationX;
      swipeRot.value = e.translationX / 18;
      if (e.translationX > 0) {
        greenOpacity.value = interpolate(e.translationX, [0, SWIPE_THRESHOLD], [0, 0.85], Extrapolation.CLAMP);
        redOpacity.value = 0;
      } else {
        redOpacity.value = interpolate(-e.translationX, [0, SWIPE_THRESHOLD], [0, 0.85], Extrapolation.CLAMP);
        greenOpacity.value = 0;
      }
    })
    .onEnd((e) => {
      const goRight =
        e.translationX > 0 &&
        (e.translationX > SWIPE_THRESHOLD || e.velocityX > SWIPE_VELOCITY);
      const goLeft =
        e.translationX < 0 &&
        (Math.abs(e.translationX) > SWIPE_THRESHOLD || e.velocityX < -SWIPE_VELOCITY);

      if (goRight) {
        // Fly høyre → kan det
        swipeX.value = withTiming(width * 1.4, { duration: 260 }, (finished) => {
          if (finished) {
            runOnJS(advanceAfterSwipe)('knew');
            swipeX.value = 0;
            swipeRot.value = 0;
            greenOpacity.value = 0;
            redOpacity.value = 0;
          }
        });
        swipeRot.value = withTiming(22, { duration: 260 });
        greenOpacity.value = withTiming(0, { duration: 130 });
      } else if (goLeft) {
        // Fly venstre → kan ikke det
        swipeX.value = withTiming(-width * 1.4, { duration: 260 }, (finished) => {
          if (finished) {
            runOnJS(advanceAfterSwipe)('unsure');
            swipeX.value = 0;
            swipeRot.value = 0;
            greenOpacity.value = 0;
            redOpacity.value = 0;
          }
        });
        swipeRot.value = withTiming(-22, { duration: 260 });
        redOpacity.value = withTiming(0, { duration: 130 });
      } else {
        // Snap tilbake
        swipeX.value = withSpring(0, { damping: 15, stiffness: 150 });
        swipeRot.value = withSpring(0, { damping: 15, stiffness: 150 });
        greenOpacity.value = withSpring(0);
        redOpacity.value = withSpring(0);
      }
    });

  const tap = Gesture.Tap()
    .maxDuration(200)
    .onEnd(() => {
      runOnJS(handleFlip)();
    });

  const composedGesture = Gesture.Exclusive(pan, tap);

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  if (!q) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🎉 Du kan alle kortene!</Text>
          <TouchableOpacity style={styles.resetBtn} onPress={() => { setFilter('all'); setCurrent(0); }}>
            <Text style={styles.resetBtnText}>Start på nytt</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🃏 Flashcards</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {[
          { id: 'all', label: `Alle (${cards.length})` },
          { id: 'unsure', label: `Usikker (${unsureCount})` },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.filterTab, filter === tab.id && styles.filterTabActive]}
            onPress={() => { setFilter(tab.id); setCurrent(0); }}
          >
            <Text style={[styles.filterTabText, filter === tab.id && styles.filterTabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>{current + 1} / {displayed.length}</Text>
        <View style={styles.knewBadge}>
          <Text style={styles.knewText}>✅ {knewCount} kan det</Text>
        </View>
      </View>

      {/* Card stack */}
      <View style={styles.cardArea}>
        {/* Background card (next) */}
        {displayed.length > 1 && nextQ && (
          <Reanimated.View style={[styles.card, styles.cardFront, styles.bgCard, bgCardStyle]}>
            {nextCat && (
              <View style={[styles.catTag, { backgroundColor: (nextCat.color ?? '#6C63FF') + '22' }]}>
                <Text style={styles.catTagText}>{nextCat.icon} {nextCat.name}</Text>
              </View>
            )}
            <Text style={styles.bgCardQuestion} numberOfLines={3}>{nextQ.q}</Text>
          </Reanimated.View>
        )}

        {/* Active card */}
        <GestureDetector gesture={composedGesture}>
          <Reanimated.View style={[styles.cardWrapper, swipeStyle]}>
            {/* Front face */}
            <Animated.View
              style={[
                styles.card,
                styles.cardFront,
                { transform: [{ translateX: slideAnim }, { rotateY: frontInterpolate }] },
              ]}
            >
              <View style={[styles.catTag, { backgroundColor: (cat?.color ?? '#6C63FF') + '33' }]}>
                <Text style={styles.catTagText}>{cat?.icon} {cat?.name}</Text>
              </View>
              <Text style={styles.cardHint}>Trykk for å snu · sveip ← / →</Text>
              <Text style={styles.cardQuestion}>{q.q}</Text>
              <Text style={styles.tapHint}>👆 Trykk for svar</Text>
            </Animated.View>

            {/* Back face */}
            <Animated.View
              style={[
                styles.card,
                styles.cardBack,
                { transform: [{ translateX: slideAnim }, { rotateY: backInterpolate }] },
              ]}
            >
              <Text style={styles.cardAnswerLabel}>SVAR</Text>
              <Text style={styles.cardAnswer}>{q.opts[q.ans]}</Text>
              <View style={styles.allOptsContainer}>
                {q.opts.map((opt, i) => (
                  <Text key={i} style={[styles.allOpt, i === q.ans && styles.allOptCorrect]}>
                    {i === q.ans ? '✓' : '·'} {opt}
                  </Text>
                ))}
              </View>
            </Animated.View>

            {/* Swipe overlays — always on top, outside flip faces */}
            <Reanimated.View style={[styles.overlay, styles.overlayGreen, greenOverlayStyle]} pointerEvents="none">
              <MaterialIcons name="check" size={80} color="rgba(255,255,255,0.92)" />
            </Reanimated.View>
            <Reanimated.View style={[styles.overlay, styles.overlayRed, redOverlayStyle]} pointerEvents="none">
              <MaterialIcons name="close" size={80} color="rgba(255,255,255,0.92)" />
            </Reanimated.View>
          </Reanimated.View>
        </GestureDetector>
      </View>

      {/* Swipe hint */}
      <View style={styles.swipeHint}>
        <Text style={styles.swipeHintLeft}>← Kan ikke det</Text>
        <View style={styles.swipeHintDot} />
        <Text style={styles.swipeHintRight}>Kan det →</Text>
      </View>

      {/* Actions */}
      {flipped ? (
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionBtn, styles.actionUnsure]} onPress={() => handleMark('unsure')}>
            <Text style={styles.actionIcon}>🤔</Text>
            <Text style={styles.actionText}>Usikker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionKnew]} onPress={() => handleMark('knew')}>
            <Text style={styles.actionIcon}>✅</Text>
            <Text style={styles.actionText}>Kunne det!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.skipBtn} onPress={goNext}>
            <Text style={styles.skipText}>Hopp over →</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f1a' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center', alignItems: 'center',
  },
  backBtnText: { color: '#fff', fontSize: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#fff' },

  filterRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 12 },
  filterTab: {
    flex: 1, paddingVertical: 8, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    borderWidth: 1, borderColor: 'transparent',
  },
  filterTabActive: { backgroundColor: 'rgba(108,99,255,0.15)', borderColor: '#6C63FF' },
  filterTabText: { fontSize: 13, color: '#8b9ab5', fontWeight: '600' },
  filterTabTextActive: { color: '#6C63FF' },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  progressText: { fontSize: 13, color: '#8b9ab5' },
  knewBadge: { backgroundColor: 'rgba(46,204,113,0.1)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  knewText: { fontSize: 12, color: '#2ECC71', fontWeight: '600' },

  // Card stack area
  cardArea: {
    alignSelf: 'center',
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 14,
    position: 'relative',
  },

  // Background (next) card
  bgCard: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgCardQuestion: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },

  // Active card wrapper (Reanimated, handles swipe)
  cardWrapper: {
    position: 'absolute',
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    // overflow hidden would clip overlays; instead match borderRadius on overlays
  },

  // Flip card faces
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    padding: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.3)',
  },
  cardBack: {
    backgroundColor: '#1a2e1a',
    borderWidth: 1,
    borderColor: 'rgba(46,204,113,0.3)',
  },

  catTag: {
    position: 'absolute',
    top: 20, left: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  catTagText: { fontSize: 12, color: '#fff', fontWeight: '600' },
  cardHint: { fontSize: 11, color: '#4a4a6a', marginBottom: 16, letterSpacing: 1 },
  cardQuestion: { fontSize: 20, fontWeight: '700', color: '#fff', textAlign: 'center', lineHeight: 28 },
  tapHint: { position: 'absolute', bottom: 24, fontSize: 13, color: '#4a4a6a' },

  cardAnswerLabel: { fontSize: 11, color: '#2ECC71', letterSpacing: 2, marginBottom: 12, fontWeight: '700' },
  cardAnswer: { fontSize: 22, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 20, lineHeight: 30 },
  allOptsContainer: { width: '100%', gap: 6 },
  allOpt: { fontSize: 13, color: '#8b9ab5', lineHeight: 18 },
  allOptCorrect: { color: '#2ECC71', fontWeight: '700' },

  // Swipe overlays
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayGreen: { backgroundColor: 'rgba(46,204,113,0.45)' },
  overlayRed: { backgroundColor: 'rgba(231,76,60,0.45)' },

  // Swipe hint text
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    gap: 12,
  },
  swipeHintLeft: { fontSize: 12, color: '#E74C3C', fontWeight: '600' },
  swipeHintDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#4a4a6a' },
  swipeHintRight: { fontSize: 12, color: '#2ECC71', fontWeight: '600' },

  actions: { flexDirection: 'row', gap: 14, paddingHorizontal: 20, paddingTop: 12 },
  actionBtn: {
    flex: 1, paddingVertical: 16, borderRadius: 16,
    alignItems: 'center', gap: 4,
  },
  actionUnsure: { backgroundColor: 'rgba(231,76,60,0.12)', borderWidth: 1, borderColor: 'rgba(231,76,60,0.25)' },
  actionKnew: { backgroundColor: 'rgba(46,204,113,0.12)', borderWidth: 1, borderColor: 'rgba(46,204,113,0.25)' },
  actionIcon: { fontSize: 22 },
  actionText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  skipBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center' },
  skipText: { color: '#8b9ab5', fontSize: 14, fontWeight: '600' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 },
  emptyText: { fontSize: 22, fontWeight: '800', color: '#fff' },
  resetBtn: { backgroundColor: '#6C63FF', borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14 },
  resetBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
