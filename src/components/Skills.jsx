import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Braces,
  Cloud,
  Database,
  GitBranch,
  LayoutPanelTop,
  Server,
  Code2,
  Cpu,
  Globe,
  Wrench,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { stack } from "../data/content";

const W = 640;
const H = 480;
const CX = W / 2;
const CY = H / 2;
const RADIUS = 170;

// Map each stack group to a Lucide icon
const GROUP_ICONS = {
  Languages: Code2,
  Frontend: Globe,
  Backend: Server,
  "Data & Databases": Database,
  "Cloud (AWS)": Cloud,
  Tooling: Wrench,
};

const capabilityCards = [
  {
    title: "Interface",
    detail: "Responsive React experiences with clean, reusable UI.",
    icon: LayoutPanelTop,
  },
  {
    title: "Services",
    detail: "APIs, authentication, workflows, and relational logic.",
    icon: Server,
  },
  {
    title: "Data",
    detail: "Schemas, queries, analysis, and clear decision support.",
    icon: Database,
  },
  {
    title: "Delivery",
    detail: "Cloud automation, version control, and practical tooling.",
    icon: Cloud,
  },
];

// Stagger children animation
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

/** Read a CSS custom property from :root as a live string */
function useCssVar(name) {
  const get = () =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [value, setValue] = useState(get);
  useEffect(() => {
    // Re-read whenever the html class changes (theme toggle)
    const observer = new MutationObserver(() => setValue(get()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [name]);
  return value;
}

export default function Skills() {
  const [active, setActive] = useState(stack[0].group);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Live theme-aware colours for SVG (can't use Tailwind classes inside SVG attrs)
  const colorCyan    = useCssVar("--color-cyan");
  const colorEdge    = useCssVar("--color-edge");
  const colorEdgeSoft = useCssVar("--color-edge-soft");

  const activeGroup = stack.find((g) => g.group === active);
  const totalTools = stack.reduce((acc, g) => acc + g.items.length, 0);

  const nodes = useMemo(
    () =>
      stack.map((group, index) => {
        const angle = (index / stack.length) * Math.PI * 2 - Math.PI / 2;
        return {
          ...group,
          x: CX + RADIUS * Math.cos(angle),
          y: CY + RADIUS * Math.sin(angle),
        };
      }),
    []
  );

  return (
    <section id="skills" className="relative py-28 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="02" title="Engineering toolkit" />
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-dim">
          A connected toolkit for building, shipping, and improving digital
          products. Select a domain to explore the tools behind it.
        </p>

        {/* ── Capability cards ── */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {capabilityCards.map(({ title, detail, icon: Icon }) => (
            <motion.div
              key={title}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group rounded-xl border border-edge-soft bg-panel/45 p-4 transition-colors hover:border-cyan/40 hover:bg-panel/70"
            >
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/20 group-hover:bg-cyan/15 transition-colors">
                <Icon size={15} className="text-cyan" aria-hidden="true" />
              </div>
              <p className="mt-3 font-mono text-xs text-fg">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-fg-dim">{detail}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Radial graph (desktop) ── */}
        <div
          className="hidden md:block mt-10 relative mx-auto select-none"
          style={{ width: W, height: H }}
        >
          <svg
            width={W}
            height={H}
            className="absolute inset-0 overflow-visible"
            aria-hidden="true"
          >
            {/* Ambient ring */}
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke={colorEdgeSoft}
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            {/* Spoke lines */}
            {nodes.map((node) => {
              const isActive = active === node.group;
              const isHovered = hoveredNode === node.group;
              const stroke = isActive
                ? colorCyan
                : isHovered
                ? `${colorCyan}80`
                : colorEdge;
              return (
                <motion.line
                  key={node.group}
                  x1={CX}
                  y1={CY}
                  x2={node.x}
                  y2={node.y}
                  stroke={stroke}
                  strokeWidth={isActive ? 1.5 : 1}
                  animate={{ stroke, strokeWidth: isActive ? 1.5 : 1 }}
                  transition={{ duration: 0.25 }}
                />
              );
            })}
          </svg>

          {/* Center hub */}
          <div
            className="absolute rounded-full bg-panel-2 border border-edge flex flex-col items-center justify-center gap-0.5 z-10"
            style={{ left: CX - 38, top: CY - 38, width: 76, height: 76 }}
          >
            <Braces size={16} className="text-cyan" aria-label="Engineering toolkit" />
            <span className="font-mono text-[10px] text-fg-dim leading-none">{totalTools}</span>
            <span className="font-mono text-[8px] text-fg-dim/50 leading-none uppercase tracking-wide">tools</span>
          </div>

          {/* Node buttons */}
          {nodes.map((node) => {
            const Icon = GROUP_ICONS[node.group] ?? Cpu;
            const isActive = active === node.group;
            return (
              <motion.button
                key={node.group}
                onClick={() => setActive(node.group)}
                onMouseEnter={() => setHoveredNode(node.group)}
                onMouseLeave={() => setHoveredNode(null)}
                data-cursor-hover
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                animate={{
                  boxShadow: isActive
                    ? `0 0 24px -4px ${colorCyan}55`
                    : "0 0 0px 0px transparent",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className={`absolute rounded-full border flex flex-col items-center justify-center text-center font-mono text-[10px] leading-tight transition-colors z-10 gap-1 ${
                  isActive
                    ? "bg-cyan/10 text-cyan border-cyan"
                    : "bg-panel border-edge text-fg-dim hover:text-fg hover:border-fg-dim"
                }`}
                style={{ left: node.x - 46, top: node.y - 46, width: 92, height: 92 }}
                aria-pressed={isActive}
              >
                <Icon size={14} aria-hidden="true" />
                <span className="px-1 leading-snug">{node.group}</span>
                <span
                  className={`font-mono text-[9px] rounded-full px-1.5 py-0 ${
                    isActive ? "bg-cyan/20 text-cyan" : "bg-edge text-fg-dim/60"
                  }`}
                >
                  {node.items.length}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Pill tabs (mobile) ── */}
        <div className="md:hidden mt-8 flex gap-2 overflow-x-auto pb-2 -mx-5 px-5">
          {stack.map((group) => {
            const Icon = GROUP_ICONS[group.group] ?? Cpu;
            const isActive = active === group.group;
            return (
              <button
                key={group.group}
                onClick={() => setActive(group.group)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-[11px] whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-cyan/10 text-cyan border-cyan"
                    : "border-edge text-fg-dim hover:border-fg-dim hover:text-fg"
                }`}
              >
                <Icon size={11} aria-hidden="true" />
                {group.group}
              </button>
            );
          })}
        </div>

        {/* ── Active group item panel ── */}
        <div className="mt-8 md:mt-10 rounded-2xl border border-edge-soft bg-panel/35 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = GROUP_ICONS[activeGroup?.group] ?? Cpu;
                return <Icon size={14} className="text-cyan" aria-hidden="true" />;
              })()}
              <p className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                {activeGroup?.group}
              </p>
              <span className="font-mono text-[9px] rounded-full bg-cyan/15 text-cyan px-2 py-0.5">
                {activeGroup?.items.length} tools
              </span>
            </div>
            <GitBranch size={15} className="text-fg-dim/50" aria-hidden="true" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex flex-wrap gap-2"
            >
              {activeGroup?.items.map((item) => (
                <motion.span
                  key={item}
                  variants={itemVariants}
                  className="inline-flex items-center border border-edge rounded-full px-3.5 py-1.5 font-mono text-xs text-fg hover:border-cyan/50 hover:text-cyan transition-colors cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
