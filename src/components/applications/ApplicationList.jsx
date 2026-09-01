import ApplicationCard from "./ApplicationCard";

function ApplicationList({ applications, onDelete, onEdit, onAddClick }) {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <p>No applications found.</p>
        <button onClick={onAddClick}>+ Add Application</button>
      </div>
    );
  }

  return (
    <div className="application-list">
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          application={app}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ApplicationList;