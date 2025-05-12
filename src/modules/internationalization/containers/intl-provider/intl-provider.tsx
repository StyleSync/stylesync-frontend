'use client';
import { type FC } from 'react';

import { IntlProvider as ReactIntlProvider } from 'react-intl';

import type { IntlProviderProps } from './intl-provider.interface';

export const IntlProvider: FC<IntlProviderProps> = ({
  locale,
  dictionary,
  children,
}) => {
  return (
    <ReactIntlProvider messages={dictionary as any} locale={locale}>
      {children as any}
    </ReactIntlProvider>
  );
};
