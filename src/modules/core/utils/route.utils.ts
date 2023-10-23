import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';

type PageGuardConfig = {
  require: {
    userType: boolean;
    onboarding: boolean;
  };
};

export const pageGuard = (
  session: Session | null,
  config: PageGuardConfig
): void => {
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
