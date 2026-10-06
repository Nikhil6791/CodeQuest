import { useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { loopChallenges } from "../data/questions";

function LoopGame() {
  const { state, recordAnswer, completeGame, addScore } = useGame();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const question = loopChallenges[questionIndex];

  const handleAnswer = (answer) => {
    const isCorrect = answer === question.correctAnswer;
    setFeedback({
      success: isCorrect,
      title: isCorrect ? "🎉 Correct!" : "Almost! Try again.",
      message: isCorrect
        ? `Yes! The loop repeats ${question.correctAnswer} times.`
        : `The correct answer is ${question.correctAnswer}. ${question.explanation}`,
    });

    recordAnswer("loops", isCorrect);
    completeGame("loops");
    if (isCorrect) addScore(10);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setQuestionIndex((current) => (current + 1) % loopChallenges.length);
  };

  return (
    <main className="page-shell">
      <section className="section-block game-page">
        <div className="game-header-row">
          <Link to="/games" className="back-link">
            ← Games
          </Link>
          <h1>🔄 Loop Challenge</h1>
          <div className="score-text">⭐ {state.score}</div>
        </div>

        <div className="card game-panel">
          <h2>{question.prompt}</h2>
          <div className="option-grid">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

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

export default LoopGame;
