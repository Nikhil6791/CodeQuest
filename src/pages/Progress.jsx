import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useGame } from "../context/GameContext";

const conceptLabels = {
  algorithm: "Algorithm",
  sequence: "Sequence",
  conditions: "Conditions",
  loops: "Loops",
  debugging: "Debugging",
};

export default function Progress() {
  const { state, getProgressByConcept } = useGame();
  const progress = getProgressByConcept;
  const accuracy =
    Object.keys(state.attempts).length > 0
      ? Math.round(
          (Object.values(state.correctAnswers).reduce(
            (sum, value) => sum + value,
            0,
          ) /
            Object.values(state.attempts).reduce(
              (sum, value) => sum + value,
              0,
            )) *
            100,
        )
      : 0;

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h1>Student Progress</h1>
        </div>

        <div className="stats-row">
          <div className="stat-box card">
            <span>Name</span>
            <strong>{state.studentName || "New learner"}</strong>
          </div>
          <div className="stat-box card">
            <span>Total score</span>
            <strong>{state.score}</strong>
          </div>
          <div className="stat-box card">
            <span>Levels completed</span>
            <strong>{state.completedLevels.length}/10</strong>
          </div>
          <div className="stat-box card">
            <span>Games completed</span>
            <strong>{state.completedGames.length}</strong>
          </div>
          <div className="stat-box card">
            <span>Accuracy</span>
            <strong>{accuracy}%</strong>
          </div>
        </div>

        <div className="card progress-panel">
          <h2>Progress by concept</h2>
          {Object.entries(progress).map(([conceptId, value]) => (
            <ProgressBar
              key={conceptId}
              label={conceptLabels[conceptId]}
              value={value}
            />
          ))}
        </div>

        <div className="detail-actions">
          <Link to="/games" className="action-button primary">
            Continue Playing
          </Link>
          <Link to="/badges" className="action-button secondary">
            View Badges
          </Link>
        </div>
      </section>
    </main>
  );
}
