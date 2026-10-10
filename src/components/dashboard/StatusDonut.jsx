import "./StatusDonut.css";

const SEGMENTS = [
  { key: "applied", label: "Applied", color: "var(--status-applied)" },
  { key: "interview", label: "Interview", color: "var(--status-interview)" },
  { key: "offer", label: "Offer", color: "var(--status-offer)" },
  { key: "rejected", label: "Rejected", color: "var(--status-rejected)" },
];

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function StatusDonut({ stats }) {
  const total = stats.total;

  // Each arc starts where the previous one ended
  const arcs = [];
  let offset = 0;
  for (const seg of SEGMENTS) {
    const count = stats[seg.key];
    const length = total === 0 ? 0 : (count / total) * CIRCUMFERENCE;
    arcs.push({ ...seg, count, length, offset });
    offset += length;
  }

  const summary = arcs.map((a) => `${a.count} ${a.label}`).join(", ");

  return (
    <div className="donut-layout">
      <div className="donut-wrap">
        <svg
          className="donut"
          viewBox="0 0 100 100"
          role="img"
          aria-label={`Status breakdown: ${summary}`}
        >
          <circle className="donut-track" cx="50" cy="50" r={RADIUS} />
          {arcs
            .filter((a) => a.count > 0)
            .map((a) => (
              <circle
                key={a.key}
                className="donut-arc"
                cx="50"
                cy="50"
                r={RADIUS}
                style={{ stroke: a.color }}
                strokeDasharray={`${a.length} ${CIRCUMFERENCE - a.length}`}
                strokeDashoffset={-a.offset}
              />
            ))}
        </svg>
        <div className="donut-center">
          <span className="donut-total">{total}</span>
          <span className="donut-caption">total</span>
        </div>
      </div>

      <ul className="donut-legend">
        {arcs.map((a) => (
          <li key={a.key}>
            <span className="legend-dot" style={{ backgroundColor: a.color }} />
            <span className="legend-label">{a.label}</span>
            <span className="legend-count">
              {a.count}
              {total > 0 && <small> · {Math.round((a.count / total) * 100)}%</small>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusDonut;