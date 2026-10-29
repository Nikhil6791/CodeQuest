const STORAGE_PREFIX = "codequest-state-";

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

export function loadGameState(username) {
  if (!username) return defaultGameState;

  try {
    const saved = localStorage.getItem(STORAGE_PREFIX + username.toLowerCase());
    if (!saved) return { ...defaultGameState, studentName: username };
    const parsed = JSON.parse(saved);
    return { ...defaultGameState, ...parsed };
  } catch (error) {
    console.error("Unable to load saved game state", error);
    return { ...defaultGameState, studentName: username };
  }
}

export function saveGameState(username, state) {
  if (!username) return;

  try {
    localStorage.setItem(
      STORAGE_PREFIX + username.toLowerCase(),
      JSON.stringify(state),
    );
  } catch (error) {
    console.error("Unable to save game state", error);
  }
}
