import { Open_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { getServerSession } from 'next-auth/next';

import './globals.css';
import TodoProvider from './_components/context/TodoContext';
import { options } from '@/app/api/auth/[...nextauth]/options';
import NavBarMain from './_components/UI/NavBar/NavBarMain';

const openSansFont = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Demo Web App',
  description: 'A Demo Web App made by @daryllreillo',
};

export default async function RootLayout({ children, auth }: { children: React.ReactNode; auth: React.ReactNode }) {
  const session = await getServerSession(options);

  return (
    <>
      <html lang="en">
        <body className={openSansFont.className}>
          <TodoProvider>
            <NavBarMain session={session} />
            {children}
            {auth}
            <Analytics />
          </TodoProvider>
        </body>
      </html>
    </>
  );
}
