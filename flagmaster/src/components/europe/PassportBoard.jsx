import { useState, useMemo } from "react";
import { COUNTRIES, GROUPS, traps, flagUrl } from "../../data/memberships";
import BoardResult from "./BoardResult";

const ROUND_SIZE = 10;

function pickRound(pool) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, ROUND_SIZE);
}

/**
 * Rdzeń nauki: jeden kraj, cztery przełączniki. Punktujemy każdy przełącznik
 * osobno (0,25 pkt), więc częściowa wiedza też się liczy.
 */
export default function PassportBoard({ boardId, onFinish, onBack, passThreshold }) {
  const pool = boardId === "traps" ? traps() : COUNTRIES;
  const [round, setRound] = useState(() => pickRound(pool));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState({});
  const [checked, setChecked] = useState(false);
  const [earned, setEarned] = useState(0);
  const [wrongCodes, setWrongCodes] = useState([]);
  const [finalPercent, setFinalPercent] = useState(null);

  const country = round[index];

  const correctness = useMemo(() => {
    if (!checked || !country) return {};
    return Object.fromEntries(
      GROUPS.map((g) => [g.id, Boolean(picked[g.id]) === country[g.id]])
    );
  }, [checked, picked, country]);

  const toggle = (id) => {
    if (checked) return;
    setPicked((p) => ({ ...p, [id]: !p[id] }));
  };

  const check = () => {
    const hits = GROUPS.filter((g) => Boolean(picked[g.id]) === country[g.id]).length;
    setEarned((e) => e + hits / GROUPS.length);
    if (hits < GROUPS.length) setWrongCodes((w) => [...w, country.cca2]);
    setChecked(true);
  };

  const next = () => {
    if (index + 1 >= round.length) {
      const percent = Math.round((earned / round.length) * 100);
      setFinalPercent(percent);
      onFinish(percent, wrongCodes);
      return;
    }
    setIndex((i) => i + 1);
    setPicked({});
    setChecked(false);
  };

  const restart = () => {
    setRound(pickRound(pool));
    setIndex(0);
    setPicked({});
    setChecked(false);
    setEarned(0);
    setWrongCodes([]);
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

        <img src={flagUrl(country.cca2)} alt="" className="eu-flag-big" />
        <h2 className="eu-country-name">{country.name}</h2>
        <p className="eu-instruction">Zaznacz wszystkie, do których należy:</p>

        <div className="eu-toggles">
          {GROUPS.map((g) => {
            const on = Boolean(picked[g.id]);
            const state = !checked
              ? on ? "on" : "off"
              : correctness[g.id] ? "right" : "wrong";
            return (
              <button
                key={g.id}
                className={`eu-toggle ${state}`}
                onClick={() => toggle(g.id)}
                disabled={checked}
              >
                <span className="eu-toggle-icon">{g.icon}</span>
                <span className="eu-toggle-label">{g.label}</span>
                {checked && (
                  <span className="eu-toggle-mark">
                    {country[g.id] ? "✓ należy" : "✗ nie należy"}
                  </span>
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
