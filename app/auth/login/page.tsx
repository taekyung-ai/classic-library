'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    if (res?.error) {
      setError('이메일 또는 비밀번호가 틀렸습니다.');
    } else {
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '0.5rem' }}>📚 로그인</h1>
        <p style={{ fontSize: '14px', color: '#999', marginBottom: '2rem' }}>다시 만나서 반가워요!</p>

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
          {loading ? '처리 중...' : '로그인'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#999', marginTop: '1rem' }}>
          계정이 없으신가요?{' '}
          <span onClick={() => router.push('/auth/register')} style={{ color: '#1a1a1a', fontWeight: '600', cursor: 'pointer' }}>회원가입</span>
        </p>
      </div>
    </div>
  );
}