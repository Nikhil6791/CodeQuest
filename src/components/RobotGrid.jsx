function RobotGrid({ grid, robotPosition, goal, walls, size = 4 }) {
  return (
    <div
      className="maze-grid"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: size * size }).map((_, index) => {
        const x = index % size;
        const y = Math.floor(index / size);
        const isRobot = robotPosition.x === x && robotPosition.y === y;
        const isGoal = goal.x === x && goal.y === y;
        const isWall = walls.some((wall) => wall.x === x && wall.y === y);

        let content = "";
        if (isRobot) content = "🤖";
        else if (isGoal) content = "🏆";
        else if (isWall) content = "🧱";

        return (
          <div
            key={`${x}-${y}`}
            className={`grid-cell ${isWall ? "wall" : ""}`}
            aria-label={`Cell ${x + 1}, ${y + 1}`}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

export default RobotGrid;
