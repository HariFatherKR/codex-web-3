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
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="label-8bit text-xs text-neon-blue">Contact</p>
            <h2 className="text-xl font-bold text-white">빠르게 문의하기</h2>
          </div>
          <button type="button" aria-label="close" onClick={onClose} className="pixel-button neon-outline px-3 py-2 text-xs">
            닫기
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
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
              placeholder="필요한 강의/협업 내용을 2~3줄로 적어주세요."
              value={form.message}
              onChange={(e) => handleChange('message')(e.target.value)}
            />
          </div>

          {feedback ? (
            <div
              className={`rounded-lg border-2 p-3 text-sm ${status === 'error' ? 'border-rose-500 text-rose-300' : 'border-neon-green text-neon-green'}`}
              role={status === 'error' ? 'alert' : 'status'}
            >
              {feedback}
            </div>
          ) : null}

          <button type="submit" disabled={status === 'loading'} className="pixel-button neon-primary w-full">
            {status === 'loading' ? '전송 중…' : '보내기'}
          </button>
        </form>
      </div>
    </>
  );
}
