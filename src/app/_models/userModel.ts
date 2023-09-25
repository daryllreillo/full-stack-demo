import { v4 as uuidv4 } from 'uuid';
import type { DefaultUser } from 'next-auth';

export class User implements DefaultUser {
  id: string;
  email: string;
  password?: string | null;
  name?: string | null;
  role?: string | null;
  image?: string | null;
  emailtoken?: string | null;
  emailverified: boolean;

  constructor(email: string, password?: string, name?: string, role?: string) {
    this.id = uuidv4();
    this.email = email;
    this.name = name;
    this.password = password;
    this.role = role || 'user';
    this.emailverified = false;
  }
}
