import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout({ darkMode, toggleDarkMode, sidebarOpen, onMenuClick, username }) {
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onMenuClick={onMenuClick}
        username={username}
      />
      <div className="app-body">
        <Sidebar sidebarOpen={sidebarOpen} />
        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={onMenuClick}
            aria-hidden="true"
          />
        )}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
