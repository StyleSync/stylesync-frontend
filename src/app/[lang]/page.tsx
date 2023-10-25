import { Typography } from '@/modules/core/components/typogrpahy';
// components
import { LocaleSwitcher } from '@/modules/internationalization/components/locale-select';
import { Header } from '@/modules/core/components/header';
// containers
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';
import { UserHeaderNavigation } from '@/modules/core/containers/user-header-navigation';
// types
import type { PageParams } from '@/modules/core/types/next.types';

export default async function Home({ params }: PageParams) {
  return (
    <main style={{ paddingTop: 100 }}>
      <Header
        centralSlot={<UserHeaderNavigation />}
        rightSlot={<UserMenuBadge />}
      />
      <Typography As='p'>Current locale: {params.lang}</Typography>
      <LocaleSwitcher locale={params.lang} />
    </main>
  );
}
