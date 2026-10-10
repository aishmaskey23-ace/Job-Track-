import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Layout.css";
import { Suspense } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

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
          <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
    <Outlet />
  </Suspense>
        </main>
      </div>
    </div>
  );
}

export default Layout;
