import { getServerSession } from 'next-auth';

import { authOptions } from '@/modules/auth/constants/auth-server.constants';
import { ProfileView } from '@/modules/user/containers/profile-view';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return <ProfileView session={session} />;
}

export const metadata = {
  title: 'StyleSync',
  description: 'Find the Perfect Professional for Your Beauty Needs',
};
