# Shane Dias — Portfolio

An interactive, systems-flavored portfolio: a cursor-reactive particle
network runs behind everything, the name decodes in like a hash resolving,
skills live on a draggable node graph, and project cards morph into full
detail views instead of jumping to a new page.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
```

Deploy `dist/` anywhere static (Vercel, Netlify, GitHub Pages, Render).

## Before you publish — placeholders to fill in

All of these live in **`src/data/content.js`**:

- `profile.github` / `profile.linkedin` — currently `.../PLACEHOLDER`. Swap in
  your real URLs.
- `profile.resumeUrl` — points to `/Shane_Dias_Resume.pdf`. Drop your resume
  PDF into the `public/` folder with that filename (or change the path).
- Each project's `repo` field — GitHub repo links are placeholders
  (`github.com/PLACEHOLDER/...`). Point them at your real repos.
- Each project's `demo` field — empty by default. Add a live URL and a link
  icon appears automatically, both on the card and in the expanded view.
- `dataProject.repo` — same as above, for RetailPulse.

Search the file for `PLACEHOLDER` to find every spot at once.

## What's in it

- **Hero** — name decodes in from scrambled characters (a nod to the SHA-256
  hashing in Cloud-Sentry), live local-time readout, magnetic CTA buttons.
- **Background** — a canvas particle network that reacts to your cursor,
  running behind the whole page (`NetworkField.jsx`). Off entirely if the OS
  has reduced motion enabled.
- **Custom cursor** — a reticle that expands over links/buttons, desktop only.
- **Skills** — a draggable node graph (drag a category, it snaps back) with
  a detail panel below; a simple pill/tab layout on mobile.
- **Projects** — compact cards that morph (shared-layout transition) into a
  full detail overlay on click.
- **Data & Analytics** — RetailPulse, in a single compact panel.
- **Recognition** — hackathon results.
- **Contact** — a magnetic email CTA plus a tiny functional command box
  (type `email`, `call`, `github`, or `linkedin` and hit enter).

## Performance / accessibility notes

- The particle field and scramble-text both check
  `prefers-reduced-motion` and fall back to a static state.
- The custom cursor only activates on fine-pointer devices (skipped on
  touch).
- Everything is keyboard-reachable; the project overlay closes on `Esc`.

## Where things live

- Content/copy: `src/data/content.js`
- Design tokens (colors, fonts): `src/index.css`
- Everything else: `src/components/`
