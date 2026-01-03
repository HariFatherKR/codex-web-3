import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vibe Coding Creator | 8bit Prompt BIO',
  description: '8bit Linktree BIO with Prompt Loop, Vercel ready and Supabase wired for feedback.',
  openGraph: {
    title: 'Vibe Coding Creator | 8bit Prompt BIO',
    description: 'Prompt → Output → Review → Improve 구조로 사고하는 시스템을 보여주는 BIO.',
    url: 'https://codex-web-3.vercel.app',
    type: 'website'
  },
  metadataBase: new URL('https://codex-web-3.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-body">{children}</body>
    </html>
  );
}
