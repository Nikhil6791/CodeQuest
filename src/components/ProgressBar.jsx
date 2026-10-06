export default function ProgressBar({ label, value }) {
  return (
    <div className="progress-item">
      <div className="progress-label-row">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-bar-track" aria-label={`${label} progress`}>
        <div className="progress-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
