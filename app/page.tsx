'use client';

import { useState, useEffect } from 'react';

const langs: Record<string, string> = {
  FRA: '프랑스어', ENG: '영어', RUS: '러시아어',
  GER: '독일어', SPA: '스페인어', ITA: '이탈리아어', JPN: '일본어',
};

const langColors: Record<string, string> = {
  FRA: '#E8F4FD', ENG: '#F0FDF4', RUS: '#FFF7ED',
  GER: '#FDF4FF', SPA: '#FFFBEB', ITA: '#FFF1F2', JPN: '#F0FDFB',
};

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch('/api/books').then(r => r.json()).then(setBooks);
  }, []);

  const filtered = books.filter(b => {
    const matchLang = filter === 'all' || b.lang === filter;
    const q = search.toLowerCase();
    return matchLang && (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.titleEng.toLowerCase().includes(q));
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', fontFamily: 'Georgia, serif' }}>
      {/* 헤더 */}
      <header style={{ background: '#1C1C1C', color: 'white', padding: '0 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.05em' }}>BIBLIOTHECA</span>
            <span style={{ fontSize: '11px', color: '#888', letterSpacing: '0.1em', marginTop: '2px' }}>CLASSICA MUNDI</span>
          </div>
          <nav style={{ display: 'flex', gap: '2rem', fontSize: '13px', color: '#AAA' }}>
            <span style={{ cursor: 'pointer', color: 'white' }}>도서관</span>
            <span style={{ cursor: 'pointer' }}>번역</span>
            <span style={{ cursor: 'pointer' }}>소개</span>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <div style={{ background: '#1C1C1C', color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#888', marginBottom: '1rem' }}>전세계 고전 문학 무료 아카이브</p>
        <h1 style={{ fontSize: '48px', fontWeight: 'normal', margin: '0 0 1.5rem', lineHeight: 1.2 }}>세계의 모든 고전을<br/>무료로</h1>
        <p style={{ color: '#AAA', fontSize: '16px', marginBottom: '2rem' }}>누구나, 어디서나, 어떤 언어로든</p>
        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="제목, 작가로 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '14px 20px', fontSize: '15px', border: 'none', borderRadius: '4px', background: 'white', color: '#333', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* 통계 */}
      <div style={{ background: '#F5F5F0', borderBottom: '1px solid #E5E5E0', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '3rem', fontSize: '13px', color: '#666' }}>
          <span><strong style={{ color: '#333' }}>{books.length}</strong> 권</span>
          <span><strong style={{ color: '#333' }}>{Object.keys(langs).length}</strong> 개 언어</span>
          <span><strong style={{ color: '#333' }}>무료</strong> 전체 공개</span>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* 필터 */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {['all', 'FRA', 'ENG', 'RUS', 'GER', 'SPA', 'ITA', 'JPN'].map(l => (
            <button key={l} onClick={() => setFilter(l)} style={{
              padding: '6px 16px', fontSize: '13px', borderRadius: '2px', cursor: 'pointer',
              border: filter === l ? '1px solid #1C1C1C' : '1px solid #DDD',
              background: filter === l ? '#1C1C1C' : 'white',
              color: filter === l ? 'white' : '#666',
              fontFamily: 'Georgia, serif',
            }}>
              {l === 'all' ? '전체' : langs[l]}
            </button>
          ))}
        </div>

        <p style={{ fontSize: '13px', color: '#999', marginBottom: '1.5rem' }}>{filtered.length}권의 도서</p>

        {/* 책 목록 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: '#E5E5E0' }}>
          {filtered.map(book => (
            <div key={book.id} onClick={() => setSelected(book)} style={{
              background: 'white', padding: '1.5rem', cursor: 'pointer',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#FAFAF5')}
            onMouseLeave={e => (e.currentTarget.style.background = 'white')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '11px', color: '#999', letterSpacing: '0.05em' }}>{book.year < 0 ? `BC ${Math.abs(book.year)}` : book.year}</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', background: langColors[book.lang] || '#F5F5F0', color: '#555', borderRadius: '2px' }}>{book.lang}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '0.4rem', lineHeight: 1.4, color: '#1C1C1C' }}>{book.title}</h3>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '0.75rem', fontStyle: 'italic' }}>{book.titleEng}</p>
              <p style={{ fontSize: '13px', color: '#555' }}>{book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 모달 */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', maxWidth: '520px', width: '100%', padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '11px', color: '#999', letterSpacing: '0.1em' }}>{selected.year} · {selected.lang} · {langs[selected.lang]}</span>
              <span onClick={() => setSelected(null)} style={{ cursor: 'pointer', color: '#999', fontSize: '20px', lineHeight: 1 }}>×</span>
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 'normal', marginBottom: '0.5rem', lineHeight: 1.3 }}>{selected.title}</h2>
            <p style={{ fontSize: '15px', color: '#888', fontStyle: 'italic', marginBottom: '0.5rem' }}>{selected.titleEng}</p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '1.5rem' }}>{selected.author} ({selected.born})</p>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.7, marginBottom: '2rem' }}>{selected.description}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, padding: '12px', background: '#1C1C1C', color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'Georgia, serif' }}>읽기</button>
              <button onClick={() => setSelected(null)} style={{ flex: 1, padding: '12px', background: 'white', color: '#333', border: '1px solid #DDD', cursor: 'pointer', fontSize: '14px', fontFamily: 'Georgia, serif' }}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer style={{ background: '#1C1C1C', color: '#666', padding: '3rem 2rem', marginTop: '4rem', textAlign: 'center', fontSize: '13px' }}>
        <p style={{ marginBottom: '0.5rem', color: '#AAA' }}>Bibliotheca Classica Mundi</p>
        <p>전세계 고전 문학을 모든 사람에게 무료로</p>
      </footer>
    </div>
  );
}