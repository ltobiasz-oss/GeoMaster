/**
 * Ikony rysowane jako SVG, a nie emoji flagowe (🇪🇺, 🇵🇱).
 * Windows nie renderuje par znaków regional indicator — zamiast flagi
 * pokazuje gołe litery "EU" / "PL". SVG wygląda identycznie wszędzie.
 */

// Pięcioramienna gwiazda o promieniu 1, wyśrodkowana w (0,0).
const STAR =
  "0,-1 0.225,-0.309 0.951,-0.309 0.363,0.118 0.588,0.809 0,0.382 -0.588,0.809 -0.363,0.118 -0.951,-0.309 -0.225,-0.309";

// 12 gwiazd na okręgu o promieniu 18 wokół środka flagi (45, 30).
const EU_STARS = Array.from({ length: 12 }, (_, k) => {
  const angle = (k * 30 * Math.PI) / 180;
  return [
    +(45 + 18 * Math.sin(angle)).toFixed(2),
    +(30 - 18 * Math.cos(angle)).toFixed(2),
  ];
});

export function EuFlag({ className = "" }) {
  return (
    <svg viewBox="0 0 90 60" className={className} role="img" aria-label="Flaga Unii Europejskiej">
      <rect width="90" height="60" rx="3" fill="#003399" />
      {EU_STARS.map(([x, y], i) => (
        <polygon
          key={i}
          points={STAR}
          fill="#FFCC00"
          transform={`translate(${x} ${y}) scale(4.2)`}
        />
      ))}
    </svg>
  );
}

export function NatoEmblem({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Symbol NATO">
      <circle cx="32" cy="32" r="32" fill="#004990" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#fff" strokeWidth="2.4" />
      <polygon
        points="32,15 34.6,29.4 49,32 34.6,34.6 32,49 29.4,34.6 15,32 29.4,29.4"
        fill="#fff"
      />
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
        <line x1="32" y1="15" x2="32" y2="5" />
        <line x1="49" y1="32" x2="59" y2="32" />
        <line x1="32" y1="49" x2="32" y2="59" />
        <line x1="15" y1="32" x2="5" y2="32" />
      </g>
    </svg>
  );
}

export function PolishFlag({ className = "" }) {
  return (
    <svg viewBox="0 0 90 60" className={className} role="img" aria-label="Flaga Polski">
      <rect width="90" height="60" rx="3" fill="#fff" />
      <path d="M0 30h90v27a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3z" fill="#DC143C" />
      <rect
        x="0.6"
        y="0.6"
        width="88.8"
        height="58.8"
        rx="3"
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Ikona dla jednej z czterech grup; Schengen i euro zostają na emoji. */
export function GroupIcon({ id, emoji }) {
  if (id === "eu") return <EuFlag className="group-icon-flag" />;
  if (id === "nato") return <NatoEmblem className="group-icon-round" />;
  return <span className="eu-toggle-icon">{emoji}</span>;
}
