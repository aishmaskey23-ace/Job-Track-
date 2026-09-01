import { memo } from "react";
import { Link } from "react-router-dom";
import "./ApplicationCard.css";

function ApplicationCard({ application, onDelete, onEdit }) {
  const { company, position, status, applicationDate } = application;

  return (
    <div className="app-card">
      <div className="app-card-main">
        <h3 className="app-card-company">{company}</h3>
        <p className="app-card-position">{position}</p>
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>
        <p className="app-card-date">Applied: {applicationDate}</p>
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