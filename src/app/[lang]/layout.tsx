import '@/styles/globals.scss';
// constants
import { i18nConfig } from '@/modules/internationalization/constants/i18n.constants';
// providers
import { TrpcProvider } from '@/utils/trpc-provider';
import { IntlProvider } from '@/modules/internationalization/containers/intl-provider';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { PageParams } from '@/modules/core/types/next.types';
import { getDictionary } from '@/modules/internationalization/utils/dictionary.utils';
import { Providers } from '@/app/[lang]/providers';

export default async function RootLayout({
  children,
  params,
}: ChildrenProp & PageParams) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body>
        <TrpcProvider>
          <IntlProvider locale={params.lang} dictionary={dictionary}>
            <Providers session={params.session}>{children}</Providers>
          </IntlProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
