import { useParams, useNavigate, Link } from "react-router-dom";
import "./ApplicationDetails.css";
import { useApplicationContext } from "../context/ApplicationContext";

function ApplicationDetails() {
  const { applications } = useApplicationContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const application = applications.find((app) => app.id === Number(id));

  if (!application) {
    return (
      <div className="details-page">
        <p>Application not found.</p>
        <Link to="/applications">Back to Applications</Link>
      </div>
    );
  }

  const {
    company,
    position,
    status,
    location,
    jobType,
    applicationDate,
    deadline,
    jobUrl,
    notes,
  } = application;

  return (
    <div className="details-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="details-card">
        <h1>{company}</h1>
        <h2>{position}</h2>
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>

        <div className="details-grid">
          <div>
            <strong>Location</strong>
            <p>{location || "—"}</p>
          </div>
          <div>
            <strong>Type</strong>
            <p>{jobType}</p>
          </div>
          <div>
            <strong>Applied</strong>
            <p>{applicationDate || "—"}</p>
          </div>
          <div>
            <strong>Deadline</strong>
            <p>{deadline || "—"}</p>
          </div>
        </div>

        {jobUrl && (
          <p className="details-link">
            <a href={jobUrl} target="_blank" rel="noreferrer">
              View job posting →
            </a>
          </p>
        )}

        <div className="details-notes">
          <strong>Notes</strong>
          <p>{notes || "No notes added."}</p>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
