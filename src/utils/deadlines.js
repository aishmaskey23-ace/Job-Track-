const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const SOON_WINDOW_DAYS = 7; // shows a "due soon" chip on cards
export const REMINDER_WINDOW_DAYS = 3; // shows up in the notification bell

// "2026-10-24" -> local midnight. new Date("2026-10-24") would parse as UTC
// and can land on the wrong day depending on the user's timezone.
function parseLocalDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getDaysUntil(deadline, today = new Date()) {
  if (!deadline) return null;
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  return Math.round((parseLocalDate(deadline) - startOfToday) / MS_PER_DAY);
}

// Returns null when a deadline shouldn't be shown (Rejected, or no deadline set)
export function getDeadlineInfo(app, today = new Date()) {
  if (app.status === "Rejected") return null;

  const days = getDaysUntil(app.deadline, today);
  if (days === null) return null;

  if (days < 0) {
    const n = Math.abs(days);
    return {
      days,
      tone: "overdue",
      label: `Overdue by ${n} day${n === 1 ? "" : "s"}`,
    };
  }
  if (days === 0) return { days, tone: "soon", label: "Due today" };
  if (days === 1) return { days, tone: "soon", label: "Due tomorrow" };
  return {
    days,
    tone: days <= SOON_WINDOW_DAYS ? "soon" : "later",
    label: `Due in ${days} days`,
  };
}

export function formatDeadline(deadline) {
  return parseLocalDate(deadline).toLocaleDateString("default", {
    month: "short",
    day: "numeric",
  });
}