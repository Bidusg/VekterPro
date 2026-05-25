import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../config/firebase';
import { withTimeout } from './firebaseUtils';

const RIKTIG_PA_RAD_FOR_FJERN = 3;
const _cache = {};

function feilbankRef(userId, spørsmålId) {
  return doc(db, 'users', userId, 'feilbank', String(spørsmålId));
}

// ─── AsyncStorage-backup (brukes når Firestore er utilgjengelig) ──────────────
function backupKey(userId) { return `@feilbank_backup_${userId}`; }

async function saveToBackup(userId, q) {
  try {
    const raw = await AsyncStorage.getItem(backupKey(userId));
    const list = raw ? JSON.parse(raw) : [];
    const idx = list.findIndex((e) => e.id === String(q.id));
    if (idx >= 0) {
      list[idx].antallFeil = (list[idx].antallFeil || 0) + 1;
    } else {
      list.push({ id: String(q.id), spørsmål: q.q, kategori: q.cat, antallFeil: 1, antallRiktig: 0, riktigPåRad: 0 });
    }
    await AsyncStorage.setItem(backupKey(userId), JSON.stringify(list));
  } catch (_) {}
}

async function getBackup(userId) {
  try {
    const raw = await AsyncStorage.getItem(backupKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch (_) { return []; }
}

async function syncAndClearBackup(userId, firestoreIds) {
  try {
    const backup = await getBackup(userId);
    if (backup.length === 0) return;
    const missing = backup.filter((e) => !firestoreIds.has(e.id));
    await Promise.all(missing.map(async (e) => {
      const ref = feilbankRef(userId, e.id);
      const snap = await withTimeout(getDoc(ref));
      if (!snap.exists()) {
        await withTimeout(setDoc(ref, {
          spørsmål: e.spørsmål,
          kategori: e.kategori,
          antallFeil: e.antallFeil,
          antallRiktig: 0,
          riktigPåRad: 0,
          sisstFeil: serverTimestamp(),
        }));
      }
    }));
    await AsyncStorage.removeItem(backupKey(userId));
  } catch (_) {}
}

// ─── Hoved-API ────────────────────────────────────────────────────────────────
export async function registrerFeilSvar(userId, q) {
  if (!userId || !q || q.id === undefined) {
    console.warn('[feilbank] registrerFeilSvar: mangler userId eller spørsmål', { userId, qId: q?.id });
    return;
  }
  const ref = feilbankRef(userId, q.id);
  try {
    const snap = await withTimeout(getDoc(ref));
    const data = snap.exists() ? snap.data() : { antallFeil: 0, antallRiktig: 0, riktigPåRad: 0 };
    await withTimeout(setDoc(ref, {
      spørsmål: q.q,
      kategori: q.cat,
      antallFeil: (data.antallFeil ?? 0) + 1,
      antallRiktig: data.antallRiktig ?? 0,
      riktigPåRad: 0,
      sisstFeil: serverTimestamp(),
    }));
  } catch (e) {
    console.error('[feilbank] registrerFeilSvar feil:', e.message, '— lagrer backup lokalt');
    await saveToBackup(userId, q);
  }
}

export async function registrerRiktigSvar(userId, q) {
  if (!userId || !q || q.id === undefined) return;
  const ref = feilbankRef(userId, q.id);
  try {
    const snap = await withTimeout(getDoc(ref));
    if (!snap.exists()) return;
    const data = snap.data();
    const nyRiktigPåRad = (data.riktigPåRad ?? 0) + 1;

    if (nyRiktigPåRad >= RIKTIG_PA_RAD_FOR_FJERN) {
      await withTimeout(deleteDoc(ref));
      return { fjernet: true };
    }
    await withTimeout(setDoc(ref, {
      ...data,
      antallRiktig: (data.antallRiktig ?? 0) + 1,
      riktigPåRad: nyRiktigPåRad,
    }));
    return { fjernet: false, riktigPåRad: nyRiktigPåRad };
  } catch (e) {
    console.error('[feilbank] registrerRiktigSvar feil:', e.message);
  }
}

export async function hentFeilbank(userId) {
  if (!userId) return [];
  const cacheKey = `feilbank_${userId}`;
  try {
    const snap = await withTimeout(getDocs(collection(db, 'users', userId, 'feilbank')));
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    _cache[cacheKey] = items;
    const firestoreIds = new Set(items.map((e) => e.id));

    // Hent backup OG merge med Firestore-data, slik at skrive-feil ikke gjør at
    // spørsmål forsvinner fra feilbanken selv om leseoperasjonen lykkes.
    const backup = await getBackup(userId);
    const unsynced = backup.filter((e) => !firestoreIds.has(e.id));

    // Synk backup-innhold til Firestore i bakgrunnen
    syncAndClearBackup(userId, firestoreIds);

    return unsynced.length > 0 ? [...items, ...unsynced] : items;
  } catch (e) {
    console.error('[feilbank] hentFeilbank feil:', e.message, '— bruker cache + backup');
    const cached = _cache[cacheKey] ?? [];
    const backup = await getBackup(userId);
    const cachedIds = new Set(cached.map((e) => e.id));
    return [...cached, ...backup.filter((e) => !cachedIds.has(e.id))];
  }
}
