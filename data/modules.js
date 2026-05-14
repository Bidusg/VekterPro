// De 15 modulene i Politidirektoratets nasjonale grunnutdanning for vektere.
// Hver modul mappes til én eller flere kategorier som spørsmålene er merket med.

export const MODULES = [
  { id: 'modul_1',  num: 1,  name: 'Vekteryrket og sikkerhetsbransjen',         icon: '👮', color: '#6C63FF', kategorier: ['Uniform & Regler'] },
  { id: 'modul_2',  num: 2,  name: 'Kommunikasjon og konflikthåndtering',       icon: '🤝', color: '#4ECDC4', kategorier: ['Konflikthåndtering'] },
  { id: 'modul_3',  num: 3,  name: 'Kulturforståelse og mangfold',              icon: '🌍', color: '#F39C12', kategorier: ['Mangfold', 'Diskriminering'] },
  { id: 'modul_4',  num: 4,  name: 'Yrkesetikk og holdninger',                  icon: '🎖️', color: '#E74C3C', kategorier: ['Etikk'] },
  { id: 'modul_5',  num: 5,  name: 'Service og kvalitet',                       icon: '✨', color: '#9B59B6', kategorier: ['Uniform & Regler'] },
  { id: 'modul_6',  num: 6,  name: 'HMS – Helse, Miljø og Sikkerhet',           icon: '⏰', color: '#1ABC9C', kategorier: ['Arbeidstid'] },
  { id: 'modul_7',  num: 7,  name: 'Risikovurdering',                           icon: '📊', color: '#3498DB', kategorier: ['Risiko'] },
  { id: 'modul_8',  num: 8,  name: 'Fysiske, manuelle og administrative tiltak', icon: '🔐', color: '#E67E22', kategorier: ['Sikkerhet & Teknikk', 'Personvern'] },
  { id: 'modul_9',  num: 9,  name: 'Beredskapsplaner',                          icon: '🛡️', color: '#34495E', kategorier: ['Beredskap'] },
  { id: 'modul_10', num: 10, name: 'Rapportlære',                               icon: '📝', color: '#16A085', kategorier: ['Rapportering'] },
  { id: 'modul_11', num: 11, name: 'Samarbeid med offentlige myndigheter',      icon: '🚨', color: '#C0392B', kategorier: ['Samhandling', 'Nødetatene'] },
  { id: 'modul_12', num: 12, name: 'Førstehjelp',                               icon: '🚑', color: '#27AE60', kategorier: ['Førstehjelp'] },
  { id: 'modul_13', num: 13, name: 'Alkohol, medikamenter og narkotika',        icon: '💊', color: '#8E44AD', kategorier: ['Alkohol', 'Rus & Narkotika'] },
  { id: 'modul_14', num: 14, name: 'Brannvern',                                 icon: '🔥', color: '#D35400', kategorier: ['Brann'] },
  { id: 'modul_15', num: 15, name: 'Juss',                                      icon: '⚖️', color: '#2C3E50', kategorier: ['Juss', 'Personvern'] },
];

export function getModule(id) {
  return MODULES.find((m) => m.id === id);
}

export function getQuestionsForModule(moduleId, allQuestions) {
  const mod = getModule(moduleId);
  if (!mod) return [];
  return allQuestions.filter((q) => mod.kategorier.includes(q.cat));
}
