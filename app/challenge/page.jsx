'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChallengePage() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const raw = sessionStorage.getItem('traceResult');
    if (raw) {
      const result = JSON.parse(raw);
      fetchChallenge(result.errorType);
    } else setLoading(false);
  }, []);

  async function fetchChallenge(errorType) {
    try {
      const res = await fetch('/api/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ errorType }),
      });
      setChallenge(await res.json());
    } finally { setLoading(false); }
  }

  const difficulty = getDifficulty(challenge?.title);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f', fontFamily: 'JetBrains Mono, monospace', position: 'relative', overflow: 'hidden' }}>

      {/* Grid Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Solved Modal */}
      {solved && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            background: '#13131a', border: '1px solid #10b981',
            borderRadius: 20, padding: 48, textAlign: 'center', maxWidth: 400,
            boxShadow: '0 0 60px rgba(16,185,129,0.3)',
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
            <h2 style={{ color: '#10b981', fontWeight: 800, marginBottom: 8, fontSize: 24 }}>Mission Complete!</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
              {'⭐'.repeat(difficulty.stars).split('').map((s, i) => (
                <span key={i} style={{ fontSize: 24, animation: `starPop 0.3s ease ${i * 0.1}s both` }}>{s}</span>
              ))}
            </div>
            <p style={{ color: '#6b6b80', fontSize: 13, marginBottom: 24, lineHeight: 1.7 }}>
              +{difficulty.xp} XP earned. This error pattern has been logged. Keep practicing to eliminate it permanently.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => router.push('/')} style={btnPrimary}>⚡ Analyze More Code</button>
              <button onClick={() => setSolved(false)} style={btnSecondary}>Close</button>
            </div>
          </div>
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
          { icon: '🧠', label: 'Memory Log', active: false, href: '/feedback' },
          { icon: '🎯', label: 'Challenges', active: true, href: '/challenge' },
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

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#f59e0b', letterSpacing: '4px', marginBottom: 8 }}>— MISSION BRIEFING —</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: '#e8e8f0', margin: '0 0 8px' }}>Targeted Challenge</h1>
          <p style={{ color: '#6b6b80', fontSize: 13, margin: 0 }}>This mission targets your specific error pattern from the last analysis.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#6b6b80' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #2a2a3a', borderTop: '3px solid #6c63ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <p style={{ fontSize: 13 }}>Loading your mission...</p>
          </div>
        ) : !challenge ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <p style={{ color: '#6b6b80', fontSize: 13 }}>No challenge found. <span onClick={() => router.push('/')} style={{ color: '#6c63ff', cursor: 'pointer' }}>Analyze code first →</span></p>
          </div>
        ) : (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>

            {/* Mission Card */}
            <div style={{
              background: 'rgba(19,19,26,0.9)', borderRadius: 20,
              border: '1px solid #2a2a3a', padding: 36,
              boxShadow: '0 0 40px rgba(108,99,255,0.1)',
              animation: 'fadeIn 0.5s ease',
            }}>
              {/* Mission Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    background: '#f59e0b20', color: '#f59e0b',
                    padding: '4px 14px', borderRadius: 20, fontSize: 11,
                    fontWeight: 700, letterSpacing: '1px',
                  }}>🎯 MISSION</span>
                  <span style={{
                    background: `${difficulty.color}20`, color: difficulty.color,
                    padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  }}>{difficulty.label}</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1, 2, 3].map(s => (
                    <span key={s} style={{ fontSize: 18, opacity: s <= difficulty.stars ? 1 : 0.2 }}>⭐</span>
                  ))}
                </div>
              </div>

              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#e8e8f0', marginBottom: 12 }}>
                {challenge.title}
              </h2>
              <p style={{ color: '#9898a8', lineHeight: 1.8, fontSize: 13, marginBottom: 28 }}>
                {challenge.description}
              </p>

              {/* Code Block */}
              <div style={{
                background: '#0a0a0f', borderRadius: 12, overflow: 'hidden',
                border: '1px solid #1e1e2e', marginBottom: 20,
              }}>
                <div style={{
                  background: '#13131a', padding: '10px 16px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  borderBottom: '1px solid #1e1e2e',
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ marginLeft: 8, fontSize: 11, color: '#6b6b80' }}>buggy_code.java</span>
                </div>
                <pre style={{
                  padding: 20, fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 13, color: '#a8c8e8', lineHeight: 1.8,
                  margin: 0, overflow: 'auto',
                }}>{challenge.starterCode}</pre>
              </div>

              {/* Hint */}
              <div style={{
                background: '#f59e0b10', border: '1px solid #f59e0b30',
                borderRadius: 10, padding: '12px 18px', marginBottom: 28,
              }}>
                <span style={{ fontSize: 13, color: '#f59e0b' }}>💡 Hint: {challenge.hint}</span>
              </div>

              {/* XP Reward */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, color: '#6b6b80' }}>
                  Reward: <span style={{ color: '#a78bfa', fontWeight: 700 }}>+{difficulty.xp} XP</span>
                </div>
                <button onClick={() => setSolved(true)} style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff', border: 'none', borderRadius: 12,
                  padding: '14px 32px', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '0 0 20px rgba(16,185,129,0.3)',
                }}>✅ Mark as Solved</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes starPop { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

function getDifficulty(title) {
  if (!title) return { stars: 1, label: 'EASY', color: '#10b981', xp: 50 };
  const t = title.toLowerCase();
  if (t.includes('null') || t.includes('infinite')) return { stars: 3, label: 'HARD', color: '#ef4444', xp: 150 };
  if (t.includes('sort') || t.includes('tree')) return { stars: 2, label: 'MEDIUM', color: '#f59e0b', xp: 100 };
  return { stars: 1, label: 'EASY', color: '#10b981', xp: 50 };
}

const btnPrimary = {
  background: '#6c63ff', color: '#fff', border: 'none',
  borderRadius: 10, padding: '12px 24px', fontSize: 13,
  fontWeight: 700, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
};
const btnSecondary = {
  background: 'transparent', color: '#6b6b80', border: '1px solid #2a2a3a',
  borderRadius: 10, padding: '12px 24px', fontSize: 13,
  cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
};