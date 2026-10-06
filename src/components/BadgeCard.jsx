import { Lock, Sparkles } from "lucide-react";

export default function BadgeCard({ badge, unlocked }) {
  return (
    <div className={`badge-card ${unlocked ? "unlocked" : "locked"}`}>
      <div className="badge-icon">{badge.icon}</div>
      <div>
        <h3>{badge.name}</h3>
        <p>{badge.description}</p>
      </div>
      <span className="badge-status">
        {unlocked ? <Sparkles size={16} /> : <Lock size={16} />}
      </span>
    </div>
  );
}
