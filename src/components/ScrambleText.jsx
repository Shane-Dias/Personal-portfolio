import { useEffect, useRef, useState } from "react";

const CHARS = "01ABCDEF!@#$%^&*<>/\\";

export default function ScrambleText({ text, delay = 0, className = "", as: Tag = "span" }) {
  const [display, setDisplay] = useState(text);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    let raf;
    let timeout;
    const totalFrames = text.length * 3 + 10;

    function step() {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          out += " ";
        } else if (i < revealCount) {
          out += text[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);
      if (frame < totalFrames) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(text);
        doneRef.current = true;
      }
    }

    timeout = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return <Tag className={className}>{display}</Tag>;
}
