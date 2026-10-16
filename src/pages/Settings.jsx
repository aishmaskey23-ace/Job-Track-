import { Sun, Moon } from "lucide-react";
import "./Settings.css";

function Settings({ darkMode, toggleDarkMode, username, onUsernameChange }) {
  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>Profile</h2>
        <p className="settings-hint">The name shown in the navbar.</p>

        <label className="settings-field">
          <span>Display name</span>
          <input
            type="text"
            value={username}
            maxLength={30}
            placeholder="Your name"
            onChange={(e) => onUsernameChange(e.target.value)}
          />
        </label>
      </div>

      <div className="settings-section">
        <h2>Appearance</h2>
        <p className="settings-hint">Choose how JobTrack looks on this device.</p>

        <div className="theme-toggle" role="radiogroup" aria-label="Theme">
          <button
            type="button"
            role="radio"
            aria-checked={!darkMode}
            className={!darkMode ? "theme-option active" : "theme-option"}
            onClick={() => darkMode && toggleDarkMode()}
          >
            <Sun size={16} aria-hidden="true" /> Light
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={darkMode}
            className={darkMode ? "theme-option active" : "theme-option"}
            onClick={() => !darkMode && toggleDarkMode()}
          >
            <Moon size={16} aria-hidden="true" /> Dark
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;