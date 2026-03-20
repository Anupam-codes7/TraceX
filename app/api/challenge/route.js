import { NextResponse } from 'next/server';
import { getChallenge } from '@/lib/challenges';
import { getChallengeType } from '@/lib/errorMap';

export async function POST(request) {
  try {
    const { errorType } = await request.json();
    const challengeType = getChallengeType(errorType);
    const challenge = getChallenge(challengeType);
    return NextResponse.json(challenge);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}