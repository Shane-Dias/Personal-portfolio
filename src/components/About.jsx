import { motion } from "framer-motion";
import { GraduationCap, TrendingUp } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { profile, education } from "../data/content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
});

// Pull numeric highlights out of the summary to emphasise them
const HIGHLIGHTS = [
  { value: "8.94", label: "CGPA / 10" },
  { value: "Sem VII", label: "current" },
  { value: "5×", label: "hackathon wins" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="01" title="About" />

        {/* ── top: summary + highlight stats ── */}
        <div className="mt-12 grid md:grid-cols-5 gap-10 md:gap-16 items-start">

          {/* summary copy */}
          <motion.p
            {...fadeUp(0.05)}
            className="md:col-span-3 text-xl sm:text-2xl leading-relaxed text-fg text-balance"
          >
            {profile.summary}
          </motion.p>

          {/* highlight stats */}
          <motion.div
            {...fadeUp(0.15)}
            className="md:col-span-2 grid grid-cols-3 md:grid-cols-1 gap-3"
          >
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className="rounded-xl border border-edge-soft bg-panel/50 px-4 py-4 flex md:flex-row flex-col md:items-center md:gap-4"
              >
                <span className="font-mono text-2xl font-bold text-cyan leading-none">
                  {h.value}
                </span>
                <span className="mt-1 md:mt-0 font-mono text-[10px] uppercase tracking-wide text-fg-dim/60 leading-snug">
                  {h.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── bottom: education timeline ── */}
        <motion.div {...fadeUp(0.25)} className="mt-14">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap size={15} className="text-cyan" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim/60">
              education.log
            </p>
          </div>

          <div className="relative pl-5 border-l-2 border-edge space-y-8">

            {/* current degree */}
            <div className="relative">
              {/* active dot */}
              <span className="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full border-2 border-cyan bg-void pulse-dot" aria-hidden="true" />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-display text-base font-semibold text-fg">
                  {education.degree}
                </p>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] rounded-full border border-cyan/30 bg-cyan/8 text-cyan px-2 py-0.5">
                  <TrendingUp size={9} aria-hidden="true" />
                  {education.detail}
                </span>
              </div>
              <p className="mt-1 text-sm text-fg-dim">{education.school}</p>
              <p className="mt-1 font-mono text-[10px] text-fg-dim/50">
                {education.expected}
              </p>
            </div>

            {/* prior schooling */}
            {education.prior.map((p) => (
              <div key={p.label} className="relative">
                <span className="absolute -left-[1.2rem] top-1.5 w-2 h-2 rounded-full bg-edge" aria-hidden="true" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-sm text-fg-dim">{p.label}</p>
                  <p className="font-mono text-xs text-fg-dim/60">{p.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
