/* 
    POST /api/auth/register
*/
'server-only';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

import { hashPassword } from '@/app/_helper-functions/serverHelperFunctions';
import { pool } from '@/app/api/pgsqlClient';
import sendVerificationEmail from '@/app/_helper-functions/sendVerificationEmail';

export async function POST(request: NextRequest, response: NextResponse) {
  const reqBody = await request.json();
  const { id, email, password, name, role, image, emailverified } = reqBody.user;

  try {
    const userDb = (
      await pool.query(
        `
          SELECT * FROM users 
          WHERE email = $1
          LIMIT 1;
        `,
        [email]
      )
    )?.rows[0];
    // if email is found, return error JSON
    if (userDb?.email) return NextResponse.json({ isError: true, message: 'Sorry... That Email was already registered.' });
    else {
      // if no email is found in database, record new user data in database
      const encrypted = await hashPassword(password);
      const emailToken = crypto.randomBytes(64).toString('hex');
      console.log(emailToken);

      const result = await pool.query(
        `
          INSERT INTO users (id, email, password, name, role, image, emailtoken, emailverified) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `,
        [id, email, encrypted, name, role, image, emailToken, emailverified]
      );
      // then send email for verification
      sendVerificationEmail({ email: email, name: name, emailtoken: emailToken });
      // then return successful registration JSON
      return NextResponse.json({ result, isError: false, message: 'Please check your email for email verification.' });
    }
  } catch (error: any) {
    console.log(error);
    let message = 'Error in route handler @api/auth/z_register';
    if (error?.detail) {
      message = error.detail;
    }
    return NextResponse.json({ isError: true, message });
  }
}
