import { ArrowRight, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

export default function ConceptCard({ concept }) {
  return (
    <article className="concept-card card">
      <div className="concept-icon">{concept.icon}</div>
      <div className="card-body">
        <div className="concept-header">
          <h3>{concept.name}</h3>
          <span className="difficulty-tag">{concept.difficulty}</span>
        </div>
        <p>{concept.description}</p>
      </div>
      <Link to={`/learn/${concept.id}`} className="primary-link">
        <span>Learn {concept.name}</span>
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
