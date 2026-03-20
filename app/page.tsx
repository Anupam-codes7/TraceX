'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });

export default function Home() {
  const [code, setCode] = useState('');
  const [topic, setTopic] = useState('binary-search');
  const [language, setLanguage] = useState('java');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const router = useRouter();

  async function handleAnalyze() {
    if (!code.trim()) { showToast('Paste your code first 🙂'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, topic, language }),
      });
      const data = await res.json();
      sessionStorage.setItem('traceResult', JSON.stringify({ ...data, topic }));
      router.push('/feedback');
    } catch {
      showToast('Something went wrong, try again');
      setLoading(false);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1117', fontFamily: 'JetBrains Mono, monospace', position: 'relative', overflow: 'hidden' }}>

      {/* Soft Glow Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.04) 0%, transparent 50%)' }} />

      {/* Subtle Grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 999,
          background: '#161b22', border: '1px solid #6c63ff50',
          color: '#c9d1d9', padding: '12px 20px', borderRadius: 12,
          fontSize: 13, animation: 'slideIn 0.3s ease',
        }}>{toast}</div>
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
          { icon: '✏️', label: 'Practice', active: true, href: '/' },
          { icon: '🧠', label: 'My Feedback', active: false, href: '/feedback' },
          { icon: '🌱', label: 'Grow', active: false, href: '/challenge' },
        ].map(item => (
          <div key={item.label} onClick={() => router.push(item.href)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 20px', cursor: 'pointer', fontSize: 13,
            background: item.active ? '#6c63ff12' : 'transparent',
            borderLeft: item.active ? '3px solid #6c63ff' : '3px solid transparent',
            color: item.active ? '#e6edf3' : '#6b6b80', transition: 'all 0.2s',
            borderRadius: '0 8px 8px 0', marginRight: 12,
          }}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        {/* Encouragement Card */}
        <div style={{ margin: '24px 16px 0', padding: '16px', background: '#161b22', borderRadius: 14, border: '1px solid #21262d' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🌟</div>
          <p style={{ fontSize: 12, color: '#8b949e', margin: 0, lineHeight: 1.7 }}>
            Every bug you fix makes you a better developer. Keep going!
          </p>
        </div>

        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #21262d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
            }}>D</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3' }}>Demo User</div>
              <div style={{ fontSize: 10, color: '#6b6b80' }}>learning every day 🌱</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, padding: '48px 48px', position: 'relative', zIndex: 1 }}>

        {/* Friendly Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#6c63ff', letterSpacing: '3px', marginBottom: 12 }}>GOOD TO SEE YOU 👋</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#e6edf3', margin: '0 0 12px', lineHeight: 1.15 }}>
            What are you<br />
            <span style={{ color: '#6c63ff' }}>working on today?</span>
          </h1>
          <p style={{ color: '#8b949e', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            Paste your code below — no pressure, no judgment.<br />
            TraceX will gently guide you through it. 🙂
          </p>
        </div>

        {/* Topic + Language */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          {[
            { label: 'Topic', value: topic, setter: setTopic, options: [
              { value: 'binary-search', label: '🔍 Binary Search' },
              { value: 'linked-list', label: '🔗 Linked List' },
              { value: 'recursion', label: '🔄 Recursion' },
              { value: 'sorting', label: '📊 Sorting' },
              { value: 'trees', label: '🌳 Trees' },
            ]},
            { label: 'Language', value: language, setter: setLanguage, options: [
              { value: 'java', label: 'Java' },
              { value: 'python', label: 'Python' },
              { value: 'cpp', label: 'C++' },
              { value: 'javascript', label: 'JavaScript' },
            ]},
          ].map(ctrl => (
            <div key={ctrl.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, color: '#6b6b80', letterSpacing: '1px' }}>{ctrl.label}</label>
              <select value={ctrl.value} onChange={e => ctrl.setter(e.target.value)} style={selectStyle}>
                {ctrl.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* IDE */}
        <div style={{
          border: '1px solid #21262d', borderRadius: 16, overflow: 'hidden',
          maxWidth: 860, boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            background: '#161b22', padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: '1px solid #21262d',
          }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ marginLeft: 12, fontSize: 12, color: '#6b6b80' }}>
              main.{language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : language === 'javascript' ? 'js' : 'java'}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#6c63ff' }}>✨ no judgment zone</span>
          </div>
          <CodeMirror
            value={code}
            height="340px"
            theme="dark"
            onChange={(val) => setCode(val)}
            placeholder="// Start typing or paste your code here — take your time 🙂"
            style={{ fontSize: 14 }}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: true,
              autocompletion: true,
              foldGutter: true,
            }}
          />
        </div>

        {/* Review Button */}
        <div style={{ marginTop: 20, maxWidth: 860, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              padding: '14px 40px',
              background: loading ? '#21262d' : 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              color: '#fff', border: 'none', borderRadius: 12,
              fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              boxShadow: loading ? 'none' : '0 4px 24px rgba(108,99,255,0.35)',
              transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: 10,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 15, height: 15, border: '2px solid #ffffff30',
                  borderTop: '2px solid #fff', borderRadius: '50%',
                  display: 'inline-block', animation: 'spin 0.8s linear infinite',
                }} />
                Reviewing your code...
              </>
            ) : '✨ Review My Code'}
          </button>
          <span style={{ fontSize: 12, color: '#6b6b80' }}>Takes about 5 seconds 🕐</span>
        </div>

        {/* Progress Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48, maxWidth: 860 }}>
          {[
            { label: 'Sessions this week', value: '1', icon: '📅', color: '#6c63ff', msg: 'Great start!' },
            { label: 'Concepts explored', value: '1', icon: '🔍', color: '#10b981', msg: 'Keep exploring' },
            { label: 'Memories saved', value: '1', icon: '🧠', color: '#a78bfa', msg: 'Building your profile' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#161b22', border: '1px solid #21262d',
              borderRadius: 14, padding: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>{stat.icon}</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</span>
              </div>
              <div style={{ fontSize: 12, color: '#8b949e', marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: stat.color }}>{stat.msg}</div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        * { box-sizing: border-box; }
        select option { background: #161b22; }
        .cm-editor { background: #0d1117 !important; }
        .cm-gutters { background: #161b22 !important; border-right: 1px solid #21262d !important; }
        .cm-activeLineGutter { background: #6c63ff15 !important; }
        .cm-activeLine { background: #6c63ff08 !important; }
      `}</style>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  background: '#161b22', color: '#e6edf3',
  border: '1px solid #21262d', borderRadius: 10,
  padding: '10px 16px', fontSize: 13,
  fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', outline: 'none',
  minWidth: 160,
};