import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const PARTICLE_COUNT = 70;
const LINK_DIST      = 130;
const MOUSE_DIST     = 180;
const MOUSE_LINK_DIST = 220;

/** Read a CSS custom property from :root */
function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function NetworkField() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999, active: false });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width  = (canvas.width  = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * width,
      y:  Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r:  Math.random() * 1.4 + 0.6,
    }));

    function resize() {
      width  = canvas.width  = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    function onMove(e) {
      const t = e.touches ? e.touches[0] : e;
      mouse.current.x      = t.clientX;
      mouse.current.y      = t.clientY;
      mouse.current.active = true;
    }
    function onLeave() { mouse.current.active = false; }
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("touchmove",  onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    let raf;
    function tick() {
      ctx.clearRect(0, 0, width, height);

      // Read live theme colours each frame so they respond instantly to toggle
      const cyanHex     = getCssVar("--color-cyan");
      const isDark      = document.documentElement.classList.contains("dark");
      // particle & line opacity differ slightly between modes
      const linkAlpha   = isDark ? 0.14 : 0.20;
      const mouseAlpha  = isDark ? 0.35 : 0.45;
      const dotAlpha    = isDark ? 0.55 : 0.40;

      // update
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width)  p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          if (mouse.current.active) {
            const dx   = p.x - mouse.current.x;
            const dy   = p.y - mouse.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < MOUSE_DIST) {
              const force = (1 - dist / MOUSE_DIST) * 0.6;
              p.x += (dx / (dist || 1)) * force;
              p.y += (dy / (dist || 1)) * force;
            }
          }
        }
      }

      // particle–particle links
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a    = particles[i];
          const b    = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `${cyanHex}${Math.round(linkAlpha * (1 - dist / LINK_DIST) * 255).toString(16).padStart(2, "0")}`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // mouse links
      if (mouse.current.active) {
        for (const p of particles) {
          const dist = Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y);
          if (dist < MOUSE_LINK_DIST) {
            const a = mouseAlpha * (1 - dist / MOUSE_LINK_DIST);
            ctx.strokeStyle = `${cyanHex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        // derive a muted teal from cyan var; just draw with fixed rgba for simplicity
        ctx.fillStyle = isDark
          ? `rgba(140, 210, 200, ${dotAlpha})`
          : `rgba(8, 145, 178, ${dotAlpha})`;  /* matches light --color-cyan #0891b2 */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("touchmove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  // Re-run when theme changes so colours update immediately
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
