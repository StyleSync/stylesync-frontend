import { useEffect } from 'react';

import { sendGTMEvent } from '@next/third-parties/google';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useGtmAuthEvents = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (searchParams.get('login') === 'true' && session) {
      sendGTMEvent({
        event: 'login',
        user_id: session?.user?.id,
        user_email: session?.user?.email,
      });
      router.replace(window.location.pathname);
    }

    if (searchParams.get('signUp') === 'true' && session) {
      sendGTMEvent({
        event: 'sign_up',
        user_id: session?.user?.id,
        user_email: session?.user?.email,
      });
      router.replace(window.location.pathname);
    }
  }, [session, searchParams, router]);
};
