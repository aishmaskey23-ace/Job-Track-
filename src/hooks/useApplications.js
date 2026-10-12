import { useState, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { applications as initialApplications } from "../data/applications";
import { getDeadlineInfo, REMINDER_WINDOW_DAYS } from "../utils/deadlines";

function useApplications() {
  const [applications, setApplications] = useLocalStorage(
    "jobtrack-applications",
    initialApplications
  );
  const [notifications, setNotifications] = useLocalStorage(
    "jobtrack-notifications",
    []
  );
  // Keys of deadline reminders the user has already marked as read
  const [seenReminders, setSeenReminders] = useLocalStorage(
    "jobtrack-seen-reminders",
    []
  );
  const [error, setError] = useState(null);

  // Overdue, or due within the reminder window. Rejected are excluded by the helper.
  const reminders = useMemo(() => {
    return applications
      .map((app) => {
        const info = getDeadlineInfo(app);
        if (!info || info.days > REMINDER_WINDOW_DAYS) return null;
        // Changing state (soon -> overdue) produces a new key, so it becomes unread again
        const key = `${app.id}-${app.deadline}-${info.days < 0 ? "overdue" : "soon"}`;
        return {
          id: `reminder-${key}`,
          key,
          days: info.days,
          tone: info.tone,
          message: `${app.company}: ${info.label}`,
          read: seenReminders.includes(key),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.days - b.days);
  }, [applications, seenReminders]);

  function addNotification(message) {
    const newNotification = {
      id: Date.now() + Math.random(),
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev].slice(0, 20));
  }

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setSeenReminders(reminders.map((r) => r.key));
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
    reminders,
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