import { getCountry, flagUrl } from "../../data/memberships";
import { EuFlag } from "./GroupIcons";

// Kolejność celowa: fakty → praktyka → relacje między zbiorami → szlif.
const BOARDS = [
  {
    id: "passport",
    title: "Paszport kraju",
    icon: "🪪",
    desc: "Zaznacz, do czego należy dany kraj",
    hint: null,
  },
  {
    id: "border",
    title: "Kontrola graniczna",
    icon: "🛂",
    desc: "Scenariusze z prawdziwych podróży",
    hint: "Łatwiej po ~60% w Paszporcie",
  },
  {
    id: "venn",
    title: "Diagram Venna",
    icon: "⭕",
    desc: "Ułóż flagi w nachodzących kołach",
    hint: "Łatwiej po ~60% w Paszporcie",
  },
  {
    id: "traps",
    title: "Tryb pułapek",
    icon: "🎯",
    desc: "Kraje mniej oczywiste i łamiące schemat",
    hint: "Zostaw na koniec",
  },
];

function ProgressRing({ percent, passed }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const filled = percent === null ? 0 : (percent / 100) * circumference;

  return (
    <div className="ring-wrap">
      <svg className="ring" viewBox="0 0 64 64" aria-hidden="true">
        <circle className="ring-track" cx="32" cy="32" r={radius} />
        <circle
          className={`ring-fill ${passed ? "passed" : ""}`}
          cx="32"
          cy="32"
          r={radius}
          strokeDasharray={`${filled} ${circumference}`}
        />
      </svg>
      <span className="ring-label">
        {percent === null ? "—" : `${percent}%`}
      </span>
    </div>
  );
}

export default function EuropeDashboard({
  onOpenBoard,
  onOpenLearn,
  onBack,
  scoreFor,
  weakSpots,
  passThreshold,
}) {
  const done = BOARDS.filter((b) => (scoreFor(b.id) ?? 0) >= passThreshold).length;
  const allDone = done === BOARDS.length;

  return (
    <div className="eu-screen">
      <div className="eu-card">
        <button className="eu-back" onClick={onBack}>← Menu</button>

        <EuFlag className="eu-logo-flag" />
        <h1 className="eu-title">Sojusze i wspólnoty</h1>
        <p className="eu-subtitle">UE · Schengen · strefa euro · NATO</p>

        <div className={`eu-meter ${allDone ? "complete" : ""}`}>
          {allDone ? (
            "🏆 Wszystkie plansze zaliczone — komplet!"
          ) : (
            <>
              Zaliczone plansze: <strong>{done} z {BOARDS.length}</strong>
              <span className="eu-meter-rule">
                Żeby zaliczyć wszystko, każda z {BOARDS.length} plansz musi mieć
                wynik co najmniej <strong>{passThreshold}%</strong>.
              </span>
            </>
          )}
        </div>

        <button className="eu-learn-btn" onClick={onOpenLearn}>
          <span className="eu-board-icon">📖</span>
          <span className="eu-board-text">
            <span className="eu-board-title">Trochę teorii</span>
            <span className="eu-board-desc">
              Co to jest UE, Schengen, euro i NATO — z listami państw
            </span>
          </span>
          <span className="eu-learn-arrow">→</span>
        </button>

        <div className="eu-boards">
          {BOARDS.map((board, i) => {
            const score = scoreFor(board.id);
            const passed = (score ?? 0) >= passThreshold;
            const started = score !== null;
            return (
              <button
                key={board.id}
                className={`eu-board-btn ${passed ? "passed" : ""} ${started ? "" : "fresh"}`}
                onClick={() => onOpenBoard(board.id)}
              >
                <span className="eu-board-num">{i + 1}</span>
                <span className="eu-board-icon">{board.icon}</span>
                <span className="eu-board-text">
                  <span className="eu-board-title">
                    {board.title} {passed && <span className="eu-check">✓</span>}
                  </span>
                  <span className="eu-board-desc">{board.desc}</span>
                  {!started && board.hint && (
                    <span className="eu-board-hint">💡 {board.hint}</span>
                  )}
                </span>
                <ProgressRing percent={score} passed={passed} />
              </button>
            );
          })}
        </div>

        {weakSpots.length > 0 && (
          <div className="eu-weak">
            <p className="eu-weak-title">Twoje słabe punkty</p>
            <p className="eu-weak-sub">
              Kraj znika z tej listy, gdy odpowiesz o nim poprawnie.
            </p>
            <div className="eu-weak-list">
              {weakSpots.map(({ cca2, count }) => {
                const country = getCountry(cca2);
                if (!country) return null;
                return (
                  <div key={cca2} className="eu-weak-item">
                    <img src={flagUrl(cca2)} alt="" className="eu-weak-flag" />
                    <span className="eu-weak-name">{country.name}</span>
                    {count > 1 && <span className="eu-weak-count">{count}×</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
