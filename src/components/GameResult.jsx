export default function GameResult({ isSuccess, title, message, onRetry }) {
  return (
    <div className={`result-box ${isSuccess ? "success" : "error"}`}>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="secondary-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
