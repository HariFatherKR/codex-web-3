# Vibe Coding Creator – Prompt Loop BIO

Next.js(App Router)와 Tailwind로 구성된 Vercel 배포용 BIO입니다. 모든 섹션은 ROC(Role · Objective · Context) 기반 Prompt 사고방식을 보여주도록 설계되었습니다.

## 개발 환경
- Node.js 18 이상 권장 (Vercel 기본 런타임과 동일)
- npm 사용 (`npm install`, `npm run dev`)
- 경로 별칭: `@/*` → `src/*`

## 주요 스크립트
- `npm run dev` – 로컬 개발 서버 실행
- `npm run build` – Vercel과 동일한 프로덕션 빌드
- `npm run start` – 빌드 결과 미리보기
- `npm run lint` – Next.js ESLint 검사 (요청에 따라 생략 가능)

## 배포 가이드 (Vercel)
1. 저장소를 Vercel에 연결한 뒤 **Framework = Next.js**를 선택합니다.
2. 별도 빌드/출력 경로 설정은 필요 없습니다. (`npm run build`, output: `.next`)
3. Supabase 등 필요한 환경 변수를 Vercel Project Settings → Environment Variables에 추가합니다.
4. Edge Functions를 사용할 경우 `next.config.mjs`에 추가 설정 후 재배포하면 됩니다.

## Prompt Loop 구조
- **Prompt**: 각 섹션 Prompt가 ROC를 포함해 Supabase `prompts` 테이블에 저장됩니다.
- **Output**: Codex(OpenAI/Claude) 결과를 `outputs` 테이블에 저장하고 UI에 바로 노출합니다.
- **Review**: CTA 클릭률, 스크롤 깊이, 문의 패턴 등 행동/정성 데이터를 `reviews` 테이블에 누적합니다.
- **Improve**: Review 인사이트를 기반으로 Prompt를 리라이트하여 다음 루프로 이어집니다.

이 BIO 자체가 “AI로 문구를 만드는 것”이 아니라 “AI로 사고하는 시스템”을 증명합니다.
