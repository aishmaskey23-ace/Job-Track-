function FilterBar({ statusFilter, onStatusChange, sortBy, onSortChange }) {
  return (
    <div className="filter-bar">
      <label className="filter-field">
        <span className="filter-label">Status</span>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </label>

      <label className="filter-field">
        <span className="filter-label">Sort</span>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="company-asc">Company A-Z</option>
          <option value="company-desc">Company Z-A</option>
          <option value="deadline">Deadline</option>
        </select>
      </label>
    </div>
  );
}

export default FilterBar;
