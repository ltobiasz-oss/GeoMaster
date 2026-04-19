/**
 * Shuffles an array using Fisher-Yates algorithm.
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Picks `count` random unique items from an array, excluding items in `exclude`.
 * Returns fewer items if the pool is too small.
 */
function pickRandom(pool, count, exclude = []) {
  const excludeSet = new Set(exclude.map((c) => c.cca2));
  const filtered = pool.filter((c) => !excludeSet.has(c.cca2));
  return shuffle(filtered).slice(0, count);
}

/**
 * Generates 3 wrong answer options for a given correct country.
 * Prefers countries from the same subregion; falls back to same region.
 */
export function generateWrongOptions(correct, allCountries) {
  const sameSubregion = allCountries.filter(
    (c) =>
      c.cca2 !== correct.cca2 &&
      c.subregion &&
      correct.subregion &&
      c.subregion === correct.subregion
  );

  const sameRegion = allCountries.filter(
    (c) =>
      c.cca2 !== correct.cca2 &&
      c.region === correct.region &&
      !(c.subregion && correct.subregion && c.subregion === correct.subregion)
  );

  let wrong = [];

  if (sameSubregion.length >= 3) {
    wrong = pickRandom(sameSubregion, 3);
  } else {
    wrong = [...sameSubregion];
    const needed = 3 - wrong.length;
    wrong = [...wrong, ...pickRandom(sameRegion, needed, wrong)];
  }

  // If still not enough, fill from any country
  if (wrong.length < 3) {
    const needed = 3 - wrong.length;
    const any = allCountries.filter(
      (c) => c.cca2 !== correct.cca2 && !wrong.find((w) => w.cca2 === c.cca2)
    );
    wrong = [...wrong, ...pickRandom(any, needed)];
  }

  return wrong;
}

/**
 * Distribution: 3 Europe · 2 Americas · 2 Asia · 2 Africa · 1 Other.
 * "Main" pool for each region = UN member states only (unMember: true).
 * "Other" = non-UN territories + all of Oceania/Antarctic.
 */
const REGION_SLOTS = [
  { region: "Europe",   count: 3 },
  { region: "Americas", count: 2 },
  { region: "Asia",     count: 2 },
  { region: "Africa",   count: 2 },
];

const OTHER_REGIONS = new Set(["Oceania", "Antarctic", ""]);

export function buildQuizQuestions(allCountries) {
  const mainPool = {};
  REGION_SLOTS.forEach(({ region }) => {
    mainPool[region] = allCountries.filter(
      (c) => c.unMember && c.region === region
    );
  });

  const otherPool = allCountries.filter(
    (c) => !c.unMember || OTHER_REGIONS.has(c.region ?? "")
  );

  const selected = [
    ...REGION_SLOTS.flatMap(({ region, count }) =>
      pickRandom(mainPool[region], count)
    ),
    ...pickRandom(otherPool, 1),
  ];

  return shuffle(selected).map((correct) => {
    const wrong = generateWrongOptions(correct, allCountries);
    const options = shuffle([correct, ...wrong]);
    return { correct, options };
  });
}

/**
 * Builds 10 capital-quiz questions using the same regional distribution as
 * buildQuizQuestions (3 Europe · 2 Americas · 2 Asia · 2 Africa · 1 Other).
 * Only countries that have a capital are eligible.
 * Question structure: { correct, options } — identical to flag questions so
 * the rest of the quiz machinery (scoring, results, answer buttons) works as-is.
 */
export function buildCapitalQuestions(allCountries) {
  const withCapital = allCountries.filter(
    (c) => c.capital && c.capital.length > 0
  );

  const mainPool = {};
  REGION_SLOTS.forEach(({ region }) => {
    mainPool[region] = withCapital.filter(
      (c) => c.unMember && c.region === region
    );
  });

  const otherPool = withCapital.filter(
    (c) => !c.unMember || OTHER_REGIONS.has(c.region ?? "")
  );

  const selected = [
    ...REGION_SLOTS.flatMap(({ region, count }) =>
      pickRandom(mainPool[region], count)
    ),
    ...pickRandom(otherPool, 1),
  ];

  return shuffle(selected).map((correct) => {
    const wrong = generateWrongOptions(correct, withCapital);
    const options = shuffle([correct, ...wrong]);
    return { correct, options };
  });
}

/**
 * Returns a verbal rating based on the score (out of 10).
 */
export function getRating(score) {
  if (score >= 9) return "🏆 Flag Master! You're absolutely incredible!";
  if (score >= 7) return "🌟 Great job! Almost perfect!";
  if (score >= 5) return "👍 Good score! Practice makes perfect!";
  return "📚 Keep learning — you'll get there!";
}

/**
 * Returns a feedback message based on attempt number and correctness.
 */
export function getFeedbackMessage(attempt, isCorrect, correctName = "") {
  if (isCorrect && attempt === 1) {
    return "🎉 Excellent! You got it on the first try!";
  }
  if (!isCorrect && attempt === 1) {
    return "😬 Oops! Give it another shot — you've got this!";
  }
  if (isCorrect && attempt === 2) {
    return "✅ Got it on the second try! Nice work, let's keep going!";
  }
  if (!isCorrect && attempt === 2) {
    return `💡 The correct answer was:`;
  }
  return "";
}
