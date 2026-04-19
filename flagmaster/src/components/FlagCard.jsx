export default function FlagCard({ flagUrl, altText }) {
  return (
    <div className="flag-card">
      <p className="flag-prompt">Which country does this flag belong to?</p>
      <div className="flag-image-wrapper">
        <img
          src={flagUrl}
          alt={`Flag of ${altText}`}
          className="flag-image"
          loading="eager"
        />
      </div>
    </div>
  );
}
