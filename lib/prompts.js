export function buildAnalysisPrompt({ code, topic, language, pastMistakes }) {
  const memoryContext = pastMistakes?.length
    ? `Past mistakes:\n${pastMistakes.join('\n')}\n\n`
    : '';
  return `${memoryContext}Analyze this ${language} code on topic "${topic}":\n${code}`;
}

export function buildErrorTypePrompt(code) {
  return `In one short phrase (max 5 words), what is the main error type in this code? Examples: "off-by-one error", "null pointer", "infinite loop", "wrong base case". Reply with just the phrase, nothing else.\n\nCode:\n${code}`;
}