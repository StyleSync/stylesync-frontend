import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

type PageGuardConfig = {
  require: {
    userType: boolean;
    onboarding: boolean;
  };
};

export const pageGuard = async (config: PageGuardConfig): Promise<void> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/sign-in');

    return;
  }

  if (config.require.userType && !session.user.userType) {
    redirect('/app/account-type-select');
  }

  if (config.require.onboarding && !session.user.onboardingCompleted) {
    redirect('/app/quiz');
  }
};
