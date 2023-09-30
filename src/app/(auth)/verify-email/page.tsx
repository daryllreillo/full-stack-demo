/*
    path: /verify-email
*/
'use client';
import { useState, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

import { zSignIn } from '@/app/_helper-functions/clientHelperFunctions';

const VerifyEmail: React.FC = () => {
  const { trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/verify-email`, postVerifyEmail);
  const [message, setMessage] = useState('Email verification in progress... Please wait.');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function verifyEmailRes() {
      const searchParams = new URL(window.location.href).searchParams;
      const email = searchParams.get('email') as string;
      const emailtoken = searchParams.get('emailtoken') as string;
      const res = await trigger({ pair: { email, emailtoken } });

      if (!res.isError) {
        setMessage(res.message + ' Logging you in...');
        zSignIn(email, null, emailtoken);
      } else {
        setIsError(true);
        setMessage(res.message);
      }
    }

    verifyEmailRes();
  }, [trigger]);

  return <div className="text-center text-xl">{message}</div>;
};

async function postVerifyEmail(url: string, { arg }: { arg: { pair: { email: string; emailtoken: string } } }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error('Failed to verify email. Incorrect email or token.');
  }
  return res.json();
}

export default VerifyEmail;
