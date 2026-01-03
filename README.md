# Vibe Coding Creator – 8bit Linktree BIO + Lab

8bit 무드의 Linktree BIO와 Prompt Loop 실험실(/lab)을 포함한 Next.js(App Router) 프로젝트입니다. 퍼블릭 페이지에서는 15초 안에 “누구/무엇/왜 신뢰/어떻게 연락”을 전달하고, Prompt → Output → Review → Improve 시스템은 /lab과 /api/contact로 분리해 운영합니다.

## 개발 환경
- Node.js 18 이상 권장 (Vercel 기본 런타임과 동일)
- npm 사용 (`npm install`, `npm run dev`)
- 경로 별칭: `@/*` → `src/*`

## 주요 스크립트
- `npm run dev` – 로컬 개발 서버 실행
- `npm run build` – Vercel과 동일한 프로덕션 빌드
- `npm run start` – 빌드 결과 미리보기
- `npm run lint` – Next.js ESLint 검사 (요청에 따라 생략 가능)
- `npm run format` – Prettier 체크

## 배포 가이드 (Vercel)
1. 저장소를 Vercel에 연결한 뒤 **Framework = Next.js**를 선택합니다.
2. 별도 빌드/출력 경로 설정은 필요 없습니다. (`npm run build`, output: `.next`)
3. 환경 변수 추가 (Project Settings → Environment Variables)
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (Route Handler에서 inquiries 저장용)
4. Edge Functions를 사용할 경우 `next.config.mjs`에 추가 설정 후 재배포하면 됩니다.

## 정보 구조
- `/` : Linktree BIO (Hero, Quick Links, Who/Good/Done/Have Been 탭, Courses, Contact CTA)
- `/lab` : Prompt Loop·Supabase 스키마·Admin 로드맵 공유
- `/api/contact` : 문의 저장용 Route Handler → Supabase `inquiries` 테이블

## Supabase 테이블 제안
- `prompts(id, section, role, objective, context, prompt_text, version, created_at)`
- `outputs(id, prompt_id, content_json, model, is_published, created_at)`
- `reviews(id, output_id, metric_type, value, meta_json, created_at)`
- `inquiries(id, name, email, inquiry_type, message, created_at, source)`

## Prompt Loop 구조 (Lab에서 노출)
- **Prompt**: ROC 기반 Prompt를 버전과 함께 관리
- **Output**: 생성 결과를 저장하고 publish 여부로 퍼블릭 카피 제어
- **Review**: 클릭/스크롤/문의 등 정량·정성 데이터 기록
- **Improve**: 리뷰 데이터를 기반으로 Prompt를 리라이트 후 재배포
