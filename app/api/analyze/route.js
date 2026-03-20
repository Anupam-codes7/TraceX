import { NextResponse } from 'next/server';
import { storeMemory, fetchMemory } from '@/lib/hindsight';
import { analyzeCode } from '@/lib/groq';

export async function POST(request) {
  try {
    const { code, topic, language } = await request.json();

    const pastMistakes = await fetchMemory(
      `What mistakes has this student made in ${topic}?`
    );

    const rawFeedback = await analyzeCode({ code, topic, language, pastMistakes });

    // Parse sections from response
    const analysis = extractSection(rawFeedback, 'ANALYSIS');
    const betterApproach = extractSection(rawFeedback, 'BETTER APPROACH');
    const correctedCode = extractCodeBlock(rawFeedback);
    const hindsightWarning = extractSection(rawFeedback, 'HINDSIGHT WARNING');

    const errorType = detectErrorType(rawFeedback);

    const memoryContent = `Student submitted ${language} code for ${topic}. Error found: ${errorType}.`;
    await storeMemory(memoryContent);

    return NextResponse.json({
      analysis,
      betterApproach,
      correctedCode,
      hindsightWarning,
      errorType,
      memoryStored: memoryContent,
      pastMistakes,
    });

  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function extractSection(text, sectionName) {
  const regex = new RegExp(`\\[${sectionName}\\]([\\s\\S]*?)(?=\\[|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

function extractCodeBlock(text) {
  const match = text.match(/```[\w]*\n([\s\S]*?)```/);
  return match ? match[1].trim() : '';
}

function detectErrorType(feedback) {
  const lower = feedback.toLowerCase();
  if (lower.includes('off-by-one')) return 'off-by-one error';
  if (lower.includes('null')) return 'null pointer';
  if (lower.includes('infinite')) return 'infinite loop';
  if (lower.includes('base case')) return 'wrong base case';
  if (lower.includes('index')) return 'index out of bounds';
  if (lower.includes('comparator') || lower.includes('comparison')) return 'wrong comparator';
  if (lower.includes('return')) return 'missing return';
  return 'logic error';
}