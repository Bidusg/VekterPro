import { hentStreak } from './streak';
import { hentKategoriStat, hentDagligStat, hentEksamensforsok, hentTotalAntallSvar } from './statistikk';
import { hentFeilbank } from './feilbank';
import { hentSistKategori } from './laeringsfremgang';
import { hentDagensStatus } from './dailyChallenge';

export const hjemCache = { data: null };
export const statCache = { data: null };

export function clearAllCaches() {
  hjemCache.data = null;
  statCache.data = null;
}

export async function preloadHjem(userId) {
  try {
    const [streak, katStats, feilbank, sistKat, dagligStatus] = await Promise.all([
      hentStreak(userId),
      hentKategoriStat(userId),
      hentFeilbank(userId),
      hentSistKategori(userId),
      hentDagensStatus(userId),
    ]);
    const feilbankPerKat = feilbank.reduce((acc, e) => {
      const c = e.kategori || 'Ukjent';
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});
    hjemCache.data = { streak, katStats, feilbankPerKat, sistKat, dagligStatus };
  } catch (_) {}
}

export async function preloadStat(userId) {
  try {
    const [dager, kat, eks, total, streak] = await Promise.all([
      hentDagligStat(userId, 14),
      hentKategoriStat(userId),
      hentEksamensforsok(userId),
      hentTotalAntallSvar(userId),
      hentStreak(userId),
    ]);
    statCache.data = { dager, kat, eks, total, streak };
  } catch (_) {}
}
