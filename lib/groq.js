import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeCode({ code, topic, language, pastMistakes }) {
  const memoryContext = pastMistakes?.length
    ? `HINDSIGHT MEMORY — Past mistakes by this student:\n${pastMistakes.map((m, i) => `${i + 1}. ${m}`).join('\n')}\n\n`
    : '';

  const prompt = `${memoryContext}You are TraceX, an AI coding mentor. Analyze this ${language} code for the topic "${topic}".

Code:
\`\`\`${language}
${code}
\`\`\`

${pastMistakes?.length ? `IMPORTANT: The student has made these mistakes before. If you see a pattern, call it out explicitly at the start of your response.` : ''}

Respond in EXACTLY this format with these exact section headers:

[ANALYSIS]
What is wrong with this code and why. Be specific. 2-3 sentences max.

[BETTER APPROACH]
How should this be written better. Explain the correct logic. 2-3 sentences max.

[CORRECTED CODE]
\`\`\`${language}
paste the corrected version of the code here
\`\`\`

${pastMistakes?.length ? `[HINDSIGHT WARNING]
Reference the past mistakes and warn if student is repeating a pattern. 1-2 sentences.` : ''}

Keep total response under 300 words. Be direct and educational.`;

  const completion = await groq.chat.completions.create({
    model: 'qwen/qwen3-32b',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 800,
  });

  let response = completion.choices[0].message.content;
  
  // Strip <think> tags and content inside them
  response = response.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  
  return response;
}