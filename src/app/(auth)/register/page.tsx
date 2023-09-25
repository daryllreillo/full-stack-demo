/*
  path: '/register'
*/
import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';

import { options } from '@/app/api/auth/[...nextauth]/options';
import RegisterForm from '@/app/_components/user_comp/RegisterForm';
import OptionsDivider from '@/app/_components/UI/Divider/OptionsDivider';
import OAuthLoginList from '@/app/_components/user_comp/OAuthLoginList';
import LoadingOAuthLoginList from '@/app/_components/user_comp/loading/LoadingOAuthLoginList';

const RegisterPage = async () => {
  // await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/laggy`, { next: { revalidate: 0 } }); // route to laggy api
  const session = await getServerSession(options);
  if (session) {
    redirect('/');
  }
  const providers = await getProviders();

  return (
    <div className="w-[100%] h-[93vh] min-h-[700px] bg-cust-image-mainpage bg-cust-size-mainpage animate-cust-animation-mainpage">
      <div className="text-white min-w-[380px] mx-auto flex flex-col items-center sm:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
        <h2 className="text-center text-2xl font-semibold m-2">Register</h2>
        <Suspense fallback={<LoadingOAuthLoginList />}>
          <OAuthLoginList providers={providers} />
        </Suspense>
        <OptionsDivider />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
