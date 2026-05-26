// =============================================================
// VEKTEREKSAMEN – FORKLARINGER
// Forklaring til alle 333 spørsmål i pensum
// For hvert spørsmål:
//   riktig: Hvorfor riktig svar er riktig
//   feil:   Hvorfor hvert feil alternativ er galt (indeksert på alternativets posisjon)
//   kilde:  Hvilken modul / lovhenvisning
// =============================================================

export const FORKLARINGER = {

  1: {
    riktig: "Uniformsartikler er regulert i vaktvirksomhetsforskriften og kan ikke velges fritt av den enkelte vekter – uansett hva nærmeste leder sier.",
    feil: { 1: "Nærmeste leders godkjenning er ikke tilstrekkelig – kravene er fastsatt i forskrift og gjelder alle likt.", 2: "Vektere bestemmer aldri selv over uniformsartikler. Forskriften sikrer enhetlig og gjenkjennelig fremtreden." },
    kilde: "Vaktvirksomhetsforskriften – Modul 1"
  },

  2: {
    riktig: "Vaktvirksomhetsloven er den sentrale loven som regulerer all vaktvirksomhet i Norge, inkludert krav til godkjenning, vandel og utdanning.",
    feil: { 0: "Politiloven regulerer politiet – ikke private vaktselskaper.", 2: "Sikkerhetsloven gjelder nasjonal sikkerhet og skjermingsverdige objekter, ikke vaktvirksomhet generelt." },
    kilde: "Vaktvirksomhetsloven – Modul 1"
  },

  3: {
    riktig: "En objektinstruks er en nøyaktig skriftlig beskrivelse av alle gjøremål vekteren skal utføre hos en bestemt kunde. Det er vekterens viktigste arbeidsverktøy på oppdraget.",
    feil: { 1: "En teknisk beskrivelse av safe eller maleri er produktdokumentasjon – ikke objektinstruks.", 2: "Et politigodkjent anmeldelsesskjema er et helt annet dokument som brukes ved anmeldelse av lovbrudd." },
    kilde: "Modul 1 – Objektinstruks"
  },

  4: {
    riktig: "Vaktvirksomhetsforskriften regulerer hvilke uniformsartikler som er tillatt. Dette er et overordnet krav som hverken vekter eller leder kan overstyre.",
    feil: { 1: "Leder kan gi retningslinjer innenfor rammene av forskriften, men kan ikke godkjenne uniformsartikler som strider mot den.", 2: "Den ansatte vekteren bestemmer aldri selv over uniformsvalg." },
    kilde: "Vaktvirksomhetsforskriften – Modul 1"
  },

  5: {
    riktig: "Loven krever at uniformen er merket med 'VEKTER' på venstre bryst og ikke skal ligne på politiets, forsvarets eller tollvesenets uniformer.",
    feil: { 0: "Politidirektoratet godkjenner læreplaner og tillatelser, men det er vaktvirksomhetsforskriften som fastsetter uniformskravene.", 1: "ID-kortet skal bæres synlig til enhver tid – vektere velger ikke selv når de bruker det." },
    kilde: "Vaktvirksomhetsforskriften – Modul 1"
  },

  6: {
    riktig: "Service betyr å yte det lille ekstra – å gå utover det som strengt tatt kreves og skape en positiv opplevelse for kunden.",
    feil: { 0: "Å bare gjøre som kunden sier er passiv ettergivenhet, ikke service. Service tilføyer verdi utover kravene.", 1: "Å følge instruks er en grunnleggende plikt, ikke service. Service er noe utover det obligatoriske." },
    kilde: "Modul 5 – Service og kvalitet"
  },

  7: {
    riktig: "Vekterens viktigste oppgave er å oppfylle den skriftlige avtalen mellom vaktselskapet og kunden. Dette er det juridiske og faglige grunnlaget for hele tjenesten.",
    feil: { 1: "Å være serviceinstans er viktig, men det er sekundært i forhold til å oppfylle kontrakten.", 2: "Vekteren er bundet av instruks, regelverk og etikk – ikke kundens ønsker alene." },
    kilde: "Modul 1 og 5"
  },

  8: {
    riktig: "Det er vitneplikt i Norge. Alle som innkalles som vitne er pliktige til å møte og forklare seg. Taushetsplikt er ikke en generell grunn til å nekte.",
    feil: { 1: "Man kan ikke bare velge å ikke møte – vitneplikt er lovpålagt.", 2: "Nær familie gir svært begrenset fritak fra vitneplikt. Regelen er at man plikter å forklare seg." },
    kilde: "Modul 15 – Juss, vitneplikt"
  },

  9: {
    riktig: "Etter straffeprosessloven § 82 anses en person som siktet når det er besluttet å bruke tvangsmidler mot vedkommende.",
    feil: { 0: "Mistenkt er en person under etterforskning, men mot hvem det ikke er tatt formell beslutning om tvangsmidler.", 2: "Tiltalt er betegnelsen når påtalemyndigheten tar ut formell tiltale og saken føres for retten." },
    kilde: "Straffeprosessloven § 82 – Modul 15"
  },

  10: {
    riktig: "Nødverge er retten til å bruke makt for å stoppe et rettsstridig angrep – ikke for å straffe noen i etterkant.",
    feil: { 0: "Bruk av makt for å straffe er hevn, og det er ulovlig. Nødverge handler om å stoppe – ikke straffe.", 2: "Nødverge har ingenting med å påta seg vergeansvar for barn å gjøre. Det er en strafferettslig regel om selvforsvar." },
    kilde: "Straffeloven § 18 – Modul 15"
  },

  11: {
    riktig: "Nødrett gir rett til å begå en ellers ulovlig handling i en nødsituasjon for å redde liv, helse og materiell.",
    feil: { 1: "Retten til advokat ved siktelse er en prosessuell rettighet – det er ikke nødrett.", 2: "Retten til sosial trygd er en velferdsrettighet som ikke har noe med nødrett å gjøre." },
    kilde: "Straffeloven § 17 – Modul 15"
  },

  12: {
    riktig: "Det er ikke tillatt for vektere å bære eller bruke gassvåpen/pepperspray i tjenesten. Dette er forbeholdt politiet.",
    feil: { 1: "Det gjelder uavhengig av situasjon – vektere har ikke hjemmel til gassvåpen.", 2: "Ingen vekterstilling gir tillatelse til gassvåpen. Stillingens art endrer ikke loven." },
    kilde: "Vaktvirksomhetsloven – Modul 15"
  },

  13: {
    riktig: "Legalitetsprinsippet betyr at ingen kan straffes uten at det finnes en lov som hjemler straffen – nulla poena sine lege.",
    feil: { 1: "Legalisering av narkotika er et politisk spørsmål som ikke har sammenheng med legalitetsprinsippet som juridisk begrep.", 2: "At regjeringen fastsetter lovverket er en beskrivelse av lovgivningsprosessen, ikke av legalitetsprinsippet." },
    kilde: "Rettsstatsprinsipper – Modul 15"
  },

  14: {
    riktig: "En vekter har ikke hjemmel i politiloven til å bruke fysisk makt. Vekterens eventuelle maktbruk er hjemlet i straffeloven (nødverge/nødrett).",
    feil: { 0: "Politiloven gjelder for politiet – ikke for private vektere.", 1: "Begrenset politimyndighet gis formelt og eksplisitt av politiet – ikke ved en verbal oppfordring." },
    kilde: "Politiloven vs straffeloven – Modul 15"
  },

  15: {
    riktig: "Vektere kan pågripe når mistenkte treffes på fersk gjerning eller ferske spor, og vilkårene i straffeprosessloven § 171 eller § 173 er oppfylt.",
    feil: { 0: "Fare ved opphold og at politiet er varslet er ikke alene tilstrekkelig hjemmel for pågripelse.", 2: "Fare ved opphold alene er ikke nok – vilkårene i straffeprosessloven må også være oppfylt." },
    kilde: "Straffeprosessloven § 176 – Modul 15"
  },

  16: {
    riktig: "Nødverge kan benyttes av hvem som helst for å forsvare noens liv eller helse mot et ulovlig angrep – ikke bare offeret selv.",
    feil: { 0: "Det er ikke begrenset til offeret alene. Alle kan gripe inn for å hjelpe.", 2: "Man trenger ikke at offeret ber om hjelp. Man kan gripe inn uoppfordret hvis liv eller helse er i fare." },
    kilde: "Straffeloven § 18 – Modul 15"
  },

  17: {
    riktig: "Karbonmonoksid (CO) er svært giftig. Den binder seg sterkere til blodets hemoglobin enn oksygen og hindrer oksygentransport – kan raskt bli dødelig.",
    feil: { 1: "CO er giftig uavhengig av hva som brenner. Det dannes ved all ufullstendig forbrenning.", 2: "CO er absolutt giftig – dette er et udiskutabelt faktum." },
    kilde: "Brannvern – Modul 14"
  },

  18: {
    riktig: "Skum slukker primært ved kjøling – det fjerner varme fra brannen. Sekundært danner det et lag som begrenser oksygentilgangen.",
    feil: { 0: "Skum fortrenger ikke oksygen på samme måte som CO2. Kjøling er skummets primære slokkemekanisme.", 2: "Skum er ikke merket C. Klasse C gjelder gassbranner. Skum er egnet for klasse A og B." },
    kilde: "Slokkemidler – Modul 14"
  },

  19: {
    riktig: "ABC-pulver fjerner ikke varme effektivt. Etter bruk kan brennbart materiale antennes på nytt (re-antenning) fordi varmen ikke er fjernet.",
    feil: { 1: "ABC-pulver fjerner ikke alle elementer i branntrekanten. Det påvirker primært oksygentilgangen, men fjerner ikke varmen.", 2: "ABC-pulver er ikke egnet for frityrbranner. Frityrolje krever klasse F-slokkemiddel." },
    kilde: "Slokkemidler – Modul 14"
  },

  20: {
    riktig: "CO2 er en gass som fortrenger oksygenet rundt brannen og dermed kveler den. Den gjør ikke brannstedet vått og fjerner ikke varme.",
    feil: { 1: "CO2 er en tørr gass – den gjør ikke brannstedet vått. Det er vann og skum som gjør det.", 2: "CO2 fortrenger oksygen – ikke varme. Det er to ulike slokkemekanismer." },
    kilde: "Slokkemidler – Modul 14"
  },

  21: {
    riktig: "Brannrøyk inneholder alltid den giftige gassen CO (karbonmonoksid) som dannes ved ufullstendig forbrenning. Brannrøyk er aldri ufarlig.",
    feil: { 1: "Brannrøyk er aldri ufarlig – den inneholder alltid giftige gasser og mangel på oksygen.", 2: "Innholdet varierer med hva som brenner, men CO er alltid til stede og alltid farlig." },
    kilde: "Brannteori – Modul 14"
  },

  22: {
    riktig: "Brannspredning kan skje ved ledning og stråling – men det finnes totalt fire spredningsmåter: ledning, stråling, strømning og flyvebrann.",
    feil: { 1: "Flyvebrann er kun én av fire spredningsmåter – å si 'kun' flyvebrann er feil.", 2: "Stråling er én av fire spredningsmåter – å si 'kun' stråling er feil." },
    kilde: "Brannspredning – Modul 14"
  },

  23: {
    riktig: "De fire spredningsmåtene for brann er: ledning (gjennom materialer), stråling (varmestråling), strømning (varme gasser) og flyvebrann (gnister med vinden).",
    feil: { 0: "Det er fire spredningsmåter, ikke to. Stråling og strømning mangler i dette alternativet.", 2: "Røyk og varme er symptomer på brann, ikke spredningsmåter." },
    kilde: "Brannspredning – Modul 14"
  },

  24: {
    riktig: "Det er ikke et generelt lovpålegg om at alle bedrifter skal ha brannalarmen tilknyttet brannvesenet. Kravet avhenger av bygningstype og risikovurdering.",
    feil: { 1: "Et slikt generelt krav eksisterer ikke i norsk lovverk.", 2: "Det er ingen slik avgrenset liste – verken sykehus eller hoteller er de eneste unntakene." },
    kilde: "Brannvernlovgivning – Modul 14"
  },

  25: {
    riktig: "Automatisk brannalarmanlegg er et aktivt brannverntiltak fordi det oppdager brann og varsler aktivt. Brannceller og instrukser er passive eller administrative tiltak.",
    feil: { 0: "Brannceller er et passivt tiltak – de begrenser brannspredning uten å aktivt oppdage eller varsle.", 2: "Instrukser og rutiner er administrative tiltak – ikke aktive brannverntiltak." },
    kilde: "Brannvern – aktive og passive tiltak – Modul 14"
  },

  26: {
    riktig: "Åpenbart beruset betyr at ruspåvirkningen er kvalifisert og synlig for omverdenen. Det er en høy terskel – vanlig lett påvirkning er ikke nok.",
    feil: { 1: "Begrepet har et klart juridisk innhold i alkoholloven – det er ikke et tomt begrep.", 2: "Det finnes ingen kvantitativ grense i alkoholloven. Det er atferden og synlig påvirkning som vurderes." },
    kilde: "Alkoholloven – Modul 13"
  },

  27: {
    riktig: "Styreren har det daglige ansvaret for salg og skjenking. Styreren er navngitt i bevillingen og er ansvarlig overfor kommunen.",
    feil: { 0: "Styrers ansvar handler ikke om å overholde styrets arbeid i selskapsrettslig forstand.", 1: "Styrer er et eget begrep i alkoholloven og eksisterer uavhengig av betegnelsen 'daglig leder'." },
    kilde: "Alkoholloven – Styrer – Modul 13"
  },

  28: {
    riktig: "Alkohol med over 22 volumprosent (gruppe 3, f.eks. brennevin) kan kun skjenkes til personer som er 20 år eller eldre.",
    feil: { 0: "18 år er grensen for alkohol under 22 volumprosent – ikke for sterkere alkohol.", 2: "23 år er ikke en aldersgrense i alkoholloven. Grensene er 18 og 20 år." },
    kilde: "Alkoholloven § 1-5 – Modul 13"
  },

  29: {
    riktig: "Alkohol med inntil 22 volumprosent (øl, vin) kan skjenkes til personer fra 18 år.",
    feil: { 1: "20 år er grensen for sterkere alkohol (over 22 volumprosent) – ikke for øl og vin.", 2: "23 år er ikke en aldersgrense i alkoholloven." },
    kilde: "Alkoholloven § 1-5 – Modul 13"
  },

  30: {
    riktig: "Ved en skjenkekontroll skal det minimum være 2 kontrollører til stede for å sikre tilstrekkelig observasjon og dokumentasjon.",
    feil: { 0: "1 kontrollør er ikke nok ved skjenkekontroll – minimum er 2.", 2: "3 er over minimumskravet.", 3: "4 er over minimumskravet." },
    kilde: "Alkoholforskriften – Modul 13"
  },

  31: {
    riktig: "Det er forbudt å selge alkohol til personer som er åpenbart påvirket av rusmidler – uavhengig av om de skal drikke inne eller ute.",
    feil: { 1: "Forbudet gjelder ved selve salget – det er irrelevant hvor personen skal drikke etterpå.", 2: "Det er fullt og helt forbudt. Det finnes ingen unntak her." },
    kilde: "Alkoholloven – Modul 13"
  },

  32: {
    riktig: "Kommunen har ansvaret for kontroll med utøvelsen av skjenkebevillingen. Det er kommunen som gir bevillinger og fører tilsyn.",
    feil: { 0: "Staten gir ikke enkeltbevillinger og har ikke dette tilsynsansvaret.", 2: "Vaktselskaper kan ansettes som kontrollører, men har ikke det overordnede ansvaret.", 3: "Kontrollørene utfører kontrollene, men ansvaret ligger hos kommunen." },
    kilde: "Alkoholloven – Modul 13"
  },

  33: {
    riktig: "Risiko defineres som graden av fare som uønskede hendelser og trusler representerer mot verdier – det er forholdet mellom verdi, trussel og sårbarhet.",
    feil: { 0: "Høy/middels er en gradering av risiko, ikke en definisjon. Risiko er et mer strukturert begrep.", 2: "Hva som kan aksepteres er en håndteringsstrategi, ikke en definisjon av risiko." },
    kilde: "Risikovurdering – Modul 7"
  },

  34: {
    riktig: "Sårbarhet beskriver manglende sikringstiltak – i hvilken grad de eksisterende tiltakene ikke er tilstrekkelige til å beskytte verdien mot trusselen.",
    feil: { 0: "Hvilke sikringsmål som skal beskyttes hører til verdivurderingen, ikke sårbarhet.", 1: "Realismen i truslene hører til trusselvurderingen, ikke sårbarhetsvurderingen." },
    kilde: "Risikovurdering – Modul 7"
  },

  35: {
    riktig: "Risikovurdering er en metode for å avklare hvor godt en virksomhets verdier er beskyttet mot uønskede hendelser og trusler.",
    feil: { 0: "En handlingsplan er et mulig resultat av risikovurderingen, men ikke definisjonen på metoden.", 2: "Å vurdere tiltak mot alle hendelser er risikohåndtering, ikke risikovurdering som metode." },
    kilde: "Risikovurdering – Modul 7"
  },

  36: {
    riktig: "Ja, risiko kan aksepteres. Aksept er én av fire strategier for risikohåndtering og er en bevisst og dokumentert beslutning.",
    feil: { 0: "Det er ikke riktig at risiko aldri kan aksepteres. Aksept er en legitim og anerkjent strategi.", 2: "Aksept av risiko handler ikke om å redusere total risiko – det er en selvstendig strategi." },
    kilde: "Risikohåndtering – Modul 7"
  },

  37: {
    riktig: "De tre hovedelementene i en risikovurdering er verdi (hva beskyttes), trussel (hva kan skade verdien) og sårbarhet (er vi godt nok beskyttet).",
    feil: { 1: "Ulykkesstatistikk og avvik er HMS-verktøy, ikke kjerneelementene i en risikovurdering.", 2: "Tiltak, mål og regelverk er del av sikringsarbeidet generelt, men ikke de tre hovedelementene." },
    kilde: "Risikovurdering – Modul 7"
  },

  38: {
    riktig: "Blek, kald og klam hud er klassiske tegn på sjokk som følge av indre blødning – kroppen omdirigerer blodet til vitale organer og bort fra huden.",
    feil: { 0: "Flis i fingeren gir lokale symptomer – ikke systemisk sjokk med blek og klam hud.", 2: "Alvorlige brannskader gir andre primærsymptomer. Blek og klam hud peker spesifikt mot sirkulasjonssvikt." },
    kilde: "Førstehjelp – blødninger – Modul 12"
  },

  39: {
    riktig: "Man skal ikke holde fast en person med epileptisk anfall. Det er en myte at man kan svelge tunga – det er anatomisk umulig. Beskytt hodet mot harde underlag.",
    feil: { 0: "Å holde fast kan skade personen ytterligere ved krampeanfall.", 1: "Man skal heller ikke fiksere hodet – man beskytter det mot harde flater uten å holde det fast." },
    kilde: "Førstehjelp – epilepsi – Modul 12"
  },

  40: {
    riktig: "Det anbefalte HLR-forholdet er 30 hjertekompresjoner etterfulgt av 2 innblåsninger (30:2).",
    feil: { 0: "2:15 er et utdatert og feilaktig forhold.", 1: "5:30 er omvendt og gir for få kompresjoner per innblåsning.", 3: "30:5 gir for mange innblåsninger i forhold til kompresjoner." },
    kilde: "HLR – Modul 12"
  },

  41: {
    riktig: "Alle kan bruke hjertestarter – det kreves ikke kurs. Hjertestartere er designet for å veilede enhver bruker gjennom prosessen med talestyring.",
    feil: { 0: "Kurs er en fordel, men ikke et krav for å bruke hjertestarter.", 1: "Hverken helsepersonell eller vektere har eksklusiv rett – den er for alle.", 3: "Hjertestarter er tilgjengelig og skal brukes av alle borgere." },
    kilde: "Hjertestarter – Modul 12"
  },

  42: {
    riktig: "HLR startes kun når pasienten er bevisstløs OG ikke puster normalt. Begge kriteriene må være oppfylt samtidig.",
    feil: { 0: "Bevisstløshet alene er ikke nok – pasienten kan puste normalt og trenger da ikke HLR.", 1: "Å ikke svare normalt er ikke det samme som å være bevisstløs og ikke puste normalt.", 3: "Manglende normal pust alene er utilstrekkelig – bevissthetsnivå må også vurderes." },
    kilde: "HLR – Modul 12"
  },

  43: {
    riktig: "Brannsår avkjøles best med lunkent vann (ca. 20 grader) i ca. 20 minutter. Iskaldt vann kan gi tilleggsskade og sjokk.",
    feil: { 0: "Å vente forverrer skaden. Umiddelbar kjøling er avgjørende for å begrense vevsskaden.", 2: "60 minutter er for lenge, og kaldt vann risikerer å gi hypotermi og sjokk." },
    kilde: "Brannskader – Modul 12"
  },

  44: {
    riktig: "Sideleie brukes for å sikre frie luftveier hos en bevisstløs person – posisjonen hindrer at mage- og svelginnhold blokkerer luftveiene.",
    feil: { 0: "Sideleie er et reelt og viktig grep. Sjokkleie er en annen posisjon (bena hevet).", 2: "Ved mistanke om ryggskade brukes ikke sideleie – da stabiliseres personen på annen måte." },
    kilde: "Sideleie – Modul 12"
  },

  45: {
    riktig: "Pasienter uten frie luftveier prioriteres høyest. Blokkede luftveier er umiddelbart livstruende og må utbedres aller først (A i ABCDE).",
    feil: { 0: "Barn som gråter høylytt er bevisste og puster – de er ikke kritisk truet i øyeblikket.", 1: "Indre blødninger er alvorlig, men en person som fremdeles puster og er bevisst er ikke like akutt som luftveisproblemer." },
    kilde: "ABCDE-prinsippet – Modul 12"
  },

  46: {
    riktig: "Politiets nødnummer er 112.",
    feil: { 0: "110 er brannvesenets nødnummer.", 2: "113 er ambulansens nødnummer (AMK).", 3: "02800 er politiets ikke-akutte servicenummer." },
    kilde: "Nødnumre – Modul 11"
  },

  47: {
    riktig: "Brannvesenets nødnummer er 110.",
    feil: { 1: "112 er politiets nødnummer.", 2: "113 er ambulansens nødnummer.", 3: "02800 er politiets ikke-akutte servicenummer." },
    kilde: "Nødnumre – Modul 11"
  },

  48: {
    riktig: "Ambulansens nødnummer er 113 (AMK-sentralen for medisinsk nødhjelp).",
    feil: { 0: "110 er brannvesenets nødnummer.", 1: "112 er politiets nødnummer.", 3: "02800 er politiets ikke-akutte servicenummer." },
    kilde: "Nødnumre – Modul 11"
  },

  49: {
    riktig: "FG står for Forsikringsgodkjent. FG-godkjente produkter er testet og godkjent av forsikringsbransjen.",
    feil: { 1: "Forbrukernes Godkjennings nemnd er ikke et begrep i sikkerhetsbransjen.", 2: "Fagforeningen for Glassmestere er ikke tilknyttet FG-godkjenning." },
    kilde: "Sikkerhet & Teknikk – Modul 8"
  },

  50: {
    riktig: "En glassbruddetektor reagerer spesifikt på lyden av knust glass via akustiske sensorer som er kalibrert for dette lydsignalet.",
    feil: { 0: "Varmebølger registreres av PIR-detektorer, ikke glassbruddetektorer.", 1: "At en dør åpnes registreres av magnetkontakter, ikke glassbruddetektorer." },
    kilde: "Detektorer – Modul 8"
  },

  51: {
    riktig: "Det er påbudt med toveis kommunikasjon i alle personheiser. Dette er et sikkerhetslovkrav som gjelder alle heiser folk bruker.",
    feil: { 1: "Kravet gjelder ikke bare vareheiser – det gjelder alle personheiser.", 2: "Kravet gjelder ikke bare mekaniske heiser – det gjelder alle personheiser." },
    kilde: "Heisalarm – Modul 8"
  },

  52: {
    riktig: "Periferisikring er utvendig sikring av området rundt et objekt – som parkering, uteareal og ytre soner utenfor selve bygget.",
    feil: { 1: "Innvendig sikring av rom heter romsikring.", 2: "Sikring av spesielle eiendeler som malerier heter objektsikring.", 3: "Sikring av fasade, dører og vinduer heter skallsikring – ikke periferisikring." },
    kilde: "Sikringsprinsipper – Modul 8"
  },

  53: {
    riktig: "En beredskapsplan skal inneholde et system for varsling om hendelsen og beskrivelse av hvordan hendelsen skal håndteres – det er kjerneinnholdet.",
    feil: { 1: "Lederoversikt er nyttig, men ikke det sentrale innholdet i en beredskapsplan.", 2: "Fravær og stedfortrederlister er driftsadministrasjon, ikke beredskapsplanlegging." },
    kilde: "Beredskapsplaner – Modul 9"
  },

  54: {
    riktig: "En beredskapsplan aktiveres ved hendelser som er større enn det den daglige organisasjonen klarer å håndtere – ikke ved vanlig drift.",
    feil: { 0: "Beredskapsplanen er ikke begrenset til nasjonal krise – den brukes ved lokale og organisatoriske kriser også.", 1: "Sykefravær og ferie håndteres av normale bemanningsrutiner, ikke beredskapsplan." },
    kilde: "Beredskapsplaner – Modul 9"
  },

  55: {
    riktig: "En beredskapsplan er en plan som gjør virksomheten i stand til å reagere raskt og riktig når en uønsket hendelse oppstår.",
    feil: { 0: "Tillit fra kunder kan være en effekt, men er ikke formålet med beredskapsplanen.", 1: "En organisasjonsbeskrivelse er ikke det samme som en beredskapsplan." },
    kilde: "Beredskapsplaner – Modul 9"
  },

  56: {
    riktig: "Aggressivitet fra vekterens side gjør deg mindre løsningsorientert og eskalerer konflikten. Adrenalin svekker din evne til å kommunisere og vurdere situasjonen.",
    feil: { 0: "Aggressivitet vinner sjelden konflikter profesjonelt – den eskalerer dem.", 1: "Adrenalin og aggresjon gjør deg faktisk dårligere rustet til konflikthåndtering, ikke bedre." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  57: {
    riktig: "En dyktig forhandler kjennetegnes av god evne til å lytte aktivt. Lytting skaper tillit og gir innsikt i den andres ståsted og behov.",
    feil: { 1: "Å holde følelsene i sjakk er viktig, men ikke det som primært kjennetegner en dyktig forhandler.", 2: "Kampsportkunnskaper er irrelevante for konflikthåndtering gjennom kommunikasjon." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  58: {
    riktig: "Forskning viser at kroppsspråk utgjør den klart største delen av kommunikasjon i en ansikt-til-ansikt-situasjon – mer enn ord og stemmeleie til sammen.",
    feil: { 0: "Stemmeleie er viktig, men kommuniserer mindre enn kroppsspråket.", 2: "Ordene er faktisk den minste delen av den totale kommunikasjonen." },
    kilde: "Kommunikasjon – Modul 2"
  },

  59: {
    riktig: "De viktigste verktøyene i konflikthåndtering er gode forberedelser og gode kommunikasjonsevner – ikke fysisk utstyr eller kampteknikker.",
    feil: { 0: "Håndjern og vernevest er sikkerhetsutstyr, ikke konflikthåndteringsverktøy.", 2: "Selvforsvarskurs og fysikk er egensikkerhetstiltak, ikke primære konflikthåndteringsverktøy." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  60: {
    riktig: "Speiling styrker kontakten mellom partene, gir en følelse av å bli forstått og bygger tillit – noe som naturlig reduserer konfliktnivået.",
    feil: { 1: "Speiling handler ikke om at den andre ser seg utenfra og selvransakelse.", 2: "Speiling er en kommunikasjonsteknikk – ikke en forberedelse på fysisk angrep." },
    kilde: "Konflikthåndtering – speiling – Modul 2"
  },

  61: {
    riktig: "Minusdop er sentraldempende stoffer med sløvende og dempende effekt – eksempler er opioider, GHB og benzodiazepiner.",
    feil: { 1: "Oppkvikkende effekt er plussdop (sentralstimulerende). Det er det stikke motsatte av minusdop.", 2: "Utblandet narkotika uten effekt er ikke definisjonen – minusdop er en rusgruppe med dempende effekt." },
    kilde: "Rus & Narkotika – Modul 13"
  },

  62: {
    riktig: "Plussdop tilhører gruppen sentralstimulerende stoffer som gir oppkvikkende og euforisk effekt, økt energi og redusert søvnbehov.",
    feil: { 0: "Sentraldempende er minusdop – det er det stikke motsatte av plussdop.", 2: "Hallusinogener forvrengler virkelighetsoppfatningen men klassifiseres ikke som plussdop." },
    kilde: "Rus & Narkotika – Modul 13"
  },

  63: {
    riktig: "GHB tilhører gruppen sentraldempende stoffer. Det har bedøvende og bevissthetssenkende effekt og kan ved overdose føre til koma.",
    feil: { 0: "GHB er ikke et hallusinogen.", 2: "GHB er ikke sentralstimulerende – det har stikk motsatt, dempende effekt." },
    kilde: "Rus & Narkotika – GHB – Modul 13"
  },

  64: {
    riktig: "Ecstacy (MDMA) klassifiseres i norsk vekterutdanning primært som hallusinogen, selv om det også har sentralstimulerende egenskaper.",
    feil: { 0: "Ecstacy er ikke et opioid. Opioider er heroin, morfin, kodein osv.", 2: "Ecstacy er ikke et narkotisk legemiddel i medisinsk forstand – det er et rusmiddel." },
    kilde: "Rus & Narkotika – ecstacy – Modul 13"
  },

  65: {
    riktig: "Amfetamin tilhører gruppen sentralstimulerende stoffer. Det gir økt energi, redusert søvnbehov og kan utløse aggressiv atferd.",
    feil: { 0: "Amfetamin er ikke et hallusinogen.", 2: "Amfetamin er det stikke motsatte av sentraldempende – det er sentralstimulerende." },
    kilde: "Rus & Narkotika – amfetamin – Modul 13"
  },

  66: {
    riktig: "All bruk av narkotika er forbudt. Legemidler merket med 'rød trekant' er narkotikaklassifiserte, men lovlige ved gyldig resept fra lege.",
    feil: { 1: "Det er ikke sant at narkotikabruk er tillatt – all bruk uten lovlig resept er forbudt.", 2: "Legemidler med rød trekant er forbudt uten resept. Med lovlig resept er de tillatt." },
    kilde: "Narkotikalovgivning – Modul 13"
  },

  67: {
    riktig: "Tillitsvalgte med tariffavtale kan inngå avtale om arbeidstid inntil 12 timer per dag. Det er verken arbeidsgiver alene, den ansatte alene eller verneombudet som kan dette.",
    feil: { 0: "Arbeidsgiver kan ikke alene bestemme 12-timers dag – det krever avtale med tillitsvalgt.", 2: "Den ansatte kan ikke avtale 12-timers dag på egenhånd – det krever tillitsvalgt med tariffavtale.", 3: "Verneombudet representer sikkerhet og arbeidsmiljø – ikke arbeidstidsavtaler." },
    kilde: "AML – arbeidstid – Modul 6"
  },

  68: {
    riktig: "Maksimal alminnelig daglig arbeidstid etter arbeidsmiljøloven er 9 timer.",
    feil: { 0: "8 timer er normaldagen etter tariffavtale, men loven tillater inntil 9 timer.", 2: "12 timer krever særskilt avtale med tillitsvalgt.", 3: "15 timer finnes ikke som lovlig alminnelig arbeidstid." },
    kilde: "AML § 10-4 – Modul 6"
  },

  69: {
    riktig: "Det skal minimum være 11 timers sammenhengende hvile mellom to arbeidsperioder etter arbeidsmiljøloven.",
    feil: { 0: "6 timer er langt under lovens minimumskrav på 11 timer.", 1: "8 timer er heller ikke tilstrekkelig – loven krever 11 timer." },
    kilde: "AML § 10-8 – Modul 6"
  },

  70: {
    riktig: "HMS står for Helse, Miljø og Sikkerhet – de tre grunnpilarene i systematisk arbeidsmiljøarbeid.",
    feil: { 0: "Sykdom er ikke det tredje elementet – det er Sikkerhet.", 2: "Sikring brukes i fysisk sikringskontekst. I HMS-sammenheng heter det Sikkerhet.", 3: "Skade er ikke en del av HMS-forkortelsen." },
    kilde: "HMS – Modul 6"
  },

  71: {
    riktig: "De tre hovedgruppene for diskriminering er sosial diskriminering, strukturell diskriminering og offentlig diskriminering.",
    feil: { 0: "Kjønnsdiskriminering er en form for diskriminering, men ikke en av de tre overordnede gruppene.", 1: "Rasediskriminering faller inn under sosial diskriminering, men er ikke en av de tre hovedgruppene.", 3: "Funksjonsdiskriminering og aldersdiskriminering er former, men ikke de tre overordnede gruppene." },
    kilde: "Diskriminering – Modul 3"
  },

  72: {
    riktig: "Det er ikke tillatt å kun slippe inn ett kjønn på et utested. Dette bryter med diskrimineringsloven uavhengig av eiendomsretten.",
    feil: { 0: "Eiendomsretten gir ikke rett til å diskriminere basert på kjønn – diskrimineringsloven setter grenser for eiendomsretten.", 1: "Å balansere diskriminering over en måned er ikke en lovlig løsning." },
    kilde: "Diskrimineringsloven – Modul 3"
  },

  73: {
    riktig: "Kulturrelativisme er ideen om at alle kulturer og deler av kulturen er like gode og like mye verdt – man vurderer ikke sin egen kultur som overordnet.",
    feil: { 1: "Å mene at ens egen kultur er normen er etnosentrisme – det motsatte av kulturrelativisme.", 2: "At krig oppstår av kulturforskjeller er en årsaksforklaring, ikke en definisjon av kulturrelativisme." },
    kilde: "Kulturforståelse – Modul 3"
  },

  74: {
    riktig: "De fire største religionene internasjonalt er kristendom, islam, buddhisme og hinduisme – i omtrent den rekkefølgen målt etter antall tilhengere.",
    feil: { 0: "Jødedommen er ikke blant de fire største religionene i verden målt etter antall tilhengere.", 2: "Katolisisme er en gren av kristendommen, ikke en selvstendig religion i denne sammenheng." },
    kilde: "Mangfold og religion – Modul 3"
  },

  75: {
    riktig: "Hovedregelen er at kameraopptak kan lagres i inntil 7 dager. Etter dette skal opptakene slettes.",
    feil: { 1: "30 dager er ikke standard lagringstid for vanlig kameraovervåkning.", 2: "90 dager gjelder for post, bank og adgangskontrollsystemer – ikke generell overvåkning.", 3: "Lagringstiden er fastsatt i loven – ikke overlatt til den enkeltes skjønn." },
    kilde: "Personopplysningsloven – Modul 8"
  },

  76: {
    riktig: "Opptak fra adgangskontrollsystem kan lagres i inntil 90 dager. Dette er en lovfestet unntak fra 7-dagersregelen.",
    feil: { 0: "7 dager er for vanlig kameraovervåkning, ikke adgangskontrollsystemer.", 2: "365 dager er ikke tillatt etter personopplysningsloven." },
    kilde: "Personopplysningsloven – Modul 8"
  },

  77: {
    riktig: "Brudd på etiske retningslinjer kan gi bransjen et dårlig omdømme og svekke tilliten til vekterbransjen som helhet.",
    feil: { 0: "Politianmeldelse skjer bare ved straffbare handlinger – ikke ved ethvert etisk brudd.", 2: "Å sette liv og helse i fare er mulig i alvorlige tilfeller, men er ikke den typiske direkte konsekvensen." },
    kilde: "Etikk – Modul 4"
  },

  78: {
    riktig: "Vekterens tilstedeværelse forebygger skader, ulykker og uønskede handlinger – dette er den viktigste yrkesetiske funksjonen.",
    feil: { 1: "Vektere er ikke nødvendigvis mer etisk korrekte som yrkesgruppe enn andre yrkesgrupper.", 2: "Vektere er ikke alene om å ivareta ro og orden – politiet har den primære rollen." },
    kilde: "Etikk – Modul 4"
  },

  79: {
    riktig: "Sivilrett regulerer tvister mellom private parter, mens strafferett regulerer statens forfølgelse av lovbrudd begått mot samfunnet.",
    feil: { 1: "Det er omvendt – strafferett er staten mot en person, sivilrett er mellom private.", 2: "Det er en grunnleggende og viktig juridisk forskjell mellom disse to rettsområdene." },
    kilde: "Juss – Modul 15"
  },

  80: {
    riktig: "In flagrante delicto er et latinsk uttrykk som betyr 'på fersk gjerning' – personen treffes i selve handlingen.",
    feil: { 1: "Etter fullbyrdet forbrytelse er ikke 'in flagrante' – da er handlingen over.", 2: "Under etterforskning er en annen fase som ikke dekkes av dette begrepet." },
    kilde: "Juss – pågripelse – Modul 15"
  },

  81: {
    riktig: "En vekter kan ta beslag i gjenstander dersom politiet er varslet og det er fare ved opphold – ikke alltid, og heller ikke aldri.",
    feil: { 0: "Vektere kan ikke alltid ta beslag – det krever særskilte vilkår.", 1: "Det er ikke riktig at kun politiet kan ta beslag – vektere kan gjøre det når vilkårene er oppfylt." },
    kilde: "Straffeprosess – Modul 15"
  },

  82: {
    riktig: "Et objektivt straffbarhetsvilkår handler om selve handlingen – at det er utført en handling som dekkes av et straffebud.",
    feil: { 0: "Forsett er et subjektivt vilkår som handler om gjerningspersonens skyld.", 2: "Kriminell lavalder (15 år) er et objektivt vilkår, men 'utført en straffbar handling' er det primære." },
    kilde: "Straffbarhetsvilkår – Modul 15"
  },

  83: {
    riktig: "Selvtekt er lovregulert i straffeloven § 19 – det er ikke bare et etisk standpunkt, men et juridisk regulert felt.",
    feil: { 0: "Selvtekt er ikke alltid forbudt. Straffeloven § 19 regulerer når og i hvilken grad det er tillatt.", 2: "Selvtekt er ikke generelt tillatt ved tyveri – det er strenge vilkår for selvtekt." },
    kilde: "Straffeloven § 19 – Modul 15"
  },

  84: {
    riktig: "Brannklasse F gjelder branner i frityrolje og matfett som brukes ved matlagning. Disse krever spesielt klasse F-slokkemiddel.",
    feil: { 0: "Branner i metaller er klasse D.", 2: "Branner i gasser er klasse C." },
    kilde: "Brannklasser – Modul 14"
  },

  85: {
    riktig: "Brannklasse A gjelder branner i faste stoffer som tre, papir, tekstil og plast.",
    feil: { 1: "Branner i væsker er klasse B.", 2: "Branner i gasser er klasse C." },
    kilde: "Brannklasser – Modul 14"
  },

  86: {
    riktig: "Brannklasse B gjelder branner i væsker og løselige faste stoffer som bensin, olje og maling.",
    feil: { 0: "Faste stoffer er klasse A.", 2: "Gasser er klasse C." },
    kilde: "Brannklasser – Modul 14"
  },

  87: {
    riktig: "En 6 kg pulverslokker tømmes på 12–15 sekunder. Det er viktig å kjenne tømmetiden for å bruke slokkeren effektivt.",
    feil: { 1: "20–25 sekunder er for lenge – pulverslokkere er raskere.", 2: "40–60 sekunder er feil og gjelder større slokkesystemer." },
    kilde: "Slokkemidler – Modul 14"
  },

  88: {
    riktig: "Vann skal ikke brukes på elektriske anlegg under spenning. Vann fra kran inneholder mineraler som leder strøm og kan gi støt.",
    feil: { 0: "Selv om rent destillert vann knapt leder strøm, er kranvann fullt av mineraler og absolutt ledende. I praksis brukes aldri vann på el-anlegg.", 1: "Det finnes ingen 50-volts grense i regelverket. Vann skal aldri brukes på elektriske anlegg." },
    kilde: "Slokkemidler – el-brann – Modul 14"
  },

  89: {
    riktig: "I et sprinkleranlegg utløses kun sprinklerhodet nærmest brannen – ikke alle hodene samtidig. Dette begrenser vannsskader til brannstedet.",
    feil: { 0: "Det er en svært vanlig misforståelse at alle hoder utløses – kun det nærmest brannen gjør det.", 2: "Sprinkleranlegg påkreves i mange typer bygninger, ikke bare høyhus." },
    kilde: "Sprinkleranlegg – Modul 14"
  },

  90: {
    riktig: "ABCDE-rekkefølgen er: A=Luftvei, B=Pust, C=Sirkulasjon, D=Bevissthetsnivå, E=Avdekking av andre skader.",
    feil: { 1: "Å starte med bevissthet (D) er feil – luftvei (A) er alltid første prioritet.", 2: "Å starte med sirkulasjon (C) er feil – luftvei og pust må vurderes først." },
    kilde: "ABCDE – Modul 12"
  },

  91: {
    riktig: "Ved funn av bevisstløs person: sjekk bevissthet, rop om hjelp, sjekk pust, ring 113, og start HLR om nødvendig. Systematisk tilnærming er avgjørende.",
    feil: { 0: "110 er brannvesenet – man ringer 113 for medisinsk nødhjelp. Og man venter ikke passivt.", 2: "HLR startes ikke umiddelbart uten sjekk – man må vurdere om pasienten faktisk trenger det." },
    kilde: "Førstehjelp – bevisstløs – Modul 12"
  },

  92: {
    riktig: "Riktig dybde for hjertekompresjoner hos voksne er 5–6 cm. For lite gir ingen effekt, for mye kan skade ribben og indre organer.",
    feil: { 0: "1–2 cm er altfor lite – hjertet pumpes ikke effektivt ved så grunne kompresjoner.", 1: "4–5 cm er litt under anbefalt minimum på 5 cm." },
    kilde: "HLR – kompresjoner – Modul 12"
  },

  93: {
    riktig: "Sjokkleie innebærer å legge pasienten med bena hevet og hodet lavt – for å øke blodtilførselen til hjernen og vitale organer.",
    feil: { 1: "Å ligge på siden med bena trukket opp er sideleie – ikke sjokkleie.", 2: "Å ligge flatt er nøytralt og ikke det samme som sjokkleie." },
    kilde: "Førstehjelp – sjokkleie – Modul 12"
  },

  94: {
    riktig: "Politiet kan inndra en skjenkebevilling midlertidig. Kommunen har det overordnede bevillingsansvaret, men politiet har myndighet til midlertidig stenging.",
    feil: { 1: "Kommunen administrerer bevillingene, men politiet kan stenge midlertidig.", 2: "Statsforvalteren er klageinstans, ikke den som foretar midlertidig inndragning." },
    kilde: "Alkoholloven – inndragning – Modul 13"
  },

  95: {
    riktig: "Maksimal skjenketid for all alkohol er kl. 03.00 etter alkoholloven. Kommuner kan sette strengere lokale grenser, men ikke myknere.",
    feil: { 0: "Kl. 02.00 kan være en kommunal grense, men er ikke den nasjonale maksimalgrensen.", 2: "Kl. 01.00 er ikke den nasjonale maksimalgrensen." },
    kilde: "Alkoholloven § 4-4 – Modul 13"
  },

  96: {
    riktig: "Maksimal skjenketid er den samme for all alkohol – kl. 03.00 etter alkoholloven, uavhengig av alkoholprosent.",
    feil: { 0: "Kl. 02.00 er ikke den nasjonale maksimalgrensen.", 2: "Kl. 01.00 er ikke den nasjonale maksimalgrensen." },
    kilde: "Alkoholloven § 4-4 – Modul 13"
  },

  97: {
    riktig: "Det er ikke lov å ta med alkohol fra et skjenkested. Alkoholen skal konsumeres på stedet – alkoholforskriften § 4-4.",
    feil: { 0: "Det er absolutt ikke alltid tillatt.", 2: "Selv lukkede, uåpnede beholdere er ikke tillatt å ta med fra skjenkested." },
    kilde: "Alkoholforskriften § 4-4 – Modul 13"
  },

  98: {
    riktig: "Trussel er det som kan skade verdien (uønskede hendelser og aktører), mens sårbarhet er i hvilken grad de eksisterende tiltakene ikke er tilstrekkelige.",
    feil: { 1: "Trussel og sårbarhet er to distinkte begreper i risikovurdering – de er ikke like.", 2: "Det er omvendt – sårbarhet handler om manglende beskyttelse, ikke om hva som kan gå galt (det er trusselen)." },
    kilde: "Risikovurdering – Modul 7"
  },

  99: {
    riktig: "Restrisiko er risikoen som gjenstår etter at alle sikringstiltak er gjennomført. En viss restrisiko vil alltid eksistere.",
    feil: { 1: "Restrisiko er ikke den totale risikoen – det er hva som gjenstår etter tiltak.", 2: "Restrisiko er ikke nødvendigvis akseptert av ledelsen – den kan fortsatt være uakseptabel og kreve nye tiltak." },
    kilde: "Risikovurdering – restrisiko – Modul 7"
  },

  100: {
    riktig: "Aktiv lytting innebærer å gi full oppmerksomhet, bekrefte med nikk og stille oppklarende spørsmål – man er fullstendig til stede i samtalen.",
    feil: { 0: "Å avbryte er det stikke motsatte av aktiv lytting.", 2: "Å notere er sekundært – aktiv lytting handler om tilstedeværelse og engasjert respons." },
    kilde: "Kommunikasjon – Modul 2"
  },

  101: {
    riktig: "De-eskalering betyr å trappe ned konfliktnivået ved hjelp av kommunikasjon og atferd – å bevege situasjonen fra høy til lavere intensitet.",
    feil: { 0: "Å øke konfliktnivået er eskalering – det motsatte av de-eskalering.", 2: "Å fysisk fjerne en person er et siste virkemiddel, ikke de-eskalering i seg selv." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  102: {
    riktig: "Ved bortvising er det viktigst å være tydelig, rolig og profesjonell. Dette kommuniserer autoritet uten å eskalere situasjonen.",
    feil: { 0: "Fysisk styrke er irrelevant for bortvising – det handler om tydelig og rolig kommunikasjon.", 2: "Backup er nyttig i noen situasjoner, men er ikke det viktigste elementet." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  103: {
    riktig: "Adgangskontroll tjener begge formål: registrere hvem som er i bygget og hindre uautorisert adgang. Begge er like viktige.",
    feil: { 0: "Registrering alene er ikke hele formålet – tilgangsstyring er like sentralt.", 1: "Å hindre uautorisert adgang alene er ikke hele formålet – registrering er like viktig." },
    kilde: "Adgangskontroll – Modul 8"
  },

  104: {
    riktig: "En dual-tech detektor bruker to ulike teknologier (f.eks. PIR og mikrobølge) og krever signal fra begge før alarm utløses. Dette reduserer falske alarmer drastisk.",
    feil: { 1: "To kameraer er ikke dual-tech i alarmteknisk forstand.", 2: "Kommunikasjon med to sentraler er en redundansfunksjon, ikke dual-tech." },
    kilde: "Detektorer – Modul 8"
  },

  105: {
    riktig: "Sabotasjealarm utløses hvis alarmsystemet selv utsettes for sabotasje – for eksempel at kabler kuttes eller at sentralenheten manipuleres.",
    feil: { 0: "Innbruddsalarm utløses ved innbrudd – det er ikke sabotasjealarm.", 2: "Brannalarm utløses ved brann – heller ikke det er sabotasjealarm." },
    kilde: "Alarmsystemer – Modul 8"
  },

  106: {
    riktig: "For å sette opp kameraovervåkning på en arbeidsplass kreves drøfting med tillitsvalgte og informasjon til de ansatte – jf. arbeidsmiljøloven.",
    feil: { 0: "Eiers tillatelse alene er ikke tilstrekkelig – arbeidstakerne har rettigheter som må ivaretas.", 2: "Datatilsynet trenger ikke godkjenne – men kravene i personopplysningsloven og AML må følges." },
    kilde: "Kameraovervåkning – AML – Modul 8"
  },

  107: {
    riktig: "Personopplysningsloven har som formål å beskytte den enkeltes personvern ved behandling av personopplysninger.",
    feil: { 1: "Å gi politiet tilgang til data er ikke formålet – loven begrenser tvert imot slik tilgang.", 2: "Loven regulerer all behandling av personopplysninger, ikke bare kameraovervåkning." },
    kilde: "Personopplysningsloven – Modul 8"
  },

  108: {
    riktig: "Det overordnede ansvaret for beredskap i en virksomhet ligger hos ledelsen og arbeidsgiver. De er juridisk ansvarlige for at virksomheten er forberedt.",
    feil: { 0: "Verneombudet ivaretar HMS-spørsmål, men har ikke det overordnede beredskapsansvaret.", 1: "Tillitsvalgt representerer de ansatte i arbeidsforhold – ikke beredskap." },
    kilde: "Beredskapsansvar – Modul 9"
  },

  109: {
    riktig: "En evakueringsplan beskriver konkret hvordan ansatte og besøkende skal komme seg trygt ut av bygget ved en nødsituasjon.",
    feil: { 1: "En plan for mottak av nye ansatte er en onboardingplan – ikke en evakueringsplan.", 2: "En oversikt over nødutganger er ett element i evakueringsplanen, men ikke hele planen." },
    kilde: "Beredskapsplaner – Modul 9"
  },

  110: {
    riktig: "Alminnelig ukentlig arbeidstid etter arbeidsmiljøloven er 40 timer. Tariffavtaler kan gi kortere uke (vanligvis 37,5 timer).",
    feil: { 0: "37,5 timer er vanlig etter tariffavtale, men loven setter grensen ved 40 timer.", 2: "36 timer er ikke lovens krav – det er under tariffavtalenivå." },
    kilde: "AML § 10-4 – Modul 6"
  },

  111: {
    riktig: "Maksimal gjennomsnittlig arbeidstid inkludert overtid er 48 timer per uke beregnet over en referanseperiode.",
    feil: { 1: "50 timer er over lovens grense.", 2: "60 timer er langt over lovens grense og ikke tillatt." },
    kilde: "AML § 10-5 – Modul 6"
  },

  112: {
    riktig: "THC (tetrahydrokannabinol) er det psykoaktive virkestoffet i cannabis som gir rusopplevelsen.",
    feil: { 1: "Heroin er et opioid som utvinnes fra opiumsvalmuen – ikke fra cannabis.", 2: "Kokain er et sentralstimulerende stoff fra kokaplanteblader – ikke fra cannabis." },
    kilde: "Rus & Narkotika – cannabis – Modul 13"
  },

  113: {
    riktig: "Sentralstimulerende stoffer gir store pupiller, høy puls og oppjaget atferd – kroppen er i høygir med økt aktivitetsnivå.",
    feil: { 1: "Små pupiller og langsom pust er tegn på sentraldempende stoffer (opioider/minusdop) – det stikke motsatte.", 2: "Hallusinasjoner og forvrengd tidsoppfatning kjennetegner hallusinogener, ikke sentralstimulerende." },
    kilde: "Rus & Narkotika – sentralstimulerende – Modul 13"
  },

  114: {
    riktig: "Taushetsplikt betyr at man ikke skal videreformidle fortrolig informasjon man har fått gjennom jobben – ikke at man ikke kan snakke om jobben overhodet.",
    feil: { 0: "Taushetsplikten gjelder ikke all samtale om jobben – kun konfidensiell informasjon.", 2: "Taushetsplikten skiller ikke mellom familie og venner – den gjelder all videreformidling av konfidensiell informasjon." },
    kilde: "Etikk – taushetsplikt – Modul 4"
  },

  115: {
    riktig: "Egenrapport skal blant annet skrives i tilfeller der det er benyttet makt, og ved andre spesielle hendelser som krever dokumentasjon.",
    feil: { 0: "Egenrapport skrives ikke automatisk etter endt vakt – bare ved spesielle hendelser.", 2: "Egenrapport skrives ikke automatisk etter alarmutrykninger – bare ved hendelser som krever det." },
    kilde: "Rapportlære – Modul 10"
  },

  116: {
    riktig: "Kamera som sikrer parkeringsplass er periferisikring – det er ytre sikring av området rundt objektet, utenfor bygget selv.",
    feil: { 0: "Kamera på byggets fasade er skallsikring – ikke periferisikring.", 2: "Magnetkontakt på dører og vinduer er skallsikring.", 3: "Fjernstyring fra vaktsentral er en funksjon ved kameraet, ikke en type sikring." },
    kilde: "Sikringsprinsipper – Modul 8"
  },

  117: {
    riktig: "Mikrobølgedetektorer utendørs kan gi falsk alarm fra væske i bevegelse i plastrør – f.eks. vann som strømmer i ledninger nær detektoren.",
    feil: { 1: "Bjeffing fra hunder er lyd – mikrobølgedetektoren reagerer på bevegelse, ikke lyd.", 2: "Mennesker i bevegelse er nettopp det mikrobølgedetektoren skal oppdage – det er ikke en feilkilde." },
    kilde: "Detektorer – feilkilder – Modul 8"
  },

  118: {
    riktig: "En glassbruddetektor reagerer på lyden av knust glass via akustiske sensorer kalibrert for dette spesifikke lydsignalet.",
    feil: { 0: "Varmebølger registreres av PIR-detektorer, ikke glassbruddetektorer.", 1: "At en dør åpnes registreres av magnetkontakter, ikke glassbruddetektorer." },
    kilde: "Detektorer – Modul 8"
  },

  119: {
    riktig: "Et maleri er et spesifikt objekt med verdi som sikres med objektsikring. Dør og gjerde tilhører henholdsvis skall- og periferisikring.",
    feil: { 0: "En dør tilhører skallsikringen – den er en del av byggets ytre skall.", 1: "Et gjerde tilhører periferisikringen – det er ytre sikring av området." },
    kilde: "Sikringsprinsipper – Modul 8"
  },

  120: {
    riktig: "Mulighet og dårlig moral er to sentrale faktorer bak kriminalitet. Kriminalitet oppstår typisk der mulighet møter lav moralsk terskel.",
    feil: { 0: "Pris alene er ikke en primær årsak – det er kombinasjonen av mulighet og moral som er avgjørende.", 2: "Drabantbyer som høyrisikosone er en stereotypi uten direkte faglig forankring." },
    kilde: "Kriminalitet – Modul 2"
  },

  121: {
    riktig: "Vekterens viktigste yrkesetiske funksjon er at tilstedeværelsen forebygger skader, ulykker og uønskede handlinger.",
    feil: { 1: "Vektere er ikke nødvendigvis mer etisk korrekte enn andre yrkesgrupper – det er ingen grunnlag for dette.", 2: "Vektere er ikke alene om å ivareta ro og orden. Politiet har primæransvaret." },
    kilde: "Etikk – Modul 4"
  },

  122: {
    riktig: "Strømning skjer når varme gasser beveger seg inn i nye områder med brennbart materiale og antennes der. Det er én av fire brannspredningsmåter.",
    feil: { 0: "Ledning er en annen spredningsmåte der varme ledes gjennom faste materialer – ikke via elektriske ledninger fra stikkontakter.", 1: "Varmeoverføring via varmebølger fra varme til kalde overflater er stråling – ikke strømning." },
    kilde: "Brannspredning – strømning – Modul 14"
  },

  123: {
    riktig: "Gasslokkeanlegg brukes der vann og pulver vil ødelegge verdiene – typisk museer med kunst og antikviteter, serverrom og arkiver.",
    feil: { 0: "Tekstillagre er ikke et typisk bruksområde for gasslokkeanlegg.", 2: "Gasslokkeanlegg brukes ikke der folk sover – CO2-gass er livsfarlig for mennesker." },
    kilde: "Slokkeanlegg – Modul 14"
  },

  124: {
    riktig: "Alkoholforskriften stiller krav om at kontrollører skal ha bestått kunnskapsprøven for kontrollører.",
    feil: { 0: "Alkoholloven og -forskriften gjelder på mange områder utover bare salg og skjenking.", 2: "Alkoholforskriften sier faktisk noe om antall kontroller – minimum 1 per sted per år." },
    kilde: "Alkoholforskriften – Modul 13"
  },

  125: {
    riktig: "Åpenbart beruset betyr at ruspåvirkningen er kvalifisert og synlig for omverdenen – terskelen er høy og forutsetter tydelig synlig påvirkning.",
    feil: { 1: "Begrepet har et klart juridisk innhold – det er ikke et tomt begrep.", 2: "Antall glass er ikke relevant – det er atferden og synlig påvirkning som avgjør." },
    kilde: "Alkoholloven – åpenbart beruset – Modul 13"
  },

  126: {
    riktig: "Gammel tid er gjeldende for skjenketid. Et skjenkested med skjenketid til 03:00 må stoppe kl. 02:00 ny tid – fordi det tilsvarer 03:00 gammel tid.",
    feil: { 1: "Man kan ikke drikke en time lenger – gammel tid er gjeldende, ikke ny tid.", 2: "Salget stoppes kl. 02:00 ny tid. Konsumtiden er ikke utvidet." },
    kilde: "Alkoholloven – sommertid/vintertid – Modul 13"
  },

  127: {
    riktig: "Internkontroll knyttet til skjenkebevillingen er rutiner for å sikre at bevillingen utøves forsvarlig og i henhold til gjeldende regelverk.",
    feil: { 0: "Kvitteringsrutiner for garderobe er driftsrutiner – ikke internkontroll for skjenkebevillingen.", 1: "Rutiner mot salg til mindreårige er én del av internkontrollen, men ikke hele definisjonen." },
    kilde: "Alkoholloven – internkontroll – Modul 13"
  },

  128: {
    riktig: "Politiet kan stenge et utested permanent ved alvorlige overtredelser av alkoholloven eller andre regler.",
    feil: { 0: "Salg ved bardisk vs. bord handler om salg/skjenking-skillet – ikke om stenging.", 1: "Politiet kan stenge utover to dager. Permanent stenging er mulig ved grove gjentatte brudd." },
    kilde: "Alkoholloven – politiets myndighet – Modul 13"
  },

  129: {
    riktig: "Risiko beskrives best som en oppsummering av uønskede hendelser og trusler mot verdiene i en virksomhet.",
    feil: { 0: "Hva som kan skade bedriften er for upresist – risiko er et mer strukturert og faglig begrep.", 2: "Sårbarhetstilstand er ett av tre elementer i risikovurdering, ikke hele beskrivelsen av risiko." },
    kilde: "Risikovurdering – Modul 7"
  },

  130: {
    riktig: "Identifisert risiko kan håndteres ved blant annet å overføre den til andre – for eksempel gjennom forsikring. Dette er én av fire strategier.",
    feil: { 1: "Å fastsette sikringsmål er planlegging, ikke en håndteringsstrategi for identifisert risiko.", 2: "Relevansvurdering er del av analysen, ikke håndteringsstrategien." },
    kilde: "Risikohåndtering – Modul 7"
  },

  131: {
    riktig: "En beskrivelse av risiko er en oppsummering av forholdet mellom verdi, trussel og sårbarhet – de tre hovedelementene i risikovurderingen.",
    feil: { 0: "'Alt som kan gå galt' er for upresist og dekker ikke risikobegrepets strukturerte innhold.", 1: "Å dele risiko inn i liten/middels/høy er en gradering, ikke en beskrivelse av hva risiko er." },
    kilde: "Risikovurdering – Modul 7"
  },

  132: {
    riktig: "Sideleie brukes for å sikre frie luftveier – posisjonen hindrer at mage- og svelginnhold blokkerer luftveiene hos en bevisstløs person.",
    feil: { 0: "Sideleie er et reelt og viktig grep. Sjokkleie er en annen posisjon (bena hevet).", 2: "Ved ryggskade brukes ikke sideleie – da stabiliseres personen på annen måte." },
    kilde: "Sideleie – Modul 12"
  },

  133: {
    riktig: "Ved kraftig ytre blødning i underarmen skal skadestedet heves (over hjertehøyde) og det legges press direkte på blødningsstedet.",
    feil: { 0: "Å senke skadestedet øker blodtrykket i såret og forverrer blødningen.", 1: "Plaster er totalt utilstrekkelig ved kraftig ytre blødning." },
    kilde: "Blødninger – Modul 12"
  },

  134: {
    riktig: "116 117 er legevaktens nummer for ikke-akutte medisinske henvendelser. 113 er for akutte nødsituasjoner.",
    feil: { 0: "110 er brannvesenet – ikke relevant ved medisinsk bistand.", 1: "113 er AMK-sentralen for akutte livstruende nødsituasjoner." },
    kilde: "Nødnumre – Modul 11"
  },

  135: {
    riktig: "Blokkede luftveier er umiddelbart livstruende og har alltid høyest prioritet – dette er A i ABCDE-prinsippet.",
    feil: { 0: "Barn som gråter er bevisste og puster – de er ikke like akutt truet som de uten frie luftveier.", 1: "Ryggskader er alvorlige, men ikke mer akutt prioritert enn blokkede luftveier." },
    kilde: "ABCDE – Modul 12"
  },

  136: {
    riktig: "Det er viktig å holde pasienten varm for å motvirke sjokk og hypotermi – dette er et grunnleggende førstehjelptiltak.",
    feil: { 1: "Diabetes er én mulig årsak til bevisstløshet, men langt fra den vanligste – å anta dette er for snevert.", 2: "Man skal aldri putte noe i munnen på en person med epileptisk anfall – det er farlig og unødvendig." },
    kilde: "Førstehjelp – generelt – Modul 12"
  },

  137: {
    riktig: "Hjertekompresjoner skal gjøres i et tempo på ca. 100 per minutt – jevnt og effektivt. Ikke for sakte, ikke for raskt.",
    feil: { 0: "Rolig tempo gir for få kompresjoner og er ikke tilstrekkelig for å pumpe blod rundt i kroppen.", 2: "200 per minutt er alt for raskt og gir ikke nok tid til at hjertet fyller seg mellom hvert støt." },
    kilde: "HLR – tempo – Modul 12"
  },

  138: {
    riktig: "I nødverge er grensen at maktbruken ikke går åpenbart utover hva som er forsvarlig – det er en forholdsmessighetsvurdering.",
    feil: { 0: "Det finnes ingen regel om halvparten av motpartens makt – det er en åpenbart forsvarlighetsvurdering.", 1: "Det finnes ingen regel om at vektere kun kan bruke lommelykt i nødverge." },
    kilde: "Nødverge – Modul 15"
  },

  139: {
    riktig: "Siktet er den juridiske statusen når det er besluttet å bruke tvangsmidler mot en person – jf. straffeprosessloven § 82.",
    feil: { 0: "Mistenkt er den som etterforskes uten at tvangsmidler er besluttet.", 2: "Tiltalt er den som er stilt for retten etter at påtalemyndigheten har tatt ut tiltale." },
    kilde: "Straffeprosessloven § 82 – Modul 15"
  },

  140: {
    riktig: "Å pågripe noen på oppfordring fra politiets operasjonssentral gir ikke begrenset politimyndighet. Politimyndighet må gis formelt og eksplisitt.",
    feil: { 0: "Politimyndighet gis ikke ved verbal oppfordring fra operasjonssentralen.", 1: "Heller ikke for den aktuelle hendelsen – politimyndighet krever formell og eksplisitt tildeling." },
    kilde: "Politimyndighet – Modul 15"
  },

  141: {
    riktig: "Et kamera som filmer offentlig vei utenfor en privat garasje er ikke tillatt – det er et inngrep i andre borgeres personvern i det offentlige rom.",
    feil: { 0: "Det er ikke lov å filme offentlig vei med private kameraer.", 2: "Svart/hvitt vs. fargeopptak har ingen betydning for lovligheten." },
    kilde: "Kameraovervåkning – personvern – Modul 8"
  },

  142: {
    riktig: "Vektere kan bære håndjern når tjenesten tilsier det – det er tjenestens art som avgjør, ikke formell politigodkjenning eller gjennomført kurs.",
    feil: { 0: "Opplæring er anbefalt, men er ikke det juridiske kravet for å bære håndjern.", 2: "Politiet godkjenner ikke individuelt håndjernsbæring for vektere." },
    kilde: "Håndjern – Modul 15"
  },

  143: {
    riktig: "Selvtekt er regulert i straffeloven § 19 – det er et lovregulert felt, ikke bare et etisk standpunkt.",
    feil: { 1: "Selvtekt er ikke bare et etisk spørsmål – straffeloven regulerer dette konkret.", 2: "Selvtekt er lovregulert og ikke generelt forbudt – men det er strenge vilkår." },
    kilde: "Straffeloven § 19 – Modul 15"
  },

  144: {
    riktig: "Det er brudd på diskrimineringsloven å nekte adgang basert på kjønn – eiendomsretten gir ikke rett til å diskriminere.",
    feil: { 0: "Eiendomsretten gir ikke rett til å diskriminere mot lovbeskyttede grupper.", 1: "Å kompensere med et annet arrangement en annen kveld er ikke en lovlig løsning." },
    kilde: "Diskrimineringsloven – Modul 3"
  },

  145: {
    riktig: "Skadeverk er en straffbar handling og dermed et straffbarhetsvilkår – det dekkes av straffebudet om skadeverk.",
    feil: { 1: "Hjelpsomhet er en positiv egenskap – ikke en straffbar handling.", 2: "Sniking i kø er sosialt uakseptabelt, men ikke straffbart etter norsk lov." },
    kilde: "Straffbarhetsvilkår – Modul 15"
  },

  146: {
    riktig: "Kriseberedskap innebærer at bedriften har en beredskapsplan for hvordan man skal håndtere uønskede hendelser.",
    feil: { 1: "Oversikt over krisepersonell er en del av beredskapsplanen, men ikke hele definisjonen.", 2: "Tilgjengelig utstyr er viktig, men definisjonen handler om planverket, ikke bare utstyret." },
    kilde: "Beredskapsplaner – Modul 9"
  },

  147: {
    riktig: "Systematisk evaluering er viktig for å sikre at nødvendig utstyr og rutiner faktisk fungerer som de skal i en reell situasjon.",
    feil: { 0: "Tilbakemelding til nøkkelpersonell er nyttig, men er ikke hovedformålet med evalueringen.", 1: "Å kontrollere lovoverholdelse er viktig, men hovedformålet er å sikre at systemet faktisk fungerer." },
    kilde: "Beredskapsøvelser – Modul 9"
  },

  148: {
    riktig: "Vår første vurdering av en situasjon eller person kan være feil – stereotypier gir et unøyaktig og forenklet bilde av virkeligheten.",
    feil: { 1: "Stereotypier kan lede til konflikt, men det er ikke den primære faglige grunnen til å unngå dem.", 2: "Allmennhetens tillit er viktig, men er ikke den mest direkte konsekvensen av stereotypisering." },
    kilde: "Stereotypier – Modul 2"
  },

  149: {
    riktig: "En vekter skal alltid forsøke å dempe konfliktnivået fremfor å heve det – de-eskalering er kjernen i profesjonell konflikthåndtering.",
    feil: { 0: "Trening kan hjelpe, men det riktige prinsippet er de-eskalering, ikke å 'lykkes'.", 1: "En vekter venter ikke til man er sikker på å 'vinne' – de-eskalering er målet, ikke konfrontasjon." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  150: {
    riktig: "Å beholde roen er det riktige tiltaket når noen spytter på deg. Profesjonell atferd og ro er det beste svaret.",
    feil: { 0: "Speiling ville forsterke og eskalere situasjonen ytterligere.", 1: "En advarsel om anmeldelse kan eskalere situasjonen ytterligere i øyeblikket." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  151: {
    riktig: "Den beste måten å bli en bedre konflikthåndterer på er å ha evnen til å motta kritikk og lære av sine egne erfaringer.",
    feil: { 1: "Selvforsvar er nyttig for egensikkerhet, men er ikke det primære for konflikthåndtering.", 2: "Mengdetrening uten refleksjon gir ikke utvikling. Lærdom av erfaringer er avgjørende." },
    kilde: "Konflikthåndtering – egenutvikling – Modul 2"
  },

  152: {
    riktig: "Vektere har ikke anledning til å foreta husransakelse – dette er forbeholdt politiet med hjemmel i straffeprosessloven.",
    feil: { 0: "Å gi politiet en hjelpende hånd i lovlige aktiviteter er tillatt og naturlig.", 2: "Alle kan bruke hjertestarter – det kreves ikke kurs, men opplæring anbefales." },
    kilde: "Vekterens myndighetsgrenser – Modul 15"
  },

  153: {
    riktig: "En arbeidstaker har rett på pause når den totale arbeidstiden overstiger 5 timer og 30 minutter – dette er lovens minimumskrav.",
    feil: { 1: "Det er et konkret krav i arbeidsmiljøloven – etter 5,5 timer har man rett på pause.", 2: "Pauseretten inntreffer etter 5,5 timer – ikke først etter 8 timer." },
    kilde: "AML – pauser – Modul 6"
  },

  154: {
    riktig: "Arbeidsgiver har det overordnede ansvaret for at arbeidsmiljøloven følges i bedriften – jf. AML § 2-1.",
    feil: { 1: "Tillitsvalgt representerer de ansatte, men har ikke det juridiske ansvaret for lovoverholdelse.", 2: "Verneombudet overvåker og melder fra, men det juridiske ansvaret ligger hos arbeidsgiver." },
    kilde: "AML § 2-1 – Modul 6"
  },

  155: {
    riktig: "Opioider er minusdop – de har sentraldempende effekt med sløv og dempende rus. Overdose kan gi pustestopp og koma.",
    feil: { 1: "Opioider er ikke sentralstimulerende – det er det stikke motsatte.", 2: "Opioider har svært høy avhengighetsgrad – det er en av de mest avhengighetsskapende rusgruppene." },
    kilde: "Rus & Narkotika – opioider – Modul 13"
  },

  156: {
    riktig: "Det er registrert dødsfall relatert til cannabis – primært indirekte (psykose, ulykker), men det er dokumentert.",
    feil: { 0: "Det er feil at det ikke finnes dødsfall relatert til cannabis.", 2: "Høyenergiskader er ikke den riktige betegnelsen på cannabisskader – psykose og paranoia er mer typisk." },
    kilde: "Rus & Narkotika – cannabis – Modul 13"
  },

  157: {
    riktig: "Ja, større mengder GHB kan føre til koma. GHB er spesielt farlig i kombinasjon med alkohol.",
    feil: { 1: "GHB kan absolutt føre til koma – det er godt dokumentert.", 2: "GHB kan gi koma alene, ikke bare i kombinasjon med annen rus." },
    kilde: "Rus & Narkotika – GHB – Modul 13"
  },

  158: {
    riktig: "Målet med norsk integreringspolitikk er at alle skal komme i jobb, betale skatt og delta aktivt i samfunnet – slik at det ikke oppstår sosiale forskjeller.",
    feil: { 1: "Norsk integreringspolitikk handler ikke om å forberede folk til å reise tilbake til hjemlandet.", 2: "Statsborgerskap er ett element, men ikke det overordnede målet for integreringspolitikken." },
    kilde: "Mangfold – integreringspolitikk – Modul 3"
  },

  159: {
    riktig: "Ja, Norge er et flerkulturelt land med innbyggere fra over 200 ulike opprinnelsesnasjonaliteter.",
    feil: { 1: "Det er et faktum at Norge er flerkulturelt – dette er ikke diskutabelt." },
    kilde: "Mangfold – Modul 3"
  },

  160: {
    riktig: "Kultur er tanke-, kommunikasjons- og adferdsmønstre hos mennesker – et bredt begrep som dekker verdier, normer og samhandlingsformer.",
    feil: { 1: "En tur som er kul er et ordspill uten faglig innhold.", 2: "Musikk og teater er uttrykk for kultur, men ikke definisjonen av kultur." },
    kilde: "Kulturforståelse – Modul 3"
  },

  161: {
    riktig: "Religion er et uttrykk for menneskenes holdning til det de anser for å være den egentlige virkelighet og de grunnleggende verdier i tilværelsen.",
    feil: { 1: "At religion skaper krig er en forenkling og absolutt ikke en akademisk definisjon.", 2: "Å kalle religion gammel overtro er nedsettende og ikke en faglig definisjon." },
    kilde: "Mangfold – religion – Modul 3"
  },

  162: {
    riktig: "Arbeidsgivers styringsrett er retten til å lede, kontrollere og organisere arbeidsplassen – men alltid innenfor lovens og avtalenes rammer.",
    feil: { 0: "Styringsretten gir ikke rett til å overstyre lovverket – den opererer innenfor det.", 2: "Styringsretten handler ikke om AMU – AMU er de ansattes medvirkningsorgan." },
    kilde: "Arbeidsgivers styringsrett – Modul 6"
  },

  163: {
    riktig: "Vekteren er i 1. linje (førstelinje) i beredskapsorganisasjonen – den som møter hendelsen først og utfører det praktiske arbeidet.",
    feil: { 1: "2. linje er lederpersoner med beredskapsleder som setter i gang ekstra ressurser.", 2: "3. linje er den strategiske ledelsen." },
    kilde: "Beredskapsorganisasjon – Modul 9"
  },

  164: {
    riktig: "Det er religionsfrihet i Norge. Religiøse symboler er beskyttet og man kan ikke vise bort noen bare fordi de bærer slike symboler.",
    feil: { 1: "Påtrengende religiøse symboler er ikke en juridisk begrunnelse for bortvising.", 2: "Å ikke vise ansiktet kan i svært spesifikke situasjoner legitimere tiltak, men er ikke en generell regel." },
    kilde: "Religionsfrihet – diskriminering – Modul 3"
  },

  165: {
    riktig: "For å utvide skjenketid utover fastsatt tid må skjenkestedet søke kommunen og få innvilget utvidelsen.",
    feil: { 1: "Kortvarig utvidelse krever fortsatt søknad – man kan ikke bare bestemme det selv.", 2: "Det finnes ingen generell sentrumsregel som automatisk gir rett til utvidet åpningstid." },
    kilde: "Alkoholloven – skjenketid – Modul 13"
  },

  166: {
    riktig: "Når en konflikt fortsetter på privat plan etter endt jobb, er det riktig å trekke seg unna og eventuelt varsle ledelsen.",
    feil: { 0: "110 er brannvesenet – ikke relevant her. Politiet ringes på 112 ved akutt behov.", 2: "Å speile personens argumentasjon på privat plan er å eskalere konflikten ytterligere." },
    kilde: "Konflikthåndtering – privat plan – Modul 2"
  },

  167: {
    riktig: "Personopplysningsloven er den primære loven som regulerer håndtering av personopplysninger i Norge.",
    feil: { 0: "'Person og dataloven' er ikke en reell norsk lov.", 1: "Politiregisterloven regulerer politiets egne registre – ikke generell håndtering av personopplysninger." },
    kilde: "Personopplysningsloven – Modul 8"
  },

  168: {
    riktig: "Et sentralt punkt i en beredskapsplan er å kjenne sine roller – hvem gjør hva, når det skjer en uønsket hendelse.",
    feil: { 1: "Å være vaktsom er en generell holdning, ikke et konkret og sentralt beredskapsplanpunkt.", 2: "Å ta kommando frem til brannvesenet overtar er for snevert og situasjonsavhengig." },
    kilde: "Beredskapsplaner – Modul 9"
  },

  169: {
    riktig: "En vekter bør ikke ukritisk dele informasjon om kunder med politiet. Taushetsplikt og personvernlovgivning setter klare grenser.",
    feil: { 0: "Politiet har ikke automatisk krav på all informasjon. Det finnes regler for hva som kan deles og under hvilke vilkår." },
    kilde: "Personvern – taushetsplikt – Modul 8"
  },

  170: {
    riktig: "Det er ikke riktig at vektere kan velge uniform selv bare fordi det står 'vekter' på brystet – uniformskravene er regulert i vaktvirksomhetsforskriften og kan ikke overstyres.",
    feil: { 0: "Krav til uniform er faktisk regulert av myndighetene via vaktvirksomhetsforskriften – ikke fritt valgt.", 2: "At alle vektere skal bære ID-kort er korrekt og er ikke den falske påstanden her." },
    kilde: "Vaktvirksomhetsforskriften – Modul 1"
  },

  171: {
    riktig: "Krav til vaktselskap finnes i Lov om vaktvirksomhet med tilhørende forskrift – dette er det primære og overordnede regelverket.",
    feil: { 1: "Forskrift om vaktvirksomhet er del av regelverket, men loven er overordnet. Begge er nødvendige.", 2: "Sikkerhetsloven gjelder nasjonal sikkerhet og skjermingsverdige objekter – ikke generell vaktvirksomhet." },
    kilde: "Vaktvirksomhetsloven – Modul 1"
  },

  172: {
    riktig: "Det er ikke lov å skrive ned personalia på mistenkt lovbryter i en vaktjournal. Personopplysningsloven setter grenser for hva som kan registreres.",
    feil: { 0: "Å skrive ned personalia uten hjemmel er ikke tillatt.", 2: "Selv med lederens beskjed er det ikke nødvendigvis lovlig å registrere personalia uten tilstrekkelig hjemmel." },
    kilde: "Personopplysningsloven – Modul 8"
  },

  173: {
    riktig: "Før arbeidsoppgavene startes skal man alltid kontrollere at utlevert utstyr fungerer som det skal – dette er grunnleggende sikkerhetspraksis.",
    feil: { 0: "Å pusse tennene er personlig hygiene – ikke et vaktforberedende sjekk.", 1: "Uniformsko er fremtoning og hygiene, men ikke det viktigste å kontrollere ved vaktstart.", 3: "Utrykningsrapporter er ikke noe man kontrollerer ved vaktstart." },
    kilde: "Vaktpraksis – Modul 1"
  },

  174: {
    riktig: "En datapenn registrerer strekkoder festet på avtalte steder på objektet. Den dokumenterer at vekteren faktisk har vært på stedet.",
    feil: { 0: "En penn for dataskjermer er en stylus – ikke en datapenn i vekterbransjen.", 1: "En bærbar PC i penn-format er ikke det samme som en datapenn i sikkerhetsbransjen." },
    kilde: "Tekniske hjelpemidler – Modul 8"
  },

  175: {
    riktig: "Ja, selvtillit og evnen til å stå for egne avgjørelser er viktige egenskaper for vektere – spesielt de som jobber alene og uten tilsyn.",
    feil: { 0: "Vektere skal absolutt være løsningsorienterte og ta selvstendige avgjørelser.", 2: "Kravet om selvtillit gjelder hele arbeidstiden – ikke bare et bestemt tidsrom." },
    kilde: "Vekterens egenskaper – Modul 1"
  },

  176: {
    riktig: "Ja, det er krav knyttet til bruk av hund i vektertjeneste. Vaktvirksomhetsloven stiller krav til godkjenning av både hund og fører.",
    feil: { 0: "Det finnes absolutt krav – å si nei er feil.", 1: "Tidligere godkjenning som politihund er ikke tilstrekkelig – vektertjeneste krever egen godkjenning." },
    kilde: "Vaktvirksomhetsloven – hundetjeneste – Modul 1"
  },

  177: {
    riktig: "Den viktigste regelen ved åstedsdisiplin er å ikke røre noe – helst putte hendene i lommene og bare observere for å bevare alle spor for politiet.",
    feil: { 1: "Å 'sikre ting' ved å flytte dem er et brudd på åstedsdisiplin og kan ødelegge avgjørende bevis.", 2: "Søk i nærområdet risikerer å ødelegge spor og kan sette vekteren i fare." },
    kilde: "Åstedsdisiplin – Modul 11"
  },

  178: {
    riktig: "Som vitne i en rettssak skal du forklare fakta og det du faktisk observerte – ikke anta, mene eller spekulere.",
    feil: { 0: "Taushetsplikt gir svært sjelden rett til å nekte å vitne – som regel er man pliktig å forklare seg.", 2: "Det er ingen krav om å møte i dress som vitne i retten." },
    kilde: "Vitneforklaring – Modul 10 og 15"
  },

  179: {
    riktig: "I en anmeldelse for naskeri/tyveri skal det alltid fremgå at personen ble stanset etter siste betalingspunkt – dette er det juridiske kravet for at tyveriet er fullbyrdet.",
    feil: { 0: "Oppholdstid er ikke det juridiske kravet for å konstatere tyveri.", 1: "At personen er kjent gjerningsperson er ikke et formelt krav i anmeldelsen.", 3: "Politiets ankomsttid er ikke det sentrale juridiske elementet i anmeldelsen." },
    kilde: "Rapportlære – anmeldelse – Modul 10"
  },

  180: {
    riktig: "Periferisikring er utvendig sikring av det ytre området rundt et objekt – det er den ytterste sikringsringen.",
    feil: { 1: "Innvendig sikring av rom heter romsikring.", 2: "Sikring av spesielle eiendeler heter objektsikring.", 3: "Sikring av fasade, dører og vinduer heter skallsikring – ikke periferisikring." },
    kilde: "Sikringsprinsipper – Modul 8"
  },

  181: {
    riktig: "God innbruddsbeskyttelse handler om å gjøre et innbrudd vanskelig og tidkrevende å gjennomføre – å øke motstanden og forsinkelsen.",
    feil: { 0: "Kamera alene stopper ikke innbrudd – det dokumenterer dem i etterkant.", 2: "Alarm alene stopper heller ikke innbrudd – den varsler og avskrekker, men hindrer ikke." },
    kilde: "Innbruddsbeskyttelse – Modul 8"
  },

  182: {
    riktig: "Detektorer som sikrer en safe eller et maleri kalles objektsikring – ikke skallsikring. Skallsikring er byggets ytre skall.",
    feil: { 1: "Detektorer som sikrer utvendig område kalles periferisikring – det er riktig.", 2: "Detektorer som sikrer rommet kalles romsikring – det er riktig." },
    kilde: "Sikringsprinsipper – Modul 8"
  },

  183: {
    riktig: "Opptak fra adgangskontrollsystem kan lagres i inntil 90 dager. Det er en lovfestet unntak fra den generelle 7-dagersregelen.",
    feil: { 0: "7 dager er for vanlig kameraovervåkning – ikke for adgangskontrollsystemer.", 2: "365 dager er ikke tillatt etter personopplysningsloven." },
    kilde: "Personopplysningsloven – Modul 8"
  },

  184: {
    riktig: "Den viktigste fordelen med et dome-kamera er at det kan fjernstyres fra en vaktsentral – det gir fleksibel overvåkning.",
    feil: { 0: "Dome-kameraer er ikke spesielt billige sammenlignet med andre kameratyper.", 1: "Et enkelt dome-kamera ser ikke nødvendigvis i alle retninger – det avhenger av type og montering." },
    kilde: "Kameratyper – Modul 8"
  },

  185: {
    riktig: "Avhengighet er en samlebetegnelse for skadelig avhengighet av kjemiske substanser, men også av atferd som gambling og overdreven tidsbruk.",
    feil: { 0: "Sjokolade er en hverdagslig metafor – ikke en faglig definisjon av avhengighet.", 1: "Avhengighet er ikke begrenset til narkotiske stoffer – det dekker alkohol, legemidler og atferdsavhengigheter." },
    kilde: "Rus & Narkotika – avhengighet – Modul 13"
  },

  186: {
    riktig: "Brudd på etiske retningslinjer kan gi bransjen et dårlig omdømme – dette er den mest direkte og typiske konsekvensen.",
    feil: { 0: "Politianmeldelse skjer bare ved straffbare handlinger – ikke ved ethvert etisk brudd.", 1: "Å bli saksøkt er mulig ved erstatningskrav, men er ikke typisk konsekvens av etiske brudd.", 3: "Å sette liv og helse i fare kan skje, men er ikke den typiske direkte konsekvensen." },
    kilde: "Etikk – Modul 4"
  },

  187: {
    riktig: "Brannspredning ved stråling skjer når varmestråling fra flammer og røyk varmer opp nærliggende brennbare materialer til de antennes spontant.",
    feil: { 0: "Røntgenutstyr som tar fyr er et eksempel på brann – ikke en forklaring på stråling som spredningsmåte.", 2: "Sollys som skaper ulmebrann er et mulig eksempel, men ikke definisjonen på stråling som spredningsmåte." },
    kilde: "Brannspredning – stråling – Modul 14"
  },

  188: {
    riktig: "En branncelle avgrenser en brann fra andre deler av et bygg i løpet av en fastsatt tid. Den brenner selv, men holder brannen tilbake midlertidig.",
    feil: { 0: "En branncelle er en byggteknisk løsning – ikke en kjemisk forklaring.", 2: "En branncelle er ikke et ubrennbart rom – det er en tidsbegrenset brannbarriere." },
    kilde: "Brannvern – branncelle – Modul 14"
  },

  189: {
    riktig: "Automatisk brannalarmanlegg er et aktivt brannverntiltak fordi det oppdager og varsler om brann aktivt.",
    feil: { 0: "Brannceller er passive brannverntiltak – de bremser spredning uten å aktivt varsle.", 2: "Instrukser og rutiner er administrative tiltak – ikke aktive brannverntiltak." },
    kilde: "Brannvern – aktive og passive tiltak – Modul 14"
  },

  190: {
    riktig: "Ettersyn av sprinkleranleggssentral skal føres 1 gang per uke for å sikre at anlegget er operativt og klart.",
    feil: { 0: "Det er absolutt krav til kontroll av sprinkleranlegg.", 2: "1 gang per år er langt for sjelden for et sikkerhetskritisk system som sprinkleranlegg." },
    kilde: "Sprinkleranlegg – ettersyn – Modul 14"
  },

  191: {
    riktig: "En vekter har ikke lov til å koble ut deler av brannalarmen – ikke engang på kundens oppfordring og ikke på grunn av scenerøyk.",
    feil: { 1: "Å koble ut brannalarmen er aldri tillatt for en vekter.", 2: "Heller ikke en brannmanns godkjenning er tilstrekkelig hjemmel for vekteren til å koble ut systemet." },
    kilde: "Brannvern – vekterens plikter – Modul 14"
  },

  192: {
    riktig: "Det skal gjennomføres minimum 1 kontroll per salg- og skjenkested per år. Det er ingen øvre grense for antall kontroller.",
    feil: { 1: "3 kontroller per år er ikke et lovkrav – minimum er 1.", 2: "Det er et konkret minimumskrav. Å si det er ingen krav er feil." },
    kilde: "Alkoholforskriften – kontroll – Modul 13"
  },

  193: {
    riktig: "Ved overgang til sommertid er gammel tid gjeldende for skjenketid – klokkens stilling alene bestemmer ikke skjenketiden.",
    feil: { 1: "Skjenking stanser ikke kl. 01:00 over hele Norge ved sommertid – det avhenger av lokale tider.", 2: "Salgs- og konsumtid følger gammel tid – de stoppes ikke ved ulike tidspunkter." },
    kilde: "Alkoholloven – sommertid – Modul 13"
  },

  194: {
    riktig: "Alkoholloven sier at dersom en person er synlig beruset, kan det ikke serveres alkohol til andre ved samme bord heller – ikke bare til den beruste personen.",
    feil: { 1: "Styrers ansvar er overfor skjenkebevillingen og myndighetene – ikke overfor styret i selskapet.", 2: "Det er ingen generelt forbud mot å ta med alkohol mellom etasjer på samme skjenkested." },
    kilde: "Alkoholloven – Modul 13"
  },

  195: {
    riktig: "Ved en salgskontroll er det tilstrekkelig med 1 kontrollør – minimumskravet er lavere enn ved skjenkekontroll.",
    feil: { 1: "2 kontrollører er minimumskrav ved skjenkekontroll – ikke salgskontroll.", 2: "3 kontrollører er over minimumskravet for begge typer kontroll." },
    kilde: "Alkoholforskriften – salgskontroll – Modul 13"
  },

  196: {
    riktig: "Kommunen kan foreta kontroll av skjenkestedet når de krever det – det er ikke begrenset til bestemte tidspunkter eller åpningstid.",
    feil: { 0: "Kommunen er ikke begrenset til åpningstid for kontroll.", 2: "Tidsrommet 11:00–03:00 er ikke et lovpålagt krav for kontroll." },
    kilde: "Alkoholloven – kommunekontroll – Modul 13"
  },

  197: {
    riktig: "Det er krav om risikovurdering i Arbeidsmiljøloven, Internkontrollforskriften, Brann- og eksplosjonsvernloven og flere andre lover.",
    feil: { 1: "Forsikringspapirer stiller ikke lovkrav om risikovurdering – det er lovgivningen som gjør det.", 2: "Det finnes absolutt lovpålagte krav om risikovurdering i norsk rett." },
    kilde: "Risikovurdering – lovkrav – Modul 7"
  },

  198: {
    riktig: "Ved krampeanfall skal man gjøre minst mulig – sørg for at personen ligger mykt, trygt og varmt. Putt aldri noe i munnen.",
    feil: { 0: "Å putte en pinne i munnen er farlig og totalt feil – personen kan aldri svelge tunga.", 2: "HLR startes ikke ved epileptisk anfall alene – bare hvis personen slutter å puste normalt etter anfallet." },
    kilde: "Epilepsi – Modul 12"
  },

  199: {
    riktig: "Ved funn av brukerutstyr: tenk egensikkerhet, bruk hansker og verneutstyr, og sikre utstyret forsvarlig i godkjent beholder.",
    feil: { 0: "Smittevernkontoret er ikke riktig instans – egensikkerhet og riktig håndtering er det viktige.", 1: "Å bare ringe politiet og avvente er ikke tilstrekkelig – egensikkerhet og sikring av utstyret er nødvendig." },
    kilde: "Rus og brukerutstyr – Modul 12"
  },

  200: {
    riktig: "Hjertestarter brukes når hjertet ikke slår (ventrikkelfibrilasjon) – ikke bare ved bevisstløshet eller kramper alene.",
    feil: { 1: "Bevisstløshet alene er ikke indikasjon for hjertestarter – hjerterytmen må vurderes av apparatet.", 2: "Kramper er ikke indikasjon for hjertestarter." },
    kilde: "Hjertestarter – Modul 12"
  },

  201: {
    riktig: "Hev det blødende stedet og legg press direkte på såret. Tyngdekraften reduserer blodtrykket i det hevede området.",
    feil: { 0: "Plaster er utilstrekkelig ved kraftig ytre blødning.", 1: "Å senke skadestedet øker blodtrykket og forverrer blødningen." },
    kilde: "Blødninger – Modul 12"
  },

  202: {
    riktig: "Emosjonell førstehjelp handler om å roe personen ned ved å vise trygghet og omsorg – å være til stede og støttende i øyeblikket.",
    feil: { 1: "Psykolog er langsiktig behandling, ikke emosjonell førstehjelp i øyeblikket.", 2: "Oppfølging etterpå er viktig, men emosjonell førstehjelp handler om den umiddelbare støtten." },
    kilde: "Emosjonell førstehjelp – Modul 12"
  },

  203: {
    riktig: "Pasienter uten frie luftveier prioriteres høyest – blokkede luftveier er umiddelbart livstruende og behandles alltid først.",
    feil: { 0: "Barn som gråter er bevisste og puster – de er ikke like akutt truet i øyeblikket.", 1: "Indre blødninger er alvorlig, men en bevisst og pustende person er ikke like akutt som luftveisproblemer." },
    kilde: "ABCDE-prioritering – Modul 12"
  },

  204: {
    riktig: "Sakte pust, bevissthetssvekkelse og svært SMÅ pupiller er klassiske tegn på opioidoverdose (heroin, morfin osv.).",
    feil: { 0: "Amfetamin gir STORE pupiller og oppjaget atferd – det stikke motsatte av hva vi ser her.", 2: "Alkohol kan gi sløvhet, men de ekstremt små pupillene er karakteristiske for opioidoverdose – ikke alkohol." },
    kilde: "Rus – opioidoverdose – Modul 13"
  },

  205: {
    riktig: "Du har ikke lov til å gi mat eller drikke til en bevisstløs diabetiker – fare for kvelning. Ring 113 umiddelbart i stedet.",
    feil: { 0: "Det er livsfarlig å gi mat og drikke til en bevisstløs person – de kan ikke svelge trygt.", 2: "Insulinsprøyte skal ikke gis uten medisinsk kompetanse – det kan forverre tilstanden." },
    kilde: "Diabetes – bevisstløs – Modul 12"
  },

  206: {
    riktig: "HLR startes kun når pasienten er bevisstløs OG ikke puster normalt. Begge kriteriene må være oppfylt.",
    feil: { 0: "Omtåket pasient er ikke bevisstløs – HLR startes ikke.", 1: "Å ikke puste normalt alene er ikke nok – bevissthetsnivå må alltid vurderes først." },
    kilde: "HLR – Modul 12"
  },

  207: {
    riktig: "Norsk Indeks for medisinsk nødhjelp er et arbeidsverktøy for AMK-sentralene – det brukes av operatørene for å veilede innringere og prioritere ressurser.",
    feil: { 1: "Det er ikke en innholdsfortegnelse i en lærebok – det er et operativt prioriteringsverktøy.", 2: "Det er ikke ingenting – det er et svært sentralt og viktig verktøy i akuttmedisin." },
    kilde: "AMK – Norsk Indeks – Modul 12"
  },

  208: {
    riktig: "Heimlich-manøver gjøres med ryggslag (5 slag mellom skulderbladene) og bukstøt (5 støt under ribbeina bakfra) dersom pasienten ikke klarer å hoste for seg selv.",
    feil: { 0: "2 innblåsninger og 2 kompresjoner er HLR-rytme – ikke Heimlich-manøver.", 1: "Å legge personen på ryggen med knær opptrukket er feil – Heimlich-manøver gjøres stående." },
    kilde: "Fremmedlegeme – Modul 12"
  },

  209: {
    riktig: "Vekterens maktbruk er begrenset til det som er nødvendig, forsvarlig og forholdsmessig – dette er de tre sentrale kravene.",
    feil: { 1: "Politimyndighet er ikke et krav for å bruke makt i nødverge – nødverge er hjemlet i straffeloven.", 2: "De tre kravene (nødvendig, forsvarlig, forholdsmessig) er riktige og fullstendige." },
    kilde: "Maktbruk – Modul 15"
  },

  210: {
    riktig: "I post og bank kan kameraopptak lagres i inntil 90 dager – dette er en lovfestet unntak fra den generelle 7-dagersregelen.",
    feil: { 0: "7 dager er for vanlig kameraovervåkning – ikke post og bank.", 1: "30 dager er ikke riktig for post og bank." },
    kilde: "Personopplysningsloven – Modul 8"
  },

  211: {
    riktig: "Legalitetsprinsippet betyr ingen straff uten lov – det er et grunnleggende rettsprinsipp i norsk og internasjonal rett.",
    feil: { 1: "Legalisering av narkotika er et politisk spørsmål uten sammenheng med legalitetsprinsippet.", 2: "At regjeringen fastsetter lovverket beskriver lovgivningsprosessen – ikke legalitetsprinsippet." },
    kilde: "Legalitetsprinsippet – Modul 15"
  },

  212: {
    riktig: "Nødrett gir rett til å begå lovbrudd i en nødsituasjon for å redde liv og helse, men man kan bli erstatningsansvarlig for skader som oppstår.",
    feil: { 0: "Nødrett innebærer mulig erstatningsansvar – den absolutte frihet fra konsekvenser er for sterk påstand.", 2: "Nødrett gjelder redning av liv og helse, ikke materiell med høyere verdi alene." },
    kilde: "Nødrett – Modul 15"
  },

  213: {
    riktig: "Et objektivt straffbarhetsvilkår handler om selve handlingen – at det er utført en handling som dekkes av et straffebud.",
    feil: { 1: "Forsett er et subjektivt vilkår om gjerningspersonens skyld.", 2: "15 år er kriminell lavalder – et objektivt vilkår, men 'utført en straffbar handling' er det mest grunnleggende." },
    kilde: "Straffbarhetsvilkår – Modul 15"
  },

  214: {
    riktig: "Nødverge er et straffefritaksgrunnlag – det er et subjektivt vilkår som kan frita for straff, men er ikke et straffbarhetsvilkår i seg selv.",
    feil: { 1: "Uaktsomhet er en skyldform og dermed et subjektivt straffbarhetsvilkår.", 2: "Tilregnelighet er et subjektivt straffbarhetsvilkår." },
    kilde: "Straffbarhetsvilkår – Modul 15"
  },

  215: {
    riktig: "5-trinnsmodellen er et godt utgangspunkt for å utvikle en mer profesjonell holdning og atferd i konfliktsituasjoner – ikke en rigid oppskrift.",
    feil: { 1: "Alle situasjoner er ikke like – modellen gir et rammeverk, ikke en fasit som alltid gir ett godt resultat.", 2: "Modellen er ikke primært beregnet på at kolleger skal forstå hverandres posisjon." },
    kilde: "Konflikthåndtering – 5-trinnsmodellen – Modul 2"
  },

  216: {
    riktig: "Ivareta egen sikkerhet og de-eskaler konfliktnivået ved å bytte samtaleemne er det profesjonelle og riktige tiltaket ved trakassering.",
    feil: { 0: "En advarsel om anmeldelse kan eskalere situasjonen ytterligere i øyeblikket.", 1: "Speiling av trakasserende atferd er feil – speiling brukes for å gjenspeile positiv og rolig atferd." },
    kilde: "Konflikthåndtering – trakassering – Modul 2"
  },

  217: {
    riktig: "Å observere hvordan andre jobber og gjøre egenobservasjon er de beste metodene for å utvikle seg som konflikthåndterer.",
    feil: { 1: "Å tilpasse seg kollegene er ikke nødvendigvis utvikling – det avhenger av kollegenes standard.", 2: "Mengdetrening uten refleksjon gir ikke systematisk utvikling og forbedring." },
    kilde: "Konflikthåndtering – egenutvikling – Modul 2"
  },

  218: {
    riktig: "Vektere har ikke lov til å bruke batong i tjenesten – dette er forbeholdt politiet.",
    feil: { 0: "Batong er ikke tillatt for vektere.", 2: "Ingen vekterstilling gir rett til å bære eller bruke batong." },
    kilde: "Vekterens myndighetsgrenser – Modul 15"
  },

  219: {
    riktig: "Verneombud velges annethvert år (hvert 2. år) av og blant de ansatte i virksomheten.",
    feil: { 0: "Hvert år er for hyppig – loven sier annethvert år.", 2: "Hvert fjerde år gjelder regodkjenning av vektere, ikke valg av verneombud." },
    kilde: "AML – verneombud – Modul 6"
  },

  220: {
    riktig: "Det skal minimum være 11 timers sammenhengende hvile mellom to arbeidsperioder etter arbeidsmiljøloven.",
    feil: { 0: "6 timer er langt under lovens minimumskrav på 11 timer.", 1: "8 timer er heller ikke tilstrekkelig – loven krever 11 timer." },
    kilde: "AML § 10-8 – Modul 6"
  },

  221: {
    riktig: "Derivatregelen gjør at straffbare 'designerdrugs' som er laget for å gi narkotisk rus er straffbare – selv om de ikke eksplisitt står på narkotikalisten.",
    feil: { 0: "Derivatregelen er et konkret juridisk begrep med reelt og viktig innhold.", 1: "Å ha brukerutstyr er straffbart i noen sammenhenger, men det er ikke definisjonen på derivatregelen." },
    kilde: "Narkotikalovgivning – derivatregelen – Modul 13"
  },

  222: {
    riktig: "Minusdop har sløvende og dempende effekt på brukeren – disse er sentraldempende stoffer som gir lavere aktivitetsnivå.",
    feil: { 1: "Oppkvikkende effekt er plussdop – det er det stikke motsatte av minusdop.", 2: "Utblandet narkotika uten effekt er en beskrivelse av svak narkotika – ikke definisjonen på minusdop." },
    kilde: "Rus & Narkotika – minusdop – Modul 13"
  },

  223: {
    riktig: "Plussdop tilhører gruppen sentralstimulerende stoffer – stoffer som øker aktivitetsnivå, energi og euforisk følelse.",
    feil: { 0: "Sentraldempende er minusdop – det stikke motsatte av plussdop.", 2: "Hallusinogener forvrengler virkelighetsoppfatningen, men klassifiseres ikke som plussdop." },
    kilde: "Rus & Narkotika – plussdop – Modul 13"
  },

  224: {
    riktig: "Cannabis kan gi paranoia, psykose, konsentrasjonsskader og økt risiko for kreft. Dette er de dokumenterte skadevirkningene.",
    feil: { 0: "Høyenergiskader er ikke de primære skadevirkningene av cannabis.", 1: "Fallskader og brudd er ikke typiske direkte skadevirkninger av cannabis." },
    kilde: "Cannabis – skadevirkninger – Modul 13"
  },

  225: {
    riktig: "De tre hovedgruppene for diskriminering er sosial, strukturell og offentlig diskriminering.",
    feil: { 0: "Diskriminering er ikke tillatt verken på private eller offentlige steder.", 2: "Diskriminering handler om mye mer enn etnisitet – det gjelder kjønn, religion, alder, funksjonshemning og mer." },
    kilde: "Diskriminering – Modul 3"
  },

  226: {
    riktig: "Krysskulturell kommunikasjon handler om å være åpen, lytte aktivt og vise respekt for alle mennesker uavhengig av bakgrunn og kultur.",
    feil: { 0: "Å se inn i fremtiden er ikke relevant for krysskulturell kommunikasjon.", 2: "Å lære seg språk er nyttig, men er ikke definisjonen på krysskulturell kommunikasjon." },
    kilde: "Kulturforståelse – Modul 3"
  },

  227: {
    riktig: "Metodisk relativisme handler om å prøve å forstå den andres kultur og skikker på dennes egne premisser – selv om man ikke er enig.",
    feil: { 1: "Uvilje til å akseptere andres kultur er etnosentrisme – det stikke motsatte av metodisk relativisme.", 2: "'At alt er relativt' er filosofisk relativisme, ikke metodisk relativisme." },
    kilde: "Kulturforståelse – metodisk relativisme – Modul 3"
  },

  228: {
    riktig: "Hvis vekteren oppdager en feil i instruksen, skal dette rapporteres til nærmeste leder. Vekteren retter ikke opp feilen på egen hånd.",
    feil: { 0: "Vekteren skal ikke rette opp feilen på egenhånd – det er ikke innenfor vekterens mandat.", 1: "Å varsle kunden direkte er ikke vekterens oppgave – kommunikasjon med kunden går gjennom ledelsen." },
    kilde: "Objektinstruks – Modul 1"
  },

  229: {
    riktig: "Instruksen kan inneholde viktige detaljer – som tidspunkter, spesifikke krav og unntak – som direkte påvirker hvordan oppdraget skal utføres.",
    feil: { 0: "Tilleggsstørrelser finnes ikke i instruksen – instruksen handler om operative gjøremål.", 2: "Kunden gjennomfører ikke kunnskapsprøver basert på instruksen." },
    kilde: "Objektinstruks – Modul 1"
  },

  230: {
    riktig: "Magnetkontakter monteres på dører og vinduer for å registrere åpning og utløse alarm hvis de åpnes uten at systemet er deaktivert.",
    feil: { 0: "Klær og sko er ikke relevante steder for magnetkontakter i alarmsystemer.", 1: "Magnetkontakt på alarmsentralenheten er ikke standardbruk – det er andre sikringsmekanismer der." },
    kilde: "Alarmsystemer – magnetkontakt – Modul 8"
  },

  231: {
    riktig: "En PIR-detektor utstyrt med kamera regnes ikke som kameraovervåkning etter personopplysningsloven og rammes ikke av de samme kravene.",
    feil: { 0: "PIR med kamera trenger ikke meldes til Datatilsynet.", 1: "Det er ikke krav om skilting for PIR med kamera.", 3: "Det er ikke krav om å varsle gjester spesifikt om PIR med kamera." },
    kilde: "Personopplysningsloven – PIR-kamera – Modul 8"
  },

  232: {
    riktig: "Hengende plakater i butikker som beveger seg i luftstrømmen kan gi falsk alarm til en PIR-detektor fordi bevegelsen ligner menneskelig bevegelse.",
    feil: { 0: "Antimaskfunksjon er en sikkerhetsfunksjon mot sabotasje – ikke en normal driftsfeilkilde.", 2: "PIR/MW i samme rom er en systemteknisk utfordring, ikke en typisk daglig feilkilde.", 3: "Feil programmering er en installatørfeil, ikke en typisk driftsfeilkilde." },
    kilde: "PIR – feilkilder – Modul 8"
  },

  233: {
    riktig: "Romsikring betyr sikring av innvendig areal i bygningen – det er detektorer og komponenter som overvåker rom og soner innendørs.",
    feil: { 0: "Sikring av tyveriattraktive gjenstander er objektsikring.", 1: "Sikring i soner er en del av romsikring, men ikke den fullstendige definisjonen.", 2: "Sikring av overføring av alarmsignaler er alarmoverføring – ikke romsikring." },
    kilde: "Sikringsprinsipper – romsikring – Modul 8"
  },

  234: {
    riktig: "Som vekter er man forpliktet til å følge instruks, arbeidsavtale og firmaets verdier – også om det strider mot personlig religiøs eller kulturell overbevisning.",
    feil: { 1: "Religionsfriheten gjelder, men gir ikke rett til å nekte lovlig jobbinstruks i arbeidsforholdet.", 2: "Arbeidsgiver har tilretteleggingsplikt, men ikke plikt til å frita vektere fra kjerneoppgaver i jobben." },
    kilde: "Etikk og instruks – Modul 4"
  },

  235: {
    riktig: "Brudd på etiske retningslinjer kan føre til at kunden sier opp kontrakten med vaktselskapet – en svært reell og alvorlig konsekvens.",
    feil: { 0: "Etiske brudd har konsekvenser selv uten lovbrudd – null konsekvenser er feil.", 2: "Fengsel krever straffbare handlinger – etiske brudd fører ikke automatisk til fengsel." },
    kilde: "Etikk – konsekvenser – Modul 4"
  },

  236: {
    riktig: "Vektere har strengere yrkesetikk fordi kunden må ha tillit til at vekteren beskytter og ikke misbruker tilgang til verdier, lokaler og sensitiv informasjon.",
    feil: { 0: "Vektere tenker selvsagt selv – det er ikke årsaken til strengere etikk.", 1: "Sammenligning med politiet er ikke den primære årsaken til strengere etikk.", 2: "Bransjehistorien er ikke den primære begrunnelsen for strengere etikk." },
    kilde: "Etikk – Modul 4"
  },

  237: {
    riktig: "Rekkefølgen ved brann – varsle, redde, slokke – avgjøres av situasjonen. Det er ingen fast rekkefølge som gjelder i alle tilfeller.",
    feil: { 0: "Å alltid slokke først kan koste liv – redning og varsling kan være mer akutt.", 1: "Å alltid redde først er heller ikke riktig – noen ganger er varsling mest kritisk.", 3: "Å alltid varsle først er heller ikke riktig – situasjonen avgjør alltid." },
    kilde: "Brannvern – prioritering – Modul 14"
  },

  238: {
    riktig: "CO2 er egnet for branner i elektriske anlegg fordi det ikke leder strøm og ikke skader det elektriske utstyret.",
    feil: { 1: "CO2 er ikke godkjent for faste stoffer (klasse A) – der brukes vann eller pulver.", 2: "CO2 har kort kastelengde – ikke lang." },
    kilde: "Slokkemidler – CO2 – Modul 14"
  },

  239: {
    riktig: "Automatisk brannalarmanlegg er et aktivt brannverntiltak fordi det oppdager brann og varsler aktivt.",
    feil: { 0: "Seksjoneringsvegg er et passivt brannverntiltak.", 2: "Rømningsvei er et passivt sikkerhetstiltak.", 3: "Brannklassifiserte dører er passive brannverntiltak." },
    kilde: "Brannvern – aktive og passive tiltak – Modul 14"
  },

  240: {
    riktig: "ABC-pulver er godkjent som slokkemiddel i faste materialer og er det mest anvendelige slokkemidlet på markedet.",
    feil: { 1: "ABC-pulver har dårlig kjølende effekt – det er en av de kjente svakhetene ved dette midlet.", 2: "ABC-pulver er ikke egnet for frityroljer – dette krever klasse F-slokkemiddel." },
    kilde: "Slokkemidler – ABC-pulver – Modul 14"
  },

  241: {
    riktig: "Håndslokkere godkjent med klasse A er egnet for branner i faste materialer som tre, papir og tekstil.",
    feil: { 0: "Frityroljer er klasse F – det krever klasse F-slokkemiddel.", 1: "Gasser er klasse C.", 3: "Væsker er klasse B." },
    kilde: "Brannklasser – Modul 14"
  },

  242: {
    riktig: "Ved salg skal alkoholen drikkes utenfor salgsstedet, mens ved skjenking skal den drikkes på skjenkestedet.",
    feil: { 0: "Salg er ikke begrenset til hvem som helst – aldersgrenser gjelder ved salg akkurat som ved skjenking.", 2: "Man betaler for alkohol både ved salg og skjenking – det er ikke dette som skiller dem." },
    kilde: "Alkoholloven – salg vs. skjenking – Modul 13"
  },

  243: {
    riktig: "Ja, et skjenkested kan søke kommunen om utvidet skjenketid og få dette innvilget for et spesifikt arrangement.",
    feil: { 1: "Å melde fra er ikke tilstrekkelig – det kreves formell søknad og innvilgelse fra kommunen.", 2: "Det er mulig å utvide skjenketid – men det krever formell søknadsprosess." },
    kilde: "Alkoholloven – skjenketid – Modul 13"
  },

  244: {
    riktig: "En kontrollrapport skal inneholde kontrollørens observasjoner, dato, tid og ansattes håndtering av situasjonen.",
    feil: { 1: "Kommunens inndragningspraksis er ikke en del av selve kontrollrapporten.", 2: "Kontrollørens vurdering av sanksjon hører ikke i rapporten – det er kommunens ansvar å vurdere sanksjoner." },
    kilde: "Alkoholkontroll – rapport – Modul 13"
  },

  245: {
    riktig: "Politiet kan stenge et sted som skjenker alkohol uten bevilling. Det er den klare og primære hjemmelen for politiets stenging.",
    feil: { 1: "Alkoholreklame inne i lokalet er ikke stengegrunn for politiet.", 2: "Manglende alkoholfrie alternativer er ikke stengegrunn for politiet." },
    kilde: "Alkoholloven – politiets myndighet – Modul 13"
  },

  246: {
    riktig: "Gode og nøyaktige rapporter gir kunden dokumentasjon og kvittering på at tjenesten er levert som avtalt.",
    feil: { 1: "Rapporter beskytter vekteren juridisk, men det er ikke den primære hensikten med rapporteringen.", 2: "Kontrollmyndigheter krever ikke rapport fra hver enkelt vakt.", 3: "Politiet kan kreve rapporter i spesielle tilfeller, men det er ikke primærhensikten." },
    kilde: "Rapportlære – Modul 10"
  },

  247: {
    riktig: "I en vaktjournal skal alle hendelser, observasjoner og tiltak i løpet av vakten dokumenteres fullstendig.",
    feil: { 1: "Bare store hendelser er ikke tilstrekkelig – alt skal dokumenteres.", 2: "Egne refleksjoner hører ikke i vaktjournalen – bare faktiske observasjoner og handlinger.", 3: "Bare mindre hendelser er heller ikke riktig – alt relevante hendelser skal med." },
    kilde: "Rapportlære – vaktjournal – Modul 10"
  },

  248: {
    riktig: "Aksepter at personen ikke vil signere og noter det i rapporten. Man kan ikke tvinge noen til å signere en anmeldelse.",
    feil: { 0: "Å pågripe fordi personen nekter å signere er et feilaktig og ulovlig tiltak.", 1: "Personen har ingen signaturplikt – man kan ikke påtvinge dette." },
    kilde: "Rapportlære – anmeldelse – Modul 10"
  },

  249: {
    riktig: "Risiko er et uttrykk for graden av fare – det er en strukturert vurdering basert på sannsynlighet for og konsekvens av uønskede hendelser.",
    feil: { 1: "Samlede hendelser som har skjedd er historikk – ikke definisjonen av risiko.", 2: "Virksomhetens evne til å utføre oppgaver er operasjonell kapasitet – ikke risiko.", 3: "Hendelser fra kunder er en del av risikobildet, men ikke definisjonen av begrepet." },
    kilde: "Risikovurdering – Modul 7"
  },

  250: {
    riktig: "Identifisert risiko kan håndteres ved å akseptere den, begrense den, overføre den til andre eller fjerne den helt – fire strategier.",
    feil: { 0: "Å avgrense eller fjerne er bare to av fire strategier – overføring og aksept mangler.", 1: "Å varsle forsikringsselskapet er ikke en håndteringsstrategi i seg selv – overføring via forsikring er.", 3: "Å informere ansatte er ikke en risikohåndteringsstrategi." },
    kilde: "Risikohåndtering – Modul 7"
  },

  251: {
    riktig: "Ja, risikovurdering gjennomføres på flere nivåer – ledere vurderer oppdrag og kunder, mens vektere vurderer egensikkerheten i sin daglige tjeneste.",
    feil: { 0: "Arbeidstilsynet foretar ikke risikovurderinger på vegne av vaktselskapet.", 1: "Verneombudet bidrar til HMS-arbeid, men gjennomfører ikke alle risikovurderinger alene." },
    kilde: "Risikovurdering – nivåer – Modul 7"
  },

  252: {
    riktig: "Det finnes ingen fast fasit på gyldighetstid for risikovurderinger – de må jevnlig kontrolleres og oppdateres etter behov og endringer.",
    feil: { 0: "En fast dato en gang per år er for rigid og lite fleksibelt.", 2: "Hvert andre år er for sjelden og ikke lovpålagt som eneste krav.", 3: "En gang per måned er unødvendig hyppig og ikke lovpålagt." },
    kilde: "Risikovurdering – gyldighetstid – Modul 7"
  },

  253: {
    riktig: "Risikovurdering gjennomføres for å undersøke om en verdi er godt nok beskyttet mot uønskede hendelser og trusler.",
    feil: { 0: "Å leve opp til myndighetskrav er en effekt av risikovurderingen – ikke formålet.", 2: "Å vurdere om en verdi er verdt å beskytte er en prioriteringsprosess – ikke formålet med risikovurderingen.", 3: "Risikotillegg er et lønnsforhold som ikke har med risikovurdering å gjøre." },
    kilde: "Risikovurdering – formål – Modul 7"
  },

  254: {
    riktig: "Trusselvurdering gjøres for å kartlegge hvem som kan true virksomheten, når, hvor, hvordan og hvorfor – for å forstå trusselbildet.",
    feil: { 1: "Konflikter mellom ansatte hører til HR og arbeidsmiljø – ikke trusselvurdering.", 2: "Miljømessige hendelser er en del av risikobildet generelt, men trusselvurdering fokuserer på bevisste trusler.", 3: "Alle hendelser som kan gå galt er for bredt – trusselvurdering fokuserer på aktørbaserte trusler." },
    kilde: "Trusselvurdering – Modul 7"
  },

  255: {
    riktig: "Ved HLR er det anbefalte forholdet 30 hjertekompresjoner etterfulgt av 2 innblåsninger (30:2).",
    feil: { 0: "2:15 er et utdatert og feil HLR-forhold.", 1: "5:30 er omvendt og gir for få kompresjoner.", 3: "30:5 gir for mange innblåsninger i forhold til kompresjoner." },
    kilde: "HLR – Modul 12"
  },

  256: {
    riktig: "Brannsår avkjøles best med lunkent vann på ca. 20 grader i ca. 20 minutter. Husk: 20 grader i 20 minutter.",
    feil: { 0: "40 grader er for varmt og forverrer vevsskaden.", 1: "37 grader er for varmt til optimal avkjøling av brannsår.", 3: "Så kaldt vann som mulig i 60 minutter risikerer å gi hypotermi og sjokk." },
    kilde: "Brannskader – Modul 12"
  },

  257: {
    riktig: "Riktig ABCDE-rekkefølge er A (Luftvei), B (Pust), C (Sirkulasjon), D (Bevissthetsnivå), E (Avdekking av andre skader).",
    feil: { 0: "B,C,D,E,A er feil – luftvei (A) er alltid absolutt første prioritet.", 1: "A,C,D,E,B er feil – pust (B) kommer umiddelbart etter luftvei, ikke sist.", 3: "E,A,B,C,D er feil – avdekking av skader er alltid siste steg, ikke første." },
    kilde: "ABCDE – Modul 12"
  },

  258: {
    riktig: "Anbefalt tempo for hjertekompresjoner er ca. 100 per minutt – jevnt, effektivt og konsistent.",
    feil: { 0: "60 per minutt er for sakte og gir utilstrekkelig blodsirkulasjon.", 1: "80 per minutt er under anbefalt minimum.", 3: "120 per minutt er litt for raskt etter gjeldende internasjonale retningslinjer." },
    kilde: "HLR – tempo – Modul 12"
  },

  259: {
    riktig: "Beskytt hodet mot slag fra krampene og ring 113 ved anfall som varer over 5 minutter. Ikke hold fast personen.",
    feil: { 1: "Hold aldri fast en person med epileptisk anfall – det kan skade vedkommende ytterligere.", 2: "Å holde personen varm er sekundært – hodebeskyttelse og sikker posisjon er primært.", 3: "Å holde publikum på avstand er nyttig, men er ikke det viktigste tiltaket." },
    kilde: "Epilepsi – Modul 12"
  },

  260: {
    riktig: "Hev det blødende stedet og legg press direkte på såret for å redusere blødningen effektivt.",
    feil: { 1: "Å legge det blødende stedet nedover øker blodtrykket og forverrer blødningen.", 2: "Bomull og plaster er absolutt utilstrekkelig ved kraftig ytre blødning.", 3: "Å heve beina er sjokkleie – det stopper ikke blødning i armen." },
    kilde: "Blødninger – Modul 12"
  },

  261: {
    riktig: "Det viktigste er hvordan DU subjektivt opplevde situasjonen – vurderingen av nødverge er basert på gjerningspersonens subjektive perspektiv.",
    feil: { 0: "Objektivt sett er ikke det avgjørende – det er den subjektive opplevelsen i øyeblikket som vurderes.", 2: "Hva vektere generelt ville oppfattet er ikke det rettslige utgangspunktet – det er individuelt." },
    kilde: "Nødverge – subjektiv vurdering – Modul 15"
  },

  262: {
    riktig: "Nødverge kan benyttes av alle for å forsvare noens liv eller helse mot et ulovlig angrep – ikke bare av offeret selv.",
    feil: { 0: "Det er ikke begrenset til offeret alene – alle kan gripe inn for å hjelpe.", 2: "Man trenger ikke at offeret ber om hjelp – man kan gripe inn uoppfordret." },
    kilde: "Nødverge – Modul 15"
  },

  263: {
    riktig: "Informert samtykke fra mindreårige kan erstatte lovhjemmel ved MINDRE inngrep – ikke ved alle typer inngrep.",
    feil: { 0: "Samtykke fra mindreårige kan ikke alltid erstatte lovhjemmel – bare ved klart avgrensede mindre inngrep.", 1: "Det er ikke riktig at mindreårige aldri kan gi gyldig samtykke." },
    kilde: "Samtykke – mindreårige – Modul 15"
  },

  264: {
    riktig: "Etter lovlig pågripelse skal vekteren straks overgi den pågrepne til politiet – dette er den lovpålagte plikten.",
    feil: { 0: "Det er politiets ansvar å sørge for advokat – ikke vekterens.", 2: "Offentlig forsvarer oppnevnes av rettssystemet – ikke av vekteren." },
    kilde: "Pågripelse – Modul 15"
  },

  265: {
    riktig: "Ja, alle borgere har plikt til å bistå hjelpeløse personer. Denne plikten gjelder uavhengig av om man er i vekteruniform eller ikke.",
    feil: { 0: "Uniform er ikke et krav for hjelpeplikt – plikten gjelder alle borgere.", 1: "Det er faktisk en plikt å hjelpe hjelpeløse personer – ikke bare en mulighet.", 2: "Å komme for sent på jobb er ikke en gyldig grunn til å la en bevisstløs person ligge." },
    kilde: "Borgerlig hjelpeplikt – Modul 15"
  },

  266: {
    riktig: "Nødrett brukes for å begå en ellers ulovlig handling i en nødsituasjon – for å avverge fare og redde liv eller helse.",
    feil: { 0: "Å avverge et ulovlig angrep er nødverge – ikke nødrett. Det er to ulike rettslige grunnlag.", 2: "Manglende lovhjemmel ved pågripelse er ikke et tilfelle for nødrett." },
    kilde: "Nødrett – Modul 15"
  },

  267: {
    riktig: "Strafferamme over 6 måneder er ikke et straffbarhetsvilkår – det er en konsekvens av at noe er straffbart, ikke et vilkår for straffbarheten.",
    feil: { 1: "Skyld (forsett eller uaktsomhet) er et subjektivt straffbarhetsvilkår.", 2: "Fraværet av straffefritaksgrunner er et straffbarhetsvilkår." },
    kilde: "Straffbarhetsvilkår – Modul 15"
  },

  268: {
    riktig: "Det er ulovlig for en vekter å bruke pepperspray eller andre gassvåpen i tjenesten – uavhengig av formål og situasjon.",
    feil: { 0: "Hensikten om nødverge endrer ikke det faktum at gassvåpen er forbudt for vektere.", 2: "Arbeidsgiver kan ikke gi tillatelse til noe som er forbudt i lov." },
    kilde: "Vekterens myndighetsgrenser – Modul 15"
  },

  269: {
    riktig: "Vektere kan pågripe når mistenkte treffes på fersk gjerning eller ferske spor, og vilkårene i straffeprosessloven er oppfylt.",
    feil: { 0: "Fare ved opphold og varslet politi er ikke alene tilstrekkelig hjemmel for pågripelse.", 2: "Fare ved opphold alene er heller ikke nok – vilkårene i straffeprosessloven § 171 eller § 173 må oppfylles." },
    kilde: "Pågripelse – Modul 15"
  },

  270: {
    riktig: "En beredskapsplan skal inneholde: hvem som leder beredskapshåndteringen, instrukser for gruppen, nødvendige lokaler og utstyr, og varslingsplan.",
    feil: { 0: "Inventarliste og adresselister er driftsadministrasjon – ikke kjerneinnholdet i en beredskapsplan.", 2: "Forsikringsavtaler er ikke en del av beredskapsplanen." },
    kilde: "Beredskapsplaner – Modul 9"
  },

  271: {
    riktig: "Kriseberedskap handler om hendelser som i betydelig grad kan skade ansatte, kunder, omdømme, strukturelle forhold eller kontinuerlig drift.",
    feil: { 0: "Kriseberedskap handler ikke om enkeltpersoners private livssituasjon.", 1: "Privat krisehjelp er noe annet enn virksomhetens kriseberedskap.", 2: "Å være forberedt er riktig, men alternativ 3 gir den fullstendige og korrekte definisjonen." },
    kilde: "Kriseberedskap – Modul 9"
  },

  272: {
    riktig: "En god beredskapsplan er enkel, oversiktlig, inneholder varslingsplan og viser tydelig hvem som gjør hva, hvor, når og hvordan.",
    feil: { 0: "Oversettelse til ulike språk er nyttig i praksis, men er ikke kjerneegenskapen ved en god beredskapsplan.", 2: "Omfanget og mengde tekst gjør ikke planen bedre – enkelhet er avgjørende i en krisesituasjon.", 3: "Statistikk hører ikke i en operativ beredskapsplan." },
    kilde: "Beredskapsplaner – Modul 9"
  },

  273: {
    riktig: "Empati i en konfliktsituasjon uttrykkes best gjennom aktiv lytting og å vise forståelse for den andres situasjon og følelser.",
    feil: { 0: "Å unnvike er det stikke motsatte av empati.", 2: "Å haste videre er mangel på interesse og omsorg – ikke empati.", 3: "Å gi den andre rett i alt er ikke empati – det er kapitulasjon og ikke nødvendigvis riktig." },
    kilde: "Empati – Modul 2"
  },

  274: {
    riktig: "De viktigste verktøyene i konflikthåndtering er gode forberedelser og gode kommunikasjonsevner – ikke fysisk utstyr eller kampteknikker.",
    feil: { 0: "Fysisk utstyr er sikkerhetstiltak, ikke konflikthåndteringsverktøy.", 2: "Selvforsvarskurs og fysikk er egensikkerhetstiltak, ikke primære konflikthåndteringsverktøy.", 3: "Klare instrukser er viktige, men kommunikasjonsevner er det sentrale verktøyet." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  275: {
    riktig: "En rusmisbruker som sitter rolig på en benk gjør ingenting galt og skal la sitte. Ingen grunn til å gripe inn mot fredelig atferd.",
    feil: { 0: "Å ringe politiet er uforholdsmessig – personen gjør ingenting galt.", 1: "Å overvåke nøye er unødvendig og stigmatiserende.", 2: "Å be personen forlate basert på rusbakgrunn er stereotypisering og diskriminering." },
    kilde: "Konflikthåndtering – stereotypier – Modul 2 og 3"
  },

  276: {
    riktig: "En god konflikthåndterer er god til å megle frem løsninger som fungerer for alle involverte parter – ikke bare å 'vinne' situasjonen.",
    feil: { 0: "Å fjerne ubehagelige personer er et siste virkemiddel, ikke en god konflikthåndteringsevne.", 2: "Å irettesette folk er autoritær atferd – ikke profesjonell konflikthåndtering.", 3: "Å løse slåsskamper er en svært snever og negativ forståelse av konflikthåndtering." },
    kilde: "Konflikthåndtering – Modul 2"
  },

  277: {
    riktig: "Beholde roen og diskutere på et saklig nivå er den profesjonelle og mest effektive måten å håndtere trakasserende kommentarer på.",
    feil: { 0: "Å hente flere vektere eskalerer situasjonen unødvendig og er ikke proporsjonal respons.", 1: "Å ringe politiet er ikke proporsjonal respons på verbale kommentarer alene.", 2: "Speiling av trakasserende atferd forsterker og eskalerer konflikten." },
    kilde: "Konflikthåndtering – trakassering – Modul 2"
  },

  278: {
    riktig: "Bruk kroppsspråk og led personen forsiktig vekk – nonverbal kommunikasjon er svært effektivt ved språkbarriere.",
    feil: { 1: "Å ta tak i armen er maktbruk som krever proporsjonalitet og begrunnelse – det er ikke første tiltak.", 2: "Å ringe politiet for tolk er uforholdsmessig ved en normal bortvising.", 3: "Å la personen bli fordi du ikke klarer å kommunisere er feil – kreativ kommunikasjon er din oppgave." },
    kilde: "Konflikthåndtering – kommunikasjonsbarrierer – Modul 2"
  },

  279: {
    riktig: "Kritisk evaluering av egen innsats og aktiv læring av egne feil er den beste og mest systematiske veien til å bli bedre i konflikthåndtering.",
    feil: { 1: "Selvforsvarsteknikker er nyttige for egensikkerhet, men ikke for kommunikasjonsbasert konflikthåndtering.", 2: "Å fremprovosere konflikter er uetisk og potensielt farlig.", 3: "Tilbakemelding fra motparten er ett verktøy, men egenrefleksjon er enda viktigere og mer systematisk." },
    kilde: "Konflikthåndtering – egenutvikling – Modul 2"
  },

  280: {
    riktig: "Vekteren har selv det primære ansvaret for å ikke utsette seg unødvendig for vold – egensikkerhet er vekterens eget ansvar i tjeneste.",
    feil: { 1: "Politiet kan hjelpe, men er ikke ansvarlig for vekterens personlige sikkerhet i tjeneste.", 2: "Lederen har overordnet ansvar for tilrettelegging, men vekteren bærer ansvaret for egne valg.", 3: "Objektets sikkerhetssjef er ikke ansvarlig for vekterens personlige sikkerhet." },
    kilde: "Egensikkerhet – Modul 2"
  },

  281: {
    riktig: "Speiling styrker kontakten mellom partene, gir en følelse av å bli forstått og bygger tillit – noe som naturlig reduserer konfliktnivået.",
    feil: { 1: "Speiling handler ikke om selvransakelse for motparten.", 2: "Speiling er en kommunikasjonsteknikk for tillit – ikke en forberedelse på fysisk angrep.", 3: "Konfliktdempende kroppsspråk er ett element, men den fulle effekten er økt kontakt og tillit." },
    kilde: "Konflikthåndtering – speiling – Modul 2"
  },

  282: {
    riktig: "Forebygging av uønskede hendelser er den naturlige og forventede samhandlingsarenaen mellom vektere og politiet.",
    feil: { 0: "Innsamling av sensitive personopplysninger er ikke en legitim samhandlingsarena.", 1: "Pågripelser er i en gråsone – vektere kan bistå politiet, men det er ikke den typiske samhandlingen.", 3: "Husransakelse er eksklusivt politiets myndighet – vektere kan ikke delta i det." },
    kilde: "Samarbeid med politiet – Modul 11"
  },

  283: {
    riktig: "Vektere samhandler med offentlige myndigheter fordi de i tjeneste ofte møter situasjoner som krever samarbeid med nødetatene.",
    feil: { 1: "Vektere har ikke begrenset politimyndighet som standard – det gis bare eksplisitt av politiet i spesielle tilfeller.", 2: "Vektere opptrer ikke på vegne av politiet – de har selvstendig mandat etter vaktvirksomhetsloven.", 3: "Vektere har ikke en generell plikt til å gripe inn i situasjoner utenfor tjeneste." },
    kilde: "Samarbeid med offentlige myndigheter – Modul 11"
  },

  284: {
    riktig: "Identitet formes av mange faktorer: foreldrenes opprinnelsesland, kjønn, utdannelse, yrkesvalg, alder, politisk tilhørighet og mer.",
    feil: { 0: "Religion er én faktor, men identitet er mye bredere og sammensatt enn bare religiøs overbevisning.", 1: "Etnisk opprinnelse er én faktor, men langt fra den eneste.", 2: "Utseende og klesstil er overfladiske faktorer sammenlignet med de dypere identitetsskapende elementene." },
    kilde: "Mangfold – identitet – Modul 3"
  },

  285: {
    riktig: "Uten avtale med tillitsvalgte er maksimal overtid 200 timer per kalenderår – dette er lovens klare grense.",
    feil: { 1: "Det er faktisk en klar begrensning på 200 timer – å si det er ingen begrensning er feil.", 2: "300 timer er over grensen uten tillitsvalgtavtale.", 3: "500 timer er langt over lovens grense og ikke tillatt." },
    kilde: "AML – overtid – Modul 6"
  },

  286: {
    riktig: "AML er ufravikelig i den forstand at lovens minimumskrav kun kan fravikes der loven selv eksplisitt åpner for det i den aktuelle paragrafen.",
    feil: { 1: "Frivillighet fra den ansatte alene er ikke tilstrekkelig til å fravike loven.", 2: "Loven kan fravikes der den selv åpner for det – men ikke generelt eller fritt.", 3: "Bedriftens ønske er ikke tilstrekkelig grunn til å fravike arbeidsmiljølovens krav." },
    kilde: "AML – ufravikelighet – Modul 6"
  },

  287: {
    riktig: "HMS står for Helse, Miljø og Sikkerhet – de tre grunnpilarene i alt systematisk arbeidsmiljøarbeid.",
    feil: { 0: "Sykdom er ikke det tredje elementet – det heter Sikkerhet.", 2: "Sikring brukes i fysisk sikringskontekst – i HMS-sammenheng er det Sikkerhet.", 3: "Skade er ikke en del av HMS-forkortelsen." },
    kilde: "HMS – Modul 6"
  },

  288: {
    riktig: "Cannabis kan gi paranoia, psykose, konsentrasjonsvansker og økt risiko for kreft. Dette er de dokumenterte skadevirkningene.",
    feil: { 0: "Bruddskader er ikke typiske direkte skadevirkninger av cannabis.", 1: "Høyenergiskader og psykose er feilaktig kombinasjon – høyenergiskader er ikke en typisk cannabisskade." },
    kilde: "Cannabis – skadevirkninger – Modul 13"
  },

  289: {
    riktig: "Amfetamin tilhører gruppen sentralstimulerende stoffer – det øker aktivitetsnivå, puls, energi og kan gi aggressiv atferd.",
    feil: { 0: "Amfetamin er ikke et hallusinogen – det forvrengler ikke virkelighetsoppfatningen primært.", 2: "Amfetamin er det stikke motsatte av sentraldempende – det er kraftig sentralstimulerende." },
    kilde: "Rus & Narkotika – amfetamin – Modul 13"
  },

  290: {
    riktig: "Hvis vekteren oppdager feil i instruksen, rapporteres dette til nærmeste sjef. Vekteren tar ikke egne avgjørelser om å endre instruksen.",
    feil: { 1: "Å orientere kunden og rette opp feilen er ikke innenfor vekterens mandat – det går gjennom ledelsen.", 2: "'Dette er ikke ditt problem' er feil – vekteren skal melde fra om feil i instruksen." },
    kilde: "Objektinstruks – Modul 1"
  },

  291: {
    riktig: "Krav til vekter og uniform finnes i Lov om vaktvirksomhet og interne instruksverk i bedriften.",
    feil: { 0: "Politiinstruksen regulerer politiet – ikke vektere.", 2: "Håndboken for arbeidsmiljøloven handler om arbeidsmiljø – ikke vekteruniform." },
    kilde: "Vaktvirksomhetsloven – Modul 1"
  },

  292: {
    riktig: "Service som tjenesteyting betyr å levere verdi og god opplevelse før, under og etter leveransen – en fullstendig servicereise.",
    feil: { 0: "Det latinske uttrykket er ikke den faglige definisjonen som brukes i vekterutdanningen.", 1: "Utførelse av et oppdrag er vekterens primære plikt, ikke service i seg selv." },
    kilde: "Service og kvalitet – Modul 5"
  },

  293: {
    riktig: "Instruksen inneholder informasjon som er direkte viktig for utførelsen av jobben – uten å lese den risikerer man å misse kritiske detaljer og gjøre feil.",
    feil: { 1: "Koder finnes ikke nødvendigvis i instruksen – det er ikke den primære hensikten med instruksen.", 2: "'Uten instruks, ingen kunnskap' er overdrevet og upresist som påstand." },
    kilde: "Objektinstruks – Modul 1"
  },

  294: {
    riktig: "Vekterens kjernefunksjoner er å observere, analysere og aksjonere – dette er den fundamentale triaden i vekterrollen.",
    feil: { 1: "Service er viktig, men er ikke den primære og viktigste oppgaven.", 2: "Kontrolloppgaver er en del av jobben, men 'observere, analysere, aksjonere' er mer dekkende.", 3: "Rapportering er viktig, men analyse og aksjon kommer før rapportering." },
    kilde: "Vekterens rolle – Modul 1"
  },

  295: {
    riktig: "Skallsikring er sikring av byggets fasade, dører, vinduer, tak og gulv – byggets ytre skall som fysisk barriere.",
    feil: { 0: "Utvendig sikring av området rundt er periferisikring – ikke skallsikring.", 1: "Innvendig sikring av rom er romsikring.", 2: "Sikring av spesielle eiendeler er objektsikring." },
    kilde: "Sikringsprinsipper – skallsikring – Modul 8"
  },

  296: {
    riktig: "PIR-detektorer kan gi falske alarmer fra direkte sollys, sterke billys, hunder, katter, andre dyr og gardiner som beveger seg i luftstrøm.",
    feil: { 0: "PIR tiltrekker seg ikke fukt – det er ikke en relevant feilkilde.", 2: "Tildekking av sensoren er sabotasje – ikke en typisk driftsfeilkilde.", 3: "Feil programmering er en installatørfeil, ikke en typisk daglig driftsfeilkilde." },
    kilde: "PIR – feilkilder – Modul 8"
  },

  297: {
    riktig: "Romsikring er detektorer og komponenter som spesifikt sikrer enkeltrom – innvendig sikring av definerte rom i bygningen.",
    feil: { 0: "Avlyttingsutstyr er ikke romsikring i alarmsystemteknisk forstand.", 1: "Alt innvendig er for bredt – romsikring er spesifikt for romovervåkning med detektorer." },
    kilde: "Sikringsprinsipper – romsikring – Modul 8"
  },

  298: {
    riktig: "Magnetkontakter brukes på vinduer, dører og porter for å registrere uønsket åpning og utløse alarm.",
    feil: { 1: "Safer sikres ikke typisk med magnetkontakter – det brukes andre metoder.", 2: "Malerier og kunstgjenstander er objektsikring med vibrasjonssensorer eller andre metoder." },
    kilde: "Magnetkontakt – Modul 8"
  },

  299: {
    riktig: "Nei – et kamera som filmer naboens veranda er ikke tillatt. Det er et inngrep i naboens personvern som er beskyttet av loven.",
    feil: { 0: "Det er ikke tillatt å filme naboens private eiendom med private kameraer.", 1: "Svart/hvitt-kamera gir ingen juridisk unntak for filming av naboens eiendom." },
    kilde: "Kameraovervåkning – Modul 8"
  },

  300: {
    riktig: "Objektsikring er sikring av spesifikke gjenstander med verdi – som malerier, safe eller serverutstyr.",
    feil: { 1: "Offentlige bygninger sikres av skallsikring og andre tiltak, men selve betegnelsen 'objektsikring' gjelder spesifikke eiendeler.", 2: "Dører, porter og vinduer er skallsikring – ikke objektsikring." },
    kilde: "Sikringsprinsipper – objektsikring – Modul 8"
  },

  301: {
    riktig: "Lytt høflig til kunden, men forklar at du ikke kan gjøre noe med interne ledelseskonflikter. Vekterens rolle er å utføre oppdraget – ikke å involvere seg i interne konflikter.",
    feil: { 1: "Å kontakte kundens ledelse er ikke vekterens rolle – det er utenfor mandatet.", 2: "Å eskalere til din egen ledelse er unødvendig i dette tilfellet – lytt og avvis høflig.", 3: "Å hjelpe personen på alle mulige måter er utenfor vekterens mandat og kan skape problemer." },
    kilde: "Etikk og rolle – Modul 4"
  },

  302: {
    riktig: "Brudd på taushetsplikten kan føre til skriftlig advarsel og i verste fall oppsigelse fra arbeidsforholdet.",
    feil: { 0: "Det er absolutt konsekvenser – å si ingenting er feil.", 2: "Automatisk politianmeldelse skjer ikke – det krever at bruddet i tillegg utgjør en straffbar handling." },
    kilde: "Taushetsplikt – konsekvenser – Modul 4"
  },

  303: {
    riktig: "En 6 kg pulverslokker tømmes på 12–15 sekunder. Det er viktig å kjenne dette for å bruke slokkeren effektivt og ikke slippe opp midtveis.",
    feil: { 1: "20–25 sekunder er for lenge – pulverslokkere er mye raskere.", 2: "40–60 sekunder er feil og gjelder andre typer og størrelser slokkere." },
    kilde: "Slokkemidler – pulverslokker – Modul 14"
  },

  304: {
    riktig: "OBS: Dette spørsmålet er hentet fra en eksamenstest der 'Ja, rent vann leder ikke strøm' var markert som riktig svar. I alminnelig brannvernlære frarådes vann alltid på elektriske anlegg. Lær det riktige svaret fra din spesifikke eksamen.",
    feil: { 1: "Det finnes ingen 50-volts grense i regelverket.", 2: "I praksis frarådes vann på elektriske anlegg – men eksamen hadde Ja som svar." },
    kilde: "OBS: Kontroversielt spørsmål – følg eksamenssvar"
  },

  305: {
    riktig: "CO2 er klassifisert som klasse B-slokkemiddel – egnet for væsker og elektriske anlegg.",
    feil: { 1: "CO2 er en tørr gass – den gjør ikke brannstedet vått.", 2: "CO2 fortrenger oksygen – ikke varme direkte. Det er to ulike slokkemekanismer." },
    kilde: "Slokkemidler – CO2 – Modul 14"
  },

  306: {
    riktig: "ABC-pulver er det mest anvendelige slokkemidlet på markedet – det kan brukes på de fleste typer branner (klasse A, B og C).",
    feil: { 1: "ABC-pulver fjerner ikke alle elementer i branntrekanten effektivt – særlig varmen fjernes dårlig.", 2: "ABC-pulver er ikke egnet for frityroljer – dette krever spesielt klasse F-slokkemiddel.", 3: "Standard ABC-pulver fungerer godt i kulde – frost er ikke en generell begrensning." },
    kilde: "Slokkemidler – ABC-pulver – Modul 14"
  },

  307: {
    riktig: "Det er fire spredningsmåter for brann: ledning, stråling, strømning og flyvebrann – ikke to og ikke bare én.",
    feil: { 0: "To spredningsmåter er for lite – stråling og strømning mangler i dette alternativet.", 2: "Brannspredning gjelder både inne og ute – ikke bare utendørs.", 3: "Røyk som antennes er et eksempel på spredning, men ikke en fullstendig beskrivelse av alle fire måter." },
    kilde: "Brannspredning – Modul 14"
  },

  308: {
    riktig: "Alkoholloven bruker begrepet 'åpenbart påvirket av rusmidler' – og dette inkluderer ALLE typer rusmidler, ikke bare alkohol og ikke bare narkotika.",
    feil: { 1: "Ikke bare alkohol – alle rusmidler er inkludert i dette begrepet.", 2: "Ikke bare narkotika – alkohol er fullt inkludert i forbudet." },
    kilde: "Alkoholloven – åpenbart påvirket – Modul 13"
  },

  309: {
    riktig: "Butikk og Vinmonopol er salgssteder (drikking skjer utenfor), mens pub, restaurant og nattklubb er skjenkesteder (drikking skjer på stedet).",
    feil: { 0: "Salg ved bardisk vs. bord handler om serveringsmetode, ikke skillet mellom salg og skjenking.", 1: "Det er en viktig og klar juridisk forskjell mellom salg og skjenking." },
    kilde: "Alkoholloven – salg vs. skjenking – Modul 13"
  },

  310: {
    riktig: "Det er ikke lov å kjøpe eller låne alkohol fra et annet utested – hvert bevillingssted er ansvarlig for sin egen beholdning og kan ikke supplere fra andre.",
    feil: { 0: "Det er ikke tillatt å kjøpe eller låne alkohol mellom skjenkesteder.", 2: "Helligdager er ikke relevant – det er generelt forbudt uavhengig av dag." },
    kilde: "Alkoholloven – Modul 13"
  },

  311: {
    riktig: "Politiet kan stenge et utested for brudd på alkoholloven, spesielt ved salg av alkohol uten bevilling.",
    feil: { 1: "Brann er et brannvernspørsmål – ikke et alkohollovsspørsmål.", 2: "Politiet kan faktisk stenge utsteder – at de ikke kan er direkte feil." },
    kilde: "Alkoholloven – politiets myndighet – Modul 13"
  },

  312: {
    riktig: "Mistenkelig baseres på hva man observerer hos andre (atferd), mens mistenksom er en egenskap ved den som observerer (holdning).",
    feil: { 1: "Det er en viktig og nyttig distinksjon i rapportspråk.", 2: "Det er omvendt – mistenkelig er om objektet/personen, mistenksom er om observatøren." },
    kilde: "Rapportlære – språkbruk – Modul 10"
  },

  313: {
    riktig: "En egenrapport skal beskrive alle relevante spørsmål, være objektivt skrevet og bruke riktige faglige betegnelser.",
    feil: { 0: "Egenrapport er ikke en kladd – den er et offisielt og viktig dokument.", 1: "Antagelser skal ikke med i en objektiv rapport – bare fakta.", 2: "Ingen skrivefeil er viktig, men det er ikke den fullstendige definisjonen av en god egenrapport." },
    kilde: "Rapportlære – egenrapport – Modul 10"
  },

  314: {
    riktig: "Korrekt rapportering er å skrive: 'Alle lys avslått' – konkret, faktabasert og spesifikk.",
    feil: { 1: "Man rapporterer faktisk utførte gjøremål – å slukke lys er et gjøremål som skal dokumenteres.", 2: "'Alt ok' er for upresist og gir kunden ingen informasjon om hva som faktisk ble gjort." },
    kilde: "Rapportlære – Modul 10"
  },

  315: {
    riktig: "Ja, det er lovpålagte krav om risikovurdering i Arbeidsmiljøloven, Internkontrollforskriften og Brann- og eksplosjonsvernloven.",
    feil: { 0: "Det er absolutt et krav – å si nei er direkte feil.", 2: "Kravet gjelder uavhengig av antall ansatte.", 3: "Det er lovkrav, ikke forsikringskrav – forsikringsselskapet kan ikke alene pålegge dette." },
    kilde: "Risikovurdering – lovkrav – Modul 7"
  },

  316: {
    riktig: "Hjertestarter anbefaler støt når den er klar til å gi sjokk – den analyserer hjerterytmen og gir talemelding og instruksjon til brukeren.",
    feil: { 1: "Hjertestarter er ikke tidsstyrt – den baserer seg på kontinuerlig hjerterytmeanalyse.", 2: "Hjertestarter gir alltid anbefaling og instruksjon – det er hele poenget med apparatet." },
    kilde: "Hjertestarter – Modul 12"
  },

  317: {
    riktig: "Retten til fri ferdsel på offentlig sted er beskyttet av Den europeiske menneskerettskonvensjonen (EMK) – art. 5 om frihet og sikkerhet.",
    feil: { 0: "Politiet håndhever loven, men er ikke selve rettighetsgrunnlaget.", 2: "Straffeloven regulerer straffbare handlinger, men er ikke kilden til denne frihetsrettigheten.", 3: "EMD er domstolen som behandler brudd på EMK – ikke kilden til selve rettigheten." },
    kilde: "EMK – Modul 15"
  },

  318: {
    riktig: "En 14-åring med øks utgjør en trussel – vekteren har hjemmel til å stanse personen med nødvendig makt gjennom nødverge i straffeloven.",
    feil: { 0: "§ 171–§ 173 er vilkår for politiets pågripelse – vektere bruker nødverge i straffeloven som hjemmel.", 2: "Samtykke er ikke et krav for nødverge – man forsvarer seg mot angrepet." },
    kilde: "Nødverge – Modul 15"
  },

  319: {
    riktig: "Å spille høy musikk og bruke støyende verktøy på dagtid er i utgangspunktet ikke straffbart etter norsk lov – det kan være plaget og irriterende, men ikke straffbart.",
    feil: { 1: "Skremmende, hensynsløs eller plagsom opptreden er faktisk regulert som en mulig straffbar handling.", 2: "Uaktsomhet som bryter forsvarlighetskravet på en måte som medfører skade kan være straffbart." },
    kilde: "Straffbarhetsvilkår – Modul 15"
  },

  320: {
    riktig: "Stressmestring er tiltak for å hindre at stress får negative virkninger på kroppen og psyken – å regulere og håndtere stressresponsen konstruktivt.",
    feil: { 0: "Å redusere sykefravær er en mulig effekt av god stressmestring, men ikke definisjonen.", 2: "Å kontrollere utagerende personer er en tjenesteopgave, ikke stressmestring." },
    kilde: "Stress og stressmestring – Modul 2"
  },

  321: {
    riktig: "Det første man tenker på ved en aggressiv person er sin egen sikkerhet – egensikkerhet har alltid absolutt høyest prioritet.",
    feil: { 0: "AMK ringes ved medisinsk nødhjelp – ikke ved aggresjon alene.", 2: "Å speile aggresjon er farlig og eskalerende – det er absolutt ikke en innledende strategi." },
    kilde: "Egensikkerhet – Modul 2"
  },

  322: {
    riktig: "Den løpende vandelskontrollen for vektere gjennomføres 1 gang per år.",
    feil: { 1: "Annethvert år er for sjelden for vandelskontrollen.", 2: "Hvert 4. år gjelder regodkjenningseksamen – ikke vandelskontrollen." },
    kilde: "Vandel – Modul 1"
  },

  323: {
    riktig: "Empati er evnen til å forstå hva den andre føler og opplever – å sette seg inn i den andres perspektiv og ståsted.",
    feil: { 1: "Å føle tristhet og glede er emosjoner – ikke definisjonen av empati.", 2: "Mangel på empati er empatisvikt – det er det motsatte, ikke definisjonen.", 3: "Å åpne seg opp er selveksponering – ikke empati overfor andre." },
    kilde: "Empati – Modul 2"
  },

  324: {
    riktig: "Norge har innbyggere fra ca. 200 ulike opprinnelsesnasjonaliteter – det gjenspeiler Norges mangfoldige og flerkulturelle befolkning.",
    feil: { 0: "1500 er alt for mange – det finnes ikke engang så mange selvstendige land i verden.", 2: "60 er alt for lavt – Norge har langt mer mangfold enn det." },
    kilde: "Mangfold – Modul 3"
  },

  325: {
    riktig: "Arbeidsplan skal settes opp slik at de ansatte vet når de skal jobbe – dette er et grunnleggende lovkrav for forutsigbarhet.",
    feil: { 1: "Det finnes ingen 15-timers begrensning knyttet til arbeidsplaner i loven.", 2: "Verneombudet godkjenner ikke arbeidsplaner – det er arbeidsgivers ansvar i samarbeid med tillitsvalgte." },
    kilde: "AML – arbeidsplan – Modul 6"
  },

  326: {
    riktig: "Nattarbeid er tillatt når det er nødvendig – arbeidets art og behovet for tjenesten avgjør dette.",
    feil: { 1: "Nattarbeid er ikke begrenset til helger – det avhenger av tjenestens behov.", 2: "Det finnes faktisk regler om nattarbeid i arbeidsmiljøloven – det er regulert." },
    kilde: "AML § 10-11 – Modul 6"
  },

  327: {
    riktig: "Ecstacy (MDMA) klassifiseres i norsk vekterutdanning som hallusinogen – selv om det også har sentralstimulerende egenskaper.",
    feil: { 0: "Ecstacy er ikke sentraldempende – det har stimulerende og hallusinogene egenskaper.", 1: "Ecstacy har sentralstimulerende trekk, men klassifiseres her som hallusinogen i pensum." },
    kilde: "Rus & Narkotika – ecstacy – Modul 13"
  },

  328: {
    riktig: "Anabole steroider kan gjøre personen aggressiv og voldelig og gi kroppslige endringer som økt muskelmasse og hormonelle forstyrrelser.",
    feil: { 1: "Glad og likegyldig er ikke typisk for steroider – aggresjon er det karakteristiske symptomet.", 2: "Steroider har svært betydelige og dokumenterte fysiske og psykiske endringer." },
    kilde: "Rus & Narkotika – steroider – Modul 13"
  },

  329: {
    riktig: "GHB tilhører gruppen sentraldempende stoffer – det gir bedøvende og bevissthetssenkende effekt og er spesielt farlig i kombinasjon med alkohol.",
    feil: { 1: "GHB er ikke sentralstimulerende – det har stikk motsatt, dempende effekt.", 2: "GHB er ikke et hallusinogen." },
    kilde: "Rus & Narkotika – GHB – Modul 13"
  },

  330: {
    riktig: "Ved rus-relaterte førstehjelpsituasjoner må vekteren alltid tenke egensikkerhet først – bruk hansker og verneutstyr ved kontakt med bruker og brukerutstyr.",
    feil: { 0: "Å ikke tenke på egensikkerhet er feil og potensielt farlig – smittefare er reell.", 1: "Å tilkalle politiet og avvente er ikke tilstrekkelig – egensikkerhet og umiddelbare tiltak er nødvendig." },
    kilde: "Egensikkerhet – rus – Modul 12"
  },

  331: {
    riktig: "Pågripelse kan foretas etter straffeprosessloven § 176 når kravene i § 171 eller § 173 er oppfylt.",
    feil: { 0: "Opplæring i håndjern er ikke pågripelseshjemmel.", 2: "Fersk gjerning er vilkåret, men den korrekte lovhenvisningen er § 176 med vilkårene i § 171/173.", 3: "Gjennomført opplæring er ikke pågripelseshjemmel." },
    kilde: "Straffeprosessloven – Modul 15"
  },

  332: {
    riktig: "En vekters maktanvendelse er begrenset til nødvendig og forholdsmessig makt – dette er de sentrale rettslige kravene.",
    feil: { 0: "Vektere kan bruke makt i nødverge – det er ikke forbeholdt politiet.", 2: "Uniform gir ikke rett til politilignende maktbruk – vekteres hjemmel er straffeloven, ikke politiloven." },
    kilde: "Maktbruk – Modul 15"
  },

  333: {
    riktig: "Informert samtykke fra mindreårige kan erstatte lovhjemmel ved MINDRE inngrep – ikke ved alle typer inngrep.",
    feil: { 0: "Samtykke fra mindreårige kan ikke alltid erstatte lovhjemmel – bare ved klart avgrensede og mindre inngrep.", 1: "Det er ikke riktig at mindreårige aldri kan gi gyldig samtykke – de kan ved mindre inngrep." },
    kilde: "Samtykke – mindreårige – Modul 15"
  }

};

// =============================================================
// HJELPEFUNKSJONER FOR CLAUDE CODE
// =============================================================

/**
 * Hent komplett forklaring for et spørsmål
 * @param {number} id - Spørsmålets ID (1-333)
 * @param {number} valgIndex - Indeksen til det valgte (gale) svaret
 * @returns {object} - { riktig, feilForklaring, kilde }
 */
export function hentForklaring(id, valgIndex) {
  const f = FORKLARINGER[id];
  if (!f) return { riktig: "Forklaring ikke tilgjengelig.", feilForklaring: null, kilde: null };
  return {
    riktig: f.riktig,
    feilForklaring: f.feil && f.feil[valgIndex] ? f.feil[valgIndex] : null,
    kilde: f.kilde
  };
}

/**
 * Formater forklaring som visningsbar tekst
 * @param {number} id - Spørsmålets ID
 * @param {number} valgIndex - Indeksen til det valgte svaret
 * @returns {string} - Ferdig formatert forklaringstekst
 */
export function formaterForklaring(id, valgIndex) {
  const { riktig, feilForklaring, kilde } = hentForklaring(id, valgIndex);
  let tekst = `✓ ${riktig}`;
  if (feilForklaring) tekst += `\n\n✗ Hvorfor dette er feil: ${feilForklaring}`;
  if (kilde) tekst += `\n\n📖 Kilde: ${kilde}`;
  return tekst;
}
