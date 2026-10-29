import { useMemo } from "react";
import { listStudentAccounts } from "../utils/auth";
import { loadGameState } from "../utils/storage";

const sampleStudents = [
  { name: "Rahul", score: 180, levelsCompleted: 4, status: "🟢" },
  { name: "Priya", score: 220, levelsCompleted: 5, status: "🟢" },
  { name: "Aman", score: 90, levelsCompleted: 2, status: "🟡" },
];

export default function TeacherDashboard() {
  const students = useMemo(() => {
    const registeredStudents = listStudentAccounts().map((account) => {
      const gameState = loadGameState(account.username);
      return {
        name: account.username,
        score: gameState.score,
        levelsCompleted: gameState.completedLevels.length,
        status: gameState.score > 0 ? "🟢" : "🟡",
      };
    });
    return [...sampleStudents, ...registeredStudents];
  }, []);

  const averageScore = Math.round(
    students.reduce((total, student) => total + student.score, 0) /
      students.length,
  );

  const totalGames = students.reduce(
    (total, student) => total + Math.min(5, student.levelsCompleted),
    0,
  );

  const conceptPerformance = {
    Algorithm: 88,
    Sequence: 76,
    Conditions: 65,
    Loops: 54,
    Debugging: 43,
  };

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-heading">
          <h1>Teacher Dashboard</h1>
        </div>

        <div className="stats-row">
          <div className="stat-box card">
            <span>Number of students</span>
            <strong>{students.length}</strong>
          </div>
          <div className="stat-box card">
            <span>Average score</span>
            <strong>{averageScore}</strong>
          </div>
          <div className="stat-box card">
            <span>Games completed</span>
            <strong>{totalGames}</strong>
          </div>
          <div className="stat-box card">
            <span>Most difficult concept</span>
            <strong>Debugging</strong>
          </div>
        </div>

        <div className="teacher-grid">
          <div className="card table-card">
            <h2>Student table</h2>
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Score</th>
                  <th>Levels Completed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={`${student.name}-${student.score}`}>
                    <td>{student.name}</td>
                    <td>{student.score}</td>
                    <td>{student.levelsCompleted}/5</td>
                    <td>{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card chart-card">
            <h2>Concept performance</h2>
            <div className="chart-list">
              {Object.entries(conceptPerformance).map(([label, value]) => (
                <div key={label} className="chart-item">
                  <div className="chart-label-row">
                    <span>{label}</span>
                    <strong>{value}%</strong>
                  </div>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
