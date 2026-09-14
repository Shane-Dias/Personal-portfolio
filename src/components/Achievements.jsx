import { motion } from "framer-motion";
import { Medal, Trophy, Award, ExternalLink, Star } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { achievements } from "../data/content";

// Drive visual style from the placement title, not array index
function getRank(title) {
  const t = title.toLowerCase();
  if (t.startsWith("1st place")) {
    return {
      icon: Trophy,
      ringClass: "border-amber/50",
      badgeClass: "bg-amber/10 text-amber border-amber/30",
      glowClass: "shadow-[0_0_32px_-6px_#ffb45440]",
      numberClass: "text-amber",
      accentColor: "var(--color-amber)",
      dividerClass: "bg-amber/20",
    };
  }
  if (t.startsWith("1st runner") || t.startsWith("2nd")) {
    return {
      icon: Medal,
      ringClass: "border-fg-dim/30",
      badgeClass: "bg-fg-dim/10 text-fg-dim border-edge",
      glowClass: "",
      numberClass: "text-fg-dim",
      accentColor: "var(--color-fg-dim)",
      dividerClass: "bg-edge",
    };
  }
  // 3rd place / any other
  return {
    icon: Star,
    ringClass: "border-cyan/40",
    badgeClass: "bg-cyan/10 text-cyan border-cyan/30",
    glowClass: "shadow-[0_0_24px_-6px_#52e0c430]",
    numberClass: "text-cyan",
    accentColor: "var(--color-cyan)",
    dividerClass: "bg-cyan/15",
  };
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

export default function Achievements() {
  return (
    <section id="recognition" className="relative py-28 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="04" title="Recognition" />

        <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <p className="max-w-xl text-sm leading-relaxed text-fg-dim">
            Competitive results from hackathons and engineering challenges —
            built under pressure, judged against the field.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-dim/50 shrink-0">
            {achievements.length} podium finishes
          </p>
        </div>

        {/* ── Cards — 2-col on sm, 3-col on lg ── */}
        <motion.div
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {achievements.map((a, i) => {
            const rank = getRank(a.title);
            const Icon = rank.icon;

            return (
              <motion.div
                key={a.event}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex flex-col border rounded-2xl p-6 bg-panel/50 overflow-hidden transition-shadow ${rank.ringClass} ${rank.glowClass}`}
              >
                {/* gradient accent blob */}
                <div
                  className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-full opacity-[0.06]"
                  style={{ background: rank.accentColor }}
                  aria-hidden="true"
                />

                {/* watermark rank number */}
                <span
                  className={`pointer-events-none absolute top-4 right-5 font-mono text-6xl font-bold leading-none select-none opacity-[0.07] ${rank.numberClass}`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>

                {/* icon badge */}
                <div className={`inline-flex w-10 h-10 items-center justify-center rounded-xl border ${rank.badgeClass}`}>
                  <Icon size={18} aria-hidden="true" />
                </div>

                {/* placement pill */}
                <span className={`mt-5 inline-flex self-start items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${rank.badgeClass}`}>
                  <Award size={10} aria-hidden="true" />
                  {a.title}
                </span>

                {/* event name */}
                <p className="mt-3 font-display text-base font-semibold text-fg leading-snug">
                  {a.event}
                </p>

                {/* bottom row: divider + optional certificate link */}
                <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                  <div className={`h-px flex-1 rounded-full ${rank.dividerClass}`} />
                  {a.cert && (
                    <a
                      href={a.cert}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className={`inline-flex items-center gap-1 font-mono text-[10px] transition-opacity opacity-70 hover:opacity-100 ${rank.numberClass}`}
                      aria-label={`View certificate for ${a.event}`}
                    >
                      <ExternalLink size={11} aria-hidden="true" />
                      certificate
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
