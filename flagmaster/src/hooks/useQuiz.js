import { useState, useCallback, useEffect } from "react";
import { buildQuizQuestions, buildCapitalQuestions, getFeedbackMessage } from "../utils/quizHelpers";

const TOTAL_QUESTIONS = 10;

const initialState = {
  screen: "home", // 'home' | 'mode' | 'quiz' | 'results'
  countries: [],
  loading: true,
  error: null,
  continent: null, // null = all, or region string
  mode: null, // 'flags' | 'capitals'
  questions: [],
  currentIndex: 0,
  score: 0,
  attempt: 1,
  selectedAnswer: null,
  feedback: null,
  disabledAnswers: [],
  // null = not transitioning, number = delay in ms
  transitionDelay: null,
  results: [],
};

export function useQuiz() {
  const [state, setState] = useState(initialState);

  // Handle auto-advance in a useEffect so the setTimeout is never
  // registered inside a setState updater (which React StrictMode calls twice).
  useEffect(() => {
    if (state.transitionDelay === null) return;

    const timer = setTimeout(() => {
      setState((prev) => {
        const nextIndex = prev.currentIndex + 1;
        if (nextIndex >= prev.questions.length) {
          return { ...prev, screen: "results", transitionDelay: null };
        }
        return {
          ...prev,
          currentIndex: nextIndex,
          attempt: 1,
          selectedAnswer: null,
          feedback: null,
          disabledAnswers: [],
          transitionDelay: null,
        };
      });
    }, state.transitionDelay);

    return () => clearTimeout(timer);
  }, [state.transitionDelay]);

  const setCountries = useCallback((countries) => {
    setState((s) => ({ ...s, countries, loading: false }));
  }, []);

  const setError = useCallback((error) => {
    setState((s) => ({ ...s, error, loading: false }));
  }, []);

  const selectContinent = useCallback((continent) => {
    setState((s) => ({ ...s, continent, screen: "mode" }));
  }, []);

  const startQuiz = useCallback((mode = "flags") => {
    setState((s) => {
      const pool = s.continent
        ? s.countries.filter((c) => c.region === s.continent)
        : s.countries;
      const questions =
        mode === "capitals"
          ? buildCapitalQuestions(pool)
          : buildQuizQuestions(pool);
      return {
        ...s,
        screen: "quiz",
        mode,
        questions,
        currentIndex: 0,
        score: 0,
        attempt: 1,
        selectedAnswer: null,
        feedback: null,
        disabledAnswers: [],
        transitionDelay: null,
        results: [],
      };
    });
  }, []);

  const selectAnswer = useCallback((cca2) => {
    setState((s) => {
      if (s.transitionDelay !== null || s.disabledAnswers.includes(cca2)) return s;

      const question = s.questions[s.currentIndex];
      const isCorrect = cca2 === question.correct.cca2;
      const attempt = s.attempt;

      const message = getFeedbackMessage(
        attempt,
        isCorrect,
        question.correct.name.common
      );
      const feedbackType = isCorrect ? "success" : attempt === 2 ? "info" : "error";
      const feedbackCountry = !isCorrect && attempt === 2 ? question.correct.name.common : null;

      let newScore = s.score;
      if (isCorrect && attempt === 1) newScore += 1;
      else if (isCorrect && attempt === 2) newScore += 0.5;

      const shouldTransition = isCorrect || attempt === 2;
      const delay = shouldTransition
        ? attempt === 2 && !isCorrect
          ? 2000
          : 1200
        : null;

      const newResults =
        shouldTransition
          ? [
              ...s.results,
              {
                question,
                result: isCorrect
                  ? attempt === 1
                    ? "first"
                    : "second"
                  : "miss",
              },
            ]
          : s.results;

      return {
        ...s,
        score: newScore,
        attempt: shouldTransition ? attempt : 2,
        selectedAnswer: cca2,
        disabledAnswers:
          !isCorrect && attempt === 1
            ? [...s.disabledAnswers, cca2]
            : s.disabledAnswers,
        transitionDelay: delay,
        results: newResults,
        feedback: { message, type: feedbackType, countryName: feedbackCountry },
      };
    });
  }, []);

  const retryFetch = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
  }, []);

  const goHome = useCallback(() => {
    setState((s) => ({ ...s, screen: "home", mode: null, continent: null }));
  }, []);

  const currentQuestion = state.questions[state.currentIndex] ?? null;

  return {
    ...state,
    isTransitioning: state.transitionDelay !== null,
    currentQuestion,
    totalQuestions: TOTAL_QUESTIONS,
    setCountries,
    setError,
    selectContinent,
    startQuiz,
    selectAnswer,
    retryFetch,
    goHome,
  };
}
