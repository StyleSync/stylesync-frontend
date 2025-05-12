import { getServerSession } from 'next-auth';

import { authOptions } from '@/modules/auth/constants/auth-server.constants';
import { Header } from '@/modules/core/components/header';
import { ProSearchField } from '@/modules/location/components/pro-search-field';
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';

export const LandingHeader = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Header
      classes={{
        leftSlot: '!flex-[unset]',
        centralSlot: '!pl-14 hidden lg:block',
      }}
      centralSlot={<ProSearchField />}
      rightSlot={<UserMenuBadge session={session} />}
    />
  );
};
