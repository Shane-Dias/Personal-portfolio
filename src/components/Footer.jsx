import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/content";

const NAV_LINKS = [
  { href: "#about",       label: "About" },
  { href: "#skills",      label: "Skills" },
  { href: "#projects",    label: "Projects" },
  { href: "#recognition", label: "Recognition" },
  { href: "#contact",     label: "Contact" },
];

const SOCIAL = [
  { href: profile.github,   icon: Github,   label: "GitHub" },
  { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-edge-soft mt-4">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid sm:grid-cols-3 gap-8 items-start">

        {/* brand / identity */}
        <div>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 font-mono text-sm text-fg hover:text-cyan transition-colors"
            data-cursor-hover
          >
            <span className="inline-block w-[7px] h-[13px] bg-cyan pulse-dot" aria-hidden="true" />
            Shane Dias
          </a>
          <p className="mt-2 font-mono text-[10px] text-fg-dim/50 leading-relaxed max-w-[18ch]">
            {profile.role} · {profile.location}
          </p>
          {/* built-with badge */}
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-edge-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-fg-dim/50">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan pulse-dot" aria-hidden="true" />
            react · framer motion · tailwind
          </div>
        </div>

        {/* nav links */}
        <nav aria-label="Footer navigation">
          <p className="font-mono text-[9px] uppercase tracking-widest text-fg-dim/40 mb-3">
            Sections
          </p>
          <ul className="space-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  data-cursor-hover
                  className="font-mono text-xs text-fg-dim hover:text-cyan transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* social + copyright */}
        <div className="sm:text-right">
          <p className="font-mono text-[9px] uppercase tracking-widest text-fg-dim/40 mb-3">
            Connect
          </p>
          <div className="flex sm:justify-end gap-3">
            {SOCIAL.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                data-cursor-hover
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-edge text-fg-dim hover:text-cyan hover:border-cyan/40 transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] text-fg-dim/40">
            © {new Date().getFullYear()} Shane Dias
          </p>
        </div>
      </div>
    </footer>
  );
}
