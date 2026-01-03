import { FeatureList } from '@/components/FeatureList';
import { SectionCard } from '@/components/SectionCard';

const promptSections = [
  {
    title: 'Prompt',
    description: '모든 콘텐츠는 ROC 구조를 갖춘 Prompt로 관리됩니다.',
    items: [
      '섹션별 Role · Objective · Context를 정의해 Codex가 집중해야 할 방향을 명확히 함',
      '버전 관리를 통해 개선 흐름을 추적하고, Supabase에 의도까지 저장',
      'Hero / Who / Course / CTA 등 모든 섹션이 동일한 구조를 따름'
    ]
  },
  {
    title: 'Output',
    description: 'Codex가 생성한 결과가 사용자에게 즉시 노출되고 로그화됩니다.',
    items: [
      '모델별 응답을 outputs 테이블에 저장하여 실험 결과를 비교',
      '공개 페이지의 카피도 Prompt 결과물을 그대로 노출',
      '강의/협업 문의로 자연스럽게 이어지는 메시지를 테스트'
    ]
  },
  {
    title: 'Review',
    description: '정량+정성 데이터를 동시에 수집하여 Prompt 개선 근거를 만듭니다.',
    items: [
      'CTA 클릭률, 스크롤 깊이 등 행동 데이터',
      '문의 유형, 자주 묻는 질문 같은 정성 피드백',
      '모든 리뷰 데이터가 Prompt 개선의 출발점'
    ]
  },
  {
    title: 'Improve',
    description: 'Review 데이터를 반영해 Prompt 자체를 리라이트합니다.',
    items: [
      '“문구 수정”이 아닌 ROC 관점에서 목표와 컨텍스트를 재설계',
      '변경된 Prompt로 새 Output을 생성하고 실험을 반복',
      '바이브코딩 사고방식을 증명하는 루프로 작동'
    ]
  }
];

const supabaseSchema = [
  {
    name: 'prompts',
    fields: ['id', 'section', 'role', 'objective', 'context', 'prompt_text', 'version', 'created_at'],
    highlight: '각 Prompt는 ROC와 버전 정보를 함께 저장해 추적과 실험을 단순화합니다.'
  },
  {
    name: 'outputs',
    fields: ['id', 'prompt_id', 'content', 'model', 'created_at'],
    highlight: '모델별 생성 결과를 모두 기록해 어떤 메시지가 전환을 만들었는지 비교 분석.'
  },
  {
    name: 'reviews',
    fields: ['id', 'output_id', 'metric_type', 'value', 'created_at'],
    highlight: '정량/정성 메트릭을 한 곳에 모아 Prompt 개선의 근거 데이터로 활용합니다.'
  }
];

export default function Home() {
  return (
    <main className="container space-y-12 py-12">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <div className="badge w-fit">Vibe Coding Creator · Prompt System</div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            “나는 AI로 문구를 만드는 사람이 아니라
            <span className="block text-brand-700">AI로 사고하는 시스템을 설계하는 사람이다.”</span>
          </h1>
          <p className="text-lg text-slate-700 md:text-xl">
            이 BIO는 단순한 소개가 아니라, Prompt → Output → Review → Improve 루프를 그대로
            보여주는 제품입니다. 방문자는 ‘무엇을 파는가’보다 ‘어떻게 사고하는가’를 경험합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
              href="#prompt-loop"
            >
              Prompt Loop 보기
            </a>
            <a
              className="rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-400"
              href="#contact"
            >
              협업/강의 문의 흐름
            </a>
          </div>
        </div>
        <div className="section-card max-w-xl">
          <h2 className="text-xl font-semibold text-slate-900">ROC (Role · Objective · Context)</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>
              <strong>Role.</strong> 비개발자와 개발자 모두에게 AI 기반 프로덕트 사고방식(Vibe Coding)을
              가르치는 크리에이터
            </li>
            <li>
              <strong>Objective.</strong> “AI로 만들고 싶은 사람”이 이 시스템을 보고 배우고 싶다고 느끼게 만들기
            </li>
            <li>
              <strong>Context.</strong> YouTube/Instagram/LinkedIn 유입, AI에 관심 있지만 방향이 필요한 사용자
            </li>
          </ul>
          <div className="callout mt-4">
            모든 섹션은 이 ROC를 상속받아 Prompt로 정의되고, 결과물이 바로 노출됩니다.
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2" id="prompt-loop">
        <div className="space-y-6">
          {promptSections.slice(0, 2).map((section) => (
            <SectionCard key={section.title} title={section.title} description={section.description}>
              <FeatureList title="포인트" items={section.items} />
            </SectionCard>
          ))}
        </div>
        <div className="space-y-6">
          {promptSections.slice(2).map((section) => (
            <SectionCard key={section.title} title={section.title} description={section.description}>
              <FeatureList title="포인트" items={section.items} />
            </SectionCard>
          ))}
        </div>
      </div>

      <SectionCard
        title="Supabase 스키마"
        description="Prompt → Output → Review 데이터를 모두 기록하여 개선 루프를 자동화합니다."
        badge="Vercel · Supabase"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {supabaseSchema.map((table) => (
            <div key={table.name} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                {table.name}
              </div>
              <p className="mt-2 text-xs text-slate-500">{table.fields.join(' · ')}</p>
              <p className="mt-3 text-sm text-slate-700">{table.highlight}</p>
            </div>
          ))}
        </div>
        <div className="callout mt-4">
          Vercel 프론트엔드에서 Edge Functions를 활용해 Prompt 처리 일부를 수행하고, Supabase Function으로
          메일 전송 및 저장 로직을 분리합니다.
        </div>
      </SectionCard>

      <SectionCard
        title="Contact & Feedback Loop"
        description="문의 자체가 데이터입니다. 반복되는 질문과 전환 지점을 Prompt 개선에 반영합니다."
        badge="Feedback"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureList
            title="문의 흐름"
            items={['Modal 또는 링크를 통해 문의를 수집', '문의 내용은 Context 데이터로 누적', '반복 질문 → Prompt에 명시적으로 반영']}
          />
          <FeatureList
            title="측정 지표"
            items={[
              'CTA 클릭률 · 스크롤 깊이로 섹션별 퍼널 확인',
              '문의 유형/직무 데이터로 타겟 정의 명확화',
              '강의/협업 전환율을 Prompt 수정 전후로 비교'
            ]}
          />
          <FeatureList
            title="Codex 역할"
            items={[
              'Prompt Engineer + 주니어 PM 관점에서 가설 제안',
              '전환율이 낮은 섹션의 원인 추론 및 Prompt 리라이트',
              '신규 문의 패턴을 ROC에 반영하여 메시지 세분화'
            ]}
          />
        </div>
      </SectionCard>

      <footer id="contact" className="rounded-2xl border border-brand-100 bg-brand-50 px-6 py-6 text-sm text-brand-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Vercel 배포 Ready</p>
            <p>
              Next.js App Router + Tailwind 세팅 완료. Supabase 환경 변수만 추가하면 즉시 배포 가능합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-full bg-white px-4 py-2 font-semibold text-brand-700 shadow-sm transition hover:shadow"
              href="https://vercel.com/"
              target="_blank"
              rel="noreferrer"
            >
              Vercel로 배포하기
            </a>
            <a
              className="rounded-full border border-brand-300 bg-brand-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-brand-700"
              href="mailto:hello@vibecoding.ai"
            >
              협업/강의 문의
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
