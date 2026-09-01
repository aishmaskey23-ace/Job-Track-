import { useMemo } from "react";
import "./Dashboard.css";
import { useApplicationContext } from "../context/ApplicationContext";

const statCards = [
  { key: "total", label: "Total", tone: "accent" },
  { key: "applied", label: "Applied", tone: "applied" },
  { key: "interview", label: "Interview", tone: "interview" },
  { key: "offer", label: "Offers", tone: "offer" },
];

function Dashboard() {
  const { applications } = useApplicationContext();

  const stats = useMemo(() => {
    return applications.reduce(
      (acc, app) => {
        acc.total += 1;
        if (app.status === "Applied") acc.applied += 1;
        if (app.status === "Interview") acc.interview += 1;
        if (app.status === "Offer") acc.offer += 1;
        if (app.status === "Rejected") acc.rejected += 1;
        return acc;
      },
      { total: 0, applied: 0, interview: 0, offer: 0, rejected: 0 }
    );
  }, [applications]);

  const monthlyActivity = useMemo(() => {
    const counts = {};
    applications.forEach((app) => {
      if (!app.applicationDate) return;
      const month = new Date(app.applicationDate).toLocaleString("default", {
        month: "short",
      });
      counts[month] = (counts[month] || 0) + 1;
    });
    return counts;
  }, [applications]);

  const maxCount = Math.max(...Object.values(monthlyActivity), 1);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back 👋</h1>
        <p className="dashboard-subtitle">
          {stats.total === 0
            ? "Nothing tracked yet — add your first application to get started."
            : `${stats.total} application${stats.total === 1 ? "" : "s"} in motion.`}
        </p>
      </div>

      <div className="stats-row">
        {statCards.map((card) => (
          <div className={`stat-card tone-${card.tone}`} key={card.key}>
            <span className="stat-value">{stats[card.key]}</span>
            <span className="stat-label">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="activity-section">
        <h2>Application Activity</h2>
        {Object.keys(monthlyActivity).length === 0 ? (
          <p className="empty-state-inline">No activity yet.</p>
        ) : (
          <div className="bar-chart">
            {Object.entries(monthlyActivity).map(([month, count]) => (
              <div className="bar-column" key={month}>
                <span className="bar-count">{count}</span>
                <div
                  className="bar"
                  style={{ height: `${(count / maxCount) * 100}%` }}
                  title={`${count} application(s) in ${month}`}
                />
                <span className="bar-label">{month}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
