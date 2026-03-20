Here's the complete README:

```markdown
# ⚡ TraceX — AI Coding Mentor That Remembers

> **Trace every mistake. Never repeat one.**

![TraceX](https://img.shields.io/badge/TraceX-AI%20Coding%20Mentor-6c63ff?style=for-the-badge&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![Groq](https://img.shields.io/badge/Groq-qwen3--32b-orange?style=for-the-badge)
![Hindsight](https://img.shields.io/badge/Hindsight-Memory%20Layer-10b981?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)

---

## 🌱 What is TraceX?

15 million CS students in India grind DSA every day. None of their platforms remember them.

**TraceX does.**

TraceX is an AI-powered coding mentor that analyzes your code, identifies your mistakes, and **remembers them across every session** using Hindsight memory. The more you use it, the more personalized your feedback becomes.

No stress. No judgment. No pressure. Just growth. 🌱

---

## 🎯 The Problem We Solve

Every time you open LeetCode or HackerRank — it has no idea who you are.

- It does not know you keep making off-by-one errors in binary search
- It does not know you struggle with null pointer exceptions in linked lists
- It does not know you have submitted the same wrong recursion 4 times

**TraceX remembers all of this. And uses it to help you grow.**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **Persistent Memory** | Hindsight stores every mistake and recalls them in future sessions |
| 🔍 **3-Part Feedback** | Analysis → Better Approach → Corrected Code |
| 💻 **IDE-Style Editor** | CodeMirror with line numbers, syntax highlighting, active line highlight |
| 📺 **YouTube Theory Links** | Confused about a concept? Get a curated video instantly |
| 🎯 **Targeted Practice** | Challenges tailored to your specific error pattern |
| ⚠️ **Pattern Warnings** | TraceX warns you when you are repeating the same mistake |
| 🌟 **Stress-Free UX** | Designed to feel like a coding companion, not an exam |
| 📌 **Quick Concept Reminders** | Key theory points shown alongside every challenge |

---

## 🧠 How Hindsight Memory Works

This is the core of TraceX. Every submission stores a memory. Every new session recalls it.

### Storing a mistake — `retain()`

```javascript
await client.retain(
  'TraceX',
  `Student submitted ${language} code for ${topic}. Error found: ${errorType}.`
);
```

### Recalling past mistakes — `recall()`

```javascript
const response = await client.recall(
  'TraceX',
  `What mistakes has this student made in ${topic}?`
);
const pastMistakes = response.results.map(r => r.text);
```

### How memory changes your feedback

```javascript
// Past mistakes are injected into the Groq prompt
const memoryContext = pastMistakes?.length
  ? `HINDSIGHT MEMORY — Past mistakes by this student:\n${pastMistakes.join('\n')}\n\n`
  : '';

// Result: Groq gives personalized feedback based on your history
```

**Without memory:**
> "Your binary search has an off-by-one error. Fix the boundary condition."

**With Hindsight memory:**
> "You have made this exact off-by-one error in binary search 3 times now. This is becoming a pattern. Focus specifically on your loop termination condition — always use left <= right, never left < right."

---

## 🖥️ App Screens

### Screen 1 — Practice (Home)
- IDE-style code editor with syntax highlighting
- Topic and language selector
- One-click code review
- Session stats

### Screen 2 — My Feedback
- 3-tab feedback panel: What happened / Better way / Fixed code
- Memory Log showing retain() and recall() in action
- Hindsight warning if you are repeating a pattern
- Quick concept reminders

### Screen 3 — Grow (Challenge)
- Targeted practice exercise based on your error
- YouTube theory video recommendation
- Key concept reminders
- Completion celebration

---

## 🛠️ Tech Stack

```
Framework     →  Next.js 16.2 (App Router)
Styling       →  Tailwind CSS + Inline styles
LLM           →  Groq API — qwen/qwen3-32b (free tier)
Memory        →  Hindsight Cloud SDK
Code Editor   →  CodeMirror (@uiw/react-codemirror)
Deployment    →  Vercel
Repository    →  GitHub
```

---

## 📁 Project Structure

```
tracex/
├── app/
│   ├── page.tsx                 ← Home — IDE editor + code submission
│   ├── layout.js                ← Root layout
│   ├── globals.css              ← Global styles
│   ├── feedback/page.jsx        ← Feedback — 3-part analysis + memory log
│   ├── challenge/page.jsx       ← Challenge — targeted practice + YouTube
│   └── api/
│       ├── analyze/route.js     ← Groq analysis + Hindsight retain/recall
│       └── challenge/route.js   ← Returns targeted challenge by error type
├── lib/
│   ├── hindsight.js             ← retain() and recall() wrapper
│   ├── groq.js                  ← Groq prompt builder
│   ├── prompts.js               ← Prompt templates
│   ├── challenges.js            ← 5 hardcoded challenges by error type
│   ├── errorMap.js              ← Maps error types to challenge types
│   └── theoryLinks.js           ← YouTube links + concepts by topic
├── .env.example
└── README.md
```

---

## 🚀 Run Locally

**1. Clone the repo**
```bash
git clone https://github.com/Anupam-codes7/TraceX.git
cd TraceX
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in `.env.local`:
```bash
HINDSIGHT_URL=https://api.hindsight.vectorize.io
HINDSIGHT_API_KEY=your_hindsight_key
GROQ_API_KEY=your_groq_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**4. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

---

## 🧪 Test Hindsight Connection

Create `test-hindsight.mjs` in the root and run:

```javascript
import { HindsightClient } from '@vectorize-io/hindsight-client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_URL,
  apiKey: process.env.HINDSIGHT_API_KEY,
});

// Test retain
await client.retain('TraceX', 'off-by-one error in Java binary search');
console.log('✅ retain() worked');

// Test recall
const result = await client.recall('TraceX', 'What errors has this student made?');
console.log('✅ recall() result:', result.results);
```

```bash
node test-hindsight.mjs
```

Expected output:
```
✅ retain() worked
✅ recall() result: [ { text: 'off-by-one error in Java binary search | When: ...' } ]
```

---

## 🔑 Environment Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `HINDSIGHT_URL` | Hindsight Cloud base URL | ui.hindsight.vectorize.io → Connect |
| `HINDSIGHT_API_KEY` | Hindsight API key | ui.hindsight.vectorize.io → Connect |
| `GROQ_API_KEY` | Groq API key | console.groq.com |
| `NEXT_PUBLIC_APP_URL` | Your app URL | localhost:3000 or Vercel URL |

---

## 🎬 Demo

**Demo Video:** [Watch on YouTube](#) ← add your link

**Live App:** [tracex.vercel.app](#) ← add your Vercel URL

**Demo script:**
1. Paste Java binary search with off-by-one error
2. Click Review My Code
3. Show 3-part feedback panel
4. Show Memory Log — retain() fired, memory stored
5. Submit again — recall() returns past mistake
6. Show personalized warning — "You have made this error before"
7. Go to Practice Set — targeted challenge loads
8. Show YouTube theory link popup

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| 🌐 Live Demo | [tracex.vercel.app](#) |
| 📦 Hindsight GitHub | [github.com/vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) |
| 📚 Hindsight Docs | [hindsight.vectorize.io](https://hindsight.vectorize.io/) |
| ⚡ Agent Memory | [vectorize.io/features/agent-memory](https://vectorize.io/features/agent-memory) |
| 🤖 Groq Console | [console.groq.com](https://console.groq.com) |

---

## 👥 Team

Built with ❤️ for the Hindsight Memory Hackathon

| Member | Role |
|--------|------|
| Anupam | Repo Owner · Integration · Frontend |
| Teammate B | Backend · Hindsight · API Routes |
| Teammate C | AI Prompts · Content · Challenges |

---

## 🗺️ Roadmap

- [ ] User authentication with Clerk
- [ ] Per-user memory banks
- [ ] Error fingerprint profile chart
- [ ] Streak tracking and progress over time
- [ ] More languages and topics
- [ ] Mobile responsive layout

---

## 📄 License

MIT License — free to use, fork, and build on.

---

<div align="center">

**TraceX** — Because every mistake deserves to be remembered. 🧠

Made with ⚡ using [Hindsight](https://hindsight.vectorize.io/) · [Groq](https://groq.com) · [Next.js](https://nextjs.org)

⭐ Star this repo if TraceX helped you learn!

</div>
```

---

Paste this into your GitHub README, commit, then update the two `#` placeholder links once Vercel deployment is working.
