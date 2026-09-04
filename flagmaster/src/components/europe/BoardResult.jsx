import { getCountry, flagUrl } from "../../data/memberships";

export default function BoardResult({ percent, wrongCodes, passThreshold, onRetry, onBack }) {
  const passed = percent >= passThreshold;
  const unique = [...new Set(wrongCodes)];

  return (
    <div className="eu-screen">
      <div className="eu-card">
        <div className="eu-logo">{passed ? "🎉" : "💪"}</div>
        <h2 className="eu-title">{percent}%</h2>
        <p className="eu-subtitle">
          {passed
            ? "Zaliczone! Ta plansza jest gotowa."
            : `Do zaliczenia brakuje ${passThreshold - percent} punktów procentowych.`}
        </p>

        {unique.length > 0 && (
          <div className="eu-weak">
            <p className="eu-weak-title">Do powtórzenia</p>
            <div className="eu-weak-list">
              {unique.map((cca2) => {
                const country = getCountry(cca2);
                if (!country) return null;
                return (
                  <div key={cca2} className="eu-weak-item">
                    <img src={flagUrl(cca2)} alt="" className="eu-weak-flag" />
                    <span className="eu-weak-name">{country.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={onRetry}>Jeszcze raz</button>
        <button className="eu-btn-secondary" onClick={onBack}>Wróć do plansz</button>
      </div>
    </div>
  );
}
