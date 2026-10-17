export default function ScopeBadge({
  scope,
}: {
  scope: "Nigeria" | "Global" | "Coming soon";
}) {
  const styles =
    scope === "Global"
      ? "border-accent/40 bg-accent-soft text-accent-hover"
      : scope === "Nigeria"
        ? "border-gold/40 bg-gold-soft text-gold"
        : "border-border-strong bg-fill-subtle text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${styles}`}
    >
      {scope}
    </span>
  );
}
