/*
    Loading test
*/
import { Suspense } from 'react';
import { getProviders } from 'next-auth/react';

import Modal from '@/app/_components/UI/Modal/Modal';
import SigninForm from '../_components/user_comp/SigninForm';
import OptionsDivider from '@/app/_components/UI/Divider/OptionsDivider';
import OAuthLoginList from '../_components/user_comp/OAuthLoginList';
import LoadingOAuthLoginList from '../_components/user_comp/loading/LoadingOAuthLoginList';

const LoadingPage = async () => {
  const providers = await getProviders();

  return (
    <Modal>
      <div className="text-fg w-[90%] m-4 flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <Suspense fallback={<LoadingOAuthLoginList />}>
          <OAuthLoginList providers={providers} />
        </Suspense>
        <OptionsDivider />
        <SigninForm />
      </div>
    </Modal>
  );
};

export default LoadingPage;
