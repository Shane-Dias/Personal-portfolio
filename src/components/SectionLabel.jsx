export default function SectionLabel({ num, title }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-sm text-cyan">// {num}</span>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-fg">{title}</h2>
    </div>
  );
}
