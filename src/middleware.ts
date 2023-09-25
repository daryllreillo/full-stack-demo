// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  // withAuth augments your Request with the user's token
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);
  },
  {
    callbacks: {
      // if token exists, authorized is true; else authorized is false
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth to these matching routes only -- can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // add the relative paths to authorization protect
  matcher: ['/api/auth/providers','/api/auth','/loading'],
};
