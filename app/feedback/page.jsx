'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTheoryLink } from '@/lib/theoryLinks';

export default function FeedbackPage() {
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('analysis');
  const [showTheory, setShowTheory] = useState(false);
  const [theoryDismissed, setTheoryDismissed] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const raw = sessionStorage.getItem('traceResult');
    if (raw) {
      setResult(JSON.parse(raw));
      setTimeout(() => setShowMemory(true), 800);
      setTimeout(() => setShowTheory(true), 2000);
    }
  }, []);

  if (!result) return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1117', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace' }}>
      <div style={{ textAlign: 'center', color: '#8b949e' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🌱</div>
        <p style={{ fontSize: 14, marginBottom: 20 }}>Nothing here yet — go practice some code!</p>
        <button onClick={() => router.push('/')} style={btnPrimary}>← Start Practicing</button>
      </div>
    </div>
  );

  const theory = getTheoryLink(result.topic || 'binary-search');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1117', fontFamily: 'JetBrains Mono, monospace', position: 'relative' }}>

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.05) 0%, transparent 60%)' }} />

      {showMemory && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 999, background: '#0d2e20', border: '1px solid #10b98160', borderRadius: 14, padding: '16px 20px', maxWidth: 280, animation: 'slideIn 0.4s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981' }}>Saved to memory</span>
          </div>
          <p style={{ fontSize: 11, color: '#6ee7b7', margin: 0 }}>TraceX will remember this session next time.</p>
        </div>
      )}

      {showTheory && !theoryDismissed && (
        <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 999, background: '#161b22', border: '1px solid #6c63ff50', borderRadius: 16, padding: '20px 24px', maxWidth: 320, animation: 'slideUp 0.4s ease', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          <div style={{ fontSize: 22, marginBottom: 10 }}>🤔</div>
          <p style={{ fontSize: 13, color: '#e6edf3', fontWeight: 700, marginBottom: 6 }}>Feeling unsure about the concept?</p>
          <p style={{ fontSize: 12, color: '#8b949e', marginBottom: 16, lineHeight: 1.7 }}>
            No worries! Here is a great video on <span style={{ color: '#6c63ff' }}>{result.topic?.replace('-', ' ')}</span> that might help.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href={theory.url} target="_blank" rel="noopener noreferrer" style={{ background: '#6c63ff', color: '#fff', padding: '10px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}>Watch on YouTube</a>
            <button onClick={() => setTheoryDismissed(true)} style={{ background: 'none', border: '1px solid #21262d', color: '#6b6b80', borderRadius: 10, padding: '10px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace' }}>I am good</button>
          </div>
        </div>
      )}

      <aside style={{ width: 240, background: 'rgba(13,17,23,0.97)', borderRight: '1px solid #21262d', display: 'flex', flexDirection: 'column', padding: '28px 0', position: 'fixed', height: '100vh', zIndex: 10 }}>
        <div style={{ padding: '0 20px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>T</div>
            <span style={{ fontSize: 19, fontWeight: 800, color: '#e6edf3' }}>TraceX</span>
          </div>
          <div style={{ fontSize: 10, color: '#6b6b80', letterSpacing: '2px', paddingLeft: 2 }}>your coding companion</div>
        </div>

        {[
          { icon: '✏️', label: 'Practice', active: false, href: '/' },
          { icon: '🧠', label: 'My Feedback', active: true, href: '/feedback' },
          { icon: '🌱', label: 'Grow', active: false, href: '/challenge' },
        ].map(item => (
          <div key={item.label} onClick={() => router.push(item.href)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', cursor: 'pointer', fontSize: 13, background: item.active ? '#6c63ff12' : 'transparent', borderLeft: item.active ? '3px solid #6c63ff' : '3px solid transparent', color: item.active ? '#e6edf3' : '#6b6b80', transition: 'all 0.2s', borderRadius: '0 8px 8px 0', marginRight: 12 }}>
            <span>{item.icon}</span>{item.label}
          </div>
        ))}

        <div style={{ margin: '24px 16px 0', padding: '16px', background: '#161b22', borderRadius: 14, border: '1px solid #21262d' }}>
          <div style={{ fontSize: 12, color: '#8b949e', marginBottom: 10, lineHeight: 1.6 }}>📺 Recommended watch:</div>
          <a href={theory.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#6c63ff', textDecoration: 'none', lineHeight: 1.6 }}>{theory.title}</a>
          <div style={{ fontSize: 11, color: '#6b6b80', marginTop: 4 }}>by {theory.channel}</div>
        </div>

        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #21262d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>D</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3' }}>Demo User</div>
              <div style={{ fontSize: 10, color: '#6b6b80' }}>learning every day 🌱</div>
            </div>
          </div>
        </div>
      </aside>

      <main style={{ marginLeft: 240, flex: 1, padding: '48px', position: 'relative', zIndex: 1 }}>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, color: '#10b981', letterSpacing: '3px', marginBottom: 10 }}>HERE IS WHAT WE FOUND</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#e6edf3', margin: '0 0 10px' }}>Your Code Review</h1>
          <p style={{ color: '#8b949e', fontSize: 13, margin: 0 }}>No stress — every mistake is just a lesson in disguise 🌱</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32, maxWidth: 860 }}>
          {[
            { label: 'Opportunity found', value: result.errorType || 'logic area', color: '#f59e0b', icon: '💡' },
            { label: 'Past sessions recalled', value: `${result.pastMistakes?.length || 0} memories`, color: '#6c63ff', icon: '🧠' },
            { label: 'Topic', value: (result.topic || 'general').replace('-', ' '), color: '#10b981', icon: '📚' },
          ].map(card => (
            <div key={card.label} style={{ background: '#161b22', border: `1px solid ${card.color}25`, borderRadius: 14, padding: '18px' }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: card.color, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontSize: 11, color: '#6b6b80' }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, maxWidth: 860 }}>

          <div style={{ background: '#161b22', borderRadius: 16, border: '1px solid #21262d', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #21262d' }}>
              {[
                { id: 'analysis', label: '🔍 What happened' },
                { id: 'approach', label: '💡 Better way' },
                { id: 'code', label: '✅ Fixed code' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: '14px 8px', background: activeTab === tab.id ? '#6c63ff12' : 'transparent', border: 'none', borderBottom: activeTab === tab.id ? '2px solid #6c63ff' : '2px solid transparent', color: activeTab === tab.id ? '#e6edf3' : '#6b6b80', fontSize: 12, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', transition: 'all 0.2s' }}>{tab.label}</button>
              ))}
            </div>

            <div style={{ padding: 24, minHeight: 260 }}>
              {activeTab === 'analysis' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <p style={{ color: '#c9d1d9', lineHeight: 1.9, fontSize: 13, margin: '0 0 16px' }}>{result.analysis || 'No analysis available.'}</p>
                  {result.hindsightWarning && (
                    <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b25', borderRadius: 10, padding: '14px' }}>
                      <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, marginBottom: 6 }}>🧠 TraceX remembers...</div>
                      <p style={{ fontSize: 12, color: '#fcd34d', margin: 0, lineHeight: 1.7 }}>{result.hindsightWarning}</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'approach' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <p style={{ color: '#c9d1d9', lineHeight: 1.9, fontSize: 13, margin: 0 }}>{result.betterApproach || 'No suggestions available.'}</p>
                </div>
              )}
              {activeTab === 'code' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  {result.correctedCode ? (
                    <pre style={{ background: '#0d1117', borderRadius: 10, padding: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#a8c8e8', border: '1px solid #21262d', overflow: 'auto', margin: 0, lineHeight: 1.8 }}>{result.correctedCode}</pre>
                  ) : (
                    <p style={{ color: '#6b6b80', fontSize: 13 }}>Corrected code not available.</p>
                  )}
                </div>
              )}
            </div>

            <div style={{ padding: '0 24px 24px', display: 'flex', gap: 12 }}>
              <button onClick={() => router.push('/challenge')} style={btnPrimary}>🌱 Practice this concept</button>
              <button onClick={() => router.push('/')} style={btnSecondary}>← Try another</button>
            </div>
          </div>

          <div style={{ background: '#161b22', borderRadius: 16, border: '1px solid #21262d', padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#e6edf3' }}>🧠 Memory Log</span>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} />
            </div>

            {result.memoryStored && (
              <div style={{ background: '#0d2e2015', border: '1px solid #10b98130', borderRadius: 12, padding: '14px', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', marginBottom: 6 }}>✅ Saved to Hindsight</div>
                <p style={{ margin: 0, fontSize: 11, color: '#6ee7b7', lineHeight: 1.7 }}>{result.memoryStored}</p>
              </div>
            )}

            {result.pastMistakes?.length > 0 ? (
              <div style={{ background: '#6c63ff08', border: '1px solid #6c63ff30', borderRadius: 12, padding: '14px', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', marginBottom: 8 }}>🔁 Recalled from before</div>
                {result.pastMistakes.slice(0, 3).map((m, i) => (
                  <p key={i} style={{ margin: '4px 0', fontSize: 11, color: '#c4b5fd', lineHeight: 1.6 }}>• {m}</p>
                ))}
              </div>
            ) : (
              <div style={{ background: '#21262d', borderRadius: 12, padding: '18px', textAlign: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🌱</div>
                <p style={{ color: '#6b6b80', fontSize: 11, margin: 0, lineHeight: 1.6 }}>First session! Submit again later to see your growth.</p>
              </div>
            )}

            <div style={{ background: '#21262d', borderRadius: 12, padding: '14px' }}>
              <div style={{ fontSize: 11, color: '#6b6b80', marginBottom: 10, letterSpacing: '1px' }}>QUICK REMINDERS 📌</div>
              {theory.concepts.map((c, i) => (
                <p key={i} style={{ fontSize: 11, color: '#8b949e', margin: '0 0 6px', lineHeight: 1.6 }}>• {c}</p>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

const btnPrimary = {
  background: '#6c63ff', color: '#fff', border: 'none',
  borderRadius: 10, padding: '11px 20px', fontSize: 12,
  fontWeight: 700, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
};
const btnSecondary = {
  background: 'transparent', color: '#6b6b80', border: '1px solid #21262d',
  borderRadius: 10, padding: '11px 20px', fontSize: 12,
  cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
};