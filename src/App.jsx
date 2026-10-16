import { lazy, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ApplicationProvider } from "./context/ApplicationContext";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Applications = lazy(() => import("./pages/Applications"));
const ApplicationDetails = lazy(() => import("./pages/ApplicationDetails"));
const Kanban = lazy(() => import("./pages/Kanban"));
const Discover = lazy(() => import("./pages/Discover"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const DEFAULT_USERNAME = "Guest";

function App() {
  const [darkMode, setDarkMode] = useLocalStorage("jobtrack-darkmode", false);
  const [username, setUsername] = useLocalStorage(
    "jobtrack-username",
    DEFAULT_USERNAME
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <ApplicationProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                sidebarOpen={sidebarOpen}
                onMenuClick={toggleSidebar}
                username={username.trim() || DEFAULT_USERNAME}
              />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/:id" element={<ApplicationDetails />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="discover" element={<Discover />} />
            <Route
              path="settings"
              element={
                <Settings
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                  username={username}
                  onUsernameChange={setUsername}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApplicationProvider>
  );
}

export default App;