import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
// constants
// import { i18nConfig } from '@/modules/internationalization/constants/i18n.constants';
// providers
import { TrpcProvider } from '@/modules/core/providers/trpc-provider';
import { IntlProvider } from '@/modules/internationalization/containers/intl-provider';
import { Providers } from '@/app/[lang]/providers';
// utils
import { getDictionary } from '@/modules/internationalization/utils/dictionary.utils';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { PageParams } from '@/modules/core/types/next.types';

import '@/styles/globals.scss';
import '@/modules/schedule/components/calendar/calendar.scss';

export default async function RootLayout({
  children,
  params,
}: ChildrenProp & PageParams) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={GeistSans.className}>
        <TrpcProvider>
          <IntlProvider locale={params.lang} dictionary={dictionary}>
            <Providers session={params.session}>{children}</Providers>
          </IntlProvider>
        </TrpcProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

// TODO: it causes error 'Dynamic Server Usage: cookies'. Double check if we need this
// export async function generateStaticParams() {
//   return i18nConfig.locales.map((locale) => ({ lang: locale }));
// }

export const metadata = {
  title: 'Style Sync',
  description: 'Find the Perfect Professional for Your Beauty Needs',
};
