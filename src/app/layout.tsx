import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vibe Coding Creator | Prompt Loop BIO',
  description:
    'Vibe Coding 사고방식과 Prompt 기반 피드백 루프를 시연하는 Codex BIO.',
  openGraph: {
    title: 'Vibe Coding Creator | Prompt Loop BIO',
    description:
      'Prompt → Output → Review → Improve 구조로 사고하는 시스템을 보여주는 BIO.',
    url: 'https://codex-web-3.vercel.app',
    type: 'website'
  },
  metadataBase: new URL('https://codex-web-3.vercel.app')
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
