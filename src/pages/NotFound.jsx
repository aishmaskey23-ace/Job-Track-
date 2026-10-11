import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-code">404</p>
      <h1>Page not found</h1>
      <p className="not-found-text">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="primary-btn not-found-link">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;