import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lyttPaaAuth, hentProfil } from '../services/auth';

const KEYS = {
  PAYMENT: '@vekterpro_payment',
  PROGRESS: '@vekterpro_progress',
  SEEN_QUESTIONS: '@vekterpro_seen_questions',
  FLASHCARD_STATE: '@vekterpro_flashcards',
};

const defaultProgress = {};

export function useStore() {
  const [isPaid, setIsPaid] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [paymentExpiry, setPaymentExpiry] = useState(null);
  const [progress, setProgress] = useState(defaultProgress);
  const [seenQuestions, setSeenQuestions] = useState([]);
  const [flashcardState, setFlashcardState] = useState({});
  const [userId, setUserId] = useState(null);
  const [navn, setNavn] = useState(null);
  const [epost, setEpost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    loadAll();
    const unsub = lyttPaaAuth(async (user) => {
      try {
        if (user) {
          setUserId(user.uid);
          setEpost(user.email);
          setNavn(user.displayName || null);
          try {
            const profil = await hentProfil(user.uid);
            if (profil?.navn) setNavn(profil.navn);
          } catch (e) {
            console.error('[auth] hentProfil feil:', e.message);
          }
        } else {
          setUserId(null);
          setEpost(null);
          setNavn(null);
        }
      } catch (e) {
        console.error('[auth] lyttPaaAuth callback feil:', e.message);
      } finally {
        setAuthReady(true);
      }
    });
    return () => unsub && unsub();
  }, []);

  async function loadAll() {
    try {
      const [paymentRaw, progressRaw, seenRaw, flashRaw] = await Promise.all([
        AsyncStorage.getItem(KEYS.PAYMENT),
        AsyncStorage.getItem(KEYS.PROGRESS),
        AsyncStorage.getItem(KEYS.SEEN_QUESTIONS),
        AsyncStorage.getItem(KEYS.FLASHCARD_STATE),
      ]);

      if (paymentRaw) {
        const payment = JSON.parse(paymentRaw);
        const now = Date.now();
        if (payment.expiry === -1 || payment.expiry > now) {
          setIsPaid(true);
          setPaymentPlan(payment.plan);
          setPaymentExpiry(payment.expiry);
        }
      }

      if (progressRaw) setProgress(JSON.parse(progressRaw));
      if (seenRaw) setSeenQuestions(JSON.parse(seenRaw));
      if (flashRaw) setFlashcardState(JSON.parse(flashRaw));
    } catch (e) {
      console.error('loadAll error', e);
    } finally {
      setLoading(false);
    }
  }

  const purchasePlan = useCallback(async (plan) => {
    const now = Date.now();
    const durations = {
      week: 7 * 24 * 60 * 60 * 1000,
      twoweeks: 14 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
    };
    const expiry = now + (durations[plan] || durations.month);
    const payment = { plan, expiry, purchasedAt: now };
    await AsyncStorage.setItem(KEYS.PAYMENT, JSON.stringify(payment));
    setIsPaid(true);
    setPaymentPlan(plan);
    setPaymentExpiry(expiry);
  }, []);

  const updateProgress = useCallback(async (cat, isCorrect) => {
    setProgress((prev) => {
      const catData = prev[cat] || { correct: 0, total: 0 };
      const updated = {
        ...prev,
        [cat]: {
          correct: catData.correct + (isCorrect ? 1 : 0),
          total: catData.total + 1,
        },
      };
      AsyncStorage.setItem(KEYS.PROGRESS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markQuestionSeen = useCallback(async (id) => {
    setSeenQuestions((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      AsyncStorage.setItem(KEYS.SEEN_QUESTIONS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetSeenQuestions = useCallback(async () => {
    await AsyncStorage.removeItem(KEYS.SEEN_QUESTIONS);
    setSeenQuestions([]);
  }, []);

  const updateFlashcardState = useCallback(async (id, state) => {
    setFlashcardState((prev) => {
      const updated = { ...prev, [id]: state };
      AsyncStorage.setItem(KEYS.FLASHCARD_STATE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetProgress = useCallback(async () => {
    await AsyncStorage.multiRemove([KEYS.PROGRESS, KEYS.SEEN_QUESTIONS, KEYS.FLASHCARD_STATE]);
    setProgress({});
    setSeenQuestions([]);
    setFlashcardState({});
  }, []);

  const oppdaterNavn = useCallback((nyttNavn) => {
    setNavn(nyttNavn);
  }, []);

  return {
    loading,
    authReady,
    isPaid,
    paymentPlan,
    paymentExpiry,
    progress,
    seenQuestions,
    flashcardState,
    userId,
    navn,
    epost,
    purchasePlan,
    updateProgress,
    markQuestionSeen,
    resetSeenQuestions,
    updateFlashcardState,
    resetProgress,
    oppdaterNavn,
  };
}
