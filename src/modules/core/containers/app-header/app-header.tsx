import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserHeaderNavigation } from '@/modules/core/containers/user-header-navigation/user-header-navigation';
import { Header } from '@/modules/core/components/header';
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';

export const AppHeader = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Header
      centralSlot={session && <UserHeaderNavigation userId={session.user.id} />}
      rightSlot={<UserMenuBadge session={session} />}
    />
  );
};
