import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ExternalLink, Github, X } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { projects } from "../data/content";

// Map project kind → a short colour token for the badge
const KIND_COLOR = {
  "Safety platform":        "text-cyan   border-cyan/30   bg-cyan/8",
  "Travel safety platform": "text-cyan   border-cyan/30   bg-cyan/8",
  "Web platform":           "text-amber  border-amber/30  bg-amber/8",
  "Cloud system":           "text-red    border-red/30    bg-red/8",
  "Backend service":        "text-fg-dim border-edge      bg-panel-2",
  "Data study":             "text-amber  border-amber/30  bg-amber/8",
};
const kindClass = (kind) =>
  KIND_COLOR[kind] ?? "text-fg-dim border-edge bg-panel-2";

// Split the stack string into individual pill labels
const stackPills = (str) => str.split(" · ").map((s) => s.trim());

export default function Projects() {
  const [selected, setSelected]   = useState(null);
  const [showAll,  setShowAll]    = useState(false);
  const closeRef                  = useRef(null);

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  // Close on Escape, restore focus on close
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setSelected(null); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Shift focus to the close button when modal opens
  useEffect(() => {
    if (selected) closeRef.current?.focus();
  }, [selected]);

  return (
    <section id="projects" className="relative py-28 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="03" title="Projects" />

        <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <p className="max-w-xl text-sm leading-relaxed text-fg-dim">
            Product, platform, cloud, and data work — each project opens into
            the decisions and details behind it.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-dim/50 shrink-0">
            {projects.length} projects
          </p>
        </div>

        {/* ── Project grid ── */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {visibleProjects.map((p) => (
            <motion.button
              layoutId={`card-${p.code}`}
              key={p.code}
              onClick={() => setSelected(p)}
              data-cursor-hover
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group text-left border border-edge-soft bg-panel/60 hover:border-edge hover:bg-panel transition-colors p-6 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              {/* top row: code + kind badge + arrow */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <motion.span
                    layoutId={`code-${p.code}`}
                    className="font-mono text-[10px] text-cyan"
                  >
                    {p.code}
                  </motion.span>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wide border rounded-full px-2 py-0.5 ${kindClass(p.kind)}`}
                  >
                    {p.kind}
                  </span>
                </div>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 mt-0.5 text-fg-dim/40 group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  aria-hidden="true"
                />
              </div>

              {/* title */}
              <motion.h3
                layoutId={`title-${p.code}`}
                className="mt-3 font-display text-xl font-semibold text-fg group-hover:text-cyan transition-colors"
              >
                {p.name}
              </motion.h3>

              {/* description */}
              <p className="mt-2 text-sm text-fg-dim leading-relaxed line-clamp-2">
                {p.description}
              </p>

              {/* stack pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {stackPills(p.stack).slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] border border-edge rounded-full px-2.5 py-1 text-fg-dim/70"
                  >
                    {tech}
                  </span>
                ))}
                {stackPills(p.stack).length > 4 && (
                  <span className="font-mono text-[10px] border border-edge rounded-full px-2.5 py-1 text-fg-dim/40">
                    +{stackPills(p.stack).length - 4}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* ── Show more / less ── */}
        {projects.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-edge px-5 py-2.5 font-mono text-xs text-fg-dim transition-colors hover:border-fg-dim hover:text-fg"
            >
              {showAll
                ? "Show fewer projects"
                : `Load ${projects.length - 4} more project${projects.length - 4 === 1 ? "" : "s"}`}
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex"
              >
                <ChevronDown size={14} />
              </motion.span>
            </button>
          </div>
        )}
      </div>

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[65] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-void/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* panel */}
            <motion.div
              layoutId={`card-${selected.code}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${selected.code}`}
              className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto bg-panel border border-edge rounded-2xl p-7 sm:p-9 shadow-2xl"
            >
              {/* close */}
              <button
                ref={closeRef}
                onClick={() => setSelected(null)}
                data-cursor-hover
                aria-label="Close project detail"
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-edge text-fg-dim hover:text-fg hover:border-fg-dim transition-colors"
              >
                <X size={15} />
              </button>

              {/* header */}
              <div className="flex items-center gap-2 flex-wrap">
                <motion.span
                  layoutId={`code-${selected.code}`}
                  className="font-mono text-[10px] text-cyan"
                >
                  {selected.code}
                </motion.span>
                <span
                  className={`font-mono text-[9px] uppercase tracking-wide border rounded-full px-2 py-0.5 ${kindClass(selected.kind)}`}
                >
                  {selected.kind}
                </span>
              </div>

              <motion.h3
                layoutId={`title-${selected.code}`}
                id={`modal-title-${selected.code}`}
                className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-fg"
              >
                {selected.name}
              </motion.h3>

              {/* stack pills — full list in modal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-3 flex flex-wrap gap-1.5"
              >
                {stackPills(selected.stack).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] border border-edge rounded-full px-2.5 py-1 text-fg-dim/80"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {/* description */}
                <p className="mt-5 text-sm text-fg-dim leading-relaxed">
                  {selected.description}
                </p>

                {/* bullet points */}
                <ul className="mt-5 space-y-3">
                  {selected.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-fg-dim">
                      <span className="mt-[7px] block w-1.5 h-1.5 shrink-0 rounded-full bg-cyan" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* metrics (data projects) */}
                {selected.metrics && (
                  <div className="mt-6 grid grid-cols-3 gap-3 border-y border-edge-soft py-5">
                    {selected.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-mono text-lg font-semibold text-amber">
                          {m.value}
                        </p>
                        <p className="mt-1 text-[10px] leading-snug text-fg-dim">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* actions */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={selected.repo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 rounded-full border border-edge px-4 py-2 font-mono text-xs text-fg hover:border-cyan hover:text-cyan transition-colors"
                  >
                    <Github size={13} />
                    repository
                  </a>
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 rounded-full bg-cyan text-void px-4 py-2 font-mono text-xs hover:bg-cyan/85 transition-colors"
                    >
                      <ExternalLink size={13} />
                      live demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
