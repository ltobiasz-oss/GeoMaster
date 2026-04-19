import FlagCard from "./FlagCard";
import CapitalCard from "./CapitalCard";
import AnswerButton from "./AnswerButton";

export default function QuizScreen({
  currentQuestion,
  currentIndex,
  totalQuestions,
  score,
  selectedAnswer,
  feedback,
  disabledAnswers,
  isTransitioning,
  onSelectAnswer,
  mode,
}) {
  const { correct, options } = currentQuestion;
  const progressPercent = (currentIndex / totalQuestions) * 100;

  return (
    <div className="app-wrapper">
      <div className="screen quiz-screen">
        {/* Header */}
        <div className="quiz-header">
          <span className="quiz-progress-label">
            Question {currentIndex + 1}/{totalQuestions}
          </span>
          <span className="quiz-score-label">
            Score: {score % 1 === 0 ? score : score.toFixed(1)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question card */}
        {mode === "capitals" ? (
          <CapitalCard capital={correct.capital[0]} />
        ) : (
          <FlagCard
            flagUrl={correct.flags.svg}
            altText={correct.name.common}
          />
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`feedback-banner ${feedback.type}`}>
            {feedback.message}
            {feedback.countryName && (
              <span className="feedback-country-name">{feedback.countryName}</span>
            )}
          </div>
        )}

        {/* Answers */}
        <div className="answers-grid" key={currentIndex}>
          {options.map((country) => {
            const isSelectedWrong =
              selectedAnswer === country.cca2 &&
              country.cca2 !== correct.cca2;
            const isSelectedCorrect =
              selectedAnswer === country.cca2 &&
              country.cca2 === correct.cca2;
            // Show correct highlight when transitioning after 2nd wrong answer
            const isShowCorrect =
              isTransitioning &&
              !isSelectedCorrect &&
              country.cca2 === correct.cca2 &&
              selectedAnswer !== correct.cca2;
            const isDisabled =
              isTransitioning || disabledAnswers.includes(country.cca2);

            return (
              <AnswerButton
                key={country.cca2}
                country={country}
                onClick={onSelectAnswer}
                isDisabled={isDisabled}
                isSelectedWrong={isSelectedWrong}
                isSelectedCorrect={isSelectedCorrect}
                isShowCorrect={isShowCorrect}
                showFlag={mode === "capitals"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
