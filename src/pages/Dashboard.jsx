import { useMemo } from "react";
import { useApplicationContext } from "../context/ApplicationContext";
import StatCard from "../components/dashboard/StatCard";
import StatusDonut from "../components/dashboard/StatusDonut";
import "./Dashboard.css";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import { parseLocalDate } from "../utils/deadlines";

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
      const key = app.applicationDate.slice(0, 7); 
      counts[key] = (counts[key] || 0) + 1;
    });

    const keys = Object.keys(counts).sort(); 
    const spansYears = new Set(keys.map((k) => k.slice(0, 4))).size > 1;

    return keys.map((key) => {
      const month = parseLocalDate(`${key}-01`).toLocaleString("default", {
        month: "short",
      });
      return {
        key,
        count: counts[key],
        label: spansYears ? `${month} '${key.slice(2, 4)}` : month,
      };
    });
  }, [applications]);

  const maxCount = Math.max(...monthlyActivity.map((m) => m.count), 1);

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
  <UpcomingDeadlines applications={applications} />
      <div className="dashboard-charts">
        <div className="activity-section">
          <h2>Application Activity</h2>
                  {monthlyActivity.length === 0 ? (
            <p className="empty-state-inline">No activity yet.</p>
          ) : (
            <div className="bar-chart">
              {monthlyActivity.map(({ key, label, count }) => (
                <div className="bar-column" key={key}>
                  <span className="bar-count">{count}</span>
                  <div
                    className="bar"
                    style={{ height: `${(count / maxCount) * 100}%` }}
                    title={`${count} application(s) in ${label}`}
                  />
                  <span className="bar-label">{label}</span>
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