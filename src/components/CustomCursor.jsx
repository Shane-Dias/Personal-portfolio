import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function CustomCursor() {
  const [enabled,  setEnabled]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const { theme } = useTheme();

  const x  = useMotionValue(100);
  const y  = useMotionValue(100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over  = (e) => {
      setHovering(!!e.target.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  // In dark mode: white ring with mix-blend-difference (classic invert effect).
  // In light mode: solid cyan ring, no blend — avoids ugly invert on light bg.
  const isDark = theme === "dark";

  return (
    <motion.div
      className="fixed top-0 left-0 z-[70] pointer-events-none"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: isDark ? "difference" : "normal",
      }}
    >
      <motion.div
        animate={{
          width:       hovering ? 40 : 18,
          height:      hovering ? 40 : 18,
          borderWidth: hovering ? 1  : 1.5,
          borderColor: isDark
            ? "#ffffff"
            : hovering
            ? "var(--color-cyan)"
            : "var(--color-fg-dim)",
          backgroundColor: isDark
            ? "transparent"
            : hovering
            ? "var(--color-cyan-dim)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="rounded-full border"
        style={{ borderColor: "inherit" }}
      />
    </motion.div>
  );
}
