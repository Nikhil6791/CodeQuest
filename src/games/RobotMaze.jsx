import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowLeftRight,
  Play,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import GameResult from "../components/GameResult";
import RobotGrid from "../components/RobotGrid";
import { useGame } from "../context/GameContext";
import { robotLevels } from "../data/levels";

const directionMap = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const commandIcons = {
  UP: ArrowUp,
  DOWN: ArrowDown,
  LEFT: ArrowLeft,
  RIGHT: ArrowRight,
};

function RobotMaze() {
  const { state, completeGame, completeLevel, addScore } = useGame();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [commands, setCommands] = useState([]);
  const [robotPosition, setRobotPosition] = useState(robotLevels[0].start);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentLevel = robotLevels[currentLevelIndex];
  const unlockedLevel = Math.min(
    robotLevels.length,
    Math.max(1, state.completedLevels.length + 1),
  );

  useEffect(() => {
    setRobotPosition(currentLevel.start);
    setCommands([]);
    setResult(null);
  }, [currentLevel]);

  const isWall = (position) =>
    currentLevel.walls.some(
      (wall) => wall.x === position.x && wall.y === position.y,
    );

  const moveRobot = (position, direction) => {
    const delta = directionMap[direction];
    return {
      x: position.x + delta.x,
      y: position.y + delta.y,
    };
  };

  const handleCommand = (direction) => {
    if (isRunning) return;
    setCommands((previous) => [...previous, direction]);
  };

  const handleUndo = () => {
    if (isRunning) return;
    setCommands((previous) => previous.slice(0, -1));
  };

  const handleClear = () => {
    if (isRunning) return;
    setCommands([]);
    setResult(null);
  };

  const handleRun = async () => {
    if (isRunning) return;
    if (commands.length === 0) {
      setResult({
        success: false,
        title: "😅 Almost!",
        message:
          "No commands entered. Add at least one direction to help the robot move.",
      });
      return;
    }

    setIsRunning(true);
    setResult(null);

    let activePosition = { ...currentLevel.start };
    setRobotPosition(activePosition);

    for (const command of commands) {
      const nextPosition = moveRobot(activePosition, command);

      if (
        nextPosition.x < 0 ||
        nextPosition.x >= 4 ||
        nextPosition.y < 0 ||
        nextPosition.y >= 4
      ) {
        setResult({
          success: false,
          title: "😅 Almost!",
          message: "The robot tried to leave the maze. Try a different path.",
        });
        setIsRunning(false);
        return;
      }

      if (isWall(nextPosition)) {
        setResult({
          success: false,
          title: "😅 Almost!",
          message: "The robot hit a wall. Choose a different route around it.",
        });
        setIsRunning(false);
        return;
      }

      activePosition = nextPosition;
      setRobotPosition(activePosition);
      await new Promise((resolve) => setTimeout(resolve, 350));

      if (
        activePosition.x === currentLevel.goal.x &&
        activePosition.y === currentLevel.goal.y
      ) {
        completeGame("robot-maze");
        completeLevel(currentLevel.id);

        const isFinalLevel = currentLevel.id === robotLevels.length;
        setResult({
          success: true,
          title: isFinalLevel ? "🏆 Maze Complete!" : "🎉 Great Job!",
          message: isFinalLevel
            ? "You completed all Robot Maze levels! Badge unlocked."
            : "The robot reached the goal! Level unlocked.",
        });
        setIsRunning(false);
        if (!isFinalLevel) {
          setTimeout(() => {
            setCurrentLevelIndex((previous) =>
              Math.min(previous + 1, robotLevels.length - 1),
            );
          }, 600);
        }
        return;
      }
    }

    setResult({
      success: false,
      title: "😅 Almost!",
      message: "The robot did not reach the goal. Try another route.",
    });
    setIsRunning(false);
  };

  return (
    <main className="page-shell">
      <section className="section-block game-page">
        <div className="game-header-row">
          <Link to="/games" className="back-link">
            ← Games
          </Link>
          <h1>🤖 Robot Maze</h1>
          <div className="score-text">⭐ Score: {state.score}</div>
        </div>

        <div className="level-row">
          {robotLevels.map((level) => {
            const isUnlocked = level.id <= unlockedLevel;
            const isCurrent = level.id === currentLevel.id;

            return (
              <button
                key={level.id}
                type="button"
                className={`level-pill ${isCurrent ? "current" : ""} ${isUnlocked ? "unlocked" : "locked"}`}
                onClick={() => isUnlocked && setCurrentLevelIndex(level.id - 1)}
                disabled={!isUnlocked}
              >
                {`Level ${level.id}`} {isUnlocked ? "🔓" : "🔒"}
              </button>
            );
          })}
        </div>

        <div className="maze-panel card">
          <div className="maze-stats">
            <span>Current level: {currentLevel.id}</span>
            <span>Score: {state.score}</span>
            <span>Commands: {commands.length}</span>
          </div>

          <RobotGrid
            grid={currentLevel.grid || 4}
            robotPosition={robotPosition}
            goal={currentLevel.goal}
            walls={currentLevel.walls}
            size={4}
          />

          <div className="command-box">
            <h3>Your Commands:</h3>
            <div className="command-list">
              {commands.length > 0 ? (
                commands.map((command, index) => (
                  <span key={`${command}-${index}`}>{command}</span>
                ))
              ) : (
                <span>None yet</span>
              )}
            </div>
          </div>

          <div className="direction-controls">
            {Object.keys(directionMap).map((direction) => {
              const Icon = commandIcons[direction];
              return (
                <button
                  key={direction}
                  type="button"
                  className="direction-button"
                  onClick={() => handleCommand(direction)}
                  disabled={isRunning}
                >
                  <Icon size={18} />
                  {direction}
                </button>
              );
            })}
          </div>

          <div className="game-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleUndo}
              disabled={isRunning || commands.length === 0}
            >
              ↩ Undo
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={handleClear}
              disabled={isRunning || commands.length === 0}
            >
              🗑 Clear
            </button>
            <button
              type="button"
              className="action-button primary"
              onClick={handleRun}
              disabled={isRunning}
            >
              ▶ Run Code
            </button>
          </div>
        </div>

        {result && (
          <GameResult
            isSuccess={result.success}
            title={result.title}
            message={result.message}
            onRetry={result.success ? undefined : () => setCommands([])}
          />
        )}
      </section>
    </main>
  );
}

export default RobotMaze;
