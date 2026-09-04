import { useEffect } from "react";
import { useQuiz } from "./hooks/useQuiz";
import { useEuropeProgress } from "./hooks/useEuropeProgress";
import ModeSelectScreen from "./components/ModeSelectScreen";
import ContinentSelectScreen from "./components/ContinentSelectScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import EuropeDashboard from "./components/europe/EuropeDashboard";
import PassportBoard from "./components/europe/PassportBoard";
import VennBoard from "./components/europe/VennBoard";
import BorderBoard from "./components/europe/BorderBoard";
import countriesData from "./data/countries.json";
import "./styles/global.css";
import "./styles/europe.css";

export default function App() {
  const quiz = useQuiz();
  const europe = useEuropeProgress();

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

  if (quiz.screen === "home") {
    return (
      <ModeSelectScreen
        onSelectMode={quiz.startQuiz}
        onSelectEurope={quiz.startEurope}
        totalCountries={quiz.countries.length}
      />
    );
  }

  if (quiz.screen === "continent") {
    return (
      <ContinentSelectScreen
        onSelectContinent={quiz.selectContinent}
        countries={quiz.countries}
      />
    );
  }

  if (quiz.screen === "europe") {
    return (
      <EuropeDashboard
        onOpenBoard={quiz.openBoard}
        onBack={quiz.goHome}
        scoreFor={europe.scoreFor}
        weakSpots={europe.weakSpots}
        passThreshold={europe.PASS_THRESHOLD}
      />
    );
  }

  if (quiz.screen === "europe-board") {
    const shared = {
      onFinish: (percent, wrong) =>
        europe.recordScore(quiz.europeBoard, percent, wrong),
      onBack: quiz.startEurope,
      passThreshold: europe.PASS_THRESHOLD,
    };

    if (quiz.europeBoard === "venn") return <VennBoard {...shared} />;
    if (quiz.europeBoard === "border") return <BorderBoard {...shared} />;
    // 'passport' i 'traps' dzielą tę samą mechanikę, różnią się pulą krajów
    return <PassportBoard boardId={quiz.europeBoard} {...shared} />;
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
