'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || '오류가 발생했습니다.');
    } else {
      router.push('/auth/login');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '0.5rem' }}>📚 회원가입</h1>
        <p style={{ fontSize: '14px', color: '#999', marginBottom: '2rem' }}>Bibliotheca에 오신걸 환영해요!</p>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>이름</label>
          <input
            type="text"
            placeholder="홍길동"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #EEE', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>이메일</label>
          <input
            type="email"
            placeholder="hello@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #EEE', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>비밀번호</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #EEE', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '1rem' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '14px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
          {loading ? '처리 중...' : '회원가입'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#999', marginTop: '1rem' }}>
          이미 계정이 있으신가요?{' '}
          <span onClick={() => router.push('/auth/login')} style={{ color: '#1a1a1a', fontWeight: '600', cursor: 'pointer' }}>로그인</span>
        </p>
      </div>
    </div>
  );
}