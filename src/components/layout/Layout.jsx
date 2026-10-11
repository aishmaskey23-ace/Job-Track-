import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Modal from "../applications/Modal";
import ApplicationForm from "../applications/ApplicationForm";
import LoadingSpinner from "../common/LoadingSpinner";
import { useApplicationContext } from "../../context/ApplicationContext";
import "./Layout.css";

function Layout({ darkMode, toggleDarkMode, sidebarOpen, onMenuClick, username }) {
  const { addApplication } = useApplicationContext();
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  function handleQuickAdd(formData) {
    addApplication(formData);
    setShowQuickAdd(false);
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onMenuClick={onMenuClick}
        onQuickAdd={() => setShowQuickAdd(true)}
        username={username}
      />
      <div className="app-body">
        <Sidebar
          sidebarOpen={sidebarOpen}
          onNavigate={() => sidebarOpen && onMenuClick()}
        />
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

      {showQuickAdd && (
        <Modal
          onClose={() => setShowQuickAdd(false)}
          labelledBy="application-form-title"
        >
          <ApplicationForm
            onSubmit={handleQuickAdd}
            onCancel={() => setShowQuickAdd(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Layout;