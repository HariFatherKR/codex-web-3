interface FeatureListProps {
  title: string;
  items: string[];
}

export function FeatureList({ title, items }: FeatureListProps) {
  return (
    <div className="rounded-xl border-2 border-[#1d2341] bg-[#0c0f22] p-4 text-slate-100 shadow-[0_8px_0_#070a17]">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="list-dot" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
