'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const [result, setResult] = useState(null);
  const [showMemoryPopup, setShowMemoryPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  const router = useRouter();

  useEffect(() => {
    const raw = sessionStorage.getItem('traceResult');
    if (raw) {
      setResult(JSON.parse(raw));
      setTimeout(() => setShowMemoryPopup(true), 800);
    }
  }, []);

  if (!result) return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace' }}>
      <div style={{ textAlign: 'center', color: '#6b6b80' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🧠</div>
        <p style={{ fontSize: 14 }}>No analysis found.</p>
        <button onClick={() => router.push('/')} style={btnPrimary}>← Analyze Code</button>
      </div>
    </div>
  );

  const score = calculateScore(result);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f', fontFamily: 'JetBrains Mono, monospace', position: 'relative', overflow: 'hidden' }}>

      {/* Grid Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Memory Popup */}
      {showMemoryPopup && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 999,
          background: '#0d2e20', border: '1px solid #10b981',
          borderRadius: 14, padding: '18px 22px', maxWidth: 300,
          animation: 'slideIn 0.4s ease', boxShadow: '0 0 30px rgba(16,185,129,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>+50 XP — Memory Stored</span>
          </div>
          <p style={{ fontSize: 12, color: '#6ee7b7', margin: '0 0 10px' }}>
            Hindsight has recorded this session. TraceX will remember it.
          </p>
          <button onClick={() => setShowMemoryPopup(false)} style={{ background: 'none', border: 'none', color: '#6b6b80', fontSize: 12, cursor: 'pointer', padding: 0 }}>
            Dismiss
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{
        width: 240, background: 'rgba(15,15,23,0.95)', borderRight: '1px solid #1e1e2e',
        display: 'flex', flexDirection: 'column', padding: '24px 0',
        position: 'fixed', height: '100vh', zIndex: 10,
      }}>
        <div style={{ padding: '0 20px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#fff',
            }}>T</div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#6c63ff' }}>TraceX</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: '#6b6b80', letterSpacing: '2px' }}>HACKER ARENA</div>
        </div>

        {[
          { icon: '⚡', label: 'Analyze Code', active: false, href: '/' },
          { icon: '🧠', label: 'Memory Log', active: true, href: '/feedback' },
          { icon: '🎯', label: 'Challenges', active: false, href: '/challenge' },
        ].map(item => (
          <div key={item.label} onClick={() => router.push(item.href)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 20px', cursor: 'pointer', fontSize: 13,
            background: item.active ? '#6c63ff15' : 'transparent',
            borderLeft: item.active ? '3px solid #6c63ff' : '3px solid transparent',
            color: item.active ? '#e8e8f0' : '#6b6b80', transition: 'all 0.2s',
          }}>
            <span>{item.icon}</span>{item.label}
          </div>
        ))}

        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #1e1e2e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6c63ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>D</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#e8e8f0' }}>Demo User</div>
              <div style={{ fontSize: 10, color: '#6b6b80' }}>demo_user_001</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, padding: '40px', position: 'relative', zIndex: 1 }}>

        {/* Match Result Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#6c63ff', letterSpacing: '4px', marginBottom: 8 }}>— MATCH RESULT —</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: '#e8e8f0', margin: '0 0 8px' }}>Analysis Complete</h1>
          <p style={{ color: '#6b6b80', fontSize: 13, margin: 0 }}>Here's what TraceX found in your code</p>
        </div>

        {/* Score Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32, maxWidth: 900, margin: '0 auto 32px' }}>
          {[
            { label: 'CODE SCORE', value: `${score.codeScore}/100`, color: score.codeScore > 70 ? '#10b981' : '#ef4444' },
            { label: 'ERROR TYPE', value: result.errorType || 'logic error', color: '#f59e0b' },
            { label: 'PAST ERRORS', value: `${result.pastMistakes?.length || 0} recalled`, color: '#6c63ff' },
            { label: 'XP EARNED', value: '+50 XP', color: '#a78bfa' },
          ].map(card => (
            <div key={card.label} style={{
              background: 'rgba(19,19,26,0.9)', border: `1px solid ${card.color}30`,
              borderRadius: 14, padding: '20px 16px', textAlign: 'center',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: 10, color: '#6b6b80', letterSpacing: '1px', marginBottom: 8 }}>{card.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: card.color }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, maxWidth: 900, margin: '0 auto' }}>

          {/* Feedback Tabs */}
          <div style={{ background: 'rgba(19,19,26,0.9)', borderRadius: 16, border: '1px solid #1e1e2e', overflow: 'hidden' }}>

            {/* Tab Bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid #1e1e2e' }}>
              {[
                { id: 'analysis', label: '🔍 Analysis' },
                { id: 'approach', label: '💡 Better Approach' },
                { id: 'code', label: '✅ Corrected Code' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  flex: 1, padding: '14px 8px', background: activeTab === tab.id ? '#6c63ff15' : 'transparent',
                  border: 'none', borderBottom: activeTab === tab.id ? '2px solid #6c63ff' : '2px solid transparent',
                  color: activeTab === tab.id ? '#e8e8f0' : '#6b6b80',
                  fontSize: 12, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
                  transition: 'all 0.2s',
                }}>{tab.label}</button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: 24, minHeight: 280 }}>
              {activeTab === 'analysis' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <p style={{ color: '#c8c8d8', lineHeight: 1.9, fontSize: 13, margin: 0 }}>
                    {result.analysis || 'No analysis available.'}
                  </p>
                  {result.hindsightWarning && (
                    <div style={{ marginTop: 20, background: '#f59e0b10', border: '1px solid #f59e0b30', borderRadius: 10, padding: '12px 16px' }}>
                      <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, marginBottom: 4 }}>⚠️ HINDSIGHT WARNING</div>
                      <p style={{ fontSize: 12, color: '#fcd34d', margin: 0, lineHeight: 1.7 }}>{result.hindsightWarning}</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'approach' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <p style={{ color: '#c8c8d8', lineHeight: 1.9, fontSize: 13, margin: 0 }}>
                    {result.betterApproach || 'No suggestions available.'}
                  </p>
                </div>
              )}
              {activeTab === 'code' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  {result.correctedCode ? (
                    <pre style={{
                      background: '#0a0a0f', borderRadius: 10, padding: 16,
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
                      color: '#a8c8e8', border: '1px solid #1e1e2e',
                      overflow: 'auto', margin: 0, lineHeight: 1.8,
                    }}>{result.correctedCode}</pre>
                  ) : (
                    <p style={{ color: '#6b6b80', fontSize: 13 }}>No corrected code available.</p>
                  )}
                </div>
              )}
            </div>

            <div style={{ padding: '0 24px 24px', display: 'flex', gap: 12 }}>
              <button onClick={() => router.push('/challenge')} style={btnPrimary}>🎯 Practice the Fix →</button>
              <button onClick={() => router.push('/')} style={btnSecondary}>← Analyze More</button>
            </div>
          </div>

          {/* Memory Log */}
          <div style={{ background: 'rgba(19,19,26,0.9)', borderRadius: 16, border: '1px solid #1e1e2e', padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#e8e8f0' }}>🧠 Memory Log</span>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} />
            </div>

            {result.memoryStored && (
              <div style={{ background: '#0d2e2020', border: '1px solid #10b98140', borderRadius: 12, padding: '14px', marginBottom: 12, animation: 'fadeIn 0.5s ease' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981', marginBottom: 6 }}>✅ Stored to Hindsight</div>
                <p style={{ margin: 0, fontSize: 11, color: '#6ee7b7', lineHeight: 1.6 }}>{result.memoryStored}</p>
              </div>
            )}

            {result.pastMistakes?.length > 0 ? (
              <div style={{ background: '#6c63ff10', border: '1px solid #6c63ff40', borderRadius: 12, padding: '14px', animation: 'fadeIn 0.7s ease' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 8 }}>🔁 Recalled from Hindsight</div>
                {result.pastMistakes.slice(0, 4).map((m, i) => (
                  <p key={i} style={{ margin: '4px 0', fontSize: 11, color: '#c4b5fd', lineHeight: 1.6 }}>• {m}</p>
                ))}
              </div>
            ) : (
              <div style={{ background: '#1e1e2e', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>💤</div>
                <p style={{ color: '#6b6b80', fontSize: 12, margin: 0 }}>No past sessions yet. Submit again to see recall.</p>
              </div>
            )}

            <div style={{ marginTop: 16, padding: '12px', background: '#1e1e2e', borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: '#6b6b80', marginBottom: 4, letterSpacing: '1px' }}>HINDSIGHT STATUS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#10b981' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                Connected · TraceX bank
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

function calculateScore(result) {
  let codeScore = 100;
  if (result.errorType) codeScore -= 30;
  if (result.pastMistakes?.length > 0) codeScore -= result.pastMistakes.length * 5;
  return { codeScore: Math.max(codeScore, 20) };
}

const btnPrimary = {
  background: '#6c63ff', color: '#fff', border: 'none',
  borderRadius: 10, padding: '11px 20px', fontSize: 12,
  fontWeight: 700, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
};
const btnSecondary = {
  background: 'transparent', color: '#6b6b80',
  border: '1px solid #2a2a3a', borderRadius: 10,
  padding: '11px 20px', fontSize: 12, cursor: 'pointer',
  fontFamily: 'JetBrains Mono, monospace',
};