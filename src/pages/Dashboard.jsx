import { useMemo } from "react";
import { useApplicationContext } from "../context/ApplicationContext";
import StatCard from "../components/dashboard/StatCard";
import StatusDonut from "../components/dashboard/StatusDonut";
import "./Dashboard.css";

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

  // An application that reached "Offer" must have been interviewed, so it counts too.
  const interviewRate =
    stats.total === 0
      ? 0
      : Math.round(((stats.interview + stats.offer) / stats.total) * 100);

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
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Applied" value={stats.applied} tone="applied" />
        <StatCard label="Interview" value={stats.interview} tone="interview" />
        <StatCard label="Offers" value={stats.offer} tone="offer" />
        <StatCard
          label="Interview rate"
          value={`${interviewRate}%`}
          hint="Interview + Offer ÷ Total"
        />
      </div>

      <div className="dashboard-charts">
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

        <div className="distribution-section">
          <h2>Status Breakdown</h2>
          <StatusDonut stats={stats} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;