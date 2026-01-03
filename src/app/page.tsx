'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ContactModal, type ContactPayload } from '@/components/ContactModal';
import profile from '@/content/profile.json';

type Section = {
  id: string;
  title: string;
  summary: string;
  points: string[];
};

async function logEvent(metricType: string, meta?: Record<string, unknown>) {
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metricType, value: 1, meta })
    });
  } catch (error) {
    console.error('Failed to track event', error);
  }
}

async function submitInquiry(payload: ContactPayload, setStatus: (s: ContactStatus) => void, setFeedback: (m: string) => void) {
  try {
    setStatus('loading');
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error ?? '전송에 실패했어요. 나중에 다시 시도해주세요.');
    }

    setStatus('success');
    setFeedback('문의가 접수되었어요! 24시간 내에 답변을 드리고, 반복되는 질문은 Prompt에 반영합니다.');
    await logEvent('cta_click', { inquiryType: payload.inquiryType, source: payload.source ?? 'public', location: 'modal' });
  } catch (error) {
    console.error(error);
    setStatus('error');
    setFeedback(error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.');
  }
}

type ContactStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('who');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contactStatus, setContactStatus] = useState<ContactStatus>('idle');
  const [feedback, setFeedback] = useState<string>('');

  const sections = useMemo<Section[]>(() => profile.sections, []);

  const currentSection = sections.find((section) => section.id === activeSection) ?? sections[0];

  const defaultInquiryType = useMemo(() => {
    switch (activeSection) {
      case 'done':
        return '기업워크숍';
      case 'good':
        return '콘텐츠협업';
      case 'been':
        return '기타';
      default:
        return '강의';
    }
  }, [activeSection]);

  const openModal = (type?: string) => {
    setIsModalOpen(true);
    if (type) {
      setActiveSection(type);
    }
  };

  return (
    <main className="container flex min-h-screen flex-col gap-10 py-12">
      <header className="pixel-card relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400" />
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="pixel-chip bg-brand-200 text-slate-900">
                {profile.level.label}: {profile.level.title}
              </span>
              <span className="pixel-chip bg-white text-brand-700 sparkle">Prompt Loop Ready</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="label-8bit text-lg text-slate-900">{profile.hero.tagline}</p>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">{profile.hero.name}</h1>
            <p className="max-w-3xl text-lg text-slate-700 md:text-xl">{profile.hero.intro}</p>
            <div className="flex flex-wrap gap-2">
              {profile.hero.keywords.map((keyword) => (
                <span key={keyword} className="keyword-badge">
                  {keyword}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="pixel-button bg-brand-500 text-white"
                href={profile.cta.heroLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => logEvent('cta_click', { location: 'hero', label: '강의 보기' })}
              >
                {profile.cta.primary}
              </a>
              <button
                className="pixel-button bg-white text-slate-900"
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  logEvent('cta_click', { location: 'hero', label: '협업/강의 문의' });
                }}
              >
                {profile.cta.secondary}
              </button>
              <Link className="pixel-button bg-slate-900 text-white" href="/lab" onClick={() => logEvent('link_click', { href: '/lab' })}>
                Lab 보기
              </Link>
            </div>
          </div>
          <div className="w-full max-w-md space-y-4 rounded-2xl border-4 border-slate-900 bg-white/80 p-5 text-sm shadow-[8px_8px_0_#0f172a]">
            <div className="flex items-center justify-between">
              <p className="label-8bit text-brand-700">XP Bar</p>
              <p className="text-xs font-semibold text-slate-600">Prompt Loop Progress</p>
            </div>
            <div className="h-4 rounded-full border-2 border-slate-900 bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-brand-500 to-fuchsia-500"
                style={{ width: `${profile.level.xp}%` }}
              />
            </div>
            <ul className="mt-3 space-y-2 text-slate-800">
              <li className="flex items-center justify-between">
                <span className="label-8bit text-xs text-slate-700">Goal</span>
                <span className="font-semibold">15초 안에 “나/강의/협업” 전달</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="label-8bit text-xs text-slate-700">Loop</span>
                <span className="font-semibold">Prompt → Output → Review → Improve</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="label-8bit text-xs text-slate-700">Stack</span>
                <span className="font-semibold">Next.js · Vercel · Supabase</span>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="pixel-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="section-title">Quick Links</h2>
          <p className="section-description">강의·콘텐츠 채널로 바로 이동해 주세요.</p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {profile.quickLinks.map((link) => (
            <a
              key={link.href}
              className="quick-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: `${link.accent}15`, borderColor: '#0f172a' }}
              onClick={() => logEvent('link_click', { href: link.href, label: link.label })}
            >
              <span className="font-bold">{link.label}</span>
              <span className="label-8bit text-xs">GO →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="pixel-card space-y-6">
        <div className="flex flex-col gap-3">
          <h2 className="section-title">Who / Good / Done / Have Been</h2>
          <p className="section-description">스스로 클릭하면서 핵심을 15초 안에 파악하세요.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {sections.map((section) => (
            <button
              key={section.id}
              className="tab-button"
              data-active={activeSection === section.id}
              onClick={() => {
                setActiveSection(section.id);
                logEvent('section_view', { section: section.id, mode: 'tab' });
              }}
            >
              <p className="label-8bit text-xs text-slate-700">{section.title}</p>
              <p className="mt-1 text-sm text-slate-900">{section.summary}</p>
            </button>
          ))}
        </div>
        <div className="accordion-item">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-8bit text-sm text-brand-700">{currentSection.title}</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{currentSection.summary}</p>
            </div>
            <button
              className="pixel-button bg-brand-100 text-slate-900"
              onClick={() => openModal(currentSection.id)}
              type="button"
            >
              {profile.cta.secondary}
            </button>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-800">
            {currentSection.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-sm bg-slate-900" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {sections.map((section) => (
            <div key={`${section.id}-accordion`} className="accordion-item md:hidden">
              <div className="flex items-center justify-between">
                <p className="label-8bit text-sm text-brand-700">{section.title}</p>
                <button
                  className="pixel-button bg-white text-slate-900"
                  onClick={() => {
                    setActiveSection(section.id);
                    setIsModalOpen(true);
                  }}
                >
                  문의하기
                </button>
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-900">{section.summary}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-800">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-sm bg-slate-900" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="pixel-card space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="section-title">Courses</h2>
            <p className="section-description">라이브/예정 강의를 확인하고 바로 신청하세요.</p>
          </div>
          <button
            className="pixel-button bg-brand-500 text-white"
            type="button"
            onClick={() => {
              logEvent('course_click', { source: 'header' });
              setIsModalOpen(true);
            }}
          >
            강의 문의하기
          </button>
        </div>
        <div className="card-grid">
          {profile.courses.map((course) => (
            <div key={course.title} className="course-card">
              <div className="flex items-center justify-between">
                <p className="label-8bit text-brand-700">{course.status}</p>
                <button
                  className="pixel-chip bg-white text-brand-700"
                  onClick={() => {
                    logEvent('course_click', { title: course.title });
                    setIsModalOpen(true);
                  }}
                >
                  문의하기
                </button>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">{course.title}</h3>
              <p className="text-sm text-slate-700">{course.detail}</p>
              <a
                href={course.link}
                className="text-sm font-semibold text-brand-700 underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
                onClick={() => logEvent('course_click', { href: course.link })}
              >
                상세 보기 →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="pixel-card space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="label-8bit text-brand-700">Prompt Loop</p>
            <h2 className="section-title">퍼블릭 BIO는 Output만 노출됩니다</h2>
            <p className="section-description">
              ROC, Prompt, 개선 히스토리는 /lab에서 확인하세요. 행동 데이터(클릭·문의)는 Supabase reviews 테이블로 저장됩니다.
            </p>
          </div>
          <Link className="pixel-button bg-slate-900 text-white" href="/lab">
            /lab로 이동
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="callout">
            <p className="label-8bit text-xs text-brand-700">Prompt</p>
            <p className="mt-2 text-sm text-slate-900">섹션별 ROC를 가진 Prompt로 관리</p>
          </div>
          <div className="callout">
            <p className="label-8bit text-xs text-brand-700">Output</p>
            <p className="mt-2 text-sm text-slate-900">게시된 카피는 outputs.is_published=true</p>
          </div>
          <div className="callout">
            <p className="label-8bit text-xs text-brand-700">Review</p>
            <p className="mt-2 text-sm text-slate-900">CTA/링크 클릭, 문의 유형까지 Supabase 적재</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="label-8bit text-slate-700">Made for Vercel · Supabase</p>
          <p>codex-web-3.vercel.app · 문의: hello@vibecoding.ai</p>
        </div>
      </footer>

      <ContactModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setContactStatus('idle');
          setFeedback('');
        }}
        defaultType={defaultInquiryType}
        status={contactStatus}
        feedback={feedback}
        onSubmit={(payload) => submitInquiry(payload, setContactStatus, setFeedback)}
      />
    </main>
  );
}
