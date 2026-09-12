import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { profile } from "../data/content";

const sections = [
  { id: "hero",        label: "index" },
  { id: "about",       label: "about" },
  { id: "skills",      label: "skills" },
  { id: "projects",    label: "projects" },
  { id: "recognition", label: "recognition" },
  { id: "contact",     label: "contact" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // frosted glass trigger
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── top bar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-40 px-5 sm:px-8 h-16 flex items-center justify-between font-mono text-xs transition-all duration-300 ${
          scrolled
            ? "bg-void/80 backdrop-blur-md border-b border-edge-soft/60"
            : "bg-transparent"
        }`}
      >
        {/* logo */}
        <a
          href="#hero"
          data-cursor-hover
          className="flex items-center gap-2 text-fg hover:text-cyan transition-colors"
        >
          <span className="inline-block w-[7px] h-[13px] bg-cyan pulse-dot" aria-hidden="true" />
          <span className="tracking-wide">Shane Dias</span>
        </a>

        {/* desktop: status + social */}
        <div className="hidden sm:flex items-center gap-5 text-fg-dim">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan pulse-dot" aria-hidden="true" />
            system online
          </span>
          <div className="flex items-center gap-3 border-l border-edge-soft pl-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              data-cursor-hover
              className="hover:text-cyan transition-colors"
            >
              <Github size={15} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              data-cursor-hover
              className="hover:text-cyan transition-colors"
            >
              <Linkedin size={15} />
            </a>
          </div>
        </div>

        {/* mobile hamburger */}
        <button
          className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-edge text-fg-dim hover:text-fg hover:border-fg-dim transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          data-cursor-hover
        >
          <Menu size={16} />
        </button>
      </header>

      {/* ── vertical dock, desktop ── */}
      <nav
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
        aria-label="Page sections"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-cursor-hover
              aria-current={isActive ? "location" : undefined}
              className="group flex items-center gap-3"
            >
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 6,
                }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[10px] uppercase tracking-widest text-cyan group-hover:opacity-100 group-hover:translate-x-0"
              >
                {s.label}
              </motion.span>
              {/* also show label on hover even if inactive */}
              {!isActive && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-7 font-mono text-[10px] uppercase tracking-widest text-fg-dim pointer-events-none"
                  aria-hidden="true"
                >
                  {s.label}
                </motion.span>
              )}
              <motion.span
                animate={{
                  width:           isActive ? 10 : 6,
                  height:          isActive ? 10 : 6,
                  backgroundColor: isActive ? "#52e0c4" : "#8b93a3",
                }}
                transition={{ duration: 0.2 }}
                className="block rounded-full"
              />
            </a>
          );
        })}

        {/* social links at bottom of dock */}
        <div className="mt-2 flex flex-col items-end gap-3 border-t border-edge-soft pt-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            data-cursor-hover
            className="text-fg-dim hover:text-cyan transition-colors"
          >
            <Github size={15} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            data-cursor-hover
            className="text-fg-dim hover:text-cyan transition-colors"
          >
            <Linkedin size={15} />
          </a>
        </div>
      </nav>

      {/* ── mobile full-screen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-void/95 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-panel border-l border-edge flex flex-col"
            >
              {/* panel header */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-edge-soft">
                <span className="font-mono text-xs text-fg-dim tracking-wide">navigation</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-edge text-fg-dim hover:text-fg hover:border-fg-dim transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* links */}
              <nav className="flex flex-col p-6 gap-1 flex-1">
                {sections.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-mono text-sm transition-colors ${
                      active === s.id
                        ? "bg-cyan/10 text-cyan"
                        : "text-fg-dim hover:text-fg hover:bg-panel-2"
                    }`}
                  >
                    <span>{s.label}</span>
                    {active === s.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" aria-hidden="true" />
                    )}
                  </motion.a>
                ))}
              </nav>

              {/* social at bottom */}
              <div className="p-6 border-t border-edge-soft flex items-center gap-4">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-fg-dim hover:text-cyan transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-fg-dim hover:text-cyan transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
