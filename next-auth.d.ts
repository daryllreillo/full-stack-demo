// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser, Profile } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name?: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
  }
  
  interface Profile extends Profile {
    role: string;
    id: string;
    image: string;
    // picture?: string;
    // avatar_url?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
