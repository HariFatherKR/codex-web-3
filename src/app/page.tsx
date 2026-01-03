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

type Project = {
  title: string;
  detail: string;
  link: string;
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

async function submitInquiry(
  payload: ContactPayload,
  setStatus: (s: ContactStatus) => void,
  setFeedback: (m: string) => void
) {
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
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contactStatus, setContactStatus] = useState<ContactStatus>('idle');
  const [feedback, setFeedback] = useState<string>('');

  const sections = useMemo<Section[]>(() => profile.sections, []);
  const heroKeywords = useMemo(() => profile.hero.keywords.slice(0, 5), []);
  const projects = useMemo<Project[]>(() => (profile as { doneProjects?: Project[] }).doneProjects ?? [], []);
  const courses = useMemo(() => profile.courses ?? [], []);

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

  const toggleSection = (id: string) => {
    setActiveSection(id);
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]));
    logEvent('section_view', { section: id, mode: 'accordion' });
  };

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);
  const visibleCourses = showAllCourses ? courses : courses.slice(0, 2);

  return (
    <main className="mx-auto flex min-h-screen max-w-[420px] flex-col gap-4 px-4 py-10">
      <header className="pixel-card space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="pixel-chip bg-brand-200 text-slate-900">
            {profile.level.label}: {profile.level.title}
          </span>
          <span className="label-8bit text-xs text-brand-700">Linktree 모드</span>
        </div>
        <div className="space-y-3">
          <p className="label-8bit text-sm text-slate-900">{profile.hero.tagline}</p>
          <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{profile.hero.name}</h1>
          <p className="text-base text-slate-800">{profile.hero.intro}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {heroKeywords.map((keyword) => (
            <span key={keyword} className="keyword-badge">
              {keyword}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
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
          </div>
          <p className="text-xs text-slate-600">
            Lab: <Link href="/lab" className="font-semibold text-brand-700" onClick={() => logEvent('link_click', { href: '/lab' })}>내가 어떻게 프롬프트를 개선하는지 보기 →</Link>
          </p>
        </div>
      </header>

      <section className="pixel-card space-y-3">
        <div className="flex flex-col gap-1">
          <h2 className="section-title text-2xl">Quick Links</h2>
          <p className="section-description text-sm">필요한 채널로 바로 이동하세요.</p>
        </div>
        <div className="flex flex-col gap-3">
          {profile.quickLinks.map((link) => (
            <a
              key={link.href}
              className="quick-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: `${link.accent}10`, borderColor: '#0f172a' }}
              onClick={() => logEvent('link_click', { href: link.href, label: link.label })}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="pixel-card space-y-3">
        <div className="flex flex-col gap-1">
          <h2 className="section-title text-2xl">Who / Good / Done / Have Been</h2>
          <p className="section-description text-sm">한 줄 요약을 눌러 자세히 확인하세요.</p>
        </div>
        <div className="flex flex-col gap-3">
          {sections.map((section) => {
            const isOpen = expandedSections.includes(section.id);
            return (
              <div key={section.id} className="accordion-item">
                <button
                  className="flex w-full items-center justify-between gap-3 text-left"
                  onClick={() => toggleSection(section.id)}
                  type="button"
                >
                  <div className="space-y-1">
                    <p className="label-8bit text-xs text-brand-700">{section.title}</p>
                    <p className="text-sm font-semibold text-slate-900">{section.summary}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-700">{isOpen ? '닫기' : '펼치기'}</span>
                </button>
                {isOpen ? (
                  <div className="mt-3 space-y-3">
                    <ul className="space-y-2 text-sm text-slate-800">
                      {section.points.slice(0, 3).map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-sm bg-slate-900" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {section.id === 'done' && projects.length > 0 ? (
                      <div className="space-y-2">
                        {visibleProjects.map((project) => (
                          <a
                            key={project.title}
                            className="flex flex-col rounded-lg border-2 border-slate-900 bg-white/80 px-3 py-2 shadow-[3px_3px_0_#0f172a]"
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => logEvent('link_click', { href: project.link, label: project.title, section: 'done' })}
                          >
                            <p className="font-semibold text-slate-900">{project.title}</p>
                            <p className="text-xs text-slate-700">{project.detail}</p>
                          </a>
                        ))}
                        {projects.length > 3 ? (
                          <button
                            className="pixel-button bg-white text-slate-900"
                            type="button"
                            onClick={() => setShowAllProjects((prev) => !prev)}
                          >
                            {showAllProjects ? '접기' : '더보기'}
                          </button>
                        ) : null}
                      </div>
                    ) : null}

                    <button
                      className="pixel-button bg-brand-100 text-slate-900"
                      onClick={() => {
                        setIsModalOpen(true);
                        setActiveSection(section.id);
                        logEvent('cta_click', { location: 'accordion', label: '문의', section: section.id });
                      }}
                      type="button"
                    >
                      문의하기
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="pixel-card space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="section-title text-2xl">Courses</h2>
            <p className="section-description text-sm">라이브/예정 강의를 바로 확인하세요.</p>
          </div>
          <button
            className="pixel-button bg-brand-500 text-white"
            type="button"
            onClick={() => {
              logEvent('course_click', { source: 'header' });
              setIsModalOpen(true);
            }}
          >
            문의하기
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {visibleCourses.map((course) => (
            <div key={course.title} className="course-card">
              <p className="label-8bit text-brand-700">{course.status}</p>
              <h3 className="text-lg font-extrabold text-slate-900">{course.title}</h3>
              <p className="text-sm text-slate-700">{course.detail}</p>
              <a
                href={course.link}
                className="text-sm font-semibold text-brand-700 underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
                onClick={() => logEvent('course_click', { href: course.link })}
              >
                상세 보기
              </a>
            </div>
          ))}
        </div>
        {courses.length > 2 ? (
          <button
            className="pixel-button bg-white text-slate-900"
            type="button"
            onClick={() => setShowAllCourses((prev) => !prev)}
          >
            {showAllCourses ? '접기' : '더보기'}
          </button>
        ) : null}
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

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 md:hidden">
        <div className="mx-auto flex max-w-[420px] justify-end px-4">
          <button
            className="pointer-events-auto pixel-button bg-brand-500 px-4 py-2 text-sm text-white"
            type="button"
            onClick={() => {
              setIsModalOpen(true);
              logEvent('cta_click', { location: 'floating', label: '문의' });
            }}
          >
            문의
          </button>
        </div>
      </div>
    </main>
  );
}
