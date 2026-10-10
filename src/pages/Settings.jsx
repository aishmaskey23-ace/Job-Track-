import "./Settings.css";
import { Sun, Moon } from "lucide-react";

function Settings({ darkMode, toggleDarkMode }) {
  return (
    <div className="settings-page">
      <h1>Settings</h1>

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
