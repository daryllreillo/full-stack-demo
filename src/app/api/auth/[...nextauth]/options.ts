import type { NextAuthOptions } from 'next-auth';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';

import { pool } from '../../pgsqlClient';
import { isCorrectPw } from '@/app/_helper-functions/serverHelperFunctions';
import { isValidUuid } from '@/app/_helper-functions/clientHelperFunctions';
import sendVerificationEmail from '@/app/_helper-functions/sendVerificationEmail';

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          role: 'user',
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.NEXT_PUBLIC_OAUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          role: 'user',
          id: profile.sub,
          image: profile.picture,
        };
      },
      clientId: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'goat_password@65',
        },
      },
      async authorize(credentials, req) {
        // authentication logic
        if (req.method === 'POST') {
          const userDb = (
            await pool.query(
              `
                SELECT * FROM users WHERE email = $1 LIMIT 1
              `,
              [credentials?.email]
            )
          )?.rows[0];
          
          // email token is being used
          if(userDb?.email && req.body?.token && userDb.emailtoken === req.body?.token) {
            // remove email token and return user details
            await pool.query(
              `
                  UPDATE users 
                  SET emailtoken = $1
                  WHERE email = $2
                `,
              [null, userDb.email]
            );
            // cleansing userDb password and id to null first
            userDb.password = userDb.id = null;
            return userDb;
          }

          if (userDb?.email && userDb?.password && credentials?.password) {
            const isIdValid = isValidUuid(userDb.id);
            const isPasswordCorrect = await isCorrectPw(credentials.password, userDb.password);

            // cleansing userDb password and id to null first
            userDb.password = userDb.id = null;

            // if password is correct and id is valid, return userDb
            // console.log(isPasswordCorrect, isIdValid);
            if (isPasswordCorrect && isIdValid) {
              // console.log('userDb: ', userDb);
              return userDb;
            } else {
              // console.log('invalid password');
              return null;
            }
          }
          // console.log('no user found in DB');
          return null;
        }
        // If no error and we have user data, return it

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    // signIn callback
    async signIn({ user, account, profile }) {
      let isAllowedToSignIn = true;
      // if OAuth was used, profile is not undefined
      if (profile) {
        // find user data from database
        const userDb = (
          await pool.query(
            `
              SELECT * FROM users WHERE email = $1 LIMIT 1;
            `,
            [profile?.email]
          )
        )?.rows[0];
        //
        if (!userDb) {
          // if user is NOT FOUND in database,
          // record new user data into database
          const id = profile.id;
          const email = profile.email!;
          const emailToken = crypto.randomBytes(64).toString('hex');
          const name = profile.name || '';
          const role = profile.role || 'user';
          const image = profile.image || '';
          const emailVerified = false;

          await pool.query(
            `
              INSERT INTO users (id, email, name, role, image, emailtoken, emailverified) 
              VALUES ($1, $2, $3, $4, $5, $6, $7);
            `,
            [id, email, name, role, image, emailToken, emailVerified]
          );
          // then send email for verification
          sendVerificationEmail({ email: email, name: name, emailtoken: emailToken });
        } else {
          // if user is FOUND in database,
          // update name and image
          await pool.query(
            `
              UPDATE users
              SET name = $1, image = $2
              WHERE email = $3;
            `,
            [profile.name || '', profile.image || '', profile.email]
          );
        }
      }

      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
  pages: {
    signIn: '/signin',
  },
};
