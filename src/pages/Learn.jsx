import concepts from "../data/concepts";
import ConceptCard from "../components/ConceptCard";

export default function Learn() {
  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h1>Learn Coding Concepts</h1>
          <p>Start with one idea and build your coding superpowers.</p>
        </div>
        <div className="cards-grid concept-grid">
          {concepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
      </section>
    </main>
  );
}
