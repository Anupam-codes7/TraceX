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
  const [xp, setXp] = useState(false);
  const router = useRouter();

  async function handleAnalyze() {
    if (!code.trim()) { showToast('⚠️ Paste your code first'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, topic, language }),
      });
      const data = await res.json();
      setXp(true);
      setTimeout(() => {
        sessionStorage.setItem('traceResult', JSON.stringify(data));
        router.push('/feedback');
      }, 1200);
    } catch {
      showToast('❌ Something went wrong');
      setLoading(false);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function getExtension() {
    if (language === 'java') {
      const { java } = await import('@codemirror/lang-java');
      return [java()];
    } else if (language === 'python') {
      const { python } = await import('@codemirror/lang-python');
      return [python()];
    } else if (language === 'cpp') {
      const { cpp } = await import('@codemirror/lang-cpp');
      return [cpp()];
    } else {
      const { javascript } = await import('@codemirror/lang-javascript');
      return [javascript()];
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f', fontFamily: 'JetBrains Mono, monospace', position: 'relative', overflow: 'hidden' }}>

      {/* Animated Grid Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(108,99,255,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(108,99,255,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        animation: 'gridMove 20s linear infinite',
      }} />

      {/* Glow Orbs */}
      <div style={{
        position: 'fixed', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)',
        top: -200, left: -100, zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        bottom: -100, right: 100, zIndex: 0, pointerEvents: 'none',
      }} />

      {/* XP Animation */}
      {xp && (
        <div style={{
          position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          zIndex: 9999, textAlign: 'center', animation: 'xpPop 1.2s ease forwards',
        }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#6c63ff' }}>+50 XP</div>
          <div style={{ fontSize: 14, color: '#10b981', marginTop: 4 }}>Memory Stored to Hindsight</div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 999,
          background: '#1e1e2e', border: '1px solid #6c63ff',
          color: '#e8e8f0', padding: '12px 20px', borderRadius: 10,
          fontSize: 13, animation: 'slideIn 0.3s ease',
        }}>{toast}</div>
      )}

      {/* Sidebar */}
      <aside style={{
        width: 240, background: 'rgba(15,15,23,0.95)', borderRight: '1px solid #1e1e2e',
        display: 'flex', flexDirection: 'column', padding: '24px 0',
        position: 'fixed', height: '100vh', zIndex: 10,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ padding: '0 20px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#fff',
            }}>T</div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#6c63ff', letterSpacing: '-0.5px' }}>TraceX</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 10, color: '#6b6b80', letterSpacing: '2px' }}>HACKER ARENA</div>
        </div>

        {[
          { icon: '⚡', label: 'Analyze Code', active: true, href: '/' },
          { icon: '🧠', label: 'Memory Log', active: false, href: '/feedback' },
          { icon: '🎯', label: 'Challenges', active: false, href: '/challenge' },
        ].map(item => (
          <div key={item.label} onClick={() => router.push(item.href)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '13px 20px', cursor: 'pointer', fontSize: 13,
            background: item.active ? '#6c63ff15' : 'transparent',
            borderLeft: item.active ? '3px solid #6c63ff' : '3px solid transparent',
            color: item.active ? '#e8e8f0' : '#6b6b80', transition: 'all 0.2s',
          }}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        {/* XP Bar */}
        <div style={{ margin: '24px 20px 0', padding: '16px', background: '#13131a', borderRadius: 12, border: '1px solid #1e1e2e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#6b6b80' }}>LEVEL 1</span>
            <span style={{ fontSize: 11, color: '#6c63ff' }}>50 / 200 XP</span>
          </div>
          <div style={{ height: 6, background: '#1e1e2e', borderRadius: 3 }}>
            <div style={{ width: '25%', height: '100%', background: 'linear-gradient(90deg, #6c63ff, #a78bfa)', borderRadius: 3, transition: 'width 0.5s ease' }} />
          </div>
        </div>

        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #1e1e2e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: '#6c63ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
            }}>D</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#e8e8f0' }}>Demo User</div>
              <div style={{ fontSize: 10, color: '#6b6b80' }}>demo_user_001</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, padding: '40px', position: 'relative', zIndex: 1 }}>

        {/* Hero Header */}
        <div style={{ marginBottom: 40, textAlign: 'center', paddingTop: 20 }}>
          <div style={{ fontSize: 11, color: '#6c63ff', letterSpacing: '4px', marginBottom: 12 }}>
            — HACKER ARENA —
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#e8e8f0', margin: '0 0 12px', letterSpacing: '-1px', lineHeight: 1.1 }}>
            Trace Every Mistake.
            <br />
            <span style={{ color: '#6c63ff' }}>Never Repeat One.</span>
          </h1>
          <p style={{ color: '#6b6b80', fontSize: 14, margin: 0 }}>
            Paste your code. TraceX analyzes it and remembers your errors forever.
          </p>
        </div>

        {/* Controls Row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, justifyContent: 'center' }}>
          {[
            { label: 'TOPIC', value: topic, setter: setTopic, options: [
              { value: 'binary-search', label: 'Binary Search' },
              { value: 'linked-list', label: 'Linked List' },
              { value: 'recursion', label: 'Recursion' },
              { value: 'sorting', label: 'Sorting' },
              { value: 'trees', label: 'Trees' },
            ]},
            { label: 'LANGUAGE', value: language, setter: setLanguage, options: [
              { value: 'java', label: 'Java' },
              { value: 'python', label: 'Python' },
              { value: 'cpp', label: 'C++' },
              { value: 'javascript', label: 'JavaScript' },
            ]},
          ].map(ctrl => (
            <div key={ctrl.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 10, color: '#6b6b80', letterSpacing: '2px' }}>{ctrl.label}</label>
              <select value={ctrl.value} onChange={e => ctrl.setter(e.target.value)} style={selectStyle}>
                {ctrl.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* IDE Editor */}
        <div style={{
          border: '1px solid #2a2a3a', borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 0 40px rgba(108,99,255,0.1)',
          maxWidth: 900, margin: '0 auto',
        }}>
          {/* IDE Title Bar */}
          <div style={{
            background: '#13131a', padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: '1px solid #1e1e2e',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ marginLeft: 12, fontSize: 12, color: '#6b6b80' }}>
              main.{language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : language === 'javascript' ? 'js' : 'java'}
            </span>
          </div>

          <CodeMirror
            value={code}
            height="360px"
            theme="dark"
            onChange={(val) => setCode(val)}
            placeholder="// Paste or type your code here..."
            style={{ fontSize: 14 }}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              autocompletion: true,
              foldGutter: true,
            }}
          />
        </div>

        {/* Analyze Button */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              padding: '16px 48px',
              background: loading ? '#2a2a3a' : 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              color: '#fff', border: 'none', borderRadius: 12,
              fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              boxShadow: loading ? 'none' : '0 0 30px rgba(108,99,255,0.4)',
              transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: 10,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16, border: '2px solid #ffffff40',
                  borderTop: '2px solid #fff', borderRadius: '50%',
                  display: 'inline-block', animation: 'spin 0.8s linear infinite',
                }} />
                Analyzing...
              </>
            ) : '⚡ Analyze My Code'}
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48, maxWidth: 900, margin: '48px auto 0' }}>
          {[
            { label: 'Sessions Analyzed', value: '1', icon: '📊', color: '#6c63ff' },
            { label: 'Errors Traced', value: '1', icon: '🐛', color: '#ef4444' },
            { label: 'Memory Stored', value: '1', icon: '🧠', color: '#10b981' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'rgba(19,19,26,0.8)', border: `1px solid ${stat.color}30`,
              borderRadius: 14, padding: '20px 24px',
              display: 'flex', alignItems: 'center', gap: 16,
              backdropFilter: 'blur(10px)',
            }}>
              <span style={{ fontSize: 28 }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: '#6b6b80' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes gridMove { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        @keyframes xpPop { 0%{opacity:0;transform:translate(-50%,-50%) scale(0.5)} 40%{opacity:1;transform:translate(-50%,-50%) scale(1.1)} 70%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(-50%,-60%) scale(1)} }
        * { box-sizing: border-box; }
        select option { background: #13131a; }
        .cm-editor { background: #0d0d14 !important; }
        .cm-gutters { background: #13131a !important; border-right: 1px solid #1e1e2e !important; }
      `}</style>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  background: '#13131a', color: '#e8e8f0',
  border: '1px solid #2a2a3a', borderRadius: 10,
  padding: '10px 16px', fontSize: 13,
  fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', outline: 'none',
  minWidth: 160,
};