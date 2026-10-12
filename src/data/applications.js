// Shape of a single job application, plus demo data so the dashboard,
// charts and Kanban board look populated on first load.
// Sample data only. Dates are generated relative to today so the
// deadline features always have something realistic to show.

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

// "YYYY-MM-DD" for (today + offset days), in the user's local time
function daysFromToday(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** @type {Application[]} */
export const applications = [
  {
    id: 1,
    company: "Shopify",
    position: "Frontend Developer Intern",
    location: "Remote",
    jobType: "Internship",
    status: "Rejected",
    applicationDate: daysFromToday(-150),
    deadline: daysFromToday(-125),
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
    applicationDate: daysFromToday(-138),
    deadline: daysFromToday(-118),
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
    applicationDate: daysFromToday(-92),
    deadline: daysFromToday(2),
    jobUrl: "https://stripe.com/jobs",
    notes: "Technical screen done. Confirm the onsite slot before the deadline.",
  },
  {
    id: 4,
    company: "Atlassian",
    position: "Software Engineer Intern (Frontend)",
    location: "Remote",
    jobType: "Internship",
    status: "Applied",
    applicationDate: daysFromToday(-75),
    deadline: daysFromToday(-2),
    jobUrl: "https://www.atlassian.com/company/careers",
    notes: "No response yet and the posting has closed. Follow up with the referrer.",
  },
  {
    id: 5,
    company: "Figma",
    position: "Frontend Engineer Intern",
    location: "San Francisco, CA",
    jobType: "Internship",
    status: "Interview",
    applicationDate: daysFromToday(-58),
    deadline: daysFromToday(6),
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
    applicationDate: daysFromToday(-41),
    deadline: daysFromToday(1),
    jobUrl: "https://vercel.com/careers",
    notes: "Offer received. Reply by the deadline and compare against other offers.",
  },
  {
    id: 7,
    company: "Google",
    position: "Frontend Developer Intern",
    location: "Mountain View, CA",
    jobType: "Internship",
    status: "Interview",
    applicationDate: daysFromToday(-27),
    deadline: daysFromToday(12),
    jobUrl: "https://careers.google.com",
    notes: "First-round interview scheduled. Review React hooks and JavaScript fundamentals.",
  },
  {
    id: 8,
    company: "Microsoft",
    position: "React Developer Intern",
    location: "Redmond, WA",
    jobType: "Internship",
    status: "Offer",
    applicationDate: daysFromToday(-14),
    deadline: daysFromToday(20),
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
    applicationDate: daysFromToday(-6),
    deadline: daysFromToday(9),
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
    applicationDate: daysFromToday(-2),
    deadline: daysFromToday(26),
    jobUrl: "https://www.amazon.jobs",
    notes: "Online assessment link expected within two weeks.",
  },
];