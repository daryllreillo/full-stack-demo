/*
  path: '/profile'
*/

import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';

const Profile: React.FC = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      <p>Email: {session?.user.email}</p>
    </div>
  );
};

export default Profile;
