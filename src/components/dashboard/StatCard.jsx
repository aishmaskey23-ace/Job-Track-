import "./StatCard.css";

function StatCard({ label, value, tone = "accent", hint }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  );
}

export default StatCard;