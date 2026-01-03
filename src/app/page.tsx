'use client';

import Image from 'next/image';
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

type ContactStatus = 'idle' | 'loading' | 'success' | 'error';

type SocialId = 'youtube' | 'instagram' | 'threads' | 'linkedin' | 'github';

type SocialLink = {
  id: SocialId;
  href: string;
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
    setFeedback('보냈어요! 곧 답장 드릴게요.');
    await logEvent('cta_click', { inquiryType: payload.inquiryType, source: payload.source ?? 'public', location: 'modal' });
  } catch (error) {
    console.error(error);
    setStatus('error');
    setFeedback(error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.');
  }
}

function SocialIcon({ id }: { id: SocialId }) {
  switch (id) {
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
          <path d="M21.8 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.9.3A2.7 2.7 0 0 0 2.2 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .2 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.9-.3a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .2-4.8 28 28 0 0 0-.2-4.8ZM10.5 15.4V8.6l5.2 3.4-5.2 3.4Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
          <path d="M12 8.5A3.5 3.5 0 1 0 12 15a3.5 3.5 0 0 0 0-6.5Zm6-1.9a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM12 4.3c1.7 0 1.9 0 2.6.1.6.1 1 .2 1.4.4.3.2.6.4.9.7.3.3.5.6.7.9.2.4.3.8.4 1.4.1.7.1.9.1 2.6s0 1.9-.1 2.6c-.1.6-.2 1-.4 1.4-.2.3-.4.6-.7.9-.3.3-.6.5-.9.7-.4.2-.8.3-1.4.4-.7.1-.9.1-2.6.1s-1.9 0-2.6-.1c-.6-.1-1-.2-1.4-.4a3.2 3.2 0 0 1-.9-.7 3.2 3.2 0 0 1-.7-.9c-.2-.4-.3-.8-.4-1.4C6.2 13.9 6.2 13.7 6.2 12s0-1.9.1-2.6c.1-.6.2-1 .4-1.4.2-.3.4-.6.7-.9.3-.3.6-.5.9-.7.4-.2.8-.3 1.4-.4.7-.1.9-.1 2.6-.1Zm0-2.3c-1.8 0-2 0-2.7.1-.7 0-1.2.2-1.7.4-.5.2-.9.5-1.3.9-.4.4-.7.8-.9 1.3-.2.5-.4 1-.4 1.7C4.9 7.1 4.8 7.3 4.8 12s0 4.9.1 6.6c0 .7.2 1.2.4 1.7.2.5.5.9.9 1.3.4.4.8.7 1.3.9.5.2 1 .4 1.7.4.7.1.9.1 2.7.1s2 0 2.7-.1c.7 0 1.2-.2 1.7-.4.5-.2.9-.5 1.3-.9.4-.4.7-.8.9-1.3.2-.5.4-1 .4-1.7.1-1.7.1-1.9.1-6.6s0-4.9-.1-6.6c0-.7-.2-1.2-.4-1.7-.2-.5-.5-.9-.9-1.3a3.6 3.6 0 0 0-1.3-.9c-.5-.2-1-.4-1.7-.4C14 2 13.8 2 12 2Z" />
        </svg>
      );
    case 'threads':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
          <path d="M12.02 2c-5.5 0-9.9 4.4-9.9 9.9s4.4 9.9 9.9 9.9c4.8 0 9-3.5 9.8-8.1h-2.5c-.6 3.2-3.4 5.6-6.8 5.6-3.9 0-7-3.1-7-7s3.1-7 7-7c3.2 0 5.9 2.2 6.7 5.1h-3.7c-.8-1-1.9-1.6-3.1-1.6-2.3 0-4.2 1.9-4.2 4.2s1.9 4.2 4.2 4.2c1.4 0 2.7-.7 3.4-1.9l.1-.1-.7-2.5H12v2h2.1c-.3.6-.9 1-1.6 1-.9 0-1.7-.8-1.7-1.7S11.6 10 12.5 10c.7 0 1.3.5 1.6 1.1h4.6c0-.3-.1-.6-.1-.9C18.6 5.5 15.7 2 12.02 2Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
          <path d="M5.3 8.5H2V22h3.3V8.5ZM3.6 2A2 2 0 1 0 3.6 6a2 2 0 0 0 0-4ZM9 22h3.3v-6.8c0-1.6.8-2.6 2.2-2.6 1.3 0 1.9.9 1.9 2.6V22H19V13c0-2.8-1.5-4.2-3.7-4.2-1.7 0-2.6.9-3 1.7V8.5H9c.1.9 0 13.5 0 13.5Z" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
          <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1 .1.7 1.6 2.9 1.1.1-.8.4-1.4.8-1.8-2.7-.3-5.6-1.3-5.6-5.9 0-1.3.5-2.5 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.6 11.6 0 0 1 6.2 0c2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.2 3 .1 3.3.8.8 1.3 1.9 1.3 3.3 0 4.6-2.9 5.6-5.6 5.9.4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contactStatus, setContactStatus] = useState<ContactStatus>('idle');
  const [feedback, setFeedback] = useState<string>('');

  const sections = useMemo<Section[]>(() => profile.sections, []);
  const projects = useMemo<Project[]>(() => (profile as { doneProjects?: Project[] }).doneProjects ?? [], []);
  const courses = useMemo(() => profile.courses ?? [], []);
  const socials = useMemo<SocialLink[]>(() => (profile.socials as SocialLink[]) ?? [], []);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]));
    logEvent('section_view', { section: id, mode: 'accordion' });
  };

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);
  const visibleCourses = courses.slice(0, 2);

  const defaultInquiryType = useMemo(() => '강의', []);

  return (
    <main className="bio-shell">
      <header className="hero-card pixel-panel">
        <div className="flex items-center gap-3">
          <div className="hero-avatar">
            <Image
              src="/harifather_profile.png"
              alt={`${profile.hero.name} 프로필 이미지`}
              width={72}
              height={72}
              priority
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white">{profile.hero.name}</h1>
            <p className="text-sm text-slate-200">{profile.hero.tagline}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <a
              className="pixel-button neon-primary"
              href={profile.cta.heroLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => logEvent('cta_click', { location: 'hero', label: '강의 보기' })}
            >
              강의 보기
            </a>
            <button
              className="pixel-button neon-secondary"
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                logEvent('cta_click', { location: 'hero', label: '문의하기' });
              }}
            >
              문의하기
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            {socials.map((social) => (
              <a
                key={social.id}
                className="social-icon"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.id}
                onClick={() => logEvent('link_click', { href: social.href, label: social.id })}
              >
                <SocialIcon id={social.id} />
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="section-card">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Profile</h2>
          <span className="tiny-chip">8bit</span>
        </div>
        <div className="flex flex-col gap-3">
          {sections.map((section) => {
            const isOpen = expandedSections.includes(section.id);
            return (
              <div key={section.id} className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => toggleSection(section.id)}
                  type="button"
                  aria-expanded={isOpen}
                >
                  <span className="label-8bit text-xs text-neon-blue">{section.title}</span>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{section.summary}</p>
                    <span className="arrow">{isOpen ? '▲' : '▶'}</span>
                  </div>
                </button>
                {isOpen ? (
                  <div className="accordion-content">
                    <ul className="space-y-2 text-sm text-slate-200">
                      {section.points.slice(0, 3).map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-sm bg-neon-green" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {section.id === 'done' && projects.length > 0 ? (
                      <div className="space-y-2">
                        {visibleProjects.map((project) => (
                          <a
                            key={project.title}
                            className="project-card"
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => logEvent('link_click', { href: project.link, label: project.title, section: 'done' })}
                          >
                            <p className="font-semibold text-white">{project.title}</p>
                            <p className="text-xs text-slate-300">{project.detail}</p>
                          </a>
                        ))}
                        {projects.length > 3 ? (
                          <button
                            className="pixel-button neon-outline"
                            type="button"
                            onClick={() => setShowAllProjects((prev) => !prev)}
                          >
                            {showAllProjects ? '접기' : '더보기'}
                          </button>
                        ) : null}
                      </div>
                    ) : null}

                    <button
                      className="pixel-button neon-secondary w-full"
                      onClick={() => {
                        setIsModalOpen(true);
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

      <section className="section-card">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="section-title">Courses</h2>
            <p className="text-xs text-slate-300">최대 2개만 노출</p>
          </div>
          <button
            className="pixel-button neon-outline"
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
              <span className="label-8bit text-[10px] uppercase text-neon-blue">{course.status}</span>
              <h3 className="text-lg font-extrabold text-white">{course.title}</h3>
              <p className="text-sm text-slate-200">{course.detail}</p>
              <a
                href={course.link}
                className="text-xs font-semibold text-neon-green underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
                onClick={() => logEvent('course_click', { href: course.link })}
              >
                자세히 보기
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="floating-cta">
        <button
          className="pixel-button neon-primary w-full"
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            logEvent('cta_click', { location: 'floating', label: '문의' });
          }}
        >
          문의하기
        </button>
      </div>

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

      <div className="sr-only">
        <Link href="/lab">Lab</Link>
      </div>
    </main>
  );
}
