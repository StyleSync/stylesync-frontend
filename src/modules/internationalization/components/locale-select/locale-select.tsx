'use client';
import { type FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// components
import { RadioButton } from '@/modules/core/components';
// utils
import {
  getLocalePathname,
  saveLocale,
} from '@/modules/internationalization/utils/language.utils';
// constants
import { i18nConfig } from '@/modules/internationalization/constants/i18n.constants';
// types
import type { Locale } from '@/modules/internationalization/types/i18n.types';

import type { LocaleSelectProps } from './locale-select.interface';

export const LocaleSwitcher: FC<LocaleSelectProps> = ({ locale }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLocaleChange = (_locale: Locale) => () => {
    saveLocale(_locale);

    router.push(getLocalePathname(_locale, pathname));
    router.refresh();
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <RadioButton.Group
        name='languages'
        value={locale}
        onChange={(value) => handleLocaleChange(value as Locale)()}
      >
        {i18nConfig.locales.map((_locale) => (
          <button key={_locale} onClick={handleLocaleChange(_locale)}>
            {_locale}
          </button>
        ))}
      </RadioButton.Group>
    </div>
  );
};
