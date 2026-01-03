import type { Metadata } from 'next';
import { Inter, Pixelify_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const pixel = Pixelify_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-pixel' });

export const metadata: Metadata = {
  title: 'Vibe Coding Creator | 8bit BIO',
  description: '8bit 무드의 Linktree BIO + Prompt Loop 실험실(Lab)으로 이어지는 Vercel Ready 사이트.',
  openGraph: {
    title: 'Vibe Coding Creator | 8bit BIO',
    description: 'Linktree처럼 가볍게, Prompt Loop는 /lab에서. Vercel + Supabase 기반.',
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
      <body className={`${inter.variable} ${pixel.variable}`}>{children}</body>
    </html>
  );
}
