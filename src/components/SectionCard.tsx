import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
}

export function SectionCard({ title, description, badge, children }: SectionCardProps) {
  return (
    <section className="section-card">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="badge">{badge ?? 'Prompt System'}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-description">{description}</p>
        </div>
      </div>
      <div className="mt-6 space-y-4 text-slate-700">{children}</div>
    </section>
  );
}
