/**
 * Przynależność krajów do UE / Schengen / strefy euro / NATO.
 *
 * Stan na 2026 rok. Ostatnie zmiany, o których warto pamiętać:
 *  - Finlandia dołączyła do NATO w 2023, Szwecja w 2024
 *  - Bułgaria i Rumunia to pełne Schengen od stycznia 2025
 *  - Bułgaria weszła do strefy euro w styczniu 2026 (21 krajów)
 *
 * `hook` to krótkie wyjaśnienie pokazywane po odpowiedzi — pomaga zapamiętać
 * kraje, które łamią schemat.
 */

export const GROUPS = [
  { id: "eu", label: "UE", full: "Unia Europejska", icon: "🇪🇺" },
  { id: "schengen", label: "Schengen", full: "Strefa Schengen", icon: "🛂" },
  { id: "euro", label: "Euro", full: "Strefa euro", icon: "💶" },
  { id: "nato", label: "NATO", full: "NATO", icon: "🛡" },
];

export const COUNTRIES = [
  // ---- Unia Europejska (27) ----
  { cca2: "at", tier: 1, name: "Austria", eu: true, schengen: true, euro: true, nato: false,
    hook: "Po II wojnie światowej zobowiązała się do neutralności, dlatego nie należy do NATO. W UE, Schengen i strefie euro — tak." },
  { cca2: "be", tier: 1, name: "Belgia", eu: true, schengen: true, euro: true, nato: true,
    hook: "W Brukseli — stolicy Belgii — mieszczą się siedziby zarówno Unii Europejskiej, jak i NATO." },
  { cca2: "bg", tier: 2, name: "Bułgaria", eu: true, schengen: true, euro: true, nato: true,
    hook: "Do strefy euro weszła dopiero w 2026 roku — wcześniej płaciła lewami. Pełne Schengen od 2025." },
  { cca2: "hr", tier: 1, name: "Chorwacja", eu: true, schengen: true, euro: true, nato: true,
    hook: "Od 2023 należy do wszystkich czterech: UE, Schengen, euro i NATO." },
  { cca2: "cy", tier: 2, name: "Cypr", eu: true, schengen: false, euro: true, nato: false,
    hook: "Pułapka! W UE i strefie euro, ale poza Schengen i poza NATO. Wyspa podzielona konfliktem z Turcją." },
  { cca2: "cz", tier: 1, name: "Czechy", eu: true, schengen: true, euro: false, nato: true,
    hook: "W UE, Schengen i NATO — ale płaci koronami czeskimi, nie euro." },
  { cca2: "dk", tier: 1, name: "Dania", eu: true, schengen: true, euro: false, nato: true,
    hook: "Członek NATO od 1949 i UE od 1973, ale zachowała własną koronę duńską." },
  { cca2: "ee", tier: 2, name: "Estonia", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "fi", tier: 1, name: "Finlandia", eu: true, schengen: true, euro: true, nato: true,
    hook: "Po ataku Rosji na Ukrainę zrezygnowała z wieloletniej neutralności i weszła do NATO w 2023 roku." },
  { cca2: "fr", tier: 1, name: "Francja", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "gr", tier: 1, name: "Grecja", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "es", tier: 1, name: "Hiszpania", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "nl", tier: 1, name: "Holandia", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "ie", tier: 1, name: "Irlandia", eu: true, schengen: false, euro: true, nato: false,
    hook: "Najdziwniejszy przypadek! Jedyny kraj UE poza Schengen (ma otwartą granicę z Wielką Brytanią). Neutralna, więc poza NATO. Ale płaci w euro." },
  { cca2: "lt", tier: 1, name: "Litwa", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "lu", tier: 2, name: "Luksemburg", eu: true, schengen: true, euro: true, nato: true,
    hook: "Strefa Schengen wzięła nazwę od wioski Schengen w Luksemburgu — to tam w 1985 podpisano układ o zniesieniu granic." },
  { cca2: "lv", tier: 2, name: "Łotwa", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "mt", tier: 2, name: "Malta", eu: true, schengen: true, euro: true, nato: false,
    hook: "Najmniejszy kraj UE. W Schengen i strefie euro, ale neutralny — poza NATO." },
  { cca2: "de", tier: 1, name: "Niemcy", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "pl", tier: 1, name: "Polska", eu: true, schengen: true, euro: false, nato: true,
    hook: "Nasz kraj: w UE (od 2004), Schengen (od 2007) i NATO (od 1999) — ale płacimy złotówkami, nie euro!" },
  { cca2: "pt", tier: 1, name: "Portugalia", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "ro", tier: 2, name: "Rumunia", eu: true, schengen: true, euro: false, nato: true,
    hook: "Pełnym członkiem Schengen została dopiero w 2025 roku. Waluta to lej rumuński." },
  { cca2: "sk", tier: 1, name: "Słowacja", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "si", tier: 2, name: "Słowenia", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "se", tier: 1, name: "Szwecja", eu: true, schengen: true, euro: false, nato: true,
    hook: "Po ponad 200 latach neutralności wstąpiła do NATO w 2024 roku. W UE tak, ale płaci koronami szwedzkimi." },
  { cca2: "hu", tier: 1, name: "Węgry", eu: true, schengen: true, euro: false, nato: true,
    hook: "W UE, Schengen i NATO. Waluta to forint węgierski." },
  { cca2: "it", tier: 1, name: "Włochy", eu: true, schengen: true, euro: true, nato: true },

  // ---- Schengen bez UE (4) ----
  { cca2: "no", tier: 1, name: "Norwegia", eu: false, schengen: true, euro: false, nato: true,
    hook: "Aż dwa razy w referendum (1972 i 1994) odrzuciła wejście do UE! Ale jest w Schengen i była założycielem NATO w 1949. Płaci koronami norweskimi." },
  { cca2: "ch", tier: 1, name: "Szwajcaria", eu: false, schengen: true, euro: false, nato: false,
    hook: "Słynie z neutralności — nie należy ani do UE, ani do NATO. Ale do Schengen weszła w 2008, więc pojedziesz tam bez kontroli. Płaci frankami." },
  { cca2: "is", tier: 2, name: "Islandia", eu: false, schengen: true, euro: false, nato: true,
    hook: "Jedyny członek NATO bez własnej armii! W Schengen tak, w UE nie." },
  { cca2: "li", tier: 2, name: "Liechtenstein", eu: false, schengen: true, euro: false, nato: false,
    hook: "Malutkie księstwo między Austrią a Szwajcarią. Tylko Schengen — bez UE, euro i NATO." },

  // ---- NATO bez UE (7) ----
  { cca2: "gb", tier: 1, name: "Wielka Brytania", eu: false, schengen: false, euro: false, nato: true,
    hook: "Wyszła z UE w 2020 roku (Brexit). Nigdy nie była w Schengen ani w strefie euro. W NATO została." },
  { cca2: "tr", tier: 1, name: "Turcja", eu: false, schengen: false, euro: false, nato: true,
    hook: "W NATO już od 1952 roku, ale mimo wieloletnich starań nigdy nie weszła do UE." },
  { cca2: "al", tier: 2, name: "Albania", eu: false, schengen: false, euro: false, nato: true,
    hook: "W NATO od 2009. O członkostwo w UE dopiero się stara." },
  { cca2: "me", tier: 2, name: "Czarnogóra", eu: false, schengen: false, euro: false, nato: true,
    hook: "Ciekawostka: używa euro, choć NIE należy do strefy euro ani do UE. W NATO od 2017." },
  { cca2: "mk", tier: 2, name: "Macedonia Północna", eu: false, schengen: false, euro: false, nato: true,
    hook: "Najmłodszy europejski członek NATO — dołączyła w 2020 roku." },
  { cca2: "us", tier: 1, name: "Stany Zjednoczone", eu: false, schengen: false, euro: false, nato: true,
    hook: "Uwaga! NATO to sojusz po obu stronach Atlantyku — dlatego są w nim USA i Kanada, choć leżą w Ameryce Północnej." },
  { cca2: "ca", tier: 1, name: "Kanada", eu: false, schengen: false, euro: false, nato: true,
    hook: "Razem z USA współzałożyła NATO w 1949 roku. Nie ma nic wspólnego z UE ani Schengen." },
];

/** Kraje, które łamią schemat — trzon trybu pułapek. */
export const TRAP_CODES = [
  "no", "ch", "is", "li", "tr", "gb", "at", "ie", "cy", "mt", "se", "dk", "pl", "us",
];

export const flagUrl = (cca2) => `https://flagcdn.com/${cca2}.svg`;

export const getCountry = (cca2) => COUNTRIES.find((c) => c.cca2 === cca2);

/**
 * Pula pułapek: wszystkie kraje mniej oczywiste (Bałkany, Bałtyk, wyspy)
 * plus te rozpoznawalne, które łamią schemat (Norwegia, Szwajcaria…).
 */
export const trapsPool = () =>
  COUNTRIES.filter((c) => c.tier === 2 || TRAP_CODES.includes(c.cca2));

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/**
 * Dobiera `count` krajów z zadanym udziałem tych rozpoznawalnych (tier 1).
 * Bez tego losowanie z całej puli sprawiało, że Włochy czy Francja
 * potrafiły nie pojawić się przez całą rundę.
 */
export function pickWeighted(pool, count, easyShare) {
  const easy = pool.filter((c) => c.tier === 1);
  const hard = pool.filter((c) => c.tier === 2);
  const wantEasy = Math.round(count * easyShare);

  const picked = [
    ...shuffle(easy).slice(0, wantEasy),
    ...shuffle(hard).slice(0, count - wantEasy),
  ];

  // Gdyby któraś pula była za mała, uzupełniamy z reszty.
  if (picked.length < count) {
    const used = new Set(picked.map((c) => c.cca2));
    picked.push(
      ...shuffle(pool.filter((c) => !used.has(c.cca2))).slice(0, count - picked.length)
    );
  }
  return shuffle(picked);
}

/** Treść sekcji teoretycznej — definicja, ciekawostka i lista krajów. */
export const ORG_INFO = [
  {
    id: "eu",
    name: "Unia Europejska",
    short: "UE",
    definition:
      "Wspólnota gospodarcza i polityczna 27 państw. Kraje razem ustalają wiele przepisów, handlują ze sobą bez ceł, a obywatele mogą mieszkać, uczyć się i pracować w każdym kraju członkowskim.",
    fact:
      "Powstała po II wojnie światowej po to, żeby państwa, które ze sobą walczyły, zaczęły współpracować. Polska dołączyła 1 maja 2004 razem z dziewięcioma innymi krajami — to było największe rozszerzenie w historii UE.",
  },
  {
    id: "schengen",
    name: "Strefa Schengen",
    short: "Schengen",
    definition:
      "Obszar 29 państw bez kontroli na granicach wewnętrznych. Przejeżdżasz z kraju do kraju tak jak z województwa do województwa — nikt nie sprawdza paszportu.",
    fact:
      "Nazwa pochodzi od wioski Schengen w Luksemburgu, która ma około 500 mieszkańców. Układ podpisano tam w 1985 roku na statku na rzece Mozeli — w miejscu, gdzie stykają się granice Luksemburga, Niemiec i Francji.",
  },
  {
    id: "euro",
    name: "Strefa euro",
    short: "Euro",
    definition:
      "21 krajów Unii Europejskiej, które zrezygnowały z własnej waluty na rzecz euro. Tym samym pieniądzem zapłacisz i w Portugalii, i w Finlandii.",
    fact:
      "Monety euro mają jedną stronę wspólną, a drugą narodową — każdy kraj bije własny wzór, ale wszystkie są ważne wszędzie. Uwaga: nie każdy kraj UE ma euro. Polska, Czechy i Szwecja mają własne waluty.",
  },
  {
    id: "nato",
    name: "NATO",
    short: "NATO",
    definition:
      "Sojusz obronny 32 państw. Najważniejsza zasada, zwana artykułem 5, mówi: atak na jedno państwo jest atakiem na wszystkie — pozostałe przychodzą z pomocą.",
    fact:
      "NATO to nie tylko Europa — należą do niego również Stany Zjednoczone i Kanada. Artykuł 5 zastosowano tylko raz w historii: po zamachach z 11 września 2001 roku w USA. Polska dołączyła w 1999 roku.",
  },
];
