// =============================================================
// VEKTERPRO – LÆREBOK
// Nasjonal grunnutdanning for vektere (Politidirektoratet 2022)
// Komplett referansemateriell for alle 15 moduler
// Brukes til å generere forklaringer på riktige/gale svar
// =============================================================

export const LAEREBOK = {

  // ============================================================
  // MODUL 1 – INTRODUKSJON TIL VEKTERYRKET OG SIKKERHETSBRANSJEN
  // ============================================================
  modul_1: {
    tittel: "Introduksjon til vekteryrket og sikkerhetsbransjen",
    timer: 1,
    kategorier: ["Uniform & Regler"],
    innhold: {

      vekterens_rolle: {
        tittel: "Vekterens rolle og oppgaver",
        tekst: `En vekter er et manuelt sikkerhetstiltak og har tre kjerneoppgaver:
- Observere: Følge med på hva som skjer i og rundt objektet
- Kontrollere: Sjekke at regler og instrukser overholdes
- Rapportere: Dokumentere observasjoner og hendelser skriftlig

Vekteren beskytter:
- Mennesker, liv og helse
- Privat og offentlig eiendom
- Miljø og kulturelle verdier

Vekteryrket er regulert av Lov om vaktvirksomhet (vaktvirksomhetsloven) og tilhørende forskrift (vaktvirksomhetsforskriften). Politidirektoratet godkjenner læreplaner og kursplaner.`
      },

      uniform_og_id: {
        tittel: "Uniform og ID-kort",
        tekst: `Krav til vekteruniform er fastsatt i vaktvirksomhetsforskriften:
- Uniformen skal være tydelig merket med ordet "VEKTER" på venstre bryst
- Uniformen skal IKKE ligne på politiets, forsvarets eller tollvesenets uniformer
- Vektere skal til enhver tid bære godkjent ID-kort synlig
- Uniformsartikler kan ikke velges fritt av den enkelte vekter – disse er regulert av vaktvirksomhetsforskriften og selskapets instrukser

Uniformen er viktig fordi den:
- Signaliserer autoritet og tilstedeværelse
- Skaper trygghetsfølelse hos publikum
- Skiller vekteren fra andre ansatte og publikum`
      },

      objektinstruks: {
        tittel: "Objektinstruks",
        tekst: `En objektinstruks er en skriftlig og nøyaktig beskrivelse av alle gjøremål vekteren skal utføre i tjenesten hos en bestemt kunde. Den er ikke:
- En teknisk beskrivelse av sikkerhetsanlegg
- Et politigodkjent anmeldelsesskjema

Objektinstruksen er vekterens viktigste arbeidsverktøy på det aktuelle oppdraget og danner grunnlaget for alt arbeid som utføres. Hvis vekteren oppdager en feil i instruksen, skal dette alltid rapporteres til nærmeste leder – vekteren retter ikke opp i instruksen selv uten godkjenning.`
      },

      lovgrunnlag: {
        tittel: "Lovgrunnlag for vaktvirksomhet",
        tekst: `Vaktvirksomhet er primært regulert av:
- Lov om vaktvirksomhet (vaktvirksomhetsloven)
- Forskrift om vaktvirksomhet (vaktvirksomhetsforskriften)
- Politiloven § 26 (begrenset politimyndighet)

Vaktvirksomhetsloven stiller krav til:
- Godkjenning av vaktselskapet
- Vandelsattest for alle vektere
- Godkjent opplæring (grunnutdanning og regodkjenning hvert 4. år)
- Bruk av hund i tjeneste (egne regler)

Vektere opererer under vaktvirksomhetsloven, IKKE politiloven. En vekter har derfor ikke politimyndighet med mindre dette er særskilt gitt av politiet (begrenset politimyndighet).`
      },

      hundetjeneste: {
        tittel: "Hundetjeneste",
        tekst: `Bruk av hund i vektertjeneste er regulert i vaktvirksomhetsloven og tilhørende forskrift. Det stilles særskilte krav til:
- Godkjenning av hund og fører
- Opplæring og sertifisering
- Bruksregler

Det holder ikke at hunden tidligere var godkjent politihund – godkjenning for vektertjeneste er en egen prosess.`
      }
    }
  },

  // ============================================================
  // MODUL 2 – KOMMUNIKASJON OG KONFLIKTHÅNDTERING
  // ============================================================
  modul_2: {
    tittel: "Kommunikasjon og konflikthåndtering",
    timer: 17,
    kategorier: ["Konflikthåndtering"],
    innhold: {

      kommunikasjon_grunnlag: {
        tittel: "Hva er kommunikasjon?",
        tekst: `Kommunikasjon består av tre elementer:
- Avsender: Den som sender budskapet
- Budskap: Det som formidles (verbalt og nonverbalt)
- Mottaker: Den som mottar og tolker budskapet

Kommunikasjon er alltid toveis. Misforståelser oppstår når avsender og mottaker tolker budskapet ulikt.

Verbal kommunikasjon: ord, setninger, tonefall
Nonverbal kommunikasjon: kroppsspråk, ansiktsuttrykk, avstand, blikkontakt

Forskning viser at kroppsspråk utgjør den største andelen av det som kommuniseres i en samtale – langt mer enn ordene alene. Som vekter må du derfor være bevisst på EGET kroppsspråk, ikke bare den andres.`
      },

      konfliktnivaaer: {
        tittel: "Konfliktnivåer og tegn på aggresjon",
        tekst: `Konflikter eskalerer gjennom nivåer. Tegn på at en situasjon kan eskalere:
- Høy stemme, avbrytelser
- Anstrengt kropp, knyttede never
- Rødming, rask pust
- Invaderende nærhet (trer inn i personlig sone)
- Direkte truende språk

Det er avgjørende å ligge I FORKANT og oppfatte disse tegnene tidlig. Jo tidligere man intervenerer, jo lettere er det å de-eskalere.

Risikofaktorer som øker aggressiv atferd:
- Ruspåvirkning (alkohol og narkotika)
- Psykisk lidelse
- Opplevd urettferdighet
- Mange tilskuere ("face-saving")
- Trange og varme lokaler`
      },

      deeskalering: {
        tittel: "Håndtere konfliktsituasjoner – de-eskalering",
        tekst: `En god konflikthåndterer kjennetegnes av:
- God evne til å lytte aktivt (ikke avbryte, nikke, bekrefte)
- Empati – evnen til å forstå hva den andre føler og opplever
- Rolig kroppsspråk og stemme
- Saklig og respektfull kommunikasjon

Aggressivitet fra vekteren selv vil ALDRI løse konflikter – det eskalerer dem. Aggressivitet gjør deg mindre løsningsorientert og trigget av adrenalin/endorfiner på en måte som svekker situasjonsvurderingen.

5-trinnsmodellen for konflikthåndtering:
Modellen er et rammeverk for å utvikle en mer profesjonell holdning og atferd i konfliktsituasjoner. Den gir ikke en fasit, men et utgangspunkt for refleksjon og forbedring.

Speiling som teknikk:
Speiling handler om å aktivt speile den andres kroppsspråk og tone for å skape kontakt og tillit. Effekten er at den andre opplever å bli sett og forstått, noe som reduserer konfliktnivået. Speiling skal IKKE brukes til å herme etter aggressive atferd.

Egensikkerhet:
Du skal alltid vurdere din egen sikkerhet FØR du går inn i en situasjon. Å ringe AMK eller politiet er aldri feil – det er del av jobben. Tenk alltid egensikkerhet som første prioritet.`
      },

      stereotypier: {
        tittel: "Stereotypier, skjema og attribusjon",
        tekst: `- Stereotypier: Forenklede forestillinger om en gruppe mennesker
- Skjema: Mentale "maler" vi bruker for å tolke situasjoner raskt
- Attribusjon: Hvordan vi forklarer andres atferd (indre vs. ytre årsaker)

Faren ved stereotypisering:
Vår første vurdering av en person kan være feil. Å handle på grunnlag av stereotypier kan føre til urettferdig behandling og diskriminering.

En vekter skal ALDRI vise bort eller forskjellsbehandle noen basert på utseende, etnisitet, religion eller annen personlig egenskap.`
      },

      stress: {
        tittel: "Stress og stressmestring",
        tekst: `Stress er en alarmreaksjon i kroppen når vi opplever fare eller press. Typiske reaksjoner:
- Fight (angrep), Flight (flukt) eller Freeze (lamming)
- Økt puls og adrenalin
- Tunnelsyn
- Redusert kompleks tankevirksomhet

For vektere er stresshåndtering kritisk fordi:
- Stress svekker kommunikasjonsevnen
- Stress svekker vurderingsevnen
- Stress kan utløse uforholdsmessige handlinger

Mestringsstrategier:
- Pust rolig og bevisst
- Bytt fokus fra trussel til løsning
- Snakk lavt og sakte (dette roer både deg og den andre)
- Ta et skritt tilbake fysisk
- Varsle kollega

Etter vanskelige hendelser er kollegastøtte viktig for å bearbeide reaksjoner og forebygge psykiske skader.`
      },

      trakassering: {
        tittel: "Håndtering av trakassering",
        tekst: `Hvis en person kommer med trakasserende kommentarer til deg som vekter:
- Bevar roen og hold profesjonell atferd
- Ivareta egen sikkerhet og de-eskaler konfliktnivået
- Bytt gjerne samtaleemne eller distanser deg fysisk
- Unngå speiling av aggressiv atferd
- Unngå å gi advarsler om anmeldelse (eskalerer situasjonen)

Etter endt jobb: Hvis en konflikt fortsetter på privat plan, skal du trekke deg unna og eventuelt varsle ledelsen. Du skal IKKE engasjere deg i konflikten utenfor tjeneste.`
      }
    }
  },

  // ============================================================
  // MODUL 3 – KULTURFORSTÅELSE OG MANGFOLD
  // ============================================================
  modul_3: {
    tittel: "Kulturforståelse og mangfold",
    timer: 3,
    kategorier: ["Mangfold", "Diskriminering"],
    innhold: {

      kultur_identitet: {
        tittel: "Kultur, identitet og religion",
        tekst: `Kultur defineres som tanke-, kommunikasjons- og adferdsmønstre hos mennesker. Kultur er ikke musikk og teater alene – det er et mye bredere begrep.

Identitet formes av mange faktorer:
- Foreldrenes opprinnelsesland
- Kjønn og seksualitet
- Utdannelse og yrkesvalg
- Alder
- Politisk tilhørighet
- Religion og livssyn
- Etnisk opprinnelse

Norge er et flerkulturelt land med innbyggere fra over 200 ulike opprinnelsesnasjonaliteter.

De største religionene internasjonalt:
1. Kristendom
2. Islam
3. Buddhisme
4. Hinduisme

Vektere møter mennesker fra alle kulturer og religioner. Respekt og forståelse for mangfoldet er en grunnleggende kompetanse.`
      },

      begreper: {
        tittel: "Sentrale begreper",
        tekst: `Kulturrelativisme:
Ideen om at alle kulturer og deler av kulturen er like gode og like mye verdt. Man vurderer ikke sin egen kultur som "riktigere" enn andres.

Metodisk relativisme:
En praktisk tilnærming der man prøver å forstå den andre personens kultur og skikker – selv om man ikke nødvendigvis er enig. Brukes aktivt i krysskulturell kommunikasjon for å oppnå ønskede resultater.

Etnosentrisme:
Å mene at ens egen kultur er overlegne og er "normen" alle bør vurderes etter.

Krysskulturell kommunikasjon:
Handler om å være åpen, lytte aktivt og vise respekt for alle mennesker du møter, uavhengig av bakgrunn. Det handler IKKE om å lære seg språk eller å kunne se inn i fremtiden.

Diskriminering:
De tre hovedgruppene for diskriminering er:
1. Sosial diskriminering
2. Strukturell diskriminering
3. Offentlig diskriminering

Diskriminering handler om mye mer enn etnisitet – det gjelder kjønn, religion, seksuell orientering, alder og mer.`
      },

      religionsfrihet: {
        tittel: "Religionsfrihet og diskriminering",
        tekst: `Det er religionsfrihet i Norge. En vekter kan IKKE vise bort en person bare fordi vedkommende bærer tydelige religiøse symboler i det offentlige rom.

Integreringspolitikk:
Det overordnede målet for integreringspolitikken i Norge er at alle som bosetter seg i Norge skal komme seg i jobb, betale skatt og delta aktivt i samfunnet – slik at det ikke oppstår sosiale forskjeller.

Diskriminering på utested:
Det er IKKE tillatt å kun slippe inn ett kjønn på et utested, selv om dette begrunnes med arrangement ("lesbisk aften" neste helg osv.). Dette er brudd på diskrimineringsloven, uavhengig av eiendomsretten.`
      }
    }
  },

  // ============================================================
  // MODUL 4 – YRKESETIKK OG HOLDNINGER
  // ============================================================
  modul_4: {
    tittel: "Yrkesetikk og holdninger",
    timer: 3,
    kategorier: ["Etikk"],
    innhold: {

      etikk_grunnlag: {
        tittel: "Etikk og moral",
        tekst: `Etikk er læren om hva som er rett og galt. Moral er de faktiske normer og verdier en person lever etter.

For vektere er yrkesetikk strengere enn i mange andre yrker fordi:
- Kundene må ha tillit til at vekteren beskytter og ikke misbruker tilgang til verdier, lokaler og informasjon
- Vekteren opererer ofte alene og uten tilsyn
- Vekteren representerer vaktselskapet og sikkerhetsbransjen overfor publikum

Vekterens tilstedeværelse forebygger skader, ulykker og uønskede handlinger – dette er den viktigste yrkesetiske funksjonen.`
      },

      konsekvenser: {
        tittel: "Konsekvenser av brudd på etiske retningslinjer",
        tekst: `Brudd på bransjens etiske retningslinjer kan føre til:
- At kunden sier opp kontrakten med vaktselskapet
- Skriftlig advarsel fra arbeidsgiver
- Oppsigelse
- Politianmeldelse (ved straffbare forhold)
- Dårlig omdømme for hele bransjen

Taushetsplikt:
Vektere har taushetsplikt om fortrolig informasjon de får gjennom jobben. Brudd på taushetsplikten kan i verste fall medføre oppsigelse. Taushetsplikten betyr IKKE at man ikke kan snakke om jobben i det hele tatt – det gjelder konfidensiell informasjon.

Instruks og religiøs/kulturell overbevisning:
Som vekter er du forpliktet til å følge instruks, arbeidsavtale og firmaets verdier. Du kan som regel ikke nekte å følge instruks fordi den strider mot din personlige religiøse eller kulturelle overbevisning.`
      },

      aerlighet: {
        tittel: "Ærlighet, lojalitet og 0-grensen",
        tekst: `Ærlighet handler om:
- Å være hederlig og oppriktig
- Å være troverdig og pålitelig
- Lojalitet – å holde ord og være pliktoppfyllende

0-grensen:
Vekterbransjen stiller ekstremt strenge krav til integritet. Det er nulltoleranse for:
- Korrupsjon og bestikkelser
- Tyveri fra kunder
- Misbruk av tillitsforhold

En kollega som stjeler fra kunden skal varsles til nærmeste leder eller politiet – ikke ignoreres.`
      }
    }
  },

  // ============================================================
  // MODUL 5 – SERVICE OG KVALITET
  // ============================================================
  modul_5: {
    tittel: "Service og kvalitet",
    timer: 3,
    kategorier: ["Uniform & Regler"],
    innhold: {

      service: {
        tittel: "Hva er service?",
        tekst: `Service handler om å yte det lille ekstra – ikke bare å gjøre som kunden sier eller å følge instruks. Service er:
- Å gi betjening og hjelp
- Å skape tilfredshet og behag
- Å gå litt lenger enn det som forventes

Den viktigste oppgaven en vekter har er likevel å oppfylle den skriftlige avtalen mellom vaktselskapet og kunden. Service er viktig, men den juridiske og sikkerhetsmessige forpliktelsen kommer først.

Servicemedarbeideren skal levere fra "første inntrykk til varig opplevelse av kundefornøydhet".`
      },

      kvalitet: {
        tittel: "Kvalitet",
        tekst: `Kvalitet defineres som opplevelsen av egenskapene til et produkt eller tjeneste. God kvalitet i vektertjenester handler om:
- Å levere i henhold til kontrakt
- Ingen avvik fra instrukser og rutiner
- Konsistent, pålitelig og profesjonell opptreden

Avvik skal alltid rapporteres og behandles systematisk.`
      }
    }
  },

  // ============================================================
  // MODUL 6 – HMS (HELSE, MILJØ OG SIKKERHET)
  // ============================================================
  modul_6: {
    tittel: "HMS – Helse, Miljø og Sikkerhet",
    timer: 10,
    kategorier: ["Arbeidstid"],
    innhold: {

      hms_grunnlag: {
        tittel: "HMS – Hva er det?",
        tekst: `HMS står for Helse, Miljø og Sikkerhet. HMS-arbeid er lovpålagt gjennom Arbeidsmiljøloven (AML) og Internkontrollforskriften.

Formålet med HMS-arbeid er å sikre:
- Et fullt forsvarlig arbeidsmiljø
- Forebygging av skader, ulykker og sykdom
- Medvirkning fra de ansatte`
      },

      arbeidsmiljoloven: {
        tittel: "Arbeidsmiljøloven – sentrale paragrafer",
        tekst: `Arbeidsmiljøloven (AML) er ufravikelig – lovens minimumskrav kan ikke fravikes til ugunst for arbeidstaker, med mindre det er eksplisitt angitt i den aktuelle paragrafen.

§ 2-1 – Arbeidsgivers ansvar:
Arbeidsgiver har det overordnede ansvaret for at loven overholdes.

§ 2-3 – Arbeidstakers plikter:
- Følge sikkerhetsrutiner
- Bruke verneutstyr
- Ivareta egen og kollegaers sikkerhet
- Melde fra om farlige forhold

§ 4-1 – Generelle krav til arbeidsmiljø:
Arbeidsmiljøet skal være fullt forsvarlig. Risikoen ved alenearbeid skal vurderes særskilt.

§ 4-3 – Psykososialt arbeidsmiljø:
Arbeidstaker skal ikke utsettes for trakassering eller annen utilbørlig opptreden.

Varsling (§§ 2-4 og 2-5):
Arbeidstaker har rett til å varsle om kritikkverdige forhold uten å bli utsatt for gjengjeldelse.`
      },

      verneombud: {
        tittel: "Verneombud og AMU",
        tekst: `Verneombud:
- Velges av og blant de ansatte
- Velges annethvert år (hvert 2. år)
- Har rett til opplæring
- Har stansingsrett ved overhengende fare
- Er IKKE det samme som tillitsvalgt

Tillitsvalgt:
Valgt etter avtaleverk (tariffavtale) – representerer de ansatte i lønns- og arbeidsvilkår.

AMU (Arbeidsmiljøutvalg):
Opprettes i virksomheter med 50+ ansatte. Behandler HMS-saker og saksgang ved vernesaker går: ledelse → verneombud → AMU.`
      },

      arbeidstid: {
        tittel: "Arbeidstid – regler",
        tekst: `Alminnelig arbeidstid (AML § 10-4):
- Maks 9 timer per dag
- Maks 40 timer per uke (etter loven)
- Tariffavtaler kan gi 37,5 timer per uke

Gjennomsnittsberegning:
- Maks 48 timer per uke i snitt over en periode (inkl. overtid)

Overtid:
- Maks 200 timer per år uten avtale med tillitsvalgte
- Tillitsvalgte (med tariffavtale) kan avtale inntil 12 timer per dag
- Enkeltansatte kan ikke selv avtale 12-timers dag

Hvile:
- Minimum 11 timers sammenhengende hvile mellom to arbeidsperioder
- Minimum 35 timers ukentlig hvile

Pauser:
- Rett til pause når arbeidstiden overstiger 5,5 timer

Nattarbeid:
- Tillatt kun når arbeidets art gjør det nødvendig
- Helsemessige hensyn skal ivaretas

Arbeidsplan:
- Skal settes opp slik at arbeidstakerne vet når de skal jobbe
- Drøftes med tillitsvalgte

Arbeidsgiver har styringsrett – retten til å lede, kontrollere og organisere arbeidsplassen – men innenfor lovens og avtalenes rammer.

Vandel:
Den løpende vandelskontrollen for vektere gjennomføres 1 gang per år.`
      }
    }
  },

  // ============================================================
  // MODUL 7 – RISIKOVURDERING
  // ============================================================
  modul_7: {
    tittel: "Risikovurdering",
    timer: 8,
    kategorier: ["Risiko"],
    innhold: {

      risiko_definisjon: {
        tittel: "Hva er risiko?",
        tekst: `Risiko er et uttrykk for graden av fare som uønskede hendelser og trusler representerer mot verdier.

Risiko beskrives som forholdet mellom tre elementer:
1. Verdi – Det som skal beskyttes (mennesker, eiendom, informasjon)
2. Trussel – Uønskede hendelser og aktører som kan skade verdien
3. Sårbarhet – I hvilken grad eksisterende tiltak klarer å beskytte verdien mot trusselen

Risiko ≠ bare "noe som kan gå galt". Risiko er en strukturert analyse av forholdet mellom verdi, trussel og sårbarhet.`
      },

      risikovurdering: {
        tittel: "Risikovurdering som metode",
        tekst: `Risikovurdering er en metode for å avklare hvor godt en virksomhets verdier er beskyttet mot uønskede hendelser og trusler.

Krav til gjennomføring:
Risikovurdering er lovpålagt gjennom Arbeidsmiljøloven, Internkontrollforskriften, Brann- og eksplosjonsvernloven og andre lover.

Risikovurdering på flere nivåer:
- Ledernivå: Risikovurdering av oppdrag og kontrakter
- Vekternivå: Risikovurdering i den daglige tjenesten (egensikkerhet)

Gyldighetstid:
Det finnes ingen fast fasit på hvor lenge en risikovurdering er gyldig. Den må kontrolleres og oppdateres jevnlig – sikkerhetsarbeid er en kontinuerlig prosess.`
      },

      saarbehet: {
        tittel: "Sårbarhet",
        tekst: `Sårbarhet beskriver manglende sikringstiltak – altså i hvilken grad eksisterende tiltak ikke er tilstrekkelige til å beskytte verdien mot trusselen.

Sårbarhet handler IKKE om:
- Hvilke sikringsmål som skal beskyttes (det er verdivurderingen)
- Realismen i truslene (det er trusselvurderingen)

Trusselvurdering:
Gjøres for å få oversikt over hvem som kan true virksomheten, når, hvor, hvordan og hvorfor.`
      },

      risikohåndtering: {
        tittel: "Håndtering av risiko",
        tekst: `Identifisert risiko kan håndteres på fire måter:
1. Akseptere – Ta risikoen slik den er (bevisst valg)
2. Begrense/redusere – Sette inn tiltak som reduserer sannsynlighet eller konsekvens
3. Overføre – Flytte risikoen til andre (f.eks. forsikring)
4. Fjerne/unngå – Eliminere aktiviteten som skaper risikoen

Restrisiko:
Risikoen som gjenstår etter at alle sikringstiltak er gjennomført. En viss restrisiko vil alltid eksistere.

Ja, risiko kan aksepteres – dette er en bevisst og dokumentert beslutning.`
      }
    }
  },

  // ============================================================
  // MODUL 8 – FYSISKE, MANUELLE OG ADMINISTRATIVE TILTAK
  // ============================================================
  modul_8: {
    tittel: "Fysiske, manuelle og administrative tiltak",
    timer: 9,
    kategorier: ["Sikkerhet & Teknikk", "Personvern"],
    innhold: {

      sikringsprinsipper: {
        tittel: "Sikringsprinsipper",
        tekst: `Fire sikringsprinsipper:

1. Periferisikring:
Utvendig sikring av området rundt et objekt. Eksempler: gjerder, porter, utendørs kameraer, parkeringsovervåkning. Det er IKKE bare "sikring av byggets fasade" – periferisikring dekker det ytre området (f.eks. parkeringsplass, uteareal).

2. Skallsikring:
Sikring av byggets ytre skall – fasade, dører, vinduer, tak, gulv. Eksempler: magnetkontakter på dører og vinduer, låser, glassbruddetektorer.

3. Romsikring:
Innvendig sikring av rom og soner i bygningen. Eksempler: bevegelsesdetektorer (PIR), romkameraer.

4. Objektsikring:
Sikring av spesielle gjenstander/verdier. Eksempler: maleri, safe, serverrack. En safe og et maleri er objektsikring – IKKE skallsikring.`
      },

      detektorer: {
        tittel: "Detektorer og alarmsystemer",
        tekst: `PIR – Passiv infrarød bevegelsesdetektor:
Registrerer varme fra levende organismer i bevegelse.
Feilkilder (feilalarmer):
- Hengende plakater i butikker som beveger seg
- Direkte sollys eller sterke billys
- Hunder, katter og andre dyr
- Gardiner som blafrer

Glassbruddetektor:
Reagerer på lyden av knust glass – IKKE på varmebølger eller at en dør åpnes.

Magnetkontakt:
Monteres på dører og vinduer. Utløser alarm når dør/vindu åpnes.

Heisalarm:
Det er PÅBUDT med toveis kommunikasjon i personheiser (ikke bare for vareheiser eller mekaniske heiser).

Sabotasjealarm:
Utløses hvis alarmsystemet selv utsettes for sabotasje (f.eks. at kabelen kuttes).

Dual-tech detektor:
Bruker to teknologier (f.eks. PIR og mikrobølge) for å redusere antall falske alarmer.

Mikrobølgedetektor (utendørs):
Feilkilder: Væske i bevegelse i plastrør (ikke hunder eller mennesker – disse er faktisk det den skal detektere).

Dome-kamera:
Positivt: Kan fjernstyres fra en vaktsentral. Gir overvåkning i alle retninger.

FG-godkjenning:
FG = Forsikringsgodkjent. Betyr at produktet er godkjent av forsikringsbransjen.`
      },

      kameraovervakning: {
        tittel: "Kameraovervåkning og personvern",
        tekst: `Personopplysningsloven regulerer all behandling av personopplysninger, inkludert kameraovervåkning.

Lagringstid for kameraopptak:
- Hovedregel: 7 dager
- Post og bank: 90 dager
- Adgangskontrollsystem: 90 dager

Et kamera som filmer naboens veranda er IKKE tillatt – det er et inngrep i naboens personvern.

En privat persons kamera som filmer offentlig vei utenfor garasjen sin: Dette er heller IKKE tillatt uten særlige grunner.

PIR med kamera:
En passiv infrarød bevegelsesdetektor utstyrt med kamera regnes IKKE som kameraovervåkning etter personopplysningsloven – og rammes derfor ikke av de samme kravene.

Kameraovervåkning på arbeidsplass:
Krever drøfting med tillitsvalgte og informasjon til de ansatte – ikke bare godkjenning fra eier eller Datatilsynet.

Regler for informasjon:
Personopplysningsloven er den primære loven for håndtering av personopplysninger – ikke "Person og dataloven" (som ikke eksisterer) eller politiregisteret.`
      }
    }
  },

  // ============================================================
  // MODUL 9 – BEREDSKAPSPLANER
  // ============================================================
  modul_9: {
    tittel: "Beredskapsplaner",
    timer: 3,
    kategorier: ["Beredskap"],
    innhold: {

      beredskap_grunnlag: {
        tittel: "Hva er beredskap?",
        tekst: `Beredskap er organisasjonens evne til å håndtere uønskede hendelser raskt og riktig. Beredskap er håndtering av restrisiko – det som kan skje selv etter at alle forebyggende tiltak er iverksatt.

En beredskapsplan aktiveres ved:
Hendelser som er større enn det den daglige organisasjonen klarer å håndtere. Beredskapsplanen er IKKE for:
- Sykefravær og ferieavvikling (normal drift)
- Bare ved nasjonal krise

Kriseberedskap handler om hendelser som i betydelig grad kan skade:
- Egne eller kundens ansatte
- Kunder
- Omdømme
- Strukturelle forhold
- Kontinuerlig drift`
      },

      beredskapsplan_innhold: {
        tittel: "Innhold i en beredskapsplan",
        tekst: `En god beredskapsplan skal inneholde:
1. Hvem som har ansvar for å lede beredskapshåndteringen
2. Instrukser for beredskapsgruppen
3. Lokaler og utstyr som trengs for å løse oppgaven
4. Varslingsplan: hvem varsler, hvem varsles, hvordan varsles
5. Rolleoversikt – hvem gjør hva, når og hvordan

Kjennetegn på en god beredskapsplan:
- Enkel og oversiktlig
- Inneholder klar varslingsplan
- Viser tydelig hvem som gjør hva, hvor og når

Beredskapsorganisasjonens tre nivåer:
- 1. linje: Vekteren – møter hendelsen FØRST, praktisk arbeid og evakuering
- 2. linje: Lederpersoner med beredskapsleder – setter i gang ekstra ressurser
- 3. linje: Strategisk ledelse

Vekteren er altså i 1. linje – førstelinje.`
      },

      ovelser: {
        tittel: "Øvelser og internkontroll",
        tekst: `Systematisk evaluering av beredskapsøvelser er viktig fordi:
Det sikrer at nødvendig utstyr og rutiner faktisk fungerer som de skal i en reell situasjon – ikke bare for å kontrollere at lover følges, og ikke bare for å gi nøkkelpersonell tilbakemelding.

Beredskapsplanen er et levende dokument som må holdes oppdatert.`
      }
    }
  },

  // ============================================================
  // MODUL 10 – RAPPORTLÆRE
  // ============================================================
  modul_10: {
    tittel: "Rapportlære",
    timer: 2,
    kategorier: ["Rapportering"],
    innhold: {

      rapport_grunnlag: {
        tittel: "Hva utgjør en god rapport?",
        tekst: `En rapport er en skriftlig fremstilling av observasjoner og hendelser. Gode rapporter er:
- Objektivt skrevet (ikke preget av egne meninger og antagelser)
- Nøyaktige og detaljerte
- Skrevet i naturlig og lettfattelig språk med korte setninger
- Kronologisk strukturert

En egenrapport skal inneholde:
- Innledning: Hva vekteren jobber med, fra hvor og når arbeidet startet
- Hendelse: Detaljerte opplysninger i kronologisk rekkefølge
- Avslutning: Hva vekteren gjør etter at hendelsen er ferdig

Egenrapport skrives IKKE etter endt vakt generelt, men i tilfeller der det er benyttet makt, eller andre spesielle hendelser som krever dokumentasjon.`
      },

      mistenkelig_vs_mistenksom: {
        tittel: "Mistenkelig vs. mistenksom",
        tekst: `To ord som ofte forveksles:

Mistenkelig (adjektiv om en person/ting):
Noe eller noen SER mistenkelig ut – basert på observert oppførsel.
Eksempel: "Personen oppførte seg mistenkelig."

Mistenksom (adjektiv om den som observerer):
At man ER mistenksomme overfor noen.
Eksempel: "Vekteren var mistenksom overfor personen."

I rapporter skal man beskrive mistenkelig atferd (hva man observerte), ikke uttrykke at man er mistenksom.`
      },

      rapportering_eksempler: {
        tittel: "Praktiske rapporteringseksempler",
        tekst: `Eksempel – mobilvekter slukker lys:
Instruksen sier at alle lys på objektet skal være slukket. Du slukker 10 lys.
Korrekt rapportering: "Alle lys avslått."
Du rapporterer IKKE "Alt ok" – det er for upresist. Du rapporterer faktisk hva som ble gjort.

Rapporteringsformer:
- Vaktjournal: Alle hendelser, observasjoner og tiltak i løpet av vakten
- Egenrapport: Ved maktbruk og spesielle hendelser
- Utrykningsrapport
- Observasjonsrapport
- Avviksrapport

En mistenkt butikktyv som nekter å signere anmeldelsen:
Du AKSEPTERER dette og noterer det i rapporten. Du kan ikke tvinge noen til å skrive under. Du pågriper heller ikke bare fordi vedkommende nekter å signere.

I anmeldelse på naskeri/tyveri skal det alltid fremgå:
Personen ble stanset ETTER siste betalingspunkt. Dette er det juridiske kravet for at et tyveri anses som fullbyrdet.`
      }
    }
  },

  // ============================================================
  // MODUL 11 – SAMARBEID MED OFFENTLIGE MYNDIGHETER
  // ============================================================
  modul_11: {
    tittel: "Samarbeid med offentlige myndigheter",
    timer: 2,
    kategorier: ["Samhandling", "Nødetatene"],
    innhold: {

      noednumre: {
        tittel: "Nødnumre",
        tekst: `De tre nødnumrene i Norge:
- 110: Brannvesenet
- 112: Politiet
- 113: Ambulanse / medisinsk nødhjelp (AMK)

For ikke-akutte medisinske tilfeller ringes:
- 116 117: Legevakt

AMK bruker Norsk Indeks for medisinsk nødhjelp som arbeidsverktøy – ikke vekterne direkte, men vekteren bør kjenne til hva AMK bruker.`
      },

      samarbeid: {
        tittel: "Vekterens samarbeid med politiet",
        tekst: `Det er naturlig og forventet at en vekter samhandler med politiet ved:
- Forebygging av uønskede hendelser
- Bistand ved hendelser

Vektere samhandler IKKE med politiet ved:
- Systematisk innsamling av sensitive personopplysninger
- Husransakelser (kun politiet har denne myndigheten)

Åstedsdisiplin:
Ved funn av åsted er den viktigste regelen: Ikke røre noe. Putt hendene i lommene og observer. Formålet er å bevare spor for politiet.

Politiet kan be vekteren om å bistå – men det gir IKKE begrenset politimyndighet til vekteren. Begrenset politimyndighet er noe som må gis formelt av politiet.

Vekteren kan ikke gjøre husransakelse, uavhengig av om politiet ber om det eller ikke.`
      }
    }
  },

  // ============================================================
  // MODUL 12 – FØRSTEHJELP
  // ============================================================
  modul_12: {
    tittel: "Førstehjelp",
    timer: 12,
    kategorier: ["Førstehjelp"],
    innhold: {

      abcde: {
        tittel: "ABCDE-prinsippet – undersøkelse av pasient",
        tekst: `Riktig rekkefølge ved undersøkelse av en pasient:
A – Airway / Luftvei: Er luftveiene åpne?
B – Breathing / Pust: Puster pasienten normalt?
C – Circulation / Sirkulasjon: Er det puls og blodsirkulasjon?
D – Disability / Bevissthetsnivå: Er pasienten bevisst?
E – Exposure / Avdekking: Finnes det andre synlige skader?

Prioritet ved skadested med flere skadde:
Høyest prioritet har alltid de som IKKE har frie luftveier (A – Airway). Selv om noen gråter høylytt (bevisst og puster) eller har indre blødninger, er blokkerte luftveier den umiddelbart livstruende tilstanden.`
      },

      hlr: {
        tittel: "HLR – Hjerte-lunge-redning",
        tekst: `HLR startes når pasienten er BEVISSTLØS og IKKE PUSTER NORMALT.

HLR startes IKKE bare fordi pasienten er bevisstløs (kan ha normal pust) eller bare ikke puster (sjekk bevissthet først).

Forholdet kompresjoner/innblåsninger:
30 kompresjoner : 2 innblåsninger (30:2)

Tempo:
Ca. 100 kompresjoner per minutt – IKKE i rolig tempo, og IKKE 200 per minutt.

Dybde kompresjoner (voksne):
5–6 cm

Hvem kan bruke hjertestarter?
ALLE kan bruke hjertestarter – det kreves ikke kurs. Hjertestarter anbefaler støt når den registrerer at hjertet ikke slår normalt (ventrikkelfibrilasjon). Den anbefaler støt når den er klar.`
      },

      bloedning: {
        tittel: "Blødninger",
        tekst: `Kraftig ytre blødning i underarmen:
Korrekt tiltak:
- Hev skadestedet (hold armen over hjertehøyde)
- Legg press direkte på blødningsstedet

Symptomer på indre blødning:
- Blek, kald og klam hud i ansiktet
- Rask puls
- Svimmelhet

Sjokkleie:
Ligge med bena hevet og hodet lavt – for å optimere blodtilførselen til hjernen og de vitale organene.`
      },

      brannsar: {
        tittel: "Brannskader",
        tekst: `Behandling av brannskader:
1. Hold det forbrente stedet under LUNKENT vann (ca. 20 grader)
2. Varighet: ca. 20 minutter
3. IKKE iskaldt vann (gir sjokk)
4. IKKE for kort tid

Mnemoteknikk: 20 grader i 20 minutter.`
      },

      epilepsi: {
        tittel: "Epilepsi, diabetes og andre tilstander",
        tekst: `Epileptisk anfall:
- Skal man holde fast personen? NEI.
- Det finnes en myte om at man kan svelge tunga – dette er IKKE mulig.
- Riktig tiltak: Beskytt hodet mot slag, fjern farlige gjenstander, legg mykt under hodet
- Ring 113 ved anfall som varer over 5 minutter

Bevisstløs diabetiker:
- Du har IKKE lov til å gi mat og drikke til en bevisstløs person (fare for kvelning)
- Ring 113

HLR ved krampeanfall:
HLR startes IKKE ved krampeanfall alene – bare hvis pasienten er bevisstløs og ikke puster normalt.

Heimlich-manøver:
Brukes ved fremmedlegeme i luftveien. Metode:
- Forsøk ryggslag (5 slag mellom skulderbladene)
- Deretter bukstøt (5 støt under ribbeina fra bak)
Personen legges IKKE på ryggen med knær trukket opp.`
      },

      rus_foerstehjelp: {
        tittel: "Førstehjelp ved ruspåvirkning",
        tekst: `Ved opioatoverdose (heroin e.l.):
Tegn: Sakte, overfladisk pust, som om personen sover, veldig SMÅ pupiller.
(Amfetamin/sentralstimulerende gir STORE pupiller og oppjaget atferd)

Egensikkerhet ved brukerutstyr:
- Tenk egensikkerhet først
- Bruk verneutstyr (hansker)
- Sikre brukerutstyret (sprøyter etc.) i godkjent beholder (ikke bare ring politiet og vent)

Emosjonell førstehjelp:
Å roe personen ned ved å vise trygghet og omsorg. IKKE å sende personen til psykolog eller hjelpe i etterkant alene.`
      }
    }
  },

  // ============================================================
  // MODUL 13 – ALKOHOL, MEDIKAMENTER OG NARKOTIKA
  // ============================================================
  modul_13: {
    tittel: "Alkohol, medikamenter og narkotika",
    timer: 10,
    kategorier: ["Alkohol", "Rus & Narkotika"],
    innhold: {

      alkoholloven: {
        tittel: "Alkoholloven – sentrale bestemmelser",
        tekst: `Aldersgrenser for skjenking:
- Under 22 volumprosent: Minimum 18 år
- 22 volumprosent og over (gruppe 3): Minimum 20 år

Merk: Det er 18 og 20, IKKE 18 og 23.

Åpenbart påvirket:
Ruspåvirkningen må være KVALIFISERT og SYNLIG for omverdenen. Det holder ikke med mistanke.
Forbudet gjelder ALLE typer rusmidler – ikke bare alkohol.

Salg vs. skjenking:
- Salg: Drikking skal skje UTENFOR salgsstedet (butikk, Vinmonopol)
- Skjenking: Drikking skal skje PÅ stedet (pub, restaurant, nattklubb)

Internkontroll:
Rutiner utarbeidet for å sikre at skjenkebevillingen utøves forsvarlig og i henhold til gjeldende regelverk. IKKE bare rutiner mot salg til mindreårige.

Styrer:
Har det daglige ansvaret for salg og skjenking. IKKE "styret" i selskapet.`
      },

      kontroll: {
        tittel: "Skjenkekontroll",
        tekst: `Alkoholforskriften tilsier at kontrollører skal ha bestått kunnskapsprøven for kontrollører.

Antall kontroller per år:
Minimum 1 kontroll per salg- og skjenkested. Ingen øvre grense.

Antall kontrollører:
- Skjenkekontroll: Minimum 2 kontrollører
- Salgskontroll: Minimum 1 kontrollør

Når kan kommunen kontrollere?
Kommunen kan kontrollere NÅR SOM HELST – de trenger ikke vente til åpningstiden.

Inndragning av skjenkebevilling:
Politiet kan stenge et utested midlertidig. Kommunen har det primære ansvaret for kontroll og inndragning av bevillingen.

Skjenketider:
Maksimal skjenketid er kl. 03.00 – men kommunen bestemmer lokale tider.
Utvidelse av skjenketid: Krever søknad til kommunen og innvilgelse.

Låne/kjøpe alkohol fra annet utested:
Er IKKE tillatt – selv om utestedet går tom.

Politiet kan stenge et utested:
- Ved skjenking uten bevilling
- Ikke: ved mangel på alkoholfrie alternativer eller alkoholreklame inne

Klokken stilles tilbake (sommertid → vintertid):
Gammel tid gjelder for skjenketidsformål. Skjenkestedet med skjenketid til 03:00 må stoppe kl. 02:00 ny tid (= 03:00 gammel tid).`
      },

      narkotika: {
        tittel: "Narkotika og rusmidler",
        tekst: `Rusgrupper:
1. Sentraldempende (minusdop):
- Opioider/opiater (heroin, morfin, kodein)
- GHB
- Benzodiazepiner (valium, rohypnol)
- Alkohol
Effekt: Sløvende, dempende, redusert bevissthet. Kan gi koma ved overdose.
Tegn: Små pupiller, langsom pust, som om personen sover.

2. Sentralstimulerende (plussdop):
- Amfetamin, metamfetamin
- Kokain
- Ecstacy (MDMA) – OBS: Ecstacy er i grenseområdet, men klassifiseres primært som sentralstimulerende/hallusinogen
Effekt: Oppkvikkende, økt energi, euforisk, aggressiv.
Tegn: Store pupiller, høy puls, oppjaget atferd.

3. Hallusinogener:
- LSD
- Ecstacy (MDMA) – har hallusinogene egenskaper
Effekt: Forvrenger virkelighetsoppfatning.

OBS om ecstacy:
I norsk vekterutdanning klassifiseres ecstacy (MDMA) ofte som hallusinogen i eksamensoppgaver.

Opioider spesifikt (Eksamen 3):
Opioider kalles minusdop. De har sentraldempende effekt.

Derivatregelen:
Straffbare "designerdrugs" som er laget for å gi narkotisk rus uten å stå på narkotikalisten er likevel straffbare etter derivatregelen.

GHB:
- Sentraldempende
- Større mengder kan føre til koma
- Farlig kombinert med alkohol

Cannabis:
- Sentraldempende (primært), men har også hallusinogene egenskaper
- Det er registrert dødsfall indirekte relatert til cannabis
- Registrerte skader: Paranoia, psykose, kreft, konsentrasjonsvansker

Anabole steroider:
Kan gjøre personen aggressiv og voldelig og gi kroppslig endring.

All bruk av narkotika er forbudt:
Ja – med unntak av legemidler som er lovlig foreskrevet av lege. Legemidler merket med "rød trekant" er narkotikaklassifiserte legemidler, men de er lovlige ved lovlig resept.

Avhengighet:
Samlebetegnelse for skadelig avhengighet av kjemiske substanser, men også atferdsavhengigheter (spilling, gambling, etc.).`
      }
    }
  },

  // ============================================================
  // MODUL 14 – BRANNVERN
  // ============================================================
  modul_14: {
    tittel: "Brannvern",
    timer: 9,
    kategorier: ["Brann"],
    innhold: {

      brannteori: {
        tittel: "Brannteori – branntrekanten og utvikling",
        tekst: `Branntrekanten:
En brann krever tre elementer:
1. Brennbart materiale (brensel)
2. Oksygen
3. Varme/tennkilde

Fjern ett element → brannen slokker.

Brannklasser:
A – Faste stoffer (tre, papir, tekstil)
B – Væsker og løselige faste stoffer (bensin, olje)
C – Gasser (propan, naturgass)
D – Metaller (magnesium, aluminium)
F – Frityrolje og matfett (matlaging)
Elektriske anlegg er ikke en brannklasse – men de krever spesielle slokkemidler.

Brannspredning – fire måter:
1. Ledning: Varme ledes gjennom materialer
2. Stråling: Varmestråling (infrarødt) fra flammer og røyk til nabomaterialer
3. Strømning: Varme gasser strømmer inn i områder med brennbart materiale og antennes der
4. Flyvebrann: Gnister og brennende partikler fraktes med vinden

Det er FIRE spredningsmåter – ikke to.

Brannrøyk:
- Inneholder den giftige gassen CO (karbonmonoksid)
- Karbonmonoksid er farlig fordi den bindes sterkere til hemoglobin enn oksygen
- Brannrøyk er ALLTID farlig – aldri ufarlig`
      },

      slokkemidler: {
        tittel: "Slokkemidler",
        tekst: `Vann:
- Slokker ved kjøling (fjerner varme)
- Egnet for brannklasse A
- MÅ IKKE brukes på elektriske anlegg under spenning (leder strøm)
OBS: "Rent vann leder ikke strøm" er en vanlig misforståelse – rent vann leder faktisk ikke strøm godt, men vann fra kran inneholder nok mineraler til å lede. Svaret i eksamen er at vann IKKE kan brukes på elektriske anlegg.

Skum:
- Slokker primært ved kjøling (fjerner varme)
- Danner også et lag som fortrenger oksygen
- Egnet for brannklasse B (væsker)

ABC-pulver:
- Det mest anvendelige slokkemidlet på markedet
- Fjerner IKKE varme effektivt – derfor er re-antenning en risiko
- Egnet for brannklasse A, B og C
- Egnet for faste materialer (klasse A)
- IKKE egnet for frityroljer (klasse F)

CO2 (karbondioksid):
- Fortrenger oksygen
- Egnet for elektriske anlegg og brannklasse B
- Klasse B-merket
- Lang kastelengde: NEI – CO2 har kort kastelengde
- Gjør ikke brannstedet vått

Tørrpulver (ABC-pulver) på frityroljer:
IKKE egnet – frityroljer krever klasse F-slokkemiddel eller sand.

Gasslokkeanlegg:
Brukes der vann og pulver vil ødelegge verdiene:
- Museer (kunst og antikviteter)
- Serverrom
- Arkiver
Gasslokkeanlegg brukes IKKE der folk sover (hotell, sykehus) – CO2-gass er farlig for mennesker.

Sprinkleranlegg:
IKKE alle hoder utløses samtidig. Kun sprinklerhodet nærmest brannen utløser.
Kontroll av sprinkleranleggssentral: 1 gang per uke.

Brannklasse A håndslokkere:
Godkjent for å slukke brann i faste materialer.

Tømmetid 6 kg pulverslokker:
12–15 sekunder.`
      },

      brannvern_organisering: {
        tittel: "Brannvern – organisering og tiltak",
        tekst: `Aktive brannverntiltak:
Tiltak som aktivt bekjemper brannen:
- Automatisk brannalarmanlegg
- Sprinkleranlegg
- Røykventilasjon

Passive brannverntiltak:
Tiltak som bremser brannen uten å aktivt slokke:
- Brannceller (avgrenser brann fra andre deler av bygget i en fastsatt tid)
- Seksjoneringsvegg
- Brannklassifiserte dører
- Rømningsveier

Branncelle:
Avgrenser en brann fra andre deler av et bygg i løpet av en fastsatt tid. Det er IKKE et sikkert rom som ikke kan brenne.

Vektere og brannalarm:
En vekter har IKKE lov til å koble ut deler av brannalarmen – selv om kunden ber om det på grunn av scenerøyk fra konsert.

Er alle bedrifter pliktige til å ha brannalarmsystemet tilknyttet brannvesenet?
NEI – det er ikke et generelt krav. Det avhenger av bygningstype og risikovurdering.

Hva prioriteres ved brann?
Rekkefølgen avgjøres av situasjonen:
- Varsle, redde og slokke – men ikke nødvendigvis i fast rekkefølge
- Liv og helse prioriteres alltid over materiell`
      }
    }
  },

  // ============================================================
  // MODUL 15 – JUSS
  // ============================================================
  modul_15: {
    tittel: "Juss",
    timer: 20,
    kategorier: ["Juss", "Personvern"],
    innhold: {

      straffbarhet: {
        tittel: "Straffbarhetsvilkår",
        tekst: `For at noen skal kunne straffes, må ALLE disse vilkårene være oppfylt:

Objektive straffbarhetsvilkår (handler om selve handlingen):
1. Det må være utført en straffbar handling (dekkes av straffebudet)
2. Det må ikke foreligge straffefritaksgrunner (nødverge, nødrett osv.)

Subjektive straffbarhetsvilkår (handler om gjerningspersonen):
3. Gjerningspersonen må ha utvist skyld (forsett eller uaktsomhet)
4. Gjerningspersonen må være tilregnelig (ikke utilregnelig pga. psykose osv.)
5. Gjerningspersonen må være over den kriminelle lavalder (15 år)

Nødverge er et straffefritaksgrunnlag (subjektivt vilkår), IKKE et objektivt vilkår.

Eksempler som IKKE er straffbare handlinger:
- Å spille høy musikk og plage naboen med støyende verktøy på dagtid (ikke straffbart i seg selv uten videre)
- Hjelpsomhet
- Sniking i kø

Skadeverk er et straffbarhetsvilkår (en straffbar handling).

Siktet vs. mistenkt:
- Mistenkt: Person som er under etterforskning, men ikke formelt siktet
- Siktet: Når det er besluttet bruk av tvangsmidler mot personen (jf. straffeprosessloven § 82)
- Tiltalt: Når påtalemyndigheten tar ut tiltale`
      },

      noedverge: {
        tittel: "Nødverge",
        tekst: `Nødverge (straffeloven § 18):
Rett til å bruke makt for å stoppe et rettsstridig angrep – IKKE for å straffe noen.

Nødverge kan benyttes av:
ALLE – for å forsvare noens liv eller helse mot et ulovlig angrep. Det er ikke begrenset til den som angripes.

Grensen for nødverge:
Maktbruken må IKKE gå åpenbart utover hva som er forsvarlig. Det er en forholdsmessighetsvurdering.

Hva vekteres maktbruk i nødverge vurderes mot:
Hvordan DU opplevde situasjonen – ikke objektivt sett eller hva vektere generelt ville oppfattet.

Maktbruk generelt (ikke bare nødverge):
Vekterens maktbruk er begrenset til:
- Nødvendig
- Forsvarlig
- Forholdsmessig

En vekter kan bruke begrenset makt i nødverge – men har IKKE hjemmel i politiloven. Vekterens maktbruk er hjemlet i straffeloven (nødverge).`
      },

      noedrett: {
        tittel: "Nødrett",
        tekst: `Nødrett (straffeloven § 17):
Retten til å begå en ellers ulovlig handling i en nødsituasjon, for å redde liv, helse og materiell. 

Viktig: Man kan bli erstatningsansvarlig for skader som oppstår – selv om man handlet i nødrett.

Nødrett ≠ Nødverge:
- Nødrett: Avverge fare/skade (fare kommer ikke nødvendigvis fra et angrep)
- Nødverge: Stoppe et rettsstridig angrep fra en person`
      },

      paagripelse: {
        tittel: "Pågripelse",
        tekst: `Vektere kan pågripe når (straffeprosessloven § 176):
- Mistenkte treffes på FERSK GJERNING eller FERSKE SPOR
- Vilkårene i straffeprosessloven § 171 eller § 173 er oppfylt

Etter pågripelse:
Vekteren skal STRAKS overgi den pågrepne til politiet. Ikke "snarest mulig" gi advokat – det er politiets ansvar.

Pågripelse gir IKKE vekteren begrenset politimyndighet:
Selv om politiets operasjonssentral ber deg pågripe noen, gir dette deg ikke begrenset politimyndighet. Begrenset politimyndighet må gis formelt.

Pepperspray og batong:
En vekter har IKKE lov til å bruke pepperspray/gassvåpen eller batong i tjenesten. Dette er ikke tillatt uavhengig av stilling.

Husransakelse:
Vektere kan IKKE foreta husransakelse – kun politiet har denne myndigheten.

Håndjern:
En vekter kan bære og bruke håndjern NÅR TJENESTEN TILSIER DET – ikke bare etter opplæring eller med politiets godkjenning.`
      },

      legalitet: {
        tittel: "Legalitetsprinsippet og selvtekt",
        tekst: `Legalitetsprinsippet:
Ingen kan straffes uten lov (nulla poena sine lege). Er et grunnleggende rettsprinsipp – ikke legalisering av narkotika eller at regjeringen fastsetter lovverk.

Selvtekt (straffeloven § 19):
Selvtekt er lovregulert i straffeloven § 19. Selvtekt er ikke bare et etisk ståsted – det er faktisk regulert i loven.

Fri ferdsel på offentlig sted:
Beskyttet av Den europeiske menneskerettskonvensjonen (EMK) – ikke av politiet, straffeloven eller EMD (domstolen).

Mindreårige og samtykke:
Informert samtykke kan erstatte lovhjemmel ved MINDRE inngrep overfor mindreårige.
Mindreårige under 15 år er under kriminell lavalder.

Borgerplikt:
Alle borgere har plikt til å bistå hjelpeløse personer. Denne plikten gjelder uavhengig av om du er i vekteruniform.`
      },

      menneskerettigheter: {
        tittel: "Menneskerettigheter (EMK)",
        tekst: `Den europeiske menneskerettskonvensjonen (EMK) er inkorporert i norsk lov.

De viktigste artiklene for vektere:
- EMK art. 2: Retten til liv
- EMK art. 3: Forbud mot tortur og umenneskelig behandling
- EMK art. 5: Retten til frihet og sikkerhet (forbud mot ulovlig frihetsberøvelse)
- EMK art. 6: Uskyldspresumsjonen (uskyldig til det motsatte er bevist)
- EMK art. 9: Frihet til å gi uttrykk for sitt livssyn (religionsfrihet)
- EMK art. 10: Ytringsfrihet
- EMK art. 11: Forsamlingsfrihet
- EMK art. 14: Forbud mot diskriminering

En vekter kan ikke dømmes direkte for brudd på EMK, men kan dømmes for brudd på norsk straffelov og diskrimineringslovene som har inkorporert menneskerettighetene.

Fri ferdsel på offentlig sted er beskyttet av EMK art. 5.`
      },

      vitneplikt: {
        tittel: "Vitneforklaring og taushetsplikt",
        tekst: `Vitneplikt:
Du er pliktig til å møte i retten hvis du blir innkalt som vitne. Du kan IKKE nekte med taushetsplikt som begrunnelse (med visse unntak). Du trenger heller ikke møte i dress.

Som vitne skal du:
Forklare fakta – ikke anta og mene. Objektiv forklaring.

Nødvendig å hjelpe:
På vei til jobb og finner en bevisstløs person: Du HAR plikt til å bistå hjelpeløse personer (alminnelig borgerlig hjelpeplikt). Gjelder uavhengig av uniform.`
      }
    }
  }

};

// =============================================================
// HJELPEFUNKSJONER FOR CLAUDE CODE
// =============================================================

/**
 * Finn relevant lærebokinnhold basert på kategori
 * @param {string} kategori - Kategorinavn fra QUESTIONS
 * @returns {Array} - Array med relevante innholdsobjekter
 */
export function finnInnholdForKategori(kategori) {
  const resultater = [];
  Object.values(LAEREBOK).forEach(modul => {
    if (modul.kategorier && modul.kategorier.includes(kategori)) {
      resultater.push({
        modul: modul.tittel,
        innhold: modul.innhold
      });
    }
  });
  return resultater;
}

/**
 * Hent alle moduler som en flat liste
 * @returns {Array} - Array med alle moduler
 */
export function alleModuler() {
  return Object.values(LAEREBOK).map(m => ({
    tittel: m.tittel,
    timer: m.timer,
    kategorier: m.kategorier
  }));
}

/**
 * Hent innhold for en spesifikk modul
 * @param {number} modulNummer - Modulnummer (1-15)
 * @returns {Object} - Modul med alt innhold
 */
export function hentModul(modulNummer) {
  return LAEREBOK[`modul_${modulNummer}`] || null;
}
