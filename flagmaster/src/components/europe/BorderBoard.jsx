import { useState } from "react";
import { COUNTRIES, flagUrl } from "../../data/memberships";
import BoardResult from "./BoardResult";

const ROUND_SIZE = 5;

const CITIES = {
  no: "Oslo", ch: "Zurychu", is: "Reykjavíku", li: "Vaduz", gb: "Londynu",
  tr: "Stambułu", al: "Tirany", me: "Podgoricy", mk: "Skopje", us: "Nowego Jorku",
  ca: "Toronto", at: "Wiednia", ie: "Dublina", cy: "Nikozji", mt: "Valletty",
  se: "Sztokholmu", dk: "Kopenhagi", cz: "Pragi", hu: "Budapesztu", ro: "Bukaresztu",
  bg: "Sofii", hr: "Zagrzebia", de: "Berlina", fr: "Paryża", es: "Madrytu",
  it: "Rzymu", pt: "Lizbony", gr: "Aten", nl: "Amsterdamu", be: "Brukseli",
  fi: "Helsinek", ee: "Tallinna", lv: "Rygi", lt: "Wilna", sk: "Bratysławy",
  si: "Lublany", lu: "Luksemburga",
};

function Question({ text, keyName, onPick, btnClass }) {
  return (
    <div className="border-q">
      <p className="border-q-text">{text}</p>
      <div className="border-q-btns">
        <button className={`border-btn ${btnClass(keyName, true)}`} onClick={() => onPick(keyName, true)}>
          Tak
        </button>
        <button className={`border-btn ${btnClass(keyName, false)}`} onClick={() => onPick(keyName, false)}>
          Nie
        </button>
      </div>
    </div>
  );
}

/** Podróż zawsze z Polski — najbliższa perspektywa dla ucznia z PL. */
function buildRound() {
  return COUNTRIES.filter((c) => c.cca2 !== "pl" && CITIES[c.cca2])
    .sort(() => Math.random() - 0.5)
    .slice(0, ROUND_SIZE);
}

const BLANK = { border: null, euro: null, nato: null };
const PER_TRIP = 3;

export default function BorderBoard({ onFinish, onBack, passThreshold }) {
  const [round, setRound] = useState(buildRound);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(BLANK);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrongCodes, setWrongCodes] = useState([]);
  const [rightCodes, setRightCodes] = useState([]);
  const [finalPercent, setFinalPercent] = useState(null);

  const dest = round[index];
  // Polska jest w Schengen i w NATO, więc kontrola odpada tylko wtedy,
  // gdy cel też jest w Schengen, a sojusznikiem jest członek NATO.
  const truth = { border: !dest.schengen, euro: dest.euro, nato: dest.nato };

  const check = () => {
    const hits = ["border", "euro", "nato"].filter(
      (k) => answers[k] === truth[k]
    ).length;
    setCorrect((c) => c + hits);
    if (hits < PER_TRIP) setWrongCodes((w) => [...w, dest.cca2]);
    else setRightCodes((r) => [...r, dest.cca2]);
    setChecked(true);
  };

  const next = () => {
    if (index + 1 >= round.length) {
      const percent = Math.round((correct / (round.length * PER_TRIP)) * 100);
      setFinalPercent(percent);
      onFinish(percent, wrongCodes, rightCodes);
      return;
    }
    setIndex((i) => i + 1);
    setAnswers(BLANK);
    setChecked(false);
  };

  const restart = () => {
    setRound(buildRound());
    setIndex(0);
    setAnswers(BLANK);
    setChecked(false);
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

  const pick = (key, value) => {
    if (checked) return;
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const btnClass = (key, value) => {
    const selected = answers[key] === value;
    if (!checked) return selected ? "selected" : "";
    if (value === truth[key]) return "right";
    return selected ? "wrong" : "";
  };

  return (
    <div className="eu-screen">
      <div className="eu-card">
        <button className="eu-back" onClick={onBack}>← Plansze</button>

        <div className="eu-progress">
          Podróż {index + 1} / {round.length}
          <div className="eu-progress-bar">
            <div className="eu-progress-fill" style={{ width: `${(index / round.length) * 100}%` }} />
          </div>
        </div>

        <div className="border-trip">
          <img src={flagUrl("pl")} alt="" className="eu-flag-small" />
          <span className="border-arrow">✈</span>
          <img src={flagUrl(dest.cca2)} alt="" className="eu-flag-small" />
        </div>
        <p className="border-scenario">
          Lecisz z Warszawy do <strong>{CITIES[dest.cca2]}</strong> ({dest.name}).
        </p>

        <Question
          keyName="border"
          text="Czy na lotnisku czeka Cię kontrola paszportowa?"
          onPick={pick}
          btnClass={btnClass}
        />
        <Question
          keyName="euro"
          text="Czy zapłacisz tam w euro?"
          onPick={pick}
          btnClass={btnClass}
        />
        <Question
          keyName="nato"
          text="Czy to sojusznik Polski w NATO?"
          onPick={pick}
          btnClass={btnClass}
        />

        {checked && (
          <div className="eu-verdict ok">
            {truth.border
              ? `${dest.name} nie jest w Schengen → kontrola paszportowa TAK.`
              : `${dest.name} jest w Schengen → kontrola paszportowa NIE.`}
            <br />
            {truth.euro
              ? `${dest.name} jest w strefie euro → zapłacisz euro.`
              : `${dest.name} nie jest w strefie euro → potrzebna inna waluta.`}
            <br />
            {truth.nato
              ? `${dest.name} jest w NATO → to sojusznik Polski.`
              : `${dest.name} nie jest w NATO → to nie sojusznik.`}
          </div>
        )}

        {checked && dest.hook && <div className="eu-hook">💡 {dest.hook}</div>}

        {checked ? (
          <button className="btn-primary" onClick={next}>
            {index + 1 >= round.length ? "Zobacz wynik" : "Następna podróż"}
          </button>
        ) : (
          <button
            className="btn-primary"
            onClick={check}
            disabled={
              answers.border === null || answers.euro === null || answers.nato === null
            }
          >
            Sprawdź
          </button>
        )}
      </div>
    </div>
  );
}
