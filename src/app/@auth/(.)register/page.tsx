/*
  path: '@auth/register'
*/
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getProviders } from 'next-auth/react';

import { options } from '@/app/api/auth/[...nextauth]/options';
import Modal from '@/app/_components/UI/Modal/Modal';
import RegisterForm from '@/app/_components/user_comp/RegisterForm';
import OptionsDivider from '@/app/_components/UI/Divider/OptionsDivider';
import OAuthLoginList from '@/app/_components/user_comp/OAuthLoginList';
import LoadingOAuthLoginList from '@/app/_components/user_comp/loading/LoadingOAuthLoginList';

const RegisterPageInt = async () => {
  const session = await getServerSession(options);
  if (session) {
    redirect('/');
  }

  const providers = await getProviders();

  return (
    <Modal>
      <div className="text-fg w-[90%] m-4 flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold">Register</h2>
        <Suspense fallback={<LoadingOAuthLoginList />}>
          <OAuthLoginList providers={providers} />
        </Suspense>
        <OptionsDivider />
        <RegisterForm />
      </div>
    </Modal>
  );
};

export default RegisterPageInt;
