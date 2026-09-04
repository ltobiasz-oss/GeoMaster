import { getRating } from "../utils/quizHelpers";
import Fireworks from "./Fireworks";

const BADGE_LABELS = {
  first: "1st try ✓",
  second: "2nd try ½",
  miss: "Missed ✗",
};

export default function ResultScreen({ score, results, onPlayAgain, mode }) {
  const rating = getRating(score);
  const displayScore = score % 1 === 0 ? score : score.toFixed(1);

  return (
    <div className="app-wrapper">
      {mode === "flags" && score === 10 && <Fireworks />}
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
