import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Lightbulb,
  Trophy,
  Rocket,
  Sparkles,
} from "lucide-react";
import concepts from "../data/concepts";
import { useGame } from "../context/GameContext";

const workflow = ["Learn", "Play", "Solve", "Earn", "Progress"];

export default function Home() {
  const { state, setStudentName } = useGame();
  const [name, setNameState] = useState("");
  const [showPrompt, setShowPrompt] = useState(!state.studentName);

  useEffect(() => {
    setShowPrompt(!state.studentName);
  }, [state.studentName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }
    setStudentName(trimmedName);
    setShowPrompt(false);
  };

  return (
    <>
      {showPrompt && (
        <div className="welcome-overlay">
          <div className="welcome-card card">
            <h2>What's your name?</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(event) => setNameState(event.target.value)}
                placeholder="Enter your name..."
                aria-label="Student name"
              />
              <button type="submit" className="action-button primary">
                Let's Go 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      <main className="page-shell">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Beginner coding adventures</span>
            <h1>Learn Coding Through Games</h1>
            <p>
              Coding doesn't have to be difficult. Learn, play, solve, and
              become a Coding Hero!
            </p>
            <div className="hero-actions">
              <Link to="/learn" className="action-button primary">
                Start Learning
              </Link>
              <Link to="/games" className="action-button secondary">
                Play Games
              </Link>
            </div>
            {state.studentName && (
              <div className="welcome-banner-wrap">
                <div className="welcome-banner">
                  <Sparkles size={18} />
                  <span>Welcome, {state.studentName}! 👋</span>
                </div>
                <p>Ready to become a Coding Hero?</p>
                <Link to="/games/robot-maze" className="action-button primary">
                  Start Level 1
                </Link>
              </div>
            )}
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="robot-figure">
              <span>🤖</span>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <h2>What Will You Learn?</h2>
          </div>
          <div className="cards-grid concept-grid">
            {concepts.map((concept) => (
              <div key={concept.id} className="card concept-card-home">
                <div className="concept-icon">{concept.icon}</div>
                <h3>{concept.name}</h3>
                <p>{concept.description}</p>
                <Link to={`/learn/${concept.id}`} className="primary-link">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <h2>How CodeQuest Works</h2>
          </div>
          <div className="workflow-grid">
            {workflow.map((step, index) => (
              <div key={step} className="workflow-step">
                <div className="step-number">{index + 1}</div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
