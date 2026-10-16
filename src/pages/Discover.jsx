import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import useRemoteJobs from "../hooks/useRemoteJobs";
import { useApplicationContext } from "../context/ApplicationContext";
import JobCard from "../components/discover/JobCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";
import Modal from "../components/applications/Modal";
import ApplicationForm from "../components/applications/ApplicationForm";
import { JOB_TYPE_LABELS, jobToPrefill, updatedAgo } from "../utils/jobs";
import "./Discover.css";

const PAGE_SIZE = 24;

function Discover() {
const { jobs, status, isRefreshing, error, fetchedAt, retry } =
    useRemoteJobs();
  const { applications, addApplication } = useApplicationContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedJob, setSelectedJob] = useState(null);

  // Location options come from the data itself
  const locations = useMemo(() => {
    const unique = new Set(
      jobs.map((job) => job.candidate_required_location).filter(Boolean)
    );
    return [...unique].sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  // "Tracked" is derived: a listing is tracked if an application already uses its URL
  const trackedUrls = useMemo(
    () => new Set(applications.map((app) => app.jobUrl)),
    [applications]
  );

  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        (job.title || "").toLowerCase().includes(query) ||
        (job.company_name || "").toLowerCase().includes(query) ||
        (Array.isArray(job.tags) &&
          job.tags.some((tag) => String(tag).toLowerCase().includes(query)));
      const matchesType = typeFilter === "all" || job.job_type === typeFilter;
      const matchesLocation =
        locationFilter === "all" ||
        job.candidate_required_location === locationFilter;
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, searchTerm, typeFilter, locationFilter]);

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setVisibleCount(PAGE_SIZE);
  }

  function handleTypeChange(e) {
    setTypeFilter(e.target.value);
    setVisibleCount(PAGE_SIZE);
  }

  function handleLocationChange(e) {
    setLocationFilter(e.target.value);
    setVisibleCount(PAGE_SIZE);
  }

  function handleSubmit(formData) {
    addApplication(formData);
    setSelectedJob(null);
  }

  const visibleJobs = filteredJobs.slice(0, visibleCount);

  let content;
  if (status === "loading") {
    content = <LoadingSpinner message="Loading remote jobs..." />;
  } else if (status === "error" && jobs.length === 0) {
    content = <ErrorState message={error} onRetry={retry} />;
  } else {
    content = (
      <>
        {status === "error" && <ErrorState message={error} onRetry={retry} />}
                {isRefreshing && (
          <p className="discover-refreshing" role="status">
            Refreshing listings...
          </p>
        )}

        <p className="discover-count" aria-live="polite">
          Showing {visibleJobs.length} of {filteredJobs.length} listings
        </p>

        {filteredJobs.length === 0 ? (
          <p className="discover-empty">No jobs match your filters.</p>
        ) : (
          <div className="discover-grid">
            {visibleJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isTracked={trackedUrls.has(job.url)}
                onAdd={setSelectedJob}
              />
            ))}
          </div>
        )}

        {visibleCount < filteredJobs.length && (
          <div className="discover-more">
            <button
              className="discover-more-btn"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Show more
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="discover-page">
      <div className="discover-header">
        <h1>Discover Jobs</h1>
        <p className="discover-subtitle">
          Remote software roles, pulled live from Remotive. Add any listing to
          your tracker in one click.
        </p>
      </div>

      <div className="discover-toolbar">
        <div className="discover-search-wrap">
          <Search size={16} className="discover-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="discover-search"
            placeholder="Search title, company or skill..."
            aria-label="Search job listings"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <label className="discover-field">
          <span>Job type</span>
          <select value={typeFilter} onChange={handleTypeChange}>
            <option value="all">All types</option>
            {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="discover-field">
          <span>Location</span>
          <select value={locationFilter} onChange={handleLocationChange}>
            <option value="all">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
      </div>

      {content}

      <p className="discover-attribution">
        Job listings provided by{" "}
        <a href="https://remotive.com" target="_blank" rel="noopener noreferrer">
          Remotive
        </a>
        . Listings are delayed by 24 hours and cached for up to 6 hours.
        {fetchedAt && ` Last updated ${updatedAgo(fetchedAt)}.`}
      </p>

      {selectedJob && (
        <Modal
          onClose={() => setSelectedJob(null)}
          labelledBy="application-form-title"
        >
          <ApplicationForm
            prefill={jobToPrefill(selectedJob)}
            onSubmit={handleSubmit}
            onCancel={() => setSelectedJob(null)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Discover;