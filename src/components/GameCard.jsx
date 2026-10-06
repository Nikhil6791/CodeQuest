import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  return (
    <article className="game-card card">
      <div className="game-icon">{game.icon}</div>
      <div className="card-body">
        <span className="eyebrow">{game.concept}</span>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <div className="meta-row">
          <span>{game.difficulty}</span>
          <span>Best score: {game.bestScore}</span>
        </div>
      </div>
      <Link to={game.to} className="primary-link">
        <span>Play</span>
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
