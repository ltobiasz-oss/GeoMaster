import { useState } from "react";
import { COUNTRIES, ORG_INFO, GROUPS, flagUrl } from "../../data/memberships";
import { GroupIcon } from "./GroupIcons";

/**
 * Część czysto teoretyczna: co to za organizacja, ciekawostka i pełna lista
 * państw z flagami. Karty są zwinięte, żeby nie zasypać dziecka ścianą tekstu.
 */
export default function LearnScreen({ onBack }) {
  const [open, setOpen] = useState("eu");

  return (
    <div className="eu-screen">
      <div className="eu-card">
        <button className="eu-back" onClick={onBack}>← Plansze</button>

        <div className="eu-logo">📖</div>
        <h1 className="eu-title">Trochę teorii</h1>
        <p className="eu-subtitle">
          Cztery organizacje, do których należą państwa Europy. Kliknij, żeby
          rozwinąć.
        </p>

        <div className="learn-list">
          {ORG_INFO.map((org) => {
            const members = COUNTRIES.filter((c) => c[org.id]);
            const group = GROUPS.find((g) => g.id === org.id);
            const isOpen = open === org.id;
            return (
              <div key={org.id} className={`learn-card ${isOpen ? "open" : ""}`}>
                <button
                  className="learn-head"
                  onClick={() => setOpen(isOpen ? null : org.id)}
                  aria-expanded={isOpen}
                >
                  <GroupIcon id={org.id} emoji={group.icon} />
                  <span className="learn-head-text">
                    <span className="learn-name">{org.name}</span>
                    <span className="learn-count">{members.length} państw</span>
                  </span>
                  <span className="learn-chevron">{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && (
                  <div className="learn-body">
                    <p className="learn-def">{org.definition}</p>
                    <div className="learn-fact">
                      <strong>Czy wiesz, że…</strong> {org.fact}
                    </div>
                    <div className="learn-flags">
                      {members.map((c) => (
                        <div key={c.cca2} className="learn-flag-item">
                          <img src={flagUrl(c.cca2)} alt="" className="learn-flag" />
                          <span>{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className="btn-primary" onClick={onBack}>
          Wróć do plansz
        </button>
      </div>
    </div>
  );
}
