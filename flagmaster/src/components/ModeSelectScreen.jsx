export default function ModeSelectScreen({ onSelectMode, onSelectEurope, totalCountries }) {
  return (
    <div className="mode-screen">
      <div className="mode-card">
        <div className="mode-logo">🌍</div>
        <h1 className="mode-title">GeoMaster</h1>
        <p className="mode-subtitle">
          Test your world geography knowledge. Choose a quiz mode to get started!
        </p>

        <div className="home-stats">
          <div className="stat-item">
            <span className="stat-number">{totalCountries}</span>
            <span className="stat-label">Countries</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">Chances</span>
          </div>
        </div>

        <div className="mode-buttons">
          <button
            className="mode-btn"
            onClick={() => onSelectMode("flags")}
          >
            <span className="mode-btn-icon">🇵🇱</span>
            <span className="mode-btn-text">
              <span className="mode-btn-label">Flag Quiz</span>
              <span className="mode-btn-sub">Identify country flags</span>
            </span>
          </button>

          <button
            className="mode-btn"
            onClick={() => onSelectMode("capitals")}
          >
            <span className="mode-btn-icon">🏛</span>
            <span className="mode-btn-text">
              <span className="mode-btn-label">Capital Quiz</span>
              <span className="mode-btn-sub">Match capitals to countries</span>
            </span>
          </button>

          <button className="mode-btn mode-btn-europe" onClick={onSelectEurope}>
            <span className="mode-btn-icon">🇪🇺</span>
            <span className="mode-btn-text">
              <span className="mode-btn-label">Przygotowanie do testu</span>
              <span className="mode-btn-sub">UE · Schengen · euro · NATO</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
