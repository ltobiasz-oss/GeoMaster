import { useEffect, useRef } from "react";

const rand = (min, max) => min + Math.random() * (max - min);

const GRAVITY = 0.085;
const DRAG = 0.982;
const DURATION_FRAMES = 360; // ~6 s przy 60 fps

function createRocket(w, h) {
  return {
    x: rand(w * 0.12, w * 0.88),
    y: h + 10,
    vx: rand(-0.7, 0.7),
    vy: rand(-13.5, -9.5),
    hue: Math.floor(rand(0, 360)),
    targetY: rand(h * 0.1, h * 0.45),
  };
}

/** Trzy kształty wybuchu: pierścień, wierzba i klasyczny rozbłysk. */
function createBurst(x, y, hue) {
  const shape = Math.random();
  const ring = shape < 0.25;
  const willow = !ring && shape < 0.45;
  const count = ring ? 76 : 118;
  const twoTone = Math.random() < 0.45;
  const sparks = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + rand(-0.06, 0.06);
    const speed = ring
      ? rand(4.8, 5.5)
      : willow
        ? rand(1.4, 3.4)
        : rand(0.7, 6.4);

    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      hue: twoTone && i % 2 ? (hue + 140) % 360 : hue,
      life: 1,
      decay: willow ? rand(0.005, 0.009) : rand(0.009, 0.02),
      twinkle: Math.random() < 0.28,
      size: ring ? 2.4 : rand(1.6, 2.8),
    });
  }
  return sparks;
}

/**
 * Fajerwerki na canvasie: rakieta leci w górę, wytraca prędkość i wybucha
 * w chmurę iskier podlegających grawitacji. Smugi robimy przez wygaszanie
 * poprzedniej klatki w trybie destination-out, żeby canvas został
 * przezroczysty, a przyciemnienie tła szło z CSS-a.
 */
export default function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rockets = [];
    let sparks = [];
    let frameId = 0;
    let elapsed = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Otwierająca salwa, żeby nie było martwej sekundy na starcie.
    rockets.push(createRocket(width, height), createRocket(width, height));

    const frame = () => {
      elapsed += 1;

      // Wygaszanie poprzedniej klatki daje efekt smug.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (elapsed < DURATION_FRAMES - 90 && elapsed % 20 === 0) {
        rockets.push(createRocket(width, height));
      }
      // Finał: gęsta seria tuż przed końcem.
      if (elapsed > DURATION_FRAMES - 130 && elapsed < DURATION_FRAMES - 95 && elapsed % 6 === 0) {
        rockets.push(createRocket(width, height));
      }

      rockets = rockets.filter((r) => {
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.14;

        ctx.fillStyle = `hsl(${r.hue}, 100%, 74%)`;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.4, 0, Math.PI * 2);
        ctx.fill();

        if (r.vy >= 0 || r.y <= r.targetY) {
          sparks = sparks.concat(createBurst(r.x, r.y, r.hue));
          return false;
        }
        return true;
      });

      sparks = sparks.filter((s) => {
        s.vx *= DRAG;
        s.vy *= DRAG;
        s.vy += GRAVITY;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) return false;

        const alpha = s.twinkle ? s.life * rand(0.3, 1) : s.life;
        ctx.fillStyle = `hsla(${s.hue}, 100%, ${62 + s.life * 26}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // Po wygaśnięciu ostatniej iskry nie ma po co palić CPU.
      if (elapsed > DURATION_FRAMES && sparks.length === 0) return;
      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fireworks-overlay" aria-hidden="true">
      <canvas ref={canvasRef} className="fireworks-canvas" />
    </div>
  );
}
