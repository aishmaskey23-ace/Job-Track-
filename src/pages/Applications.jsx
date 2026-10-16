import { useState, useMemo, useCallback } from "react";
import { useApplicationContext } from "../context/ApplicationContext";
import ApplicationList from "../components/applications/ApplicationList";
import SearchBar from "../components/applications/SearchBar";
import FilterBar from "../components/applications/FilterBar";
import ApplicationForm from "../components/applications/ApplicationForm";
import Modal from "../components/applications/Modal";
import ConfirmDialog from "../components/applications/ConfirmDialog";

import "./Applications.css";

// Compares two "YYYY-MM-DD" strings. Empty dates always sort last.
function compareDates(a, b, direction = "asc") {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  const result = a < b ? -1 : a > b ? 1 : 0;
  return direction === "asc" ? result : -result;
}

function Applications() {
  const { applications, addApplication, updateApplication, deleteApplication} =
    useApplicationContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        const matchesSearch = app.company
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || app.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return compareDates(a.applicationDate, b.applicationDate, "desc");
          case "oldest":
            return compareDates(a.applicationDate, b.applicationDate, "asc");
          case "company-asc":
            return a.company.localeCompare(b.company);
          case "company-desc":
            return b.company.localeCompare(a.company);
          case "deadline":
            return compareDates(a.deadline, b.deadline, "asc");
          default:
            return 0;
        }
      });
  }, [applications, searchTerm, statusFilter, sortBy]);

  const handleAddClick = useCallback(() => {
    setEditingApp(null);
    setShowForm(true);
  }, []);

  const handleEditClick = useCallback(
    (id) => {
      const app = applications.find((a) => a.id === id);
      setEditingApp(app);
      setShowForm(true);
    },
    [applications]
  );

  const handleFormSubmit = useCallback(
    (formData) => {
      if (editingApp) {
        updateApplication(editingApp.id, formData);
      } else {
        addApplication(formData);
      }
      setShowForm(false);
      setEditingApp(null);
    },
    [editingApp, addApplication, updateApplication]
  );

  const handleDeleteClick = useCallback((id) => {
    setDeletingId(id);
  }, []);

  const confirmDelete = useCallback(() => {
    deleteApplication(deletingId);
    setDeletingId(null);
  }, [deletingId, deleteApplication]);

  return (
    <div className="applications-page">
      <div className="applications-header">
        <div>
          <h1>Applications</h1>
          <p className="applications-subtitle">
            {filteredApplications.length} of {applications.length} shown
          </p>
        </div>
        <button className="primary-btn" onClick={handleAddClick}>
          + Add Application
        </button>
      </div>


      <div className="applications-toolbar">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterBar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <ApplicationList
        applications={filteredApplications}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
        onAddClick={handleAddClick}
      />

      {showForm && (
        <Modal onClose={() => setShowForm(false)} labelledBy="application-form-title">
          <ApplicationForm
            initialData={editingApp}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {deletingId && (
        <ConfirmDialog
          message="Are you sure you want to delete this application?"
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}

export default Applications;
