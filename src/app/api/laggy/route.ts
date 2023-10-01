/* 
    GET /api/laggy
    this is a test route that simulates a laggy server
*/
'server-only';
import { type NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';


export async function GET(request: NextRequest, response: NextResponse) {
  // console.log('GET ROUTE');

  try {
    // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    // await delay(3000); // delay in ms
    const placeholder = await getBlurData();
    return NextResponse.json(placeholder);
  } catch (error) {
    throw new Error(`GET request failed @/api/route.ts with error: ${error}`);
  }
}

async function getBlurData() {
  try {
    const file = await fs.readFile('src/app/_images/my_pic/20220910_124833.jpg');
    const { base64 } = await getPlaiceholder(file);
    console.log(base64);
    return base64;
  } catch (err){
    console.log(err)
  }
  
}
