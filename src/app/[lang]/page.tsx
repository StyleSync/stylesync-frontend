import { Typography } from '@/modules/core/components/typogrpahy';
// components
import { LocaleSwitcher } from '@/modules/internationalization/components/locale-select';
// types
import type { PageParams } from '@/modules/core/types/next.types';
import { AppHeader } from '@/modules/core/containers/app-header';

export default async function Home({ params }: PageParams) {
  return (
    <main style={{ paddingTop: 100 }}>
      <AppHeader />
      <Typography As='p'>Current locale: {params.lang}</Typography>
      <LocaleSwitcher locale={params.lang} />
    </main>
  );
}
