/* 
    POST /api/auth/verify-email
*/
'server-only';
import { NextRequest, NextResponse } from 'next/server';

import { pool } from '@/app/api/pgsqlClient';

export async function POST(request: NextRequest, response: NextResponse) {
  const reqBody = await request.json();
  const { email, emailtoken } = reqBody.pair;

  try {
    // check if email is in database
    const userDb = (await pool.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email]))?.rows[0];
    if (userDb && userDb.emailtoken === emailtoken) {
      // if emailtoken in database matches the emailtoken from client,
      // update verification in database and return successful JSON
      await pool.query(
        `
            UPDATE users 
            SET emailverified = $1
            WHERE email = $2
          `,
        [true, email]
      );
      return NextResponse.json({ isError: false, message: 'Email verification successful!' });
    } else {
      // return unsuccessful JSON if database check fails
      return NextResponse.json({ isError: true, message: 'Incorrect email or token' });
    }
  } catch (error: any) {
    let message = 'Error in route handler @api/auth/verify-email';
    if (error?.detail) {
      message = error.detail;
    }
    return NextResponse.json({ isError: true, message });
  }
}
