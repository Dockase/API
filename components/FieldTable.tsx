export type Field = {
  name: string;
  type: string;
  required?: boolean;
  description: React.ReactNode;
};

export default function FieldTable({ fields }: { fields: Field[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-fill-subtle">
            <th className="px-4 py-2.5 font-medium text-heading">Field</th>
            <th className="px-4 py-2.5 font-medium text-heading">Type</th>
            <th className="px-4 py-2.5 font-medium text-heading">Description</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((f) => (
            <tr key={f.name} className="border-b border-border last:border-0">
              <td className="px-4 py-2.5 align-top">
                <code className="font-mono text-[13px] text-accent-hover">
                  {f.name}
                </code>
                {f.required && (
                  <span className="ml-2 rounded bg-gold-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
                    required
                  </span>
                )}
              </td>
              <td className="px-4 py-2.5 align-top font-mono text-xs text-muted">
                {f.type}
              </td>
              <td className="px-4 py-2.5 align-top text-muted">
                {f.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
