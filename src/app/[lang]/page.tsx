import { Typography } from '@/modules/core/components/typogrpahy';
import Link from 'next/link';
// components
import { LocaleSwitcher } from '@/modules/internationalization/components/locale-select';
// types
import type { PageParams } from '@/modules/core/types/next.types';

export default async function Home({ params }: PageParams) {
  return (
    <main>
      <Typography As='p'>Current locale: {params.lang}</Typography>
      <Link href='/auth/sign-up'>Create account</Link>
      <LocaleSwitcher locale={params.lang} />
    </main>
  );
}
