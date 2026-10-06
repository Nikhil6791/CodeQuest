export const STORAGE_KEY = "codequest-state";

export const defaultGameState = {
  studentName: "",
  score: 0,
  completedLevels: [],
  completedGames: [],
  badges: [],
  attempts: {},
  correctAnswers: {},
  conceptProgress: {},
};

export function loadGameState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultGameState;
    const parsed = JSON.parse(saved);
    return { ...defaultGameState, ...parsed };
  } catch (error) {
    console.error("Unable to load saved game state", error);
    return defaultGameState;
  }
}

export function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Unable to save game state", error);
  }
}
