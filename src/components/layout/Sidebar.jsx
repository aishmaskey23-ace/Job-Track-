import { NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Columns3, Compass, Settings } from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "applications", label: "Applications", icon: ClipboardList, path: "/applications" },
  { id: "kanban", label: "Kanban", icon: Columns3, path: "/kanban" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  { id: "discover", label: "Discover", icon: Compass, path: "/discover" }
];

function Sidebar({ sidebarOpen, onNavigate }) {
  return (
    <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
      <nav aria-label="Main navigation">
        <ul className="sidebar-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                   onClick={onNavigate}
                  className={({ isActive }) =>
                    isActive ? "sidebar-item active" : "sidebar-item"
                  }
                >
                  <span className="sidebar-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="sidebar-label">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;