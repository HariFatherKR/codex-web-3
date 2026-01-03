'use client';

import { useEffect, useState } from 'react';

export type ContactPayload = {
  name?: string;
  email: string;
  inquiryType: string;
  message: string;
  source?: string;
};

interface ContactModalProps {
  open: boolean;
  defaultType?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  feedback?: string;
  onClose: () => void;
  onSubmit: (payload: ContactPayload) => Promise<void>;
}

const inquiryOptions = ['강의', '기업워크숍', '콘텐츠협업', '기타'];

export function ContactModal({ open, defaultType, status, feedback, onClose, onSubmit }: ContactModalProps) {
  const [form, setForm] = useState<ContactPayload>({
    name: '',
    email: '',
    inquiryType: defaultType ?? '강의',
    message: '',
    source: 'public'
  });

  useEffect(() => {
    if (defaultType) {
      setForm((prev) => ({ ...prev, inquiryType: defaultType }));
    }
  }, [defaultType]);

  useEffect(() => {
    if (!open) {
      setForm({ name: '', email: '', inquiryType: defaultType ?? '강의', message: '', source: 'public' });
    }
  }, [open, defaultType]);

  const handleChange = (field: keyof ContactPayload) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  if (!open) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label-8bit text-sm text-brand-700">Collab & Course Inquiry</p>
            <h2 className="text-2xl font-bold text-slate-900">무엇이 궁금한가요?</h2>
            <p className="mt-1 text-sm text-slate-600">
              메일로 답변을 보내드리고, 반복되는 질문은 Prompt 개선에 반영합니다.
            </p>
          </div>
          <button
            type="button"
            aria-label="close"
            onClick={onClose}
            className="pixel-chip bg-brand-100 text-xs"
          >
            닫기
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="form-helper">name (옵션)</label>
              <input
                type="text"
                value={form.name ?? ''}
                placeholder="이름 또는 팀명"
                onChange={(e) => handleChange('name')(e.target.value)}
              />
            </div>
            <div>
              <label className="form-helper">email *</label>
              <input
                type="email"
                required
                value={form.email}
                placeholder="you@email.com"
                onChange={(e) => handleChange('email')(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-helper">문의 유형 *</label>
            <select
              value={form.inquiryType}
              onChange={(e) => handleChange('inquiryType')(e.target.value)}
              required
            >
              {inquiryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-helper">메시지 *</label>
            <textarea
              required
              placeholder="어떤 강의/협업이 필요한지, 타깃과 목표를 알려주세요."
              value={form.message}
              onChange={(e) => handleChange('message')(e.target.value)}
            />
          </div>

          {feedback ? (
            <div
              className={`callout ${status === 'error' ? 'border-rose-500 text-rose-700' : ''}`}
              role={status === 'error' ? 'alert' : 'status'}
            >
              {feedback}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Supabase에 안전하게 저장되고, 필요 시 이메일 알림으로 전달됩니다.
            </p>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="pixel-button bg-brand-500 text-white"
            >
              {status === 'loading' ? '전송 중…' : '보내기'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
