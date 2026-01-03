import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vibe Coding Creator | Dark 8bit BIO',
  description:
    '모바일 중심 Dark 8bit Linktree BIO. 강의, 문의, SNS 이동만 빠르게 노출되는 단순한 프로필 페이지.',
  openGraph: {
    title: 'Vibe Coding Creator | Dark 8bit BIO',
    description:
      '강의 보기, 문의, SNS 이동을 10초 내에 보여주는 다크 8bit 아케이드 감성의 링크트리 BIO.',
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
