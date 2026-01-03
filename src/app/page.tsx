import { ContactModal } from '@/components/ContactModal';
import { FeatureList } from '@/components/FeatureList';
import { InfoTabs } from '@/components/InfoTabs';
import profile from '@/content/profile.json';

const { hero, links, tabs, courses } = profile;

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="pixel-card">
        <div className="pixel-card-content space-y-4">
          <div className="level-bar">
            <span className="pixel-font text-xs uppercase">Level {hero.level}: Vibe Coding Creator</span>
            <div className="level-meter" aria-hidden>
              <span style={{ width: `${hero.xp}%` }} />
            </div>
            <span className="text-xs text-slate-200">XP {hero.xp}%</span>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-3">
              <p className="badge-line pixel-font">8bit Linktree BIO</p>
              <h1 className="text-3xl font-black leading-tight text-white md:text-4xl">{hero.name}</h1>
              <p className="text-lg text-slate-200 md:text-xl">{hero.title}</p>
              <div className="flex flex-wrap gap-2" aria-label="keywords">
                {hero.keywords.map((keyword) => (
                  <span key={keyword} className="keyword-chip">
                    ✦ {keyword}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="pixel-button primary" href="#courses">
                  강의 보기
                </a>
                <ContactModal triggerLabel="협업/강의 문의" variant="secondary" />
                <a className="pixel-button ghost" href="/lab">
                  Prompt Lab →
                </a>
              </div>
            </div>

            <div className="rounded-xl border-2 border-[#1d2341] bg-[#0c0f22] p-4 shadow-[0_10px_0_#070a17]">
              <p className="text-sm uppercase tracking-widest text-[#8ef0ff]">5-15초 룰</p>
              <h2 className="mt-2 text-xl font-extrabold text-white">누구 / 무엇 / 왜 신뢰 / 어떻게 연락</h2>
              <p className="mt-2 text-sm text-slate-200">
                방문자는 15초 안에 “이 사람과 연결할지” 판단합니다. Linktree처럼 가볍게, CTA는 크게,
                Prompt Loop는 숨겨진 시스템으로 운영합니다.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="status-pill">AI + Product</span>
                <span className="status-pill lab">Feedback Loop</span>
                <span className="status-pill soon">Mobile First</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pixel-card">
        <div className="pixel-card-content space-y-3">
          <div className="section-heading">
            <span className="dot" aria-hidden />
            <h2 className="pixel-font">Quick Links</h2>
          </div>
          <p className="text-sm text-slate-200">콘텐츠 채널과 대화 창구를 한 번에.</p>
          <div className="grid-links">
            {links.map((link) => (
              <a key={link.label} className="link-tile" href={link.href} target="_blank" rel="noreferrer">
                <div>
                  <p className="text-base font-semibold">{link.label}</p>
                  <p className="text-xs text-slate-300">{link.hint}</p>
                </div>
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="pixel-card" id="about">
        <div className="pixel-card-content space-y-4">
          <div className="section-heading">
            <span className="dot" aria-hidden />
            <div>
              <p className="badge-line pixel-font">Who / Good / Done / Have Been</p>
              <h2 className="mt-2 text-xl font-black text-white md:text-2xl">바이브코딩이 뭘 잘하는지 4줄 요약</h2>
            </div>
          </div>
          <InfoTabs items={tabs} />
        </div>
      </section>

      <section className="pixel-card" id="courses">
        <div className="pixel-card-content space-y-4">
          <div className="section-heading">
            <span className="dot" aria-hidden />
            <div>
              <p className="badge-line pixel-font">Courses</p>
              <h2 className="mt-2 text-xl font-black text-white md:text-2xl">LIVE & Coming Soon</h2>
              <p className="text-sm text-slate-200">강의 보기 → 문의로 자연스럽게 전환</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.title}
                className="rounded-xl border-2 border-[#1d2341] bg-[#0c0f22] p-4 shadow-[0_8px_0_#070a17]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-[#8ef0ff]">{course.status === 'live' ? 'LIVE' : 'Coming Soon'}</p>
                    <h3 className="mt-1 text-lg font-bold text-white">{course.title}</h3>
                  </div>
                  <span className={`status-pill ${course.status === 'soon' ? 'soon' : ''}`}>
                    {course.status === 'live' ? '지금 열림' : '대기 신청'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-200">{course.description}</p>
                <div className="mt-3 flex gap-2">
                  <a className="pixel-button primary" href="https://www.youtube.com" target="_blank" rel="noreferrer">
                    {course.cta}
                  </a>
                  <ContactModal triggerLabel="문의" variant="ghost" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pixel-card">
        <div className="pixel-card-content space-y-4">
          <div className="section-heading">
            <span className="dot" aria-hidden />
            <div>
              <p className="badge-line pixel-font">CTA & Contact</p>
              <h2 className="mt-2 text-xl font-black text-white md:text-2xl">문의도 데이터다</h2>
              <p className="text-sm text-slate-200">모든 문의는 Supabase inquiries 테이블에 저장되어 Prompt 개선에 활용됩니다.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="rounded-xl border-2 border-[#1d2341] bg-[#0c0f22] p-4 shadow-[0_8px_0_#070a17]">
              <FeatureList
                title="전환 포인트"
                items={[
                  '링크/강의/CTA 클릭률과 문의 유형을 리뷰 데이터로 기록',
                  '반복되는 질문은 Who/Good/Done/Have Been Copy 개선에 반영',
                  '비개발자도 이해 가능한 ROC Prompt를 유지하며 실험'
                ]}
              />
            </div>
            <div className="space-y-3">
              <ContactModal triggerLabel="협업/강의 문의 보내기" variant="primary" size="lg" />
              <p className="text-sm text-slate-200">
                Supabase Function을 붙이면 이메일 알림까지 즉시 연동됩니다. 문의는 Prompt Lab에 전달되어 다음 배포에서 바로
                반영됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pixel-card">
        <div className="pixel-card-content space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="badge-line pixel-font">Lab</p>
              <h2 className="mt-2 text-xl font-black text-white">Prompt Loop는 /lab에서 확인</h2>
              <p className="text-sm text-slate-200">
                공개 BIO는 짧게. Prompt → Output → Review → Improve 흐름과 Supabase 스키마는 실험실 페이지에서 투명하게 공유합니다.
              </p>
            </div>
            <a className="pixel-button ghost" href="/lab">
              Lab 열기 ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
