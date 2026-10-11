import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useApplicationContext } from "../../context/ApplicationContext";
import StatusBadge from "../common/StatusBadge";
import "./GlobalSearch.css";

const isMac = /Mac|iPhone|iPad/i.test(navigator.userAgent);

function GlobalSearch() {
  const { applications } = useApplicationContext();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false); // results dropdown
  const [expanded, setExpanded] = useState(false); // search bar on mobile
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return applications
      .filter(
        (app) =>
          app.company.toLowerCase().includes(q) ||
          app.position.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [applications, query]);

  const showResults = open && query.trim() !== "";

  // Ctrl+K / Cmd+K focuses the search from anywhere
  useEffect(() => {
    function handleShortcut(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setExpanded(true);
        setOpen(true);
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  // On mobile the input only exists once expanded, so focus after it renders
  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(e) {
    setQuery(e.target.value);
    setActiveIndex(0);
    setOpen(true);
  }

  function goTo(app) {
    navigate(`/applications/${app.id}`);
    setQuery("");
    setOpen(false);
    setExpanded(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length) setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length)
        setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      if (results[activeIndex]) goTo(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setExpanded(false);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  return (
    <div
      className={expanded ? "gs-wrapper expanded" : "gs-wrapper"}
      ref={wrapperRef}
    >
      <button
        className="icon-btn gs-trigger"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label="Search applications"
        aria-expanded={expanded}
      >
        <Search size={18} aria-hidden="true" />
      </button>

      <div className="gs-input-wrap">
        <Search size={16} className="gs-icon" aria-hidden="true" />
        <input
          ref={inputRef}
          className="gs-input"
          type="text"
          role="combobox"
          aria-label="Search applications"
          aria-expanded={showResults}
          aria-controls="global-search-results"
          aria-autocomplete="list"
          aria-activedescendant={
            showResults && results[activeIndex]
              ? `gs-option-${results[activeIndex].id}`
              : undefined
          }
          placeholder="Search applications..."
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {!query && (
          <kbd className="gs-kbd" aria-hidden="true">
            {isMac ? "⌘K" : "Ctrl K"}
          </kbd>
        )}
      </div>

      {showResults && (
        <ul
          id="global-search-results"
          className="gs-results"
          role="listbox"
          aria-label="Search results"
        >
          {results.length === 0 ? (
            <li className="gs-empty" role="presentation">
              No matches for “{query.trim()}”
            </li>
          ) : (
            results.map((app, index) => (
              <li
                key={app.id}
                id={`gs-option-${app.id}`}
                role="option"
                aria-selected={index === activeIndex}
                className={index === activeIndex ? "gs-result active" : "gs-result"}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()} // keep focus in the input
                onClick={() => goTo(app)}
              >
                <div className="gs-result-main">
                  <span className="gs-result-company">{app.company}</span>
                  <span className="gs-result-position">{app.position}</span>
                </div>
                <StatusBadge status={app.status} />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default GlobalSearch;