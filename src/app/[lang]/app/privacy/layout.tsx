'use client';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import { Footer } from '@/modules/landing/containers/footer/footer';

export default function PrivacyLayout({ children }: ChildrenProp) {
  const pathname = usePathname();
  const router = useRouter();
  const intl = useIntl();

  return (
    <div className='flex flex-col'>
      <main className='relative flex w-full bg-white px-6 pl-6 pt-[72px] lg:pl-[380px]'>
        <div className='fixed left-6 top-[72px] hidden w-[360px] flex-col gap-y-2 py-12 lg:flex'>
          <Button
            variant='secondary'
            text={intl.formatMessage({ id: 'privacy.policy' })}
            className='!h-12 !w-full !justify-between !rounded-lg !text-primary'
            iconEnd={pathname.includes('policy') ? 'chevron-right' : undefined}
            disabled={pathname.includes('policy')}
            classes={{
              text: clsx({
                '!font-bold': pathname.includes('policy'),
              }),
            }}
            onClick={() => router.push('/app/privacy/policy')}
          />
          <Button
            variant='secondary'
            text={intl.formatMessage({ id: 'privacy.terms' })}
            className='!h-12 !w-full !justify-between !rounded-lg !text-primary'
            disabled={pathname.includes('terms')}
            iconEnd={pathname.includes('terms') ? 'chevron-right' : undefined}
            classes={{
              text: clsx({
                '!font-bold': pathname.includes('terms'),
              }),
            }}
            onClick={() => router.push('/app/privacy/terms')}
          />
        </div>
        <div className='mx-auto w-full max-w-[736px] py-6 lg:py-10'>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
