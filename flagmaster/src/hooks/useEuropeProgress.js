import { useState, useCallback } from "react";

const STORAGE_KEY = "geomaster-europe-progress";
const PASS_THRESHOLD = 80;

const emptyProgress = { scores: {}, mistakes: {} };

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw);
    return {
      scores: parsed.scores ?? {},
      mistakes: parsed.mistakes ?? {},
    };
  } catch {
    // Prywatne okno, wyłączone cookies, uszkodzony wpis — zaczynamy od zera.
    return emptyProgress;
  }
}

function write(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Zapis się nie udał — postęp zostaje tylko w pamięci sesji.
  }
}

/**
 * Trzyma najlepszy wynik (0-100) dla każdej planszy oraz licznik pomyłek
 * per kraj, z którego budujemy listę "Twoje słabe punkty".
 */
export function useEuropeProgress() {
  const [progress, setProgress] = useState(read);

  const recordScore = useCallback(
    (boardId, percent, wrongCodes = [], rightCodes = []) => {
      setProgress((prev) => {
        const best = Math.max(prev.scores[boardId] ?? 0, Math.round(percent));
        const mistakes = { ...prev.mistakes };

        // Poprawna odpowiedź zdejmuje kraj z listy słabych punktów…
        rightCodes.forEach((code) => {
          delete mistakes[code];
        });
        // …a pomyłka go tam (z powrotem) wpisuje.
        wrongCodes.forEach((code) => {
          mistakes[code] = (mistakes[code] ?? 0) + 1;
        });

        const next = { scores: { ...prev.scores, [boardId]: best }, mistakes };
        write(next);
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    write(emptyProgress);
    setProgress(emptyProgress);
  }, []);

  const scoreFor = useCallback((boardId) => progress.scores[boardId] ?? null, [progress]);

  const weakSpots = Object.entries(progress.mistakes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([cca2, count]) => ({ cca2, count }));

  return { progress, recordScore, reset, scoreFor, weakSpots, PASS_THRESHOLD };
}
