import "../styles/error-general-chat.css";

const ErrorState = ({ error }) => {
  return (
    <div className="error-container">
      <h2>🚨 Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
};

export default ErrorState;
