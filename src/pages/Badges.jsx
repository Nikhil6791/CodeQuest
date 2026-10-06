import { Link } from "react-router-dom";
import BadgeCard from "../components/BadgeCard";
import badges from "../data/badges";
import { useGame } from "../context/GameContext";

export default function Badges() {
  const { state } = useGame();

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h1>Badges</h1>
          <p>Earn badges by completing challenges and learning new ideas.</p>
        </div>

        <div className="badge-grid">
          {badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              unlocked={state.badges.includes(badge.id)}
            />
          ))}
        </div>

        <div className="detail-actions">
          <Link to="/progress" className="action-button primary">
            See Progress
          </Link>
          <Link to="/games" className="action-button secondary">
            Play More
          </Link>
        </div>
      </section>
    </main>
  );
}
