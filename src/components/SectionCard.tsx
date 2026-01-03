import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
}

export function SectionCard({ title, description, badge, children }: SectionCardProps) {
  return (
    <section className="pixel-card">
      <div className="pixel-card-content space-y-4">
        <div className="section-heading">
          <span className="dot" aria-hidden />
          <div>
            <p className="badge-line pixel-font">{badge ?? 'Prompt Loop'}</p>
            <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">{title}</h2>
            <p className="mt-1 text-base text-slate-200/80 md:text-lg">{description}</p>
          </div>
        </div>
        <div className="pixel-divider" aria-hidden />
        <div className="space-y-3 text-slate-100">{children}</div>
      </div>
    </section>
  );
}
