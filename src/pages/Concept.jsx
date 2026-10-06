import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import concepts from "../data/concepts";

const conceptExamples = {
  algorithm: {
    intro:
      "An algorithm is a step-by-step set of instructions used to solve a problem.",
    examples: [
      "Following a recipe",
      "Using Google Maps",
      "Playing games",
      "Programming computers",
    ],
    steps: ["Boil water", "Add tea", "Add sugar", "Add milk", "Stir"],
    challenge: "Now Try a Challenge 🎮",
  },
  sequence: {
    intro: "Sequence means instructions must happen in the correct order.",
    examples: ["Brush your teeth", "Pack your bag", "Make a sandwich"],
    steps: ["Wake up", "Wash your face", "Brush your teeth", "Get dressed"],
    challenge: "Now Try a Challenge 🎮",
  },
  conditions: {
    intro: "If something is true, do one action. Else, do another action.",
    examples: [
      "If it is raining, take an umbrella",
      "If the light is green, walk",
    ],
    steps: [
      "IF it is rainy",
      "Take an umbrella",
      "ELSE",
      "Do not take an umbrella",
    ],
    challenge: "Now Try a Challenge 🎮",
  },
  loops: {
    intro: "A loop repeats instructions again and again.",
    examples: ["Repeat 5 times: Jump", "Repeat 3 times: Clap"],
    steps: ["REPEAT 5 TIMES", "Jump", "Jump", "Jump", "Jump", "Jump"],
    challenge: "Now Try a Challenge 🎮",
  },
  debugging: {
    intro: "Debugging means finding and fixing mistakes in a program.",
    examples: ["Wrong order", "Wrong turn", "Missing action"],
    steps: [
      "Move Forward",
      "Turn Left",
      "Move Forward",
      "Turn Right",
      "Move Forward",
    ],
    challenge: "Now Try a Challenge 🎮",
  },
};

export default function Concept() {
  const { conceptId } = useParams();
  const concept = concepts.find((item) => item.id === conceptId);
  const [sequenceIndex, setSequenceIndex] = useState(0);

  if (!concept) {
    return (
      <main className="page-shell">
        <div className="card empty-state">
          <h2>Concept not found</h2>
          <p>Try learning a different coding concept.</p>
          <Link to="/learn" className="action-button primary">
            Back to Learn
          </Link>
        </div>
      </main>
    );
  }

  const example = conceptExamples[conceptId] || conceptExamples.algorithm;

  return (
    <main className="page-shell">
      <article className="card concept-detail">
        <div className="concept-detail-header">
          <div className="concept-icon large">{concept.icon}</div>
          <div>
            <span className="eyebrow">{concept.difficulty}</span>
            <h1>{concept.name}</h1>
          </div>
        </div>

        <p className="lead">{concept.longDescription}</p>
        <p>{example.intro}</p>

        <div className="concept-sections">
          <div>
            <h3>Where do we use {concept.name.toLowerCase()}?</h3>
            <ul className="simple-list">
              {example.examples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Simple example</h3>
            <ol className="simple-list numbered">
              {example.steps.map((item, index) => (
                <li key={item + index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>

        {concept.id === "sequence" && (
          <div className="mini-example box">
            <h3>Try this tiny sequence</h3>
            <div className="sequence-strip">
              {example.steps.map((step, index) => (
                <button
                  key={step + index}
                  type="button"
                  className={
                    index === sequenceIndex
                      ? "sequence-step active"
                      : "sequence-step"
                  }
                  onClick={() => setSequenceIndex(index)}
                >
                  {step}
                </button>
              ))}
            </div>
            <p>
              Step {sequenceIndex + 1}: {example.steps[sequenceIndex]}
            </p>
          </div>
        )}

        <div className="detail-actions">
          <Link to={`/games/${concept.game}`} className="action-button primary">
            {example.challenge}
          </Link>
          <Link to="/learn" className="action-button secondary">
            Back to Learn
          </Link>
        </div>
      </article>
    </main>
  );
}
