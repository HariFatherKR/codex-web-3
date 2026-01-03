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
    fields: ['id', 'prompt_id', 'content_json', 'model', 'is_published', 'created_at'],
    highlight: '모델별 생성 결과를 기록하고 is_published=true만 퍼블릭 BIO에 노출.'
  },
  {
    name: 'reviews',
    fields: ['id', 'output_id', 'metric_type', 'value', 'meta_json', 'created_at'],
    highlight: '정량/정성 메트릭을 한 곳에 모아 Prompt 개선의 근거 데이터로 활용합니다.'
  },
  {
    name: 'inquiries',
    fields: ['id', 'name', 'email', 'inquiry_type', 'message', 'created_at', 'source'],
    highlight: 'CTA/문의 전환을 한 테이블에서 관리해 Prompt와 연결.'
  }
];

export default function LabPage() {
  return (
    <main className="container space-y-10 py-12">
      <header className="pixel-card">
        <p className="label-8bit text-sm text-brand-700">Prompt Loop Lab</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900">/lab · Prompt → Output → Review → Improve</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-700">
          퍼블릭 BIO에서는 Output만 노출됩니다. 여기서는 ROC 기반 Prompt, 데이터 흐름, 개선 루프까지 모두 공개합니다.
          Supabase 테이블 구조를 따라 바로 Admin 페이지를 확장할 수 있습니다.
        </p>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {supabaseSchema.map((table) => (
            <div key={table.name} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="text-sm font-semibold uppercase tracking-wide text-brand-700">{table.name}</div>
              <p className="mt-2 text-xs text-slate-500">{table.fields.join(' · ')}</p>
              <p className="mt-3 text-sm text-slate-700">{table.highlight}</p>
            </div>
          ))}
        </div>
        <div className="callout mt-4">
          Vercel Route Handler에서 Supabase REST API를 호출합니다. service key가 없으면 안전하게 오류를 반환해 배포 환경을 보호합니다.
        </div>
      </SectionCard>
    </main>
  );
}
