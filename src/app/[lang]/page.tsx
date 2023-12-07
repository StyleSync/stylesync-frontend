import { Typography } from '@/modules/core/components/typogrpahy';
import { Suspense, use } from 'react';
// components
import { LocaleSwitcher } from '@/modules/internationalization/components/locale-select';
import { Header } from '@/modules/core/components/header';
// containers
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';
import { UserHeaderNavigation } from '@/modules/core/containers/user-header-navigation';
// types
import type { PageParams } from '@/modules/core/types/next.types';
import { rsc } from '../../../server-rsc/trpc';
import { HydrateClient } from '@/modules/core/providers/hydrate-client';
import { Me } from '@/modules/core/components/me/me';

function MeRSC() {
  use(
    Promise.all([
      rsc.user.me.fetch(),
      // Display loading for at least 300ms
      // eslint-disable-next-line no-magic-numbers
      new Promise((resolve) => setTimeout(resolve, 3_00)),
    ])
  );

  return (
    <HydrateClient state={use(rsc.dehydrate())}>
      <Me />
    </HydrateClient>
  );
}

const MeSkeleton = () => <Typography>Loading</Typography>;

export default function Home({ params }: PageParams) {
  return (
    <main style={{ paddingTop: 100 }}>
      <Header
        centralSlot={<UserHeaderNavigation />}
        rightSlot={<UserMenuBadge />}
      />
      <Typography As='p'>Current locale: {params.lang}</Typography>
      {/* <Button onClick={() => signOut()} text={'click'} /> */}
      <Suspense fallback={<MeSkeleton />}>
        <MeRSC />
      </Suspense>
      <LocaleSwitcher locale={params.lang} />
    </main>
  );
}
