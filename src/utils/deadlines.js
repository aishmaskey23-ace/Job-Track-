const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const SOON_WINDOW_DAYS = 7; // shows a "due soon" chip on cards
export const REMINDER_WINDOW_DAYS = 3; // shows up in the notification bell

// Deadlines only matter while an application is still open
const STATUSES_WITHOUT_DEADLINES = ["Rejected", "Offer"];

// "2026-10-24" -> local midnight. new Date("2026-10-24") would parse as UTC
// and can land on the wrong day depending on the user's timezone.
export function parseLocalDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Today as "YYYY-MM-DD" in local time
export function todayISO() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

// "2026-10-24" -> "Oct 24, 2026" (or a dash when empty or malformed)
export function formatDate(iso) {
  if (!iso) return "—";
  const date = parseLocalDate(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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

// Returns null when a deadline shouldn't be shown (Rejected, Offer, or no deadline set)
export function getDeadlineInfo(app, today = new Date()) {
  if (STATUSES_WITHOUT_DEADLINES.includes(app.status)) return null;

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