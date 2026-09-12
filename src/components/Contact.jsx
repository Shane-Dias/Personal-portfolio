import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import MagneticButton from "./MagneticButton";
import { profile } from "../data/content";

const COMMANDS = {
  email: {
    output: `opening mail client → ${profile.email}`,
    run: () => (window.location.href = `mailto:${profile.email}`),
  },
  call: {
    output: `dialing → ${profile.phone}`,
    run: () => (window.location.href = `tel:${profile.phone}`),
  },
  github: {
    output: `opening → ${profile.github}`,
    run: () => window.open(profile.github, "_blank"),
  },
  linkedin: {
    output: `opening → ${profile.linkedin}`,
    run: () => window.open(profile.linkedin, "_blank"),
  },
  help: {
    output: "available commands: email · call · github · linkedin",
    run: () => {},
  },
  clear: {
    output: null,
    run: () => {},
  },
};

const QUICK_LINKS = [
  { icon: Mail,     label: "Email",    sub: profile.email,    cmd: "email" },
  { icon: Phone,    label: "Call",     sub: profile.phone,    cmd: "call" },
  { icon: Github,   label: "GitHub",   sub: "shane-dias",     cmd: "github" },
  { icon: Linkedin, label: "LinkedIn", sub: "shane-dias-…",   cmd: "linkedin" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
});

export default function Contact() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([
    { cmd: null, output: 'type a command or press enter for help', type: "info" },
  ]);
  const logEndRef = useRef(null);

  // auto-scroll log to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  function runCmd(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) {
      const match = COMMANDS.help;
      setLog((l) => [...l, { cmd: "help", output: match.output, type: "info" }]);
      match.run();
      return;
    }
    if (cmd === "clear") {
      setLog([{ cmd: null, output: "terminal cleared", type: "info" }]);
      return;
    }
    const match = COMMANDS[cmd];
    if (match) {
      setLog((l) => [...l, { cmd, output: match.output, type: "ok" }]);
      match.run();
    } else {
      setLog((l) => [
        ...l,
        { cmd, output: `command not found: "${cmd}". try help`, type: "err" },
      ]);
    }
  }

  function submit(e) {
    e.preventDefault();
    runCmd(input);
    setInput("");
  }

  const outputColor = (type) => {
    if (type === "ok")  return "text-cyan";
    if (type === "err") return "text-red";
    return "text-fg-dim/70";
  };

  return (
    <section id="contact" className="relative py-28 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel num="05" title="Contact" />

        <div className="mt-12 grid md:grid-cols-5 gap-12 items-start">

          {/* ── left: CTA ── */}
          <motion.div {...fadeUp(0.05)} className="md:col-span-3 space-y-6">
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-fg text-balance leading-tight">
              Open to software engineering roles and internships.
            </h3>
            <p className="text-fg-dim max-w-md leading-relaxed text-sm">
              If you have something that needs building — a backend that has to
              hold up, a pipeline that runs itself, or a product that just needs
              shipping — I'd like to hear about it.
            </p>

            <MagneticButton
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 bg-cyan text-void px-6 py-3 rounded-full font-mono text-xs font-medium tracking-wide hover:bg-cyan/85 transition-colors"
            >
              <Mail size={14} /> {profile.email}
            </MagneticButton>

            {/* quick-link cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {QUICK_LINKS.map(({ icon: Icon, label, sub, cmd }) => (
                <motion.button
                  key={cmd}
                  onClick={() => runCmd(cmd)}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  data-cursor-hover
                  className="group text-left flex items-center gap-3 rounded-xl border border-edge-soft bg-panel/40 px-4 py-3 hover:border-cyan/40 hover:bg-panel/70 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-edge bg-panel-2 group-hover:border-cyan/30 group-hover:text-cyan text-fg-dim transition-colors shrink-0">
                    <Icon size={14} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] text-fg group-hover:text-cyan transition-colors">{label}</p>
                    <p className="font-mono text-[10px] text-fg-dim/50 truncate">{sub}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── right: terminal ── */}
          <motion.div {...fadeUp(0.15)} className="md:col-span-2">
            <div className="rounded-2xl border border-edge bg-panel overflow-hidden">
              {/* terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-edge-soft bg-panel-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red/60" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber/40" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyan/30" aria-hidden="true" />
                <span className="ml-2 font-mono text-[10px] text-fg-dim/50">
                  contact.sh
                </span>
              </div>

              {/* log */}
              <div className="p-4 font-mono text-xs space-y-2 max-h-52 overflow-y-auto">
                {log.map((l, i) => (
                  <div key={i}>
                    {l.cmd && (
                      <p className="text-fg-dim/60">
                        <span className="text-cyan">~/portfolio</span>{" "}
                        <span className="text-fg-dim/40">$</span> {l.cmd}
                      </p>
                    )}
                    {l.output && (
                      <p className={outputColor(l.type)}>{l.output}</p>
                    )}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>

              {/* input */}
              <form
                onSubmit={submit}
                className="flex items-center gap-2 px-4 py-3 border-t border-edge-soft"
              >
                <span className="font-mono text-xs text-cyan shrink-0">~/portfolio $</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="email · call · github · linkedin"
                  aria-label="Terminal command input"
                  className="bg-transparent outline-none flex-1 font-mono text-xs text-fg placeholder:text-fg-dim/30 caret-cyan"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
            <p className="mt-2 font-mono text-[10px] text-fg-dim/40 text-right">
              type <span className="text-fg-dim/60">clear</span> to reset
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
