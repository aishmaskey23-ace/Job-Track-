// This file defines the shape of a single job application
// and provides sample data to develop against before
// real add/edit/delete functionality exists (Phase 5+).

/**
 * @typedef {Object} Application
 * @property {number} id - Unique identifier
 * @property {string} company - Company name
 * @property {string} position - Job title applied for
 * @property {string} location - City, "Remote", etc.
 * @property {string} jobType - "Internship" | "Full-time" | "Part-time" | "Contract"
 * @property {string} status - "Applied" | "Interview" | "Offer" | "Rejected"
 * @property {string} applicationDate - ISO date string, e.g. "2026-08-20"
 * @property {string} deadline - ISO date string
 * @property {string} jobUrl - Link to the job posting
 * @property {string} notes - Free-text notes
 */

/** @type {Application[]} */
export const applications = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer Intern",
    location: "Remote",
    jobType: "Internship",
    status: "Applied",
    applicationDate: "2026-08-20",
    deadline: "2026-09-10",
    jobUrl: "https://careers.google.com",
    notes: "React internship",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "React Developer Intern",
    location: "Redmond, WA",
    jobType: "Internship",
    status: "Interview",
    applicationDate: "2026-08-18",
    deadline: "2026-09-05",
    jobUrl: "https://careers.microsoft.com",
    notes: "First interview scheduled next week",
  },
  {
    id: 3,
    company: "Meta",
    position: "Frontend Engineer Intern",
    location: "Remote",
    jobType: "Internship",
    status: "Rejected",
    applicationDate: "2026-08-01",
    deadline: "2026-08-15",
    jobUrl: "https://careers.meta.com",
    notes: "",
  },
];