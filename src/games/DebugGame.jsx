import { useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { debugQuestions } from "../data/questions";

function DebugGame() {
  const { state, recordAnswer, completeGame, addScore } = useGame();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const question = debugQuestions[questionIndex];

  const handleAnswer = (index) => {
    const isCorrect = index === question.wrongIndex;
    setFeedback({
      success: isCorrect,
      title: isCorrect ? "🎉 Bug Found!" : "Almost! Keep looking.",
      message: isCorrect
        ? `That's step ${question.wrongIndex + 1}. ${question.explanation}`
        : `You chose step ${index + 1}. The bug is step ${question.wrongIndex + 1}. ${question.explanation}`,
    });

    recordAnswer("debugging", isCorrect);
    completeGame("debugging");
    if (isCorrect) addScore(10);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setQuestionIndex((current) => (current + 1) % debugQuestions.length);
  };

  return (
    <main className="page-shell">
      <section className="section-block game-page">
        <div className="game-header-row">
          <Link to="/games" className="back-link">
            ← Games
          </Link>
          <h1>🐛 Debug the Robot</h1>
          <div className="score-text">⭐ {state.score}</div>
        </div>

        <div className="card game-panel">
          <h2>{question.prompt}</h2>
          <p>
            <strong>Mission:</strong> {question.goal}
          </p>
          <ol className="debug-steps">
            {question.steps.map((step, index) => (
              <li key={`${step}-${index}`}>
                <button
                  type="button"
                  className="debug-step-button"
                  onClick={() => handleAnswer(index)}
                >
                  {index + 1}. {step}
                </button>
              </li>
            ))}
          </ol>

          {feedback && (
            <div
              className={`result-box ${feedback.success ? "success" : "error"}`}
            >
              <h3>{feedback.title}</h3>
              <p>{feedback.message}</p>
              <button
                type="button"
                className="secondary-button"
                onClick={nextQuestion}
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default DebugGame;
