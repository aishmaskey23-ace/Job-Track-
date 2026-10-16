import { useState, useEffect } from "react";
import { slimJob } from "../utils/jobs";

// Remotive asks for at most ~4 requests a day and blocks callers above 2 per minute.
// So: fetch ONE batch, cache it, and do all searching/filtering in the browser.
const API_URL =
  "https://remotive.com/api/remote-jobs?category=software-dev&limit=100";
const CACHE_KEY = "jobtrack-discover-jobs-v2";
const LEGACY_CACHE_KEY = "jobtrack-discover-jobs"; // old format: stored full descriptions
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // reuse cached listings for 6 hours
const REQUEST_TIMEOUT_MS = 15000; // give up on a request that never answers

let inFlight = null; // shared promise: StrictMode's double effect never sends two requests

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(jobs, fetchedAt) {
  try {
    localStorage.removeItem(LEGACY_CACHE_KEY); // free the space the old, much larger cache used
    localStorage.setItem(CACHE_KEY, JSON.stringify({ jobs, fetchedAt }));
  } catch {
    // storage full or unavailable: the app still works, it just refetches next time
  }
}

// An expired cache is still shown while a fresh copy loads in the background
function getInitialState() {
  const cached = readCache();
  const hasJobs = cached && Array.isArray(cached.jobs);
  const isFresh = hasJobs && Date.now() - cached.fetchedAt < CACHE_TTL_MS;
  return {
    jobs: hasJobs ? cached.jobs : [],
    fetchedAt: hasJobs ? cached.fetchedAt : null,
    fetching: !isFresh,
    error: null,
  };
}

function requestJobs() {
  if (!inFlight) {
    // Without a timeout, a hung connection would keep the spinner up forever and
    // make Retry reuse the same stuck request.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    inFlight = fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            res.status === 429
              ? "Too many requests to the jobs service. Please wait a minute and try again."
              : `The jobs service returned an error (${res.status}).`
          );
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data.jobs)) {
          throw new Error("Unexpected response from the jobs service.");
        }
        const jobs = data.jobs.map(slimJob);
        const fetchedAt = Date.now();
        writeCache(jobs, fetchedAt);
        return { jobs, fetchedAt };
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          throw new Error(
            "The jobs service took too long to respond. Please try again."
          );
        }
        if (err instanceof TypeError) {
          throw new Error(
            "Couldn't reach the jobs service. Check your connection and try again."
          );
        }
        throw err;
      })
      .finally(() => {
        clearTimeout(timeoutId);
        inFlight = null;
      });
  }
  return inFlight;
}

function useRemoteJobs() {
  const [state, setState] = useState(getInitialState);
  const { fetching } = state;

  useEffect(() => {
    if (!fetching) return;

    let cancelled = false;
    requestJobs()
      .then(({ jobs, fetchedAt }) => {
        if (!cancelled) {
          setState({ jobs, fetchedAt, fetching: false, error: null });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState((prev) => ({ ...prev, fetching: false, error: err.message }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetching]);

  function retry() {
    setState((prev) => ({ ...prev, fetching: true, error: null }));
  }

  const hasJobs = state.jobs.length > 0;
  let status = "success";
  if (fetching && !hasJobs) status = "loading"; // spinner only when there is nothing to show
  else if (state.error) status = "error";

  return {
    jobs: state.jobs,
    fetchedAt: state.fetchedAt,
    status,
    isRefreshing: fetching && hasJobs,
    error: state.error,
    retry,
  };
}

export default useRemoteJobs;