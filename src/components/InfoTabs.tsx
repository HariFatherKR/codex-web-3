'use client';

import { useState } from 'react';

export interface InfoTab {
  key: string;
  title: string;
  summary: string;
  points: string[];
}

interface InfoTabsProps {
  items: InfoTab[];
}

export function InfoTabs({ items }: InfoTabsProps) {
  const [active, setActive] = useState(items[0]?.key ?? '');
  const current = items.find((item) => item.key === active) ?? items[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`pixel-button ${active === item.key ? 'primary' : 'ghost'} w-full justify-center text-sm`}
            onClick={() => setActive(item.key)}
          >
            {item.title}
          </button>
        ))}
      </div>
      {current ? (
        <div className="rounded-xl border-2 border-[#1d2341] bg-[#0c0f22] p-4 shadow-[0_8px_0_#070a17]">
          <p className="text-sm uppercase tracking-widest text-[#8ef0ff]">{current.title}</p>
          <p className="mt-2 text-lg font-semibold text-white">{current.summary}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {current.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="list-dot" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
