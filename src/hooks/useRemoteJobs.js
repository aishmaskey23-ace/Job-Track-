import { useState, useEffect } from "react";

const API_URL =
  "https://remotive.com/api/remote-jobs?category=software-dev&limit=100";
const CACHE_KEY = "jobtrack-discover-jobs";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // reuse cached listings for 6 hours

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
    localStorage.setItem(CACHE_KEY, JSON.stringify({ jobs, fetchedAt }));
  } catch {
    // storage full or unavailable: the app still works, it just refetches next time
  }
}

function getInitialState() {
  const cached = readCache();
  const isFresh = cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS;
  return {
    jobs: cached?.jobs ?? [],
    fetchedAt: cached?.fetchedAt ?? null,
    status: isFresh ? "success" : "loading",
    error: null,
  };
}

function requestJobs() {
  if (!inFlight) {
    inFlight = fetch(API_URL)
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
        const fetchedAt = Date.now();
        writeCache(data.jobs, fetchedAt);
        return { jobs: data.jobs, fetchedAt };
      })
      .catch((err) => {
        if (err instanceof TypeError) {
          throw new Error(
            "Couldn't reach the jobs service. Check your connection and try again."
          );
        }
        throw err;
      })
      .finally(() => {
        inFlight = null;
      });
  }
  return inFlight;
}

function useRemoteJobs() {
  const [state, setState] = useState(getInitialState);
  const { status } = state;

  useEffect(() => {
    if (status !== "loading") return;

    let cancelled = false;
    requestJobs()
      .then(({ jobs, fetchedAt }) => {
        if (!cancelled) setState({ jobs, fetchedAt, status: "success", error: null });
      })
      .catch((err) => {
        if (!cancelled) {
          setState((prev) => ({ ...prev, status: "error", error: err.message }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  function retry() {
    setState((prev) => ({ ...prev, status: "loading", error: null }));
  }

  return {
    jobs: state.jobs,
    fetchedAt: state.fetchedAt,
    status,
    error: state.error,
    retry,
  };
}

export default useRemoteJobs;