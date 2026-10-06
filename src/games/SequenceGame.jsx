import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { sequenceQuestions } from "../data/questions";

function SequenceGame() {
  const { state, recordAnswer, addScore, completeGame } = useGame();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const question = sequenceQuestions[questionIndex];

  const choices = useMemo(() => {
    return [...question.steps].sort(() => Math.random() - 0.5);
  }, [question]);

  const handleChoice = (step) => {
    setSelected((current) => [...current, step]);
  };

  const handleCheck = () => {
    const isCorrect =
      JSON.stringify(selected) === JSON.stringify(question.correctAnswer);
    setFeedback({
      success: isCorrect,
      title: isCorrect
        ? "🎉 Correct!"
        : "Almost! Try checking the order again.",
      message: isCorrect
        ? "You arranged the algorithm correctly."
        : `Think about what comes first. ${question.explanation}`,
    });

    recordAnswer("sequence", isCorrect);
    completeGame("sequence");
    if (isCorrect) addScore(10);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setSelected([]);
    setQuestionIndex((current) => (current + 1) % sequenceQuestions.length);
  };

  return (
    <main className="page-shell">
      <section className="section-block game-page">
        <div className="game-header-row">
          <Link to="/games" className="back-link">
            ← Games
          </Link>
          <h1>🔀 Arrange the Steps</h1>
          <div className="score-text">⭐ {state.score}</div>
        </div>

        <div className="card game-panel">
          <h2>{question.prompt}</h2>
          <div className="option-grid">
            {choices.map((step, index) => (
              <button
                key={`${step}-${index}`}
                type="button"
                className={`option-button ${selected.includes(step) ? "selected" : ""}`}
                onClick={() => handleChoice(step)}
                disabled={selected.includes(step)}
              >
                {step}
              </button>
            ))}
          </div>

          <div className="selected-order">
            <h3>Your order</h3>
            <div className="badge-list">
              {selected.length > 0 ? (
                selected.map((step, index) => (
                  <span key={`${step}-${index}`}>{step}</span>
                ))
              ) : (
                <span>Choose the steps in order.</span>
              )}
            </div>
          </div>

          <div className="game-actions align-center">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setSelected([])}
            >
              Reset
            </button>
            <button
              type="button"
              className="action-button primary"
              onClick={handleCheck}
            >
              Check
            </button>
            {feedback && (
              <button
                type="button"
                className="secondary-button"
                onClick={nextQuestion}
              >
                Next Question
              </button>
            )}
          </div>

          {feedback && (
            <div
              className={`result-box ${feedback.success ? "success" : "error"}`}
            >
              <h3>{feedback.title}</h3>
              <p>{feedback.message}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SequenceGame;
