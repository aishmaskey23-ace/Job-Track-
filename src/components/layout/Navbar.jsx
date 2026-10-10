import { useState, useRef, useEffect } from "react";
import { Menu, Bell, Sun, Moon } from "lucide-react";
import { useApplicationContext } from "../../context/ApplicationContext";
import "./Navbar.css";

function timeAgo(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function Navbar({ darkMode, toggleDarkMode, username = "User", onMenuClick }) {
  const { notifications, markAllNotificationsRead, clearNotifications } =
    useApplicationContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!showNotifications) return;

    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setShowNotifications(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showNotifications]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar menu"
        >
          <Menu size={20} aria-hidden="true" />
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
        <div className="notif-wrapper" ref={notifRef}>
          <button
            className="icon-btn notif-btn"
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
            aria-expanded={showNotifications}
            aria-haspopup="true"
          >
            <Bell size={18} aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="notif-badge">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notif-dropdown" role="region" aria-label="Notifications">
              <div className="notif-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <div className="notif-actions">
                    <button onClick={markAllNotificationsRead}>Mark all read</button>
                    <button onClick={clearNotifications}>Clear</button>
                  </div>
                )}
              </div>

              {notifications.length === 0 ? (
                <p className="notif-empty">No notifications yet.</p>
              ) : (
                <ul className="notif-list">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={n.read ? "notif-item" : "notif-item unread"}
                    >
                      <p>{n.message}</p>
                      <span>{timeAgo(n.createdAt)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <button
          className="icon-btn"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Moon size={18} aria-hidden="true" />
          ) : (
            <Sun size={18} aria-hidden="true" />
          )}
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