export default function HomeScreen({ onStart, totalCountries }) {
  return (
    <div className="home-screen">
      <div className="home-card">
        <div className="home-logo">🌍</div>
        <h1 className="home-title">FlagMaster</h1>
        <p className="home-subtitle">
          Test your knowledge of flags from countries around the world!
          10 questions, 4 answer choices — how many points can you score?
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

        <button className="btn-primary" onClick={onStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
