import { useEffect } from "react";
import { useQuiz } from "./hooks/useQuiz";
import ModeSelectScreen from "./components/ModeSelectScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import countriesData from "./data/countries.json";
import "./styles/global.css";

export default function App() {
  const quiz = useQuiz();

  useEffect(() => {
    if (!quiz.loading) return;
    const valid = countriesData.filter((c) => c.flags?.svg && c.name?.common);
    quiz.setCountries(valid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.loading]);

  if (quiz.loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading country data…</p>
      </div>
    );
  }

  if (quiz.error) {
    return (
      <div className="error-screen">
        <h2>Something went wrong</h2>
        <p>Failed to load data: {quiz.error}</p>
        <button className="btn-primary" onClick={quiz.retryFetch}>
          Try Again
        </button>
      </div>
    );
  }

  if (quiz.screen === "home") {
    return (
      <ModeSelectScreen
        onSelectMode={quiz.startQuiz}
        totalCountries={quiz.countries.length}
      />
    );
  }

  if (quiz.screen === "quiz" && quiz.currentQuestion) {
    return (
      <QuizScreen
        currentQuestion={quiz.currentQuestion}
        currentIndex={quiz.currentIndex}
        totalQuestions={quiz.totalQuestions}
        score={quiz.score}
        selectedAnswer={quiz.selectedAnswer}
        feedback={quiz.feedback}
        disabledAnswers={quiz.disabledAnswers}
        isTransitioning={quiz.isTransitioning}
        onSelectAnswer={quiz.selectAnswer}
        mode={quiz.mode}
      />
    );
  }

  if (quiz.screen === "results") {
    return (
      <ResultScreen
        score={quiz.score}
        results={quiz.results}
        onPlayAgain={quiz.goHome}
        mode={quiz.mode}
      />
    );
  }

  return null;
}
