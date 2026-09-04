import { getCountry, flagUrl } from "../../data/memberships";

const BOARDS = [
  {
    id: "passport",
    title: "Paszport kraju",
    icon: "🪪",
    desc: "Zaznacz, do czego należy dany kraj",
    hint: null,
  },
  {
    id: "venn",
    title: "Diagram Venna",
    icon: "⭕",
    desc: "Ułóż flagi w nachodzących kołach",
    hint: "Łatwiej po ~60% w Paszporcie",
  },
  {
    id: "border",
    title: "Kontrola graniczna",
    icon: "🛂",
    desc: "Scenariusze z prawdziwych podróży",
    hint: "Łatwiej po ~60% w Paszporcie",
  },
  {
    id: "traps",
    title: "Tryb pułapek",
    icon: "🎯",
    desc: "Kraje, które łamią schemat",
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

        <div className="eu-logo">🇪🇺</div>
        <h1 className="eu-title">Gotowy na test?</h1>
        <p className="eu-subtitle">
          UE · Schengen · strefa euro · NATO
        </p>

        <div className={`eu-meter ${allDone ? "complete" : ""}`}>
          {allDone
            ? "🏆 Wszystkie plansze zaliczone — jesteś gotowy!"
            : `Zaliczone plansze: ${done} / ${BOARDS.length} · próg ${passThreshold}%`}
        </div>

        <div className="eu-boards">
          {BOARDS.map((board) => {
            const score = scoreFor(board.id);
            const passed = (score ?? 0) >= passThreshold;
            const started = score !== null;
            return (
              <button
                key={board.id}
                className={`eu-board-btn ${passed ? "passed" : ""} ${started ? "" : "fresh"}`}
                onClick={() => onOpenBoard(board.id)}
              >
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
            <div className="eu-weak-list">
              {weakSpots.map(({ cca2, count }) => {
                const country = getCountry(cca2);
                if (!country) return null;
                return (
                  <div key={cca2} className="eu-weak-item">
                    <img src={flagUrl(cca2)} alt="" className="eu-weak-flag" />
                    <span className="eu-weak-name">{country.name}</span>
                    <span className="eu-weak-count">{count}×</span>
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
