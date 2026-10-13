import { useState } from "react";
import { ExternalLink, MapPin, Banknote, Check, Plus } from "lucide-react";
import { JOB_TYPE_LABELS, postedAgo } from "../../utils/jobs";
import "./JobCard.css";

function JobCard({ job, isTracked, onAdd }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const typeLabel = JOB_TYPE_LABELS[job.job_type];
  const company = job.company_name || "Unknown company";

  return (
    <article className="job-card">
      <div className="job-card-head">
        {job.company_logo && !logoFailed ? (
          <img
            className="job-logo"
            src={job.company_logo}
            alt=""
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="job-logo job-logo-fallback" aria-hidden="true">
            {company.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="job-card-title">
          <h3>{job.title}</h3>
          <p>{company}</p>
        </div>
      </div>

      <ul className="job-meta">
        <li>
          <MapPin size={13} aria-hidden="true" />
          {job.candidate_required_location || "Remote"}
        </li>
        {typeLabel && <li>{typeLabel}</li>}
        {job.salary && (
          <li>
            <Banknote size={13} aria-hidden="true" />
            {job.salary}
          </li>
        )}
      </ul>

      <div className="job-card-foot">
        <span className="job-posted">{postedAgo(job.publication_date)}</span>
        <div className="job-actions">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="job-link"
          >
            View on Remotive
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <button
            className={isTracked ? "job-add tracked" : "job-add"}
            onClick={() => onAdd(job)}
            disabled={isTracked}
          >
            {isTracked ? (
              <>
                <Check size={14} aria-hidden="true" /> Tracked
              </>
            ) : (
              <>
                <Plus size={14} aria-hidden="true" /> Add to tracker
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default JobCard;