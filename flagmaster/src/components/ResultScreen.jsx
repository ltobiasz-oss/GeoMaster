import { getRating } from "../utils/quizHelpers";

const BADGE_LABELS = {
  first: "1st try ✓",
  second: "2nd try ½",
  miss: "Missed ✗",
};

const CONFETTI_COLORS = ["#e63946", "#ffffff", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6", "#e67e22"];

// Rozrzut losowany raz, przy ładowaniu modułu — render zostaje czysty,
// a 120 kawałków w stałych pozycjach wygląda identycznie jak losowane za każdym razem.
const CONFETTI_PIECES = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 2.5}s`,
  duration: `${2.5 + Math.random() * 2.5}s`,
  size: `${6 + Math.random() * 8}px`,
}));

function Confetti() {
  const pieces = CONFETTI_PIECES;

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function ResultScreen({ score, results, onPlayAgain, mode }) {
  const rating = getRating(score);
  const displayScore = score % 1 === 0 ? score : score.toFixed(1);

  return (
    <div className="app-wrapper">
      {mode === "flags" && score === 10 && <Confetti />}
      <div className="screen results-screen">
        <div className="results-card">
          <h2 className="results-title">Quiz Complete!</h2>
          <div className="results-score-big">{displayScore}</div>
          <div className="results-score-max">/ 10 points</div>
          <div className="results-rating">{rating}</div>

          <p className="results-list-title">Summary</p>

          <div className="results-list">
            {results.map(({ question, result }, i) => (
              <div key={i} className="result-item">
                <img
                  src={question.correct.flags.svg}
                  alt={`Flag of ${question.correct.name.common}`}
                  className="result-flag"
                />
                <div className="result-info">
                  <div className="result-country">
                    {question.correct.name.common}
                  </div>
                </div>
                <span className={`result-badge ${result}`}>
                  {BADGE_LABELS[result]}
                </span>
              </div>
            ))}
          </div>

          <button className="btn-primary" onClick={onPlayAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
