import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊", path: "/" },
  { id: "applications", label: "Applications", icon: "📋", path: "/applications" },
  { id: "kanban", label: "Kanban", icon: "🗂️", path: "/kanban" },
  { id: "settings", label: "Settings", icon: "⚙️", path: "/settings" },
];

function Sidebar({ sidebarOpen }) {
  return (
    <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
      <nav aria-label="Main navigation">
        <ul className="sidebar-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  isActive ? "sidebar-item active" : "sidebar-item"
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;