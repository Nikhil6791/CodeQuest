import GameCard from "../components/GameCard";

const games = [
  {
    id: "robot-maze",
    title: "Robot Maze",
    icon: "🤖",
    concept: "Algorithm + Sequence",
    description: "Guide the robot to the goal by choosing the right steps.",
    difficulty: "Easy → Hard",
    bestScore: "120",
    to: "/games/robot-maze",
  },
  {
    id: "sequence",
    title: "Arrange the Steps",
    icon: "🔀",
    concept: "Sequence",
    description: "Put the actions in the correct order.",
    difficulty: "Easy",
    bestScore: "80",
    to: "/games/sequence",
  },
  {
    id: "if-else",
    title: "If-Else Challenge",
    icon: "❓",
    concept: "Conditions",
    description: "Choose what the robot should do in each situation.",
    difficulty: "Medium",
    bestScore: "90",
    to: "/games/if-else",
  },
  {
    id: "loops",
    title: "Loop Challenge",
    icon: "🔄",
    concept: "Loops",
    description: "Pick the correct number of repeats.",
    difficulty: "Medium",
    bestScore: "100",
    to: "/games/loops",
  },
  {
    id: "debugging",
    title: "Debug the Robot",
    icon: "🐛",
    concept: "Debugging",
    description: "Find the mistake hiding in the code.",
    difficulty: "Medium",
    bestScore: "110",
    to: "/games/debugging",
  },
];

export default function Games() {
  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h1>🎮 Coding Games</h1>
          <p>Choose a game and start playing!</p>
        </div>
        <div className="cards-grid games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </main>
  );
}
