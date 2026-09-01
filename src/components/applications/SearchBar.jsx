function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-wrap">
      <span className="search-icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        className="search-bar"
        placeholder="Search by company..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search applications by company"
      />
    </div>
  );
}

export default SearchBar;
