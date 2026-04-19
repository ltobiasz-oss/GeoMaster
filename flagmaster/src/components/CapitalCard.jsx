export default function CapitalCard({ capital }) {
  return (
    <div className="capital-card">
      <p className="capital-prompt">Which country has this capital?</p>
      <p className="capital-name">{capital}</p>
    </div>
  );
}
