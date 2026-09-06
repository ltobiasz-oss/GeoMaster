import { useState } from "react";
import { COUNTRIES, GROUPS, flagUrl } from "../../data/memberships";
import BoardResult from "./BoardResult";

const ROUND_SIZE = 10;

// NATO w dwóch parach z czterech — wcześniej pojawiało się tu zbyt rzadko.
const PAIRS = [
  { a: "eu", b: "schengen" },
  { a: "eu", b: "euro" },
  { a: "eu", b: "nato" },
  { a: "schengen", b: "nato" },
];

const label = (id) => GROUPS.find((g) => g.id === id).label;

const zoneOf = (country, a, b) => {
  if (country[a] && country[b]) return "both";
  if (country[a]) return "a";
  if (country[b]) return "b";
  return "none";
};

/** Losuje parę zbiorów i dobiera kraje tak, by każda niepusta strefa się pojawiła. */
function buildRound() {
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const buckets = { a: [], b: [], both: [], none: [] };
  COUNTRIES.forEach((c) => buckets[zoneOf(c, pair.a, pair.b)].push(c));

  const available = Object.values(buckets).filter((list) => list.length > 0);
  const perZone = Math.ceil(ROUND_SIZE / available.length);
  const picked = available.flatMap((list) =>
    [...list].sort(() => Math.random() - 0.5).slice(0, perZone)
  );

  return {
    pair,
    countries: picked.sort(() => Math.random() - 0.5).slice(0, ROUND_SIZE),
  };
}

export default function VennBoard({ onFinish, onBack, passThreshold }) {
  const [{ pair, countries }, setRound] = useState(buildRound);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrongCodes, setWrongCodes] = useState([]);
  const [rightCodes, setRightCodes] = useState([]);
  const [finalPercent, setFinalPercent] = useState(null);

  const country = countries[index];
  const truth = country ? zoneOf(country, pair.a, pair.b) : null;

  const choose = (zone) => {
    if (answer) return;
    setAnswer(zone);
    if (zone === truth) {
      setCorrect((c) => c + 1);
      setRightCodes((r) => [...r, country.cca2]);
    } else {
      setWrongCodes((w) => [...w, country.cca2]);
    }
  };

  const next = () => {
    if (index + 1 >= countries.length) {
      const percent = Math.round((correct / countries.length) * 100);
      setFinalPercent(percent);
      onFinish(percent, wrongCodes, rightCodes);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
  };

  const restart = () => {
    setRound(buildRound());
    setIndex(0);
    setAnswer(null);
    setCorrect(0);
    setWrongCodes([]);
    setRightCodes([]);
    setFinalPercent(null);
  };

  if (finalPercent !== null) {
    return (
      <BoardResult
        percent={finalPercent}
        wrongCodes={wrongCodes}
        passThreshold={passThreshold}
        onRetry={restart}
        onBack={onBack}
      />
    );
  }

  const zoneClass = (zone) => {
    if (!answer) return "";
    if (zone === truth) return "right";
    if (zone === answer) return "wrong";
    return "";
  };

  return (
    <div className="eu-screen">
      <div className="eu-card">
        <button className="eu-back" onClick={onBack}>← Plansze</button>

        <div className="eu-progress">
          Pytanie {index + 1} / {countries.length}
          <div className="eu-progress-bar">
            <div
              className="eu-progress-fill"
              style={{ width: `${(index / countries.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="venn-country">
          <img src={flagUrl(country.cca2)} alt="" className="eu-flag-small" />
          <span className="eu-country-name">{country.name}</span>
        </div>
        <p className="eu-instruction">Gdzie należy umieścić ten kraj?</p>

        <div className="venn-diagram">
          <div className="venn-circle venn-circle-a" />
          <div className="venn-circle venn-circle-b" />
          <span className="venn-caption venn-caption-a">{label(pair.a)}</span>
          <span className="venn-caption venn-caption-b">{label(pair.b)}</span>

          <button
            className={`venn-zone venn-zone-a ${zoneClass("a")}`}
            onClick={() => choose("a")}
            aria-label={`Tylko ${label(pair.a)}`}
          >
            <span className="venn-zone-hint">tylko<br />{label(pair.a)}</span>
          </button>
          <button
            className={`venn-zone venn-zone-both ${zoneClass("both")}`}
            onClick={() => choose("both")}
            aria-label="Oba"
          >
            <span className="venn-zone-hint">oba</span>
          </button>
          <button
            className={`venn-zone venn-zone-b ${zoneClass("b")}`}
            onClick={() => choose("b")}
            aria-label={`Tylko ${label(pair.b)}`}
          >
            <span className="venn-zone-hint">tylko<br />{label(pair.b)}</span>
          </button>
        </div>

        <button
          className={`venn-outside ${zoneClass("none")}`}
          onClick={() => choose("none")}
        >
          Poza kołami — żadne z nich
        </button>

        {answer && (
          <>
            <div className={`eu-verdict ${answer === truth ? "ok" : "bad"}`}>
              {answer === truth ? "✓ Dobrze!" : "✗ Niestety nie."}
              {" "}
              {truth === "both" && `${country.name} należy do obu.`}
              {truth === "a" && `${country.name} jest tylko w: ${label(pair.a)}.`}
              {truth === "b" && `${country.name} jest tylko w: ${label(pair.b)}.`}
              {truth === "none" && `${country.name} nie należy do żadnego z nich.`}
            </div>
            {country.hook && <div className="eu-hook">💡 {country.hook}</div>}
            <button className="btn-primary" onClick={next}>
              {index + 1 >= countries.length ? "Zobacz wynik" : "Dalej"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
