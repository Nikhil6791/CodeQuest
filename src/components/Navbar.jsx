import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Trophy,
  BookOpen,
  Gamepad2,
  BarChart3,
  BadgeCheck,
  Home,
} from "lucide-react";
import { useGame } from "../context/GameContext";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/badges", label: "Badges", icon: BadgeCheck },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state } = useGame();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="CodeQuest home">
          <span className="brand-mark">CQ</span>
          <span>CodeQuest</span>
        </Link>

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

        <div className="score-pill" aria-live="polite">
          <Trophy size={16} />
          <span>{state.score}</span>
        </div>

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
    </header>
  );
}
