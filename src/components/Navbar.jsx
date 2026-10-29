import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Trophy,
  BookOpen,
  Gamepad2,
  BarChart3,
  BadgeCheck,
  Home,
  LogOut,
} from "lucide-react";
import { useGame } from "../context/GameContext";
import { useAuth } from "../context/AuthContext";

const studentNavItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/badges", label: "Badges", icon: BadgeCheck },
];

const teacherNavItems = [
  { to: "/teacher", label: "Dashboard", icon: BarChart3 },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state } = useGame();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = user?.role === "teacher" ? teacherNavItems : studentNavItems;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="CodeQuest home">
          <span className="brand-mark">CQ</span>
          <span>CodeQuest</span>
        </Link>

        {user && (
          <nav
            className={`nav-links ${menuOpen ? "open" : ""}`}
            aria-label="Main navigation"
          >
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        )}

        {user && (
          <div className="navbar-actions">
            {user.role !== "teacher" && (
              <div className="score-pill" aria-live="polite">
                <Trophy size={16} />
                <span>{state.score}</span>
              </div>
            )}

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
