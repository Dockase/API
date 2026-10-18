import CopyButton from "./CopyButton";

export default function CodeBlock({
  code,
  lang = "bash",
  title,
}: {
  code: string;
  lang?: string;
  title?: string;
}) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-code-border bg-code-bg">
      <div className="flex items-center justify-between border-b border-code-border px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-code-muted">
          {title ?? lang}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-code-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
