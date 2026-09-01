import "./Kanban.css";
import { useApplicationContext } from "../context/ApplicationContext";

const columns = [
  { status: "Applied", tone: "applied" },
  { status: "Interview", tone: "interview" },
  { status: "Offer", tone: "offer" },
  { status: "Rejected", tone: "rejected" },
];

function Kanban() {
  const { applications, changeStatus } = useApplicationContext();

  function handleDragStart(e, id) {
    e.dataTransfer.setData("applicationId", id);
    e.currentTarget.classList.add("dragging");
  }

  function handleDragEnd(e) {
    e.currentTarget.classList.remove("dragging");
  }

  function handleDrop(e, status) {
    const id = Number(e.dataTransfer.getData("applicationId"));
    changeStatus(id, status);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <h1>Kanban</h1>
        <p className="kanban-subtitle">Drag a card to move it between stages.</p>
      </div>
      <div className="kanban-columns">
        {columns.map(({ status, tone }) => {
          const columnApps = applications.filter((app) => app.status === status);
          return (
            <div
              key={status}
              className={`kanban-column tone-${tone}`}
              onDrop={(e) => handleDrop(e, status)}
              onDragOver={handleDragOver}
            >
              <h3 className="kanban-column-title">
                {status}
                <span className="kanban-count">{columnApps.length}</span>
              </h3>
              <div className="kanban-column-body">
                {columnApps.length === 0 ? (
                  <p className="empty-state-small">No applications</p>
                ) : (
                  columnApps.map((app) => (
                    <div
                      key={app.id}
                      className="kanban-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <p className="kanban-card-company">{app.company}</p>
                      <p className="kanban-card-position">{app.position}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Kanban;
