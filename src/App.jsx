import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Kanban from "./pages/Kanban";
import Settings from "./pages/Settings";
import ApplicationDetails from "./pages/ApplicationDetails";
import { ApplicationProvider } from "./context/ApplicationContext";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
import{useState} from "react";
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