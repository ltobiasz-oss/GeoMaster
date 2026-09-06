import { useState, useMemo } from "react";
import { COUNTRIES, GROUPS, trapsPool, pickWeighted, flagUrl } from "../../data/memberships";
import { GroupIcon } from "./GroupIcons";
import BoardResult from "./BoardResult";

const ROUND_SIZE = 10;

// Pule przechodzone cyklicznie, żeby dwa znaczki obok siebie nigdy nie
// powtórzyły tego samego słowa.
const GOOD_WORDS = ["Dobrze!", "Świetnie!", "Brawo!", "Super!"];
const BAD_WORDS = ["Ups!", "Źle", "Niestety", "Pudło"];
// Rozłączna z GOOD_WORDS, żeby stempel nie powtarzał słowa z wstążki pod nim.
const SWEEP_WORDS = ["Komplet!", "Mistrz!", "Bezbłędnie!", "Wymiatasz!"];

// Paszport: 80% krajów rozpoznawalnych. Pułapki: odwrotnie — 20%,
// więc dominują Bałkany, Bałtyk i małe państwa.
function pickRound(boardId) {
  return boardId === "traps"
    ? pickWeighted(trapsPool(), ROUND_SIZE, 0.2)
    : pickWeighted(COUNTRIES, ROUND_SIZE, 0.8);
}

/**
 * Rdzeń nauki: jeden kraj, cztery przełączniki. Punktujemy każdy przełącznik
 * osobno (0,25 pkt), więc częściowa wiedza też się liczy.
 */
export default function PassportBoard({ boardId, onFinish, onBack, passThreshold }) {
  const [round, setRound] = useState(() => pickRound(boardId));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState({});
  const [checked, setChecked] = useState(false);
  const [earned, setEarned] = useState(0);
  const [wrongCodes, setWrongCodes] = useState([]);
  const [rightCodes, setRightCodes] = useState([]);
  const [finalPercent, setFinalPercent] = useState(null);

  const country = round[index];

  const correctness = useMemo(() => {
    if (!checked || !country) return {};
    return Object.fromEntries(
      GROUPS.map((g) => [g.id, Boolean(picked[g.id]) === country[g.id]])
    );
  }, [checked, picked, country]);

  const allCorrect =
    checked && GROUPS.every((g) => correctness[g.id]);

  const badges = useMemo(() => {
    if (!checked || !country) return {};
    let good = 0;
    let bad = 0;
    const out = {};
    GROUPS.forEach((g) => {
      const ok = Boolean(picked[g.id]) === country[g.id];
      out[g.id] = ok
        ? GOOD_WORDS[(index + good++) % GOOD_WORDS.length]
        : BAD_WORDS[(index + bad++) % BAD_WORDS.length];
    });
    return out;
  }, [checked, picked, country, index]);

  const toggle = (id) => {
    if (checked) return;
    setPicked((p) => ({ ...p, [id]: !p[id] }));
  };

  const check = () => {
    const hits = GROUPS.filter((g) => Boolean(picked[g.id]) === country[g.id]).length;
    setEarned((e) => e + hits / GROUPS.length);
    // Do słabych punktów liczy się tylko komplet — jedna pomyłka to wciąż luka.
    if (hits < GROUPS.length) setWrongCodes((w) => [...w, country.cca2]);
    else setRightCodes((r) => [...r, country.cca2]);
    setChecked(true);
  };

  const next = () => {
    if (index + 1 >= round.length) {
      const percent = Math.round((earned / round.length) * 100);
      setFinalPercent(percent);
      onFinish(percent, wrongCodes, rightCodes);
      return;
    }
    setIndex((i) => i + 1);
    setPicked({});
    setChecked(false);
  };

  const restart = () => {
    setRound(pickRound(boardId));
    setIndex(0);
    setPicked({});
    setChecked(false);
    setEarned(0);
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

  return (
    <div className="eu-screen">
      <div className="eu-card">
        <button className="eu-back" onClick={onBack}>← Plansze</button>

        <div className="eu-progress">
          Pytanie {index + 1} / {round.length}
          <div className="eu-progress-bar">
            <div
              className="eu-progress-fill"
              style={{ width: `${(index / round.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="eu-flag-wrap">
          <img src={flagUrl(country.cca2)} alt="" className="eu-flag-big" />
          {allCorrect && (
            <span className="eu-stamp">
              {SWEEP_WORDS[index % SWEEP_WORDS.length]}
            </span>
          )}
        </div>
        <h2 className="eu-country-name">{country.name}</h2>
        <p className="eu-instruction">Zaznacz wszystkie, do których należy:</p>

        <div className="eu-toggles">
          {GROUPS.map((g) => {
            // Przed sprawdzeniem kafelek pokazuje TWÓJ wybór.
            // Po sprawdzeniu wypełnienie mówi wyłącznie o członkostwie,
            // a czerwona obwódka wyłącznie o pomyłce — dwa osobne kanały.
            let state;
            if (!checked) {
              state = picked[g.id] ? "on" : "off";
            } else {
              state = country[g.id] ? "member" : "nonmember";
              if (!correctness[g.id]) state += " err";
            }
            return (
              <button
                key={g.id}
                className={`eu-toggle ${state}`}
                onClick={() => toggle(g.id)}
                disabled={checked}
              >
                <GroupIcon id={g.id} emoji={g.icon} />
                <span className="eu-toggle-label">{g.label}</span>
                {checked && (
                  <>
                    <span className={`eu-toggle-mark ${country[g.id] ? "yes" : "no"}`}>
                      {country[g.id] ? "✓ NALEŻY" : "— NIE NALEŻY"}
                    </span>
                    <span className={`eu-ribbon ${correctness[g.id] ? "good" : "bad"}`}>
                      {badges[g.id]}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {checked && country.hook && (
          <div className="eu-hook">💡 {country.hook}</div>
        )}

        {checked ? (
          <button className="btn-primary" onClick={next}>
            {index + 1 >= round.length ? "Zobacz wynik" : "Dalej"}
          </button>
        ) : (
          <button className="btn-primary" onClick={check}>Sprawdź</button>
        )}
      </div>
    </div>
  );
}
