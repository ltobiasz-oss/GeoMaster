const CONTINENTS = [
  { label: "All World",  value: null,       icon: "🌐" },
  { label: "Africa",     value: "Africa",   icon: "🌍" },
  { label: "Americas",   value: "Americas", icon: "🌎" },
  { label: "Asia",       value: "Asia",     icon: "🌏" },
  { label: "Europe",     value: "Europe",   icon: "🏛" },
  { label: "Oceania",    value: "Oceania",  icon: "🌊" },
];

export default function ContinentSelectScreen({ onSelectContinent, countries }) {
  return (
    <div className="continent-screen">
      <div className="continent-card">
        <div className="continent-logo">🌍</div>
        <h1 className="continent-title">GeoMaster</h1>
        <p className="continent-subtitle">Choose a region to explore</p>

        <div className="continent-grid">
          {CONTINENTS.map(({ label, value, icon }) => {
            const count = value
              ? countries.filter((c) => c.region === value).length
              : countries.length;
            return (
              <button
                key={label}
                className="continent-btn"
                onClick={() => onSelectContinent(value)}
              >
                <span className="continent-icon">{icon}</span>
                <span className="continent-label">{label}</span>
                <span className="continent-count">{count} countries</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
