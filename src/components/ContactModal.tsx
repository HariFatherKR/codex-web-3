'use client';

import { useMemo, useState } from 'react';

interface ContactModalProps {
  triggerLabel: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
}

const inquiryOptions = [
  { value: 'lecture', label: '강의' },
  { value: 'workshop', label: '기업 워크숍' },
  { value: 'content', label: '콘텐츠 협업' },
  { value: 'other', label: '기타' }
];

export function ContactModal({ triggerLabel, variant = 'secondary', size = 'md' }: ContactModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [inquiryType, setInquiryType] = useState('lecture');

  const triggerClass = useMemo(() => `pixel-button ${variant}`, [variant]);
  const widthClass = size === 'lg' ? 'w-full justify-center' : '';

  const resetForm = () => {
    setMessage('');
    setEmail('');
    setName('');
    setInquiryType('lecture');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, inquiryType, message, source: 'bio' })
      });

      if (!response.ok) {
        throw new Error('failed');
      }

      setStatus('success');
      resetForm();
      setTimeout(() => setOpen(false), 800);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <>
      <button type="button" className={`${triggerClass} ${widthClass}`} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <div className="modal-card" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="pixel-card-content space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="badge-line pixel-font">Contact</p>
                  <h3 className="mt-2 text-white">강의 / 협업 문의</h3>
                  <p className="text-sm text-slate-200/80">메시지는 Supabase inquiries 테이블로 저장됩니다.</p>
                </div>
                <button
                  type="button"
                  aria-label="close"
                  onClick={() => setOpen(false)}
                  className="pixel-button ghost px-3 py-2 text-sm"
                >
                  닫기
                </button>
              </div>

              <form className="input-stack" onSubmit={handleSubmit}>
                <label>
                  이름 (옵션)
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" />
                </label>
                <label>
                  이메일 (필수)
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  문의 유형
                  <select value={inquiryType} onChange={(e) => setInquiryType(e.target.value)}>
                    {inquiryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  메시지 (필수)
                  <textarea
                    required
                    minLength={10}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="어떤 도움을 원하시나요?"
                  />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-sm text-slate-300">Vercel Route Handler → Supabase 저장 후 알림 연동</span>
                  <button type="submit" className="pixel-button primary">
                    {status === 'loading' ? '전송 중...' : '보내기'}
                  </button>
                </div>
                {status === 'success' ? (
                  <p className="text-sm font-semibold text-[#8ef0ff]">완료! 곧 회신 드릴게요.</p>
                ) : null}
                {status === 'error' ? (
                  <p className="text-sm font-semibold text-[#ff70a6]">전송에 실패했습니다. 이메일로 바로 연락 부탁드려요.</p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
