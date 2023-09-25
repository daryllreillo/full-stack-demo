/* 
    GET /api/laggy
    this is a test route that simulates a laggy server
*/
'server-only';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  // console.log('GET ROUTE');

  try {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(3000); // delay in ms
    return NextResponse.json('result');
  } catch (error) {
    throw new Error(`GET request failed @/api/route.ts with error: ${error}`);
  }
}
