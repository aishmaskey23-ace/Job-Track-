import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { applications as initialApplications } from "../data/applications";

function useApplications() {
  const [applications, setApplications] = useLocalStorage(
    "jobtrack-applications",
    initialApplications
  );
  const [error, setError] = useState(null);

  function addApplication(newApp) {
    try {
      const newApplication = { ...newApp, id: Date.now() };
      setApplications((prev) => [...prev, newApplication]);
    } catch {
      setError("Failed to add application.");
    }
  }

  function updateApplication(id, updatedFields) {
    try {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...updatedFields } : app))
      );
    } catch {
      setError("Failed to update application.");
    }
  }

  function deleteApplication(id) {
    try {
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch {
      setError("Failed to delete application.");
    }
  }

  function changeStatus(id, newStatus) {
    try {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch {
      setError("Failed to update status.");
    }
  }

  return {
    applications,
    error,
    setError,
    addApplication,
    updateApplication,
    deleteApplication,
    changeStatus,
  };
}

export default useApplications;
