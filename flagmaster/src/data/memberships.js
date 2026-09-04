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
  { cca2: "at", name: "Austria", eu: true, schengen: true, euro: true, nato: false,
    hook: "Po II wojnie światowej zobowiązała się do neutralności, dlatego nie należy do NATO. W UE, Schengen i strefie euro — tak." },
  { cca2: "be", name: "Belgia", eu: true, schengen: true, euro: true, nato: true,
    hook: "W Brukseli — stolicy Belgii — mieszczą się siedziby zarówno Unii Europejskiej, jak i NATO." },
  { cca2: "bg", name: "Bułgaria", eu: true, schengen: true, euro: true, nato: true,
    hook: "Do strefy euro weszła dopiero w 2026 roku — wcześniej płaciła lewami. Pełne Schengen od 2025." },
  { cca2: "hr", name: "Chorwacja", eu: true, schengen: true, euro: true, nato: true,
    hook: "Od 2023 należy do wszystkich czterech: UE, Schengen, euro i NATO." },
  { cca2: "cy", name: "Cypr", eu: true, schengen: false, euro: true, nato: false,
    hook: "Pułapka! W UE i strefie euro, ale poza Schengen i poza NATO. Wyspa podzielona konfliktem z Turcją." },
  { cca2: "cz", name: "Czechy", eu: true, schengen: true, euro: false, nato: true,
    hook: "W UE, Schengen i NATO — ale płaci koronami czeskimi, nie euro." },
  { cca2: "dk", name: "Dania", eu: true, schengen: true, euro: false, nato: true,
    hook: "Członek NATO od 1949 i UE od 1973, ale zachowała własną koronę duńską." },
  { cca2: "ee", name: "Estonia", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "fi", name: "Finlandia", eu: true, schengen: true, euro: true, nato: true,
    hook: "Po ataku Rosji na Ukrainę zrezygnowała z wieloletniej neutralności i weszła do NATO w 2023 roku." },
  { cca2: "fr", name: "Francja", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "gr", name: "Grecja", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "es", name: "Hiszpania", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "nl", name: "Holandia", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "ie", name: "Irlandia", eu: true, schengen: false, euro: true, nato: false,
    hook: "Najdziwniejszy przypadek! Jedyny kraj UE poza Schengen (ma otwartą granicę z Wielką Brytanią). Neutralna, więc poza NATO. Ale płaci w euro." },
  { cca2: "lt", name: "Litwa", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "lu", name: "Luksemburg", eu: true, schengen: true, euro: true, nato: true,
    hook: "Strefa Schengen wzięła nazwę od wioski Schengen w Luksemburgu — to tam w 1985 podpisano układ o zniesieniu granic." },
  { cca2: "lv", name: "Łotwa", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "mt", name: "Malta", eu: true, schengen: true, euro: true, nato: false,
    hook: "Najmniejszy kraj UE. W Schengen i strefie euro, ale neutralny — poza NATO." },
  { cca2: "de", name: "Niemcy", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "pl", name: "Polska", eu: true, schengen: true, euro: false, nato: true,
    hook: "Nasz kraj: w UE (od 2004), Schengen (od 2007) i NATO (od 1999) — ale płacimy złotówkami, nie euro!" },
  { cca2: "pt", name: "Portugalia", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "ro", name: "Rumunia", eu: true, schengen: true, euro: false, nato: true,
    hook: "Pełnym członkiem Schengen została dopiero w 2025 roku. Waluta to lej rumuński." },
  { cca2: "sk", name: "Słowacja", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "si", name: "Słowenia", eu: true, schengen: true, euro: true, nato: true },
  { cca2: "se", name: "Szwecja", eu: true, schengen: true, euro: false, nato: true,
    hook: "Po ponad 200 latach neutralności wstąpiła do NATO w 2024 roku. W UE tak, ale płaci koronami szwedzkimi." },
  { cca2: "hu", name: "Węgry", eu: true, schengen: true, euro: false, nato: true,
    hook: "W UE, Schengen i NATO. Waluta to forint węgierski." },
  { cca2: "it", name: "Włochy", eu: true, schengen: true, euro: true, nato: true },

  // ---- Schengen bez UE (4) ----
  { cca2: "no", name: "Norwegia", eu: false, schengen: true, euro: false, nato: true,
    hook: "Aż dwa razy w referendum (1972 i 1994) odrzuciła wejście do UE! Ale jest w Schengen i była założycielem NATO w 1949. Płaci koronami norweskimi." },
  { cca2: "ch", name: "Szwajcaria", eu: false, schengen: true, euro: false, nato: false,
    hook: "Słynie z neutralności — nie należy ani do UE, ani do NATO. Ale do Schengen weszła w 2008, więc pojedziesz tam bez kontroli. Płaci frankami." },
  { cca2: "is", name: "Islandia", eu: false, schengen: true, euro: false, nato: true,
    hook: "Jedyny członek NATO bez własnej armii! W Schengen tak, w UE nie." },
  { cca2: "li", name: "Liechtenstein", eu: false, schengen: true, euro: false, nato: false,
    hook: "Malutkie księstwo między Austrią a Szwajcarią. Tylko Schengen — bez UE, euro i NATO." },

  // ---- NATO bez UE (7) ----
  { cca2: "gb", name: "Wielka Brytania", eu: false, schengen: false, euro: false, nato: true,
    hook: "Wyszła z UE w 2020 roku (Brexit). Nigdy nie była w Schengen ani w strefie euro. W NATO została." },
  { cca2: "tr", name: "Turcja", eu: false, schengen: false, euro: false, nato: true,
    hook: "W NATO już od 1952 roku, ale mimo wieloletnich starań nigdy nie weszła do UE." },
  { cca2: "al", name: "Albania", eu: false, schengen: false, euro: false, nato: true,
    hook: "W NATO od 2009. O członkostwo w UE dopiero się stara." },
  { cca2: "me", name: "Czarnogóra", eu: false, schengen: false, euro: false, nato: true,
    hook: "Ciekawostka: używa euro, choć NIE należy do strefy euro ani do UE. W NATO od 2017." },
  { cca2: "mk", name: "Macedonia Północna", eu: false, schengen: false, euro: false, nato: true,
    hook: "Najmłodszy europejski członek NATO — dołączyła w 2020 roku." },
  { cca2: "us", name: "Stany Zjednoczone", eu: false, schengen: false, euro: false, nato: true,
    hook: "Uwaga! NATO to sojusz po obu stronach Atlantyku — dlatego są w nim USA i Kanada, choć leżą w Ameryce Północnej." },
  { cca2: "ca", name: "Kanada", eu: false, schengen: false, euro: false, nato: true,
    hook: "Razem z USA współzałożyła NATO w 1949 roku. Nie ma nic wspólnego z UE ani Schengen." },
];

/** Kraje, które łamią schemat — materiał na tryb pułapek. */
export const TRAP_CODES = [
  "no", "ch", "is", "li", "tr", "gb", "at", "ie", "cy", "mt", "se", "dk", "pl", "us",
];

export const flagUrl = (cca2) => `https://flagcdn.com/${cca2}.svg`;

export const getCountry = (cca2) => COUNTRIES.find((c) => c.cca2 === cca2);

export const traps = () => COUNTRIES.filter((c) => TRAP_CODES.includes(c.cca2));
