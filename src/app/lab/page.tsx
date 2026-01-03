import { FeatureList } from '@/components/FeatureList';
import { SectionCard } from '@/components/SectionCard';

const promptSections = [
  {
    title: 'Prompt',
    description: '모든 섹션은 ROC(Role · Objective · Context) 기반 Prompt로 관리됩니다.',
    items: [
      'Hero / Who / Good / Done / Have Been / Course / CTA 모두 동일한 ROC 구조',
      '버전 관리 + 작성 의도를 Supabase prompts 테이블에 기록',
      'Prompt 개선 자체가 제품 메시지: “AI로 사고하는 시스템”'
    ]
  },
  {
    title: 'Output',
    description: 'Codex(OpenAI/Claude)가 생성한 결과물을 Output으로 저장하고 퍼블릭 페이지에 노출합니다.',
    items: [
      '모델 정보와 응답을 outputs 테이블에 기록',
      'is_published 플래그로 현재 노출본 관리',
      'Linktree BIO 카피는 항상 최신 Output을 사용'
    ]
  },
  {
    title: 'Review',
    description: '정량/정성 메트릭을 함께 수집해 Prompt 개선 근거를 만듭니다.',
    items: [
      'cta_click / link_click / course_click / section_view / scroll_depth 로그',
      '문의(inquiries) 테이블로 정성 질문 수집',
      '반복 질문 패턴을 Context에 반영'
    ]
  },
  {
    title: 'Improve',
    description: 'Review 인사이트를 반영해 Prompt를 다시 작성하고 A/B 실험합니다.',
    items: [
      'Objective를 전환 목표에 맞게 좁히기',
      'Context를 최근 문의/클릭 데이터를 반영해 업데이트',
      '새 Output 생성 후 publish 선택 → / 페이지 자동 반영'
    ]
  }
];

const supabaseTables = [
  {
    name: 'prompts',
    fields: ['id', 'section', 'role', 'objective', 'context', 'prompt_text', 'version', 'created_at'],
    highlight: 'ROC + 버전 관리로 Prompt 자체를 실험 단위로 관리'
  },
  {
    name: 'outputs',
    fields: ['id', 'prompt_id', 'content_json', 'model', 'is_published', 'created_at'],
    highlight: '생성 결과와 노출 여부를 기록해 회고 가능'
  },
  {
    name: 'reviews',
    fields: ['id', 'output_id', 'metric_type', 'value', 'meta_json', 'created_at'],
    highlight: '정량/정성 리뷰를 한 곳에 모아 Prompt 개선 근거 확보'
  },
  {
    name: 'inquiries',
    fields: ['id', 'name', 'email', 'inquiry_type', 'message', 'created_at', 'source'],
    highlight: 'Contact 모달에서 수집한 문의 데이터를 Context로 활용'
  }
];

export default function LabPage() {
  return (
    <main className="page-shell">
      <SectionCard
        badge="Lab"
        title="Prompt Loop 실험실"
        description="퍼블릭 BIO는 가볍게, 시스템은 여기서 투명하게 공개합니다."
      >
        <p className="text-sm text-slate-100">
          이 페이지의 카피는 ROC 기반 Prompt → Output → Review → Improve 루프에서 파생됩니다. Admin에서는 섹션별 Prompt 수정, Output 생성,
          Publish 선택, Review 대시보드를 관리하도록 설계되어 있습니다.
        </p>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2">
        {promptSections.map((section) => (
          <SectionCard key={section.title} badge="Prompt Loop" title={section.title} description={section.description}>
            <FeatureList title="포인트" items={section.items} />
          </SectionCard>
        ))}
      </div>

      <SectionCard
        badge="Supabase"
        title="Supabase 테이블 스냅샷"
        description="Prompt/Output/Review/Inquiries를 모두 기록하여 개선 루프를 자동화합니다."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {supabaseTables.map((table) => (
            <div key={table.name} className="rounded-xl border-2 border-[#1d2341] bg-[#0c0f22] p-4 shadow-[0_8px_0_#070a17]">
              <p className="pixel-font text-sm uppercase text-[#8ef0ff]">{table.name}</p>
              <p className="mt-1 text-xs text-slate-200">{table.fields.join(' · ')}</p>
              <p className="mt-2 text-sm text-slate-100">{table.highlight}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        badge="Admin"
        title="/admin 로드맵"
        description="Supabase Auth와 연동해 Prompt 편집, Output 생성/Publish, Review 대시보드를 제공합니다."
      >
        <FeatureList
          title="필수 기능"
          items={[
            '섹션별 Prompt(ROC) 편집 및 버전 관리',
            'Generate → Output 저장 → Publish 선택',
            'Review(클릭/스크롤/문의) 대시보드로 개선 우선순위 정의'
          ]}
        />
      </SectionCard>
    </main>
  );
}
