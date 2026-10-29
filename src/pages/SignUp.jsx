import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signUp({ username, password, role });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-shell auth-shell">
      <div className="card auth-card">
        <h1>Join CodeQuest 🚀</h1>
        <p>Create an account to save your progress and earn badges.</p>
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="signup-username">
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Pick a username"
              autoComplete="username"
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 4 characters"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="field-group">
            <span className="field-label">I am a...</span>
            <div className="role-toggle">
              <button
                type="button"
                className={role === "student" ? "role-button active" : "role-button"}
                onClick={() => setRole("student")}
              >
                🧑‍🎓 Student
              </button>
              <button
                type="button"
                className={role === "teacher" ? "role-button active" : "role-button"}
                onClick={() => setRole("teacher")}
              >
                🧑‍🏫 Teacher
              </button>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            className="action-button primary"
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}
