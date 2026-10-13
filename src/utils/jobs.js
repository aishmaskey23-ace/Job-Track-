
// API job_type -> label shown on cards
export const JOB_TYPE_LABELS = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
};

// API job_type -> the options ApplicationForm understands
const FORM_JOB_TYPES = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  freelance: "Contract",
  internship: "Internship",
};

function todayISO() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

// Pre-fills the application form from a listing. The user can still edit everything.
export function jobToPrefill(job) {
  const salaryNote = job.salary ? ` Listed salary: ${job.salary}.` : "";
  return {
    company: job.company_name || "",
    position: job.title || "",
    location: job.candidate_required_location || "Remote",
    jobType: FORM_JOB_TYPES[job.job_type] || "Full-time",
    status: "Applied",
    applicationDate: todayISO(),
    deadline: "",
    jobUrl: job.url || "",
    notes: `Found on Remotive.${salaryNote}`,
  };
}

export function postedAgo(iso) {
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return "";
  const days = Math.floor((Date.now() - time) / (24 * 60 * 60 * 1000));
  if (days < 1) return "Posted today";
  if (days === 1) return "Posted yesterday";
  if (days < 30) return `Posted ${days} days ago`;
  return `Posted ${Math.floor(days / 30)} mo ago`;
}

export function updatedAgo(timestamp) {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"} ago`;
}