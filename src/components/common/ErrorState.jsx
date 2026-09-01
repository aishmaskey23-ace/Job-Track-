import "./ErrorState.css";

function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="error-state">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;