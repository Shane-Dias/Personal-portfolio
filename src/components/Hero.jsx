import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin, Sparkles } from "lucide-react";
import ScrambleText from "./ScrambleText";
import MagneticButton from "./MagneticButton";
import { profile } from "../data/content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center px-5 sm:px-8 overflow-hidden"
    >
      {/* subtle radial glow behind the name */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, var(--color-cyan) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl w-full">

        {/* prompt line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-5 flex items-center gap-2 font-mono text-xs text-cyan"
        >
          <span className="opacity-50">{">"}</span>
          <span>whoami</span>
          <span className="inline-block w-[7px] h-[13px] bg-cyan/70 animate-pulse" aria-hidden="true" />
        </motion.div>

        {/* name */}
        <h1 className="font-display font-extrabold leading-[0.9] text-[15vw] sm:text-7xl md:text-8xl lg:text-9xl text-fg tracking-tight">
          <ScrambleText text={profile.name} delay={200} />
        </h1>

        {/* role badge + tagline */}
        <motion.div {...fadeUp(1.05)} className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/8 px-3 py-1 font-mono text-xs text-cyan">
            <Sparkles size={11} aria-hidden="true" />
            {profile.role}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-dim/60">
            <MapPin size={11} aria-hidden="true" />
            {profile.location}
          </span>
        </motion.div>

        <motion.p
          {...fadeUp(1.2)}
          className="mt-6 text-lg sm:text-xl text-fg-dim max-w-lg leading-relaxed text-balance"
        >
          {profile.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(1.35)}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="inline-flex items-center gap-2 bg-cyan text-void px-6 py-3 font-mono text-xs font-medium tracking-wide rounded-full hover:bg-cyan/85 transition-colors"
          >
            See what I've built
          </MagneticButton>
          <MagneticButton
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 border border-edge px-6 py-3 font-mono text-xs tracking-wide text-fg rounded-full hover:border-fg-dim hover:text-fg transition-colors"
          >
            <Download size={13} /> Resume
          </MagneticButton>
        </motion.div>

        {/* stat bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.55 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-xl border-t border-edge-soft pt-6"
        >
          <Stat label="status" value="open to work" live />
          <Stat label="based in"  value={profile.location} />
          <Stat label="focus"     value="backend · cloud" />
          <Stat label="local time" value={timeStr} mono />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        data-cursor-hover
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-fg-dim/40 hover:text-fg-dim transition-colors"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest">scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.a>
    </section>
  );
}

function Stat({ label, value, live, mono }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-fg-dim/50">
        {live && (
          <span className="w-1.5 h-1.5 rounded-full bg-cyan pulse-dot" aria-hidden="true" />
        )}
        {label}
      </div>
      <div className={`mt-1.5 text-sm text-fg ${mono ? "font-mono tabular-nums" : ""}`}>
        {live ? (
          <span className="text-cyan">{value}</span>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
