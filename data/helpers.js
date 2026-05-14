import { FORKLARINGER } from './forklaringer';
import { LAEREBOK } from './laerebok';

/**
 * Henter forklaring for et spørsmål basert på id og valgt svar-indeks.
 * Returnerer: { riktigForklaring, feilForklaring, kilde }
 * feilForklaring er kun satt hvis brukeren svarte feil.
 */
export function hentForklaring(id, valgIndex, riktigIndex) {
  const entry = FORKLARINGER[id];
  if (!entry) return null;

  const svarteFeil = valgIndex !== riktigIndex;

  return {
    riktigForklaring: entry.riktig,
    feilForklaring: svarteFeil ? (entry.feil?.[valgIndex] ?? null) : null,
    kilde: entry.kilde,
    erFeil: svarteFeil,
  };
}

/**
 * Finner all faglig tekst fra læreboken som tilhører en gitt kategori.
 * Returnerer array av { modulTittel, tittel, tekst }.
 */
export function finnInnholdForKategori(cat) {
  const resultater = [];

  for (const [key, modul] of Object.entries(LAEREBOK)) {
    if (!modul.kategorier || !modul.kategorier.includes(cat)) continue;

    for (const [, seksjon] of Object.entries(modul.innhold)) {
      resultater.push({
        modulTittel: modul.tittel,
        tittel: seksjon.tittel,
        tekst: seksjon.tekst,
      });
    }
  }

  return resultater;
}
