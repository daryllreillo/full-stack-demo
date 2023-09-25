/* 
    GET /api
*/
'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { pool } from './pgsqlClient';
import { options } from '@/app/api/auth/[...nextauth]/options';

export async function GET(request: NextRequest, response: NextResponse) {
  // console.log('GET ROUTE');
  const session = await getServerSession(options);
  const email = session?.user.email;

  try {
    if (email) {
      // console.log('session email found: ', email);
      const res = await pool.query(
        `
        SELECT * FROM todos WHERE user_email = $1 ORDER BY date DESC;
        `,
        [email]
      );
      const result = res.rows;
      return NextResponse.json(result);
    } else {
      // console.log('no user session');
      const res = await pool.query(`
          SELECT * FROM todos WHERE user_email = 'DUMMY' ORDER BY date DESC;
        `);
      const result = res.rows;
      return NextResponse.json(result);
    }
  } catch (error) {
    throw new Error(`GET request failed @/api/route.ts with error: ${error}`);
  }
}

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { id, date, text, color } = reqBody.todoItem;
  const session = await getServerSession(options);
  const email = session?.user.email;

  try {
    let result;
    if (reqBody.new === true) {
      // console.log('POST ROUTE, new');
      result = await pool.query(
        `
        INSERT INTO todos (id, date, noderef.current, text, color, user_email) 
        VALUES ($1, $2, NULL, $3, $4, $5);
      `,
        [id, date, text, color, email || 'DUMMY']
      );
    } else {
      // console.log('POST ROUTE, not new');
      if (reqBody.updateDate === true) {
        result = await pool.query(
          `
          UPDATE todos
          SET date = $1, noderef.current = NULL, text = $2, color = $3
          WHERE id = $4;
        `,
          [date, text.toString(), color, id]
        );
      } else {
        result = await pool.query(
          `
          UPDATE todos
          SET noderef.current = NULL, text = $1, color = $2
          WHERE id = $3;
        `,
          [text.toString(), color, id]
        );
      }
    }
    return NextResponse.json(result);
  } catch (error) {
    throw new Error(`POST request failed @/api/route.ts with error: ${error}`);
  }
}

export async function DELETE(request: NextRequest) {
  // console.log('DELETE ROUTE');
  const reqBody = await request.json();

  try {
    const result = await pool.query(
      `
      DELETE FROM todos
      WHERE id = $1;
    `,
      [reqBody.id]
    );
    return NextResponse.json(result);
  } catch (error) {
    throw new Error(`DELETE request failed @/api/route.ts with error: ${error}`);
  }
}
