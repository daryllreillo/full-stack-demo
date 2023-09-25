/* 
    POST /api/auth/signin
*/
'server-only';
import { NextRequest, NextResponse } from 'next/server';

import { isCorrectPw } from '@/app/_helper-functions/serverHelperFunctions';
import { isValidUuid } from '@/app/_helper-functions/clientHelperFunctions';
import { pool } from '@/app/api/pgsqlClient';

export async function POST(request: NextRequest, response: NextResponse) {
  const reqBody = await request.json();
  const { email, password } = reqBody.credentials;

  try {
    const userDb = (await pool.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email]))?.rows[0];
    // check if email is verified. If not verified send message to
    if (!userDb.emailverified) {
      return NextResponse.json({ isError: true, message: 'Unable to login. Please verify your email first!' });
    }
    // check against the database if password is correct
    if (userDb?.email && userDb?.password && password) {
      const isIdValid = isValidUuid(userDb.id);
      const isPasswordCorrect = await isCorrectPw(password, userDb.password);

      // cleansing userDb password and id to null
      userDb.password = userDb.id = null;

      // if password is correct and id is valid, return userDb
      if (isPasswordCorrect && isIdValid) {
        // console.log('found user with correct password');
        return NextResponse.json({ userDb, isError: false, message: 'Authentication successful' });
      }
    }
    // console.log('no user found in DB');
    return NextResponse.json({ isError: true, message: 'Incorrect email or password' });
  } catch (error: any) {
    let message = 'Error in route handler @api/auth/z_register';
    if (error?.detail) {
      message = error.detail;
    }
    return NextResponse.json({ isError: true, message });
  }
}
