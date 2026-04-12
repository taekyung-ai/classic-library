'use client';

import { useState, useEffect } from 'react';

const langs: Record<string, string> = {
  FRA: '프랑스어', ENG: '영어', RUS: '러시아어',
  GER: '독일어', SPA: '스페인어', ITA: '이탈리아어', JPN: '일본어',
  CHN: '중국어', ARA: '아랍어', GRE: '그리스어', LAT: '라틴어',
  NOR: '노르웨이어', DAN: '덴마크어', KOR: '한국어', PER: '페르시아어', HIN: '힌디어',
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
    return matchLang && (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: 'sans-serif' }}>
      <header style={{ background: 'white', padding: '1rem 2rem', borderRadius: '0 0 24px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>📚 Bibliotheca</h1>
            <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>전세계 고전 문학 무료 아카이브</p>
          </div>
          <nav style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: '#666' }}>
            <span style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '20px', background: '#F0F0F0' }}>도서관</span>
            <span style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '20px' }}>번역</span>
            <span style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '20px' }}>소개</span>
          </nav>
        </div>
      </header>

      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
        <input
          type="text"
          placeholder="🔍 제목, 작가로 검색..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '14px 20px', fontSize: '15px', border: 'none', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {['all', 'FRA', 'ENG', 'RUS', 'GER', 'SPA', 'ITA', 'JPN', 'CHN', 'ARA', 'GRE', 'LAT', 'NOR', 'DAN', 'KOR', 'PER', 'HIN'].map(l => (
          <button key={l} onClick={() => setFilter(l)} style={{
            padding: '8px 18px', fontSize: '13px', borderRadius: '20px', cursor: 'pointer', border: 'none',
            background: filter === l ? '#1a1a1a' : 'white',
            color: filter === l ? 'white' : '#666',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            fontWeight: filter === l ? '600' : '400',
          }}>
            {l === 'all' ? '전체' : langs[l]}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
        {filtered.map(book => (
          <div key={book.id} onClick={() => setSelected(book)} style={{
            background: 'white', borderRadius: '20px', padding: '1.5rem', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', color: '#999' }}>{book.year < 0 ? `BC ${Math.abs(book.year)}` : book.year}</span>
              <span style={{ fontSize: '11px', padding: '3px 10px', background: '#F0F0F0', borderRadius: '10px', color: '#666' }}>{langs[book.lang] || book.lang}</span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px', color: '#1a1a1a', lineHeight: 1.4 }}>{book.title}</h3>
            <p style={{ fontSize: '13px', color: '#999', marginBottom: '12px', fontStyle: 'italic' }}>{book.titleEng}</p>
            <p style={{ fontSize: '13px', color: '#666' }}>{book.author}</p>
            <div style={{ marginTop: '12px' }}>
              <span style={{ fontSize: '11px', padding: '4px 10px', background: '#E8F5E9', color: '#2E7D32', borderRadius: '10px' }}>무료</span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '2rem', maxWidth: '500px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '12px', color: '#999' }}>{selected.year < 0 ? `BC ${Math.abs(selected.year)}` : selected.year} · {langs[selected.lang] || selected.lang}</span>
              <span onClick={() => setSelected(null)} style={{ cursor: 'pointer', fontSize: '20px', color: '#999' }}>✕</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px' }}>{selected.title}</h2>
            <p style={{ fontSize: '14px', color: '#999', fontStyle: 'italic', marginBottom: '6px' }}>{selected.titleEng}</p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '1rem' }}>{selected.author} ({selected.born})</p>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.7, marginBottom: '1.5rem' }}>{selected.description}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ flex: 1, padding: '12px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>읽기</button>
              <button onClick={() => setSelected(null)} style={{ flex: 1, padding: '12px', background: '#F5F5F5', color: '#333', border: 'none', borderRadius: '14px', cursor: 'pointer', fontSize: '14px' }}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}