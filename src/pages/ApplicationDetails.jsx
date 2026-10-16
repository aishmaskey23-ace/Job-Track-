import { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useApplicationContext } from "../context/ApplicationContext";
import StatusBadge from "../components/common/StatusBadge";
import Modal from "../components/applications/Modal";
import ApplicationForm from "../components/applications/ApplicationForm";
import ConfirmDialog from "../components/applications/ConfirmDialog";
import { formatDate } from "../utils/deadlines";
import { isHttpUrl } from "../utils/url";
import "./ApplicationDetails.css";

function ApplicationDetails() {
  const { applications, updateApplication, deleteApplication } =
    useApplicationContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const application = applications.find((app) => app.id === Number(id));

  // location.key is "default" on the first page of a session (for example when the
  // page was opened from an external link), where navigate(-1) would leave the site.
  function handleBack() {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/applications");
    }
  }

  function handleEditSubmit(formData) {
    updateApplication(application.id, formData);
    setShowEdit(false);
  }

  function handleConfirmDelete() {
    deleteApplication(application.id);
    navigate("/applications", { replace: true });
  }

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
    location: jobLocation,
    jobType,
    applicationDate,
    deadline,
    jobUrl,
    notes,
  } = application;

  return (
    <div className="details-page">
      <button onClick={handleBack} className="back-btn">
        ← Back
      </button>

      <div className="details-card">
        <div className="details-top">
          <div>
            <h1 className="details-company">{company}</h1>
            <h2 className="details-position">{position}</h2>
          </div>
          <div className="details-actions">
            <button className="details-btn" onClick={() => setShowEdit(true)}>
              Edit
            </button>
            <button
              className="details-btn danger"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
          </div>
        </div>

        <StatusBadge status={status} />

        <div className="details-grid">
          <div>
            <strong>Location</strong>
            <p>{jobLocation || "—"}</p>
          </div>
          <div>
            <strong>Type</strong>
            <p>{jobType}</p>
          </div>
          <div>
            <strong>Applied</strong>
            <p>{formatDate(applicationDate)}</p>
          </div>
          <div>
            <strong>Deadline</strong>
            <p>{formatDate(deadline)}</p>
          </div>
        </div>

        {jobUrl && isHttpUrl(jobUrl) && (
          <p className="details-link">
            <a href={jobUrl} target="_blank" rel="noopener noreferrer">
              View job posting →
            </a>
          </p>
        )}

        <div className="details-notes">
          <strong>Notes</strong>
          <p>{notes || "No notes added."}</p>
        </div>
      </div>

      {showEdit && (
        <Modal
          onClose={() => setShowEdit(false)}
          labelledBy="application-form-title"
        >
          <ApplicationForm
            initialData={application}
            onSubmit={handleEditSubmit}
            onCancel={() => setShowEdit(false)}
          />
        </Modal>
      )}

      {showDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this application?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

export default ApplicationDetails;