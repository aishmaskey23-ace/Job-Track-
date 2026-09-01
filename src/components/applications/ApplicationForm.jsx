import { useState, useRef, useEffect } from "react";
import "./ApplicationForm.css";

const emptyForm = {
  company: "",
  position: "",
  location: "",
  jobType: "Internship",
  status: "Applied",
  applicationDate: "",
  deadline: "",
  jobUrl: "",
  notes: "",
};

function ApplicationForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
    setFormData(emptyForm);
    setErrors({});
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <h2 id="application-form-title" className="app-form-title">
        {initialData ? "Edit Application" : "Add Application"}
      </h2>

      <div className="app-form-grid">
        <label>
          Company Name *
          <input
            ref={firstFieldRef}
            name="company"
            value={formData.company}
            onChange={handleChange}
            aria-invalid={Boolean(errors.company)}
          />
          {errors.company && (
            <span className="error-text" role="alert">
              {errors.company}
            </span>
          )}
        </label>

        <label>
          Position *
          <input
            name="position"
            value={formData.position}
            onChange={handleChange}
            aria-invalid={Boolean(errors.position)}
          />
          {errors.position && (
            <span className="error-text" role="alert">
              {errors.position}
            </span>
          )}
        </label>

        <label>
          Location
          <input name="location" value={formData.location} onChange={handleChange} />
        </label>

        <label>
          Job Type
          <select name="jobType" value={formData.jobType} onChange={handleChange}>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label>
          Application Date
          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Deadline
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </label>

        <label className="app-form-full">
          Job URL
          <input name="jobUrl" value={formData.jobUrl} onChange={handleChange} />
        </label>

        <label className="app-form-full">
          Notes
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          {initialData ? "Save Changes" : "Add Application"}
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;
