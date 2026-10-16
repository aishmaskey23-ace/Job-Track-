import { memo } from "react";
import { Link } from "react-router-dom";
import "./ApplicationCard.css";
import StatusBadge from "../common/StatusBadge";
import DeadlineChip from "../common/DeadlineChip";
import { formatDate } from "../../utils/deadlines";

function ApplicationCard({ application, onDelete, onEdit }) {
  const { company, position, status, applicationDate } = application;

  return (
    <div className="app-card">
      <div className="app-card-main">
        <h3 className="app-card-company">{company}</h3>
        <p className="app-card-position">{position}</p>
       <div className="app-card-badges">
      <StatusBadge status={status} />
      <DeadlineChip application={application} />
    </div>
      <p className="app-card-date">Applied: {formatDate(applicationDate)}</p>
      </div>
      <div className="app-card-actions">
        <Link to={`/applications/${application.id}`}>View</Link>
        <button onClick={() => onEdit(application.id)}>Edit</button>
        <button onClick={() => onDelete(application.id)}>Delete</button>
      </div>
    </div>
  );
}

export default memo(ApplicationCard);