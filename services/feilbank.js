// Feilbank-tjeneste: leser/skriver brukerens feilbank i Firestore.
// Struktur: users/{userId}/feilbank/{spørsmålId}
import firestore from '@react-native-firebase/firestore';

const RIKTIG_PA_RAD_FOR_FJERN = 3;

function feilbankRef(userId, spørsmålId) {
  return firestore().collection('users').doc(userId).collection('feilbank').doc(String(spørsmålId));
}

/**
 * Registrer at brukeren svarte feil på et spørsmål.
 * Oppretter eller oppdaterer dokumentet i feilbanken.
 */
export async function registrerFeilSvar(userId, q) {
  console.log('[feilbank] registrerFeilSvar kalt – userId:', userId, 'qId:', q?.id);
  if (!userId) {
    console.warn('[feilbank] AVBRUTT: ingen userId');
    return;
  }
  if (!q || q.id === undefined) {
    console.warn('[feilbank] AVBRUTT: ugyldig spørsmål', q);
    return;
  }
  const ref = feilbankRef(userId, q.id);
  try {
    console.log('[feilbank] henter eksisterende dokument...');
    const snap = await ref.get();
    const data = snap.exists ? snap.data() : {
      spørsmål: q.q,
      kategori: q.cat,
      antallFeil: 0,
      antallRiktig: 0,
      riktigPåRad: 0,
    };
    console.log('[feilbank] eksisterer:', snap.exists, '– skriver oppdatering...');
    await ref.set({
      spørsmål: q.q,
      kategori: q.cat,
      antallFeil: (data.antallFeil ?? 0) + 1,
      antallRiktig: data.antallRiktig ?? 0,
      riktigPåRad: 0,
      sisstFeil: firestore.FieldValue.serverTimestamp(),
    });
    console.log('[feilbank] ✓ skrev feilsvar for spørsmål', q.id);
  } catch (e) {
    console.error('[feilbank] FEIL ved registrerFeilSvar:', e.code, e.message, e);
  }
}

/**
 * Registrer at brukeren svarte riktig på et spørsmål.
 * Hvis spørsmålet ligger i feilbanken: øk riktigPåRad.
 * Når riktigPåRad >= 3 → slett fra feilbanken.
 */
export async function registrerRiktigSvar(userId, q) {
  console.log('[feilbank] registrerRiktigSvar kalt – userId:', userId, 'qId:', q?.id);
  if (!userId) {
    console.warn('[feilbank] AVBRUTT: ingen userId');
    return;
  }
  const ref = feilbankRef(userId, q.id);
  try {
    const snap = await ref.get();
    if (!snap.exists) {
      console.log('[feilbank] spørsmål ikke i feilbank – ingenting å gjøre');
      return;
    }
    const data = snap.data();
    const nyRiktigPåRad = (data.riktigPåRad ?? 0) + 1;
    console.log('[feilbank] riktigPåRad:', data.riktigPåRad ?? 0, '→', nyRiktigPåRad);

    if (nyRiktigPåRad >= RIKTIG_PA_RAD_FOR_FJERN) {
      await ref.delete();
      console.log('[feilbank] ✓ fjernet spørsmål', q.id, 'fra feilbank (3 riktige på rad)');
      return { fjernet: true };
    }
    await ref.set({
      ...data,
      antallRiktig: (data.antallRiktig ?? 0) + 1,
      riktigPåRad: nyRiktigPåRad,
    });
    console.log('[feilbank] ✓ økte riktigPåRad for spørsmål', q.id);
    return { fjernet: false, riktigPåRad: nyRiktigPåRad };
  } catch (e) {
    console.error('[feilbank] FEIL ved registrerRiktigSvar:', e.code, e.message, e);
  }
}

/**
 * Hent alle feilbank-oppføringer for en bruker.
 * Returnerer array av { id, spørsmål, kategori, antallFeil, antallRiktig, riktigPåRad, sisstFeil }.
 */
export async function hentFeilbank(userId) {
  console.log('[feilbank] hentFeilbank kalt – userId:', userId);
  if (!userId) return [];
  try {
    const snap = await firestore().collection('users').doc(userId).collection('feilbank').get();
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    console.log('[feilbank] ✓ hentet', items.length, 'oppføringer');
    return items;
  } catch (e) {
    console.error('[feilbank] FEIL ved hentFeilbank:', e.code, e.message, e);
    return [];
  }
}
