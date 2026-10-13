import { lazy, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ApplicationProvider } from "./context/ApplicationContext";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Applications = lazy(() => import("./pages/Applications"));
const Kanban = lazy(() => import("./pages/Kanban"));
const Settings = lazy(() => import("./pages/Settings"));
const ApplicationDetails = lazy(() => import("./pages/ApplicationDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Discover = lazy(() => import("./pages/Discover"));

function App() {
  const [darkMode, setDarkMode] = useLocalStorage("jobtrack-darkmode", false);
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
                username="Ace"
              />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/:id" element={<ApplicationDetails />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="*" element={<NotFound />} />
            <Route path="discover" element={<Discover />} />
            <Route
              path="settings"
              element={<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApplicationProvider>
  );
}

export default App;