import { createContext, useContext, useEffect, useMemo, useState } from "react";
import badgesList from "../data/badges";
import { loadGameState, saveGameState } from "../utils/storage";

const GameContext = createContext();

function calculateUnlockedBadges(nextState) {
  const unlocked = [];
  const completedGames = nextState.completedGames || [];
  const completedLevels = nextState.completedLevels || [];
  const correctAnswers = nextState.correctAnswers || {};

  if (completedGames.length >= 1) {
    unlocked.push("first-step");
  }

  if (completedLevels.length >= 10) {
    unlocked.push("maze-master");
  }

  const logicChallenges =
    (correctAnswers.sequence || 0) + (correctAnswers.conditions || 0);
  if (logicChallenges >= 5) {
    unlocked.push("logic-master");
  }

  if ((correctAnswers.debugging || 0) >= 5) {
    unlocked.push("bug-hunter");
  }

  if ((correctAnswers.loops || 0) >= 3) {
    unlocked.push("loop-master");
  }

  if (completedGames.length >= 5) {
    unlocked.push("coding-explorer");
  }

  return unlocked;
}

export function GameProvider({ children }) {
  const [state, setState] = useState(() => {
    const savedState = loadGameState();
    return { ...savedState, badges: calculateUnlockedBadges(savedState) };
  });

  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const updateState = (updater) => {
    setState((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      return { ...next, badges: calculateUnlockedBadges(next) };
    });
  };

  const setStudentName = (name) => {
    updateState((current) => ({
      ...current,
      studentName: name.trim(),
    }));
  };

  const addScore = (amount) => {
    updateState((current) => ({
      ...current,
      score: Math.max(0, current.score + amount),
    }));
  };

  const completeGame = (gameId) => {
    updateState((current) => {
      if (current.completedGames.includes(gameId)) {
        return current;
      }

      return {
        ...current,
        completedGames: [...current.completedGames, gameId],
      };
    });
  };

  const completeLevel = (levelNumber) => {
    updateState((current) => {
      if (current.completedLevels.includes(levelNumber)) {
        return current;
      }

      return {
        ...current,
        completedLevels: [...current.completedLevels, levelNumber],
        score: Math.max(0, current.score + 20),
      };
    });
  };

  const recordAnswer = (conceptId, isCorrect) => {
    updateState((current) => {
      const attempts = current.attempts[conceptId] || 0;
      const correctAnswers = current.correctAnswers[conceptId] || 0;

      return {
        ...current,
        attempts: {
          ...current.attempts,
          [conceptId]: attempts + 1,
        },
        correctAnswers: {
          ...current.correctAnswers,
          [conceptId]: isCorrect ? correctAnswers + 1 : correctAnswers,
        },
        score: Math.max(0, current.score + (isCorrect ? 10 : -2)),
      };
    });
  };

  const getProgressByConcept = useMemo(() => {
    const progress = {};
    const concepts = [
      "algorithm",
      "sequence",
      "conditions",
      "loops",
      "debugging",
    ];

    concepts.forEach((conceptId) => {
      let value = 0;
      const attempts = state.attempts[conceptId] || 0;
      const correct = state.correctAnswers[conceptId] || 0;

      if (conceptId === "algorithm") {
        value = (state.completedLevels.length / 10) * 100;
      } else if (attempts > 0) {
        value = (correct / attempts) * 100;
      }

      if (conceptId === "loops" && state.completedGames.includes("loops")) {
        value = Math.max(value, 80);
      }

      if (
        conceptId === "debugging" &&
        state.completedGames.includes("debugging")
      ) {
        value = Math.max(value, 75);
      }

      if (
        conceptId === "conditions" &&
        state.completedGames.includes("if-else")
      ) {
        value = Math.max(value, 75);
      }

      progress[conceptId] = Math.min(100, Math.round(value));
    });

    return progress;
  }, [state]);

  const getUnlockedBadges = () => {
    return badgesList.filter((badge) => state.badges.includes(badge.id));
  };

  const value = {
    state,
    setStudentName,
    addScore,
    completeGame,
    completeLevel,
    recordAnswer,
    getProgressByConcept,
    getUnlockedBadges,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
