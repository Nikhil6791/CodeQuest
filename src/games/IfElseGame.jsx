import { useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { ifElseQuestions } from "../data/questions";

function IfElseGame() {
  const { state, recordAnswer, completeGame, addScore } = useGame();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const question = ifElseQuestions[questionIndex];

  const handleAnswer = (choice) => {
    const isCorrect = choice === question.correctAnswer;
    setFeedback({
      success: isCorrect,
      title: isCorrect ? "🎉 Correct!" : "Almost! Try again.",
      message: isCorrect
        ? `Because the condition is true, ${question.explanation}`
        : `The right answer is ${question.correctAnswer}. ${question.explanation}`,
    });

    recordAnswer("conditions", isCorrect);
    completeGame("if-else");
    if (isCorrect) addScore(10);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setQuestionIndex((current) => (current + 1) % ifElseQuestions.length);
  };

  return (
    <main className="page-shell">
      <section className="section-block game-page">
        <div className="game-header-row">
          <Link to="/games" className="back-link">
            ← Games
          </Link>
          <h1>❓ If-Else Challenge</h1>
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

export default IfElseGame;
