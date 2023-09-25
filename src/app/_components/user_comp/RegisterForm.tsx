'use client';
import { FormEvent, useState } from 'react';
import useSWRMutation from 'swr/mutation';

import useFormInputsHook from '@/app/_hooks/useFormInputsHook';
import registerInputsConfig from '@/app/_config/registerInputsConfig';
import { User } from '@/app/_models/userModel';
// import { zSignIn } from '@/app/_helper-functions/clientHelperFunctions';
import AsyncButton from '@/app/_components/UI/Button/AsyncButton';

const Register: React.FC = () => {
  const { renderInputs, inputsState, inputsAreValid, resetInputs, validateAllInputs } = useFormInputsHook(registerInputsConfig);
  const { trigger: postTrigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/register`, postUserReg);
  const [message, setMessage] = useState<string>('_');

  const Inputs = renderInputs();

  // revalidates all inputs before submit button can be clicked
  const mouseEnterHandler = () => {
    validateAllInputs();
  };

  const registerSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (inputsAreValid) {
      setMessage('Processing submission...');
      const emailKey = 'email' as keyof typeof inputsState;
      const passwordKey = 'reg_password' as keyof typeof inputsState;
      const nameKey = 'name' as keyof typeof inputsState;
      const email = inputsState[emailKey]!.value;
      const password = inputsState[passwordKey]!.value;
      const name = inputsState[nameKey]!.value;
      
      const user = new User(email, password, name);
      const res = await postTrigger({ user });

      // if (!res.isError) {
      //   setMessage('Registration successful! Logging you in...');
      //   // if no error, login and redirect after 0.2s delay,
      //   zSignIn(email, password);
      // } else {
      //   setMessage(res.message);
      // }

      setMessage(res.message);

      // then reset the form state
      resetInputs();
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
      <p>Register your email and Password</p>
      <form className='flex flex-col items-center w-[100%] my-2' onSubmit={registerSubmitHandler}>
        {Inputs}
        <AsyncButton type="submit" isLoading={isMutating} onMouseEnter={mouseEnterHandler} aria-label='register'>
          Register
        </AsyncButton>
        <p className={messageStyle}>{message}</p>
      </form>
    </>
  );
};

export default Register;

async function postUserReg(url: string, { arg }: { arg: { user: User } }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error('Failed to POST user registration data. Please check logs for details.');
  }
  return res.json();
}
