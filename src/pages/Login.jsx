import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-shell auth-shell">
      <div className="card auth-card">
        <h1>Welcome back 👋</h1>
        <p>Log in to continue your coding adventure.</p>
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="login-username">
              Username
            </label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Your username"
              autoComplete="username"
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            className="action-button primary"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="auth-switch">
          New to CodeQuest? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
