'use client';
import { type ClientSafeProvider, type LiteralUnion } from 'next-auth/react';
import { type BuiltInProviderType } from 'next-auth/providers';

import { signIn } from 'next-auth/react';
import { getIcon } from '@/app/_helper-functions/clientHelperFunctions';

const OAuthLoginList: React.FC<{ providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null }> = ({ providers }) => {
  let output = null;
  if (providers) {
    output = Object.values(providers).map(provider => {
      if (!provider || provider.id === 'credentials') return null;
      const icon = getIcon(provider.name);
      return (
        <div key={provider.name} className="m-0 p-0">
          <button onClick={() => signIn(provider.id)} className="flex px-3 py-2 m-0 mt-2 border-blue-300">
            <span className="m-0 mr-2 p-0 text-white text-2xl">{icon}</span>
            <span className="ml-1">Log in with {provider.name}</span>
          </button>
        </div>
      );
    });
  }

  return <>{output}</>;
};

export default OAuthLoginList;
