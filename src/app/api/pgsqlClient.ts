'server-only';
import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.NEXT_PUBLIC_PSQL_USER,
  database: process.env.NEXT_PUBLIC_PSQL_DB,
  password: process.env.NEXT_PUBLIC_PSQL_PASSWORD,
  host: process.env.NEXT_PUBLIC_PSQL_HOST,
  port: Number(process.env.NEXT_PUBLIC_PSQL_PORT),
});

// // test db function and test insert dummy data
// export async function pgDbDummyExecute() {
//   try {
//     await pgClient.connect();
//     console.log('pg DB connection started');
//     let { rows } = await pgClient.query('SELECT * FROM todos LIMIT 999;');
//     console.table(rows);
//     await pgClient.query('BEGIN');
//     await pgClient.query(`INSERT INTO todos (id, date, noderef.current, text) VALUES ('TLUSR12345_123456789', '2023-08-13', NULL, 'walk the dog')`);
//   } catch (error) {
//     console.log('error in pg DB connection');
//     await pgClient.query('ROLLBACK;');
//   } finally {
//     await pgClient.query('COMMIT;');
//     setTimeout(async () => {
//       await pgClient.end();
//       console.log('pg DB connection ended');
//     }, 3000);
//   }
// }
