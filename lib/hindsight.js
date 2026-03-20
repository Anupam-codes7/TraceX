import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { HindsightClient } from '@vectorize-io/hindsight-client';

const client = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_URL,
  apiKey: process.env.HINDSIGHT_API_KEY,
});

const BANK_ID = 'TraceX';

export async function storeMemory(content) {
  await client.retain(BANK_ID, content);
}

export async function fetchMemory(query) {
  const response = await client.recall(BANK_ID, query);
  return response.results.map(r => r.text);
}