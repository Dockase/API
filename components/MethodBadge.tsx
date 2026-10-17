export default function MethodBadge({ method }: { method: "GET" | "POST" }) {
  const styles =
    method === "GET"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
      : "border-accent/40 bg-accent-soft text-accent-hover";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide ${styles}`}
    >
      {method}
    </span>
  );
}
