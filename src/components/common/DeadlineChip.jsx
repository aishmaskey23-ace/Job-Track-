import { Clock } from "lucide-react";
import { getDeadlineInfo } from "../../utils/deadlines";
import "./DeadlineChip.css";

// On cards only urgent deadlines show; the Dashboard passes showAll.
function DeadlineChip({ application, showAll = false }) {
  const info = getDeadlineInfo(application);
  if (!info) return null;
  if (info.tone === "later" && !showAll) return null;

  return (
    <span className={`deadline-chip deadline-${info.tone}`}>
      <Clock size={12} aria-hidden="true" />
      {info.label}
    </span>
  );
}

export default DeadlineChip;