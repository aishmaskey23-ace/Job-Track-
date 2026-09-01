import { useState } from "react";
import "./Navbar.css";

function Navbar({ darkMode, toggleDarkMode, username = "User", onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar menu"
        >
          ☰
        </button>
        <div className="navbar-brand">
          <span className="navbar-mark" aria-hidden="true">
            <span className="mark-dot mark-dot-1" />
            <span className="mark-dot mark-dot-2" />
            <span className="mark-dot mark-dot-3" />
          </span>
          <h5 className="navbar-logo">JobTrack</h5>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="icon-btn"
          onClick={() => setShowNotifications((prev) => !prev)}
          aria-label="Toggle notifications"
          aria-pressed={showNotifications}
        >
          🔔
        </button>

        <button
          className="icon-btn"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        <div className="navbar-user">
          <span className="navbar-avatar" aria-hidden="true">
            {username.charAt(0).toUpperCase()}
          </span>
          <span className="navbar-username">{username}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
