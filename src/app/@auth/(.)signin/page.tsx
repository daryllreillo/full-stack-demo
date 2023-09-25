/*
  path: '@auth/signin'
*/
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { getProviders } from 'next-auth/react';

import { options } from '@/app/api/auth/[...nextauth]/options';
import Modal from '@/app/_components/UI/Modal/Modal';
import SigninForm from '@/app/_components/user_comp/SigninForm';
import OptionsDivider from '@/app/_components/UI/Divider/OptionsDivider';
import OAuthLoginList from '@/app/_components/user_comp/OAuthLoginList';
import LoadingOAuthLoginList from '@/app/_components/user_comp/loading/LoadingOAuthLoginList';

const SigninPageInt = async () => {
  const session = await getServerSession(options);
  if (session) {
    redirect('/');
  }

  const providers = await getProviders();

  return (
    <Modal>
      <div className="text-fg w-[90%] m-4 flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold">Sign in</h2>
        <Suspense fallback={<LoadingOAuthLoginList />}>
          <OAuthLoginList providers={providers} />
        </Suspense>
        <OptionsDivider />
        <SigninForm />
      </div>
    </Modal>
  );
};

export default SigninPageInt;
