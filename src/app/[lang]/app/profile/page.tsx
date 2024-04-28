import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/modules/auth/constants/auth-server.constants';
import { pageGuard } from '@/modules/core/utils/route.utils';

export default async function ProfileRedirect() {
  const session = await getServerSession(authOptions);

  await pageGuard({
    require: {
      userType: true,
      onboarding: true,
    },
  });

  if (session) {
    redirect(`/app/profile/${session.user.id}`);
  }
}
