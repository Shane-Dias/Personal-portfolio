import { motion } from "framer-motion";
import { Medal, Trophy, Award } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { achievements } from "../data/content";

// Visual config per rank position (1-indexed)
const RANK = [
  {
    label: "1st Place",
    icon: Trophy,
    ringClass: "border-amber/50",
    iconClass: "text-amber",
    badgeClass: "bg-amber/10 text-amber border-amber/30",
    glowClass: "shadow-[0_0_32px_-6px_#ffb45440]",
    numberClass: "text-amber",
  },
  {
    label: "1st Runner-Up",
    icon: Medal,
    ringClass: "border-fg-dim/30",
    iconClass: "text-fg-dim",
    badgeClass: "bg-fg-dim/10 text-fg-dim border-edge",
    glowClass: "",
    numberClass: "text-fg-dim",
  },
  {
    label: "1st Place",          // third card also a win — keep amber
    icon: Trophy,
    ringClass: "border-amber/50",
    iconClass: "text-amber",
    badgeClass: "bg-amber/10 text-amber border-amber/30",
    glowClass: "shadow-[0_0_32px_-6px_#ffb45440]",
    numberClass: "text-amber",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function Achievements() {
  const totalWins = achievements.length;

  return (
    <section id="recognition" className="relative py-28 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="04" title="Recognition" />

        <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <p className="max-w-xl text-sm leading-relaxed text-fg-dim">
            Competitive results from hackathons and engineering challenges — built under pressure, judged against the field.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-dim/50 shrink-0">
            {totalWins} podium finishes
          </p>
        </div>

        {/* ── Cards ── */}
        <motion.div
          className="mt-10 grid sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {achievements.map((a, i) => {
            const rank = RANK[i] ?? RANK[1];
            const Icon = rank.icon;

            return (
              <motion.div
                key={a.event}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex flex-col border rounded-2xl p-6 bg-panel/50 overflow-hidden transition-shadow ${rank.ringClass} ${rank.glowClass}`}
              >
                {/* subtle top-left gradient accent */}
                <div
                  className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-full opacity-[0.06]"
                  style={{ background: i % 2 === 0 ? "var(--color-amber)" : "var(--color-fg-dim)" }}
                  aria-hidden="true"
                />

                {/* rank number — large background watermark */}
                <span
                  className={`pointer-events-none absolute top-4 right-5 font-mono text-6xl font-bold leading-none select-none opacity-[0.07] ${rank.numberClass}`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>

                {/* icon */}
                <div
                  className={`inline-flex w-10 h-10 items-center justify-center rounded-xl border ${rank.badgeClass}`}
                >
                  <Icon size={18} aria-hidden="true" />
                </div>

                {/* placement badge */}
                <span
                  className={`mt-5 inline-flex self-start items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${rank.badgeClass}`}
                >
                  <Award size={10} aria-hidden="true" />
                  {a.title}
                </span>

                {/* event name */}
                <p className="mt-3 font-display text-base font-semibold text-fg leading-snug">
                  {a.event}
                </p>

                {/* bottom divider line — amber for wins, muted for runner-up */}
                <div
                  className={`mt-auto pt-5`}
                >
                  <div
                    className={`h-px w-full rounded-full ${i % 2 === 0 ? "bg-amber/20" : "bg-edge"}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
