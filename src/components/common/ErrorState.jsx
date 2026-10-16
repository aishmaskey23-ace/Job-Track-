import "./ErrorState.css";

function ErrorState({ message = "Something went wrong.", onRetry, retryLabel = "Try Again" }) {
  return (
    <div className="error-state">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
        {retryLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorState;