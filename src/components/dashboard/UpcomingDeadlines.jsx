import { useMemo } from "react";
import { Link } from "react-router-dom";
import DeadlineChip from "../common/DeadlineChip";
import { getDeadlineInfo, formatDeadline } from "../../utils/deadlines";
import "./UpcomingDeadlines.css";

const MAX_ITEMS = 5;

function UpcomingDeadlines({ applications }) {
  const { items, overdueCount } = useMemo(() => {
    const withInfo = applications
      .map((app) => ({ app, info: getDeadlineInfo(app) }))
      .filter((item) => item.info !== null) // drops Rejected and missing deadlines
      .sort((a, b) => a.info.days - b.info.days); // overdue first, then soonest

    return {
      items: withInfo.slice(0, MAX_ITEMS),
      overdueCount: withInfo.filter((i) => i.info.tone === "overdue").length,
    };
  }, [applications]);

  return (
    <section className="deadlines-section" aria-labelledby="deadlines-title">
      <div className="deadlines-header">
        <h2 id="deadlines-title">Upcoming Deadlines</h2>
        {overdueCount > 0 && (
          <span className="deadlines-overdue-note">{overdueCount} overdue</span>
        )}
      </div>

      {items.length === 0 ? (
        <p className="empty-state-inline">No upcoming deadlines.</p>
      ) : (
        <ul className="deadlines-list">
          {items.map(({ app }) => (
            <li key={app.id}>
              <Link to={`/applications/${app.id}`} className="deadline-row">
                <div className="deadline-row-main">
                  <span className="deadline-company">{app.company}</span>
                  <span className="deadline-position">{app.position}</span>
                </div>
                <span className="deadline-date">{formatDeadline(app.deadline)}</span>
                <DeadlineChip application={app} showAll />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UpcomingDeadlines;