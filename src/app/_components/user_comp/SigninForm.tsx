/*
  Signin component
*/
'use client';
import { FormEvent, useState } from 'react';
import useSWRMutation from 'swr/mutation';

import useFormInputsHook from '@/app/_hooks/useFormInputsHook';
import loginInputsConfig from '@/app/_config/loginInputsConfig';
import { zSignIn } from '@/app/_helper-functions/clientHelperFunctions';
import AsyncButton from '@/app/_components/UI/Button/AsyncButton';

const Signin: React.FC = () => {
  const { renderInputs, inputsState, inputsAreValid, resetInputs, validateAllInputs } = useFormInputsHook(loginInputsConfig);
  const { trigger: postTrigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/signin`, postUserSignin);
  const [message, setMessage] = useState<string | null>('_');

  const Inputs = renderInputs();

  const beforeSubmitHandler = () => {
    validateAllInputs();
  };

  const signinSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (inputsAreValid) {
      setMessage('Authenticating...');
      // if form is valid, authenticate credentials
      const emailKey = 'email' as keyof typeof inputsState;
      const passwordKey = 'password' as keyof typeof inputsState;
      const email = inputsState[emailKey]!.value;
      const password = inputsState[passwordKey]!.value;
      const res = await postTrigger({ credentials: { email, password } });

      if (!res.isError) {
        setMessage('Authentication successful! Logging you in...');
        zSignIn(email, password);
      } else {
        setMessage(res.message);
      }

      // reset the form state
      // resetInputs();
    }
  };
  let messageStyle = 'text-transparent';
  if (message === '_') {
    messageStyle = 'text-transparent';
  } else {
    messageStyle = '';
  }

  return (
    <>
      <p>Sign in with Email and Password</p>
      <form className='flex flex-col justify-center items-center w-[100%] my-2' onSubmit={signinSubmitHandler}>
        {Inputs}
        <AsyncButton type="submit" onMouseEnter={beforeSubmitHandler} isLoading={isMutating} aria-label='Sign in'>
          Sign in
        </AsyncButton>
        <p className={messageStyle}>{message}</p>
      </form>
    </>
  );
};

export default Signin;

async function postUserSignin(url: string, { arg }: { arg: { credentials: { email: string; password: string } } }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error('Failed to POST user signin data. Please check logs for details.');
  }
  return res.json();
}
