// Shape of a single job application, plus demo data so the
// dashboard, charts and Kanban board look populated on first load.
// This is sample data, not real applications.

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
    company: "Shopify",
    position: "Frontend Developer Intern",
    location: "Remote",
    jobType: "Internship",
    status: "Rejected",
    applicationDate: "2026-05-12",
    deadline: "2026-05-30",
    jobUrl: "https://www.shopify.com/careers",
    notes: "Rejected after the take-home assessment. Review accessibility basics before the next application.",
  },
  {
    id: 2,
    company: "Spotify",
    position: "Web Developer Intern",
    location: "New York, NY",
    jobType: "Internship",
    status: "Rejected",
    applicationDate: "2026-05-20",
    deadline: "2026-06-05",
    jobUrl: "https://www.lifeatspotify.com",
    notes: "Automated rejection email. Tailor the resume to highlight React projects.",
  },
  {
    id: 3,
    company: "Stripe",
    position: "Frontend Engineer Intern",
    location: "Remote",
    jobType: "Internship",
    status: "Interview",
    applicationDate: "2026-06-08",
    deadline: "2026-06-30",
    jobUrl: "https://stripe.com/jobs",
    notes: "Technical screen done. Waiting on the onsite schedule. Practice component design questions.",
  },
  {
    id: 4,
    company: "Atlassian",
    position: "Software Engineer Intern (Frontend)",
    location: "Remote",
    jobType: "Internship",
    status: "Applied",
    applicationDate: "2026-06-22",
    deadline: "2026-07-15",
    jobUrl: "https://www.atlassian.com/company/careers",
    notes: "Applied through a referral from the university career fair.",
  },
  {
    id: 5,
    company: "Figma",
    position: "Frontend Engineer Intern",
    location: "San Francisco, CA",
    jobType: "Internship",
    status: "Interview",
    applicationDate: "2026-07-06",
    deadline: "2026-07-31",
    jobUrl: "https://www.figma.com/careers",
    notes: "Recruiter call went well. Prepare a walkthrough of JobTrack and its design-token system.",
  },
  {
    id: 6,
    company: "Vercel",
    position: "Frontend Developer Intern",
    location: "Remote",
    jobType: "Internship",
    status: "Offer",
    applicationDate: "2026-07-18",
    deadline: "2026-08-10",
    jobUrl: "https://vercel.com/careers",
    notes: "Offer received. Reply by the end of the month and compare against other offers.",
  },
  {
    id: 7,
    company: "Google",
    position: "Frontend Developer Intern",
    location: "Mountain View, CA",
    jobType: "Internship",
    status: "Interview",
    applicationDate: "2026-08-04",
    deadline: "2026-08-28",
    jobUrl: "https://careers.google.com",
    notes: "First-round interview scheduled next week. Review React hooks and JavaScript fundamentals.",
  },
  {
    id: 8,
    company: "Microsoft",
    position: "React Developer Intern",
    location: "Redmond, WA",
    jobType: "Internship",
    status: "Offer",
    applicationDate: "2026-08-15",
    deadline: "2026-09-05",
    jobUrl: "https://careers.microsoft.com",
    notes: "Verbal offer after the final round. Waiting on the written offer letter.",
  },
  {
    id: 9,
    company: "Meta",
    position: "Frontend Engineer (University Grad)",
    location: "Menlo Park, CA",
    jobType: "Full-time",
    status: "Applied",
    applicationDate: "2026-09-28",
    deadline: "2026-10-30",
    jobUrl: "https://www.metacareers.com",
    notes: "Submitted with portfolio and live demo link.",
  },
  {
    id: 10,
    company: "Amazon",
    position: "Front-End Engineer I",
    location: "Seattle, WA",
    jobType: "Full-time",
    status: "Applied",
    applicationDate: "2026-10-02",
    deadline: "2026-10-25",
    jobUrl: "https://www.amazon.jobs",
    notes: "Online assessment link expected within two weeks.",
  },
];