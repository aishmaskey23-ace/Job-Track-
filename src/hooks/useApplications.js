import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { applications as initialApplications } from "../data/applications";

function useApplications() {
  const [applications, setApplications] = useLocalStorage(
    "jobtrack-applications",
    initialApplications
  );
  const [notifications, setNotifications] = useLocalStorage(
    "jobtrack-notifications",
    []
  );
  const [error, setError] = useState(null);

  function addNotification(message) {
    const newNotification = {
      id: Date.now() + Math.random(),
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };
    // newest first, keep only the latest 20
    setNotifications((prev) => [newNotification, ...prev].slice(0, 20));
  }

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function clearNotifications() {
    setNotifications([]);
  }

  function addApplication(newApp) {
    try {
      const newApplication = { ...newApp, id: Date.now() };
      setApplications((prev) => [...prev, newApplication]);
      addNotification(
        `New application added: ${newApp.position} at ${newApp.company} (${newApp.status})`
      );
    } catch {
      setError("Failed to add application.");
    }
  }

  function updateApplication(id, updatedFields) {
    try {
      const existing = applications.find((app) => app.id === id);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...updatedFields } : app))
      );
      if (
        existing &&
        updatedFields.status &&
        updatedFields.status !== existing.status
      ) {
        addNotification(
          `${existing.company} moved from ${existing.status} to ${updatedFields.status}`
        );
      }
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
      const existing = applications.find((app) => app.id === id);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (existing && existing.status !== newStatus) {
        addNotification(
          `${existing.company} moved from ${existing.status} to ${newStatus}`
        );
      }
    } catch {
      setError("Failed to update status.");
    }
  }

  return {
    applications,
    notifications,
    markAllNotificationsRead,
    clearNotifications,
    error,
    setError,
    addApplication,
    updateApplication,
    deleteApplication,
    changeStatus,
  };
}

export default useApplications;