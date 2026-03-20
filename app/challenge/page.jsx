'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTheoryLink } from '@/lib/theoryLinks';

export default function ChallengePage() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(false);
  const [topic, setTopic] = useState('binary-search');
  const router = useRouter();

  useEffect(() => {
    const raw = sessionStorage.getItem('traceResult');
    if (raw) {
      const result = JSON.parse(raw);
      setTopic(result.topic || 'binary-search');
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

  const theory = getTheoryLink(topic);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1117', fontFamily: 'JetBrains Mono, monospace', position: 'relative' }}>

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 50%)' }} />

      {/* Solved Modal */}
      {solved && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#161b22', border: '1px solid #10b98150',
            borderRadius: 20, padding: 48, textAlign: 'center', maxWidth: 380,
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🌟</div>
            <h2 style={{ color: '#e6edf3', fontWeight: 800, marginBottom: 8, fontSize: 22 }}>
              You did it! 🎉
            </h2>
            <p style={{ color: '#8b949e', fontSize: 13, marginBottom: 8, lineHeight: 1.7 }}>
              Amazing work. You just practiced fixing a <span style={{ color: '#6c63ff' }}>{challenge?.title?.toLowerCase()}</span>.
            </p>
            <p style={{ color: '#6b6b80', fontSize: 12, marginBottom: 24, lineHeight: 1.7 }}>
              TraceX has noted your progress. Keep this energy going! 🚀
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => router.push('/')} style={btnPrimary}>✏️ Practice More</button>
              <button onClick={() => setSolved(false)} style={btnSecondary}>Stay here</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{
        width: 240, background: 'rgba(13,17,23,0.97)',
        borderRight: '1px solid #21262d',
        display: 'flex', flexDirection: 'column', padding: '28px 0',
        position: 'fixed', height: '100vh', zIndex: 10,
      }}>
        <div style={{ padding: '0 20px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#fff',
            }}>T</div>
            <span style={{ fontSize: 19, fontWeight: 800, color: '#e6edf3' }}>TraceX</span>
          </div>
          <div style={{ fontSize: 10, color: '#6b6b80', letterSpacing: '2px', paddingLeft: 2 }}>your coding companion</div>
        </div>

        {[
          { icon: '✏️', label: 'Practice', active: false, href: '/' },
          { icon: '🧠', label: 'My Feedback', active: false, href: '/feedback' },
          { icon: '🌱', label: 'Grow', active: true, href: '/challenge' },
        ].map(item => (
          <div key={item.label} onClick={() => router.push(item.href)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 20px', cursor: 'pointer', fontSize: 13,
            background: item.active ? '#6c63ff12' : 'transparent',
            borderLeft: item.active ? '3px solid #6c63ff' : '3px solid transparent',
            color: item.active ? '#e6edf3' : '#6b6b80', transition: 'all 0.2s',
            borderRadius: '0 8px 8px 0', marginRight: 12,
          }}>
            <span>{item.icon}</span>{item.label}
          </div>
        ))}

        <div style={{ margin: '24px 16px 0', padding: '16px', background: '#161b22', borderRadius: 14, border: '1px solid #21262d' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>💪</div>
          <p style={{ fontSize: 12, color: '#8b949e', margin: 0, lineHeight: 1.7 }}>
            Practice is how you grow. There's no timer here — take your time.
          </p>
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

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, padding: '48px', position: 'relative', zIndex: 1 }}>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, color: '#10b981', letterSpacing: '3px', marginBottom: 10 }}>TIME TO GROW 🌱</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#e6edf3', margin: '0 0 10px' }}>Practice Set</h1>
          <p style={{ color: '#8b949e', fontSize: 13, margin: 0 }}>
            This exercise is tailored to what you just worked on. No rush — think it through. 🙂
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#6b6b80' }}>
            <div style={{ width: 36, height: 36, border: '3px solid #21262d', borderTop: '3px solid #6c63ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <p style={{ fontSize: 13 }}>Picking the right exercise for you...</p>
          </div>
        ) : !challenge ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <p style={{ color: '#6b6b80', fontSize: 13 }}>
              No exercise found. <span onClick={() => router.push('/')} style={{ color: '#6c63ff', cursor: 'pointer' }}>Go practice some code first →</span>
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: 800, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>

            {/* Challenge Card */}
            <div style={{
              background: '#161b22', borderRadius: 18,
              border: '1px solid #21262d', padding: 32,
              animation: 'fadeIn 0.5s ease',
            }}>
              <span style={{
                background: '#10b98115', color: '#10b981',
                padding: '4px 14px', borderRadius: 20,
                fontSize: 11, fontWeight: 700, letterSpacing: '1px',
              }}>🌱 PRACTICE SET</span>

              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e6edf3', margin: '16px 0 10px' }}>
                {challenge.title}
              </h2>
              <p style={{ color: '#8b949e', lineHeight: 1.8, fontSize: 13, marginBottom: 24 }}>
                {challenge.description}
              </p>

              {/* Code Block */}
              <div style={{ background: '#0d1117', borderRadius: 12, overflow: 'hidden', border: '1px solid #21262d', marginBottom: 20 }}>
                <div style={{ background: '#161b22', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #21262d' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ marginLeft: 8, fontSize: 11, color: '#6b6b80' }}>exercise.java</span>
                </div>
                <pre style={{ padding: 20, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#a8c8e8', lineHeight: 1.8, margin: 0, overflow: 'auto' }}>
                  {challenge.starterCode}
                </pre>
              </div>

              {/* Hint */}
              <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b25', borderRadius: 10, padding: '12px 16px', marginBottom: 24 }}>
                <span style={{ fontSize: 12, color: '#f59e0b' }}>💡 Hint: {challenge.hint}</span>
              </div>

              <button onClick={() => setSolved(true)} style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff', border: 'none', borderRadius: 12,
                padding: '13px 28px', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
              }}>✅ I fixed it!</button>
            </div>

            {/* Theory Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#161b22', borderRadius: 16, border: '1px solid #21262d', padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e6edf3', marginBottom: 12 }}>
                  📺 Watch & Learn
                </div>
                <p style={{ fontSize: 12, color: '#8b949e', marginBottom: 14, lineHeight: 1.7 }}>
                  Struggling with the concept? This video explains it really well:
                </p>
                <a href={theory.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'block', background: '#6c63ff15', border: '1px solid #6c63ff30',
                  borderRadius: 10, padding: '12px', textDecoration: 'none', marginBottom: 8,
                }}>
                  <div style={{ fontSize: 12, color: '#a78bfa', fontWeight: 700, marginBottom: 4 }}>{theory.title}</div>
                  <div style={{ fontSize: 11, color: '#6b6b80' }}>▶ {theory.channel} on YouTube</div>
                </a>
              </div>

              <div style={{ background: '#161b22', borderRadius: 16, border: '1px solid #21262d', padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#e6edf3', marginBottom: 12 }}>📌 Key Concepts</div>
                {theory.concepts.map((c, i) => (
                  <p key={i} style={{ fontSize: 11, color: '#8b949e', margin: '0 0 8px', lineHeight: 1.7 }}>• {c}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

const btnPrimary = {
  background: '#6c63ff', color: '#fff', border: 'none',
  borderRadius: 10, padding: '12px 22px', fontSize: 12,
  fontWeight: 700, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
};
const btnSecondary = {
  background: 'transparent', color: '#6b6b80', border: '1px solid #21262d',
  borderRadius: 10, padding: '12px 22px', fontSize: 12,
  cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
};