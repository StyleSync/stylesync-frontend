import { type FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Button } from '@/modules/core/components/button';
import { useBoolean } from 'usehooks-ts';

export const LocaleSwitcher: FC<LocaleSelectProps> = ({ locale }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isOpen = useBoolean();
  const handleLocaleChange = (_locale: Locale) => {
    saveLocale(_locale);

    router.push(getLocalePathname(_locale, pathname));
    router.refresh();
  };

  return (
    <div>
      <DropdownMenu
        items={i18nConfig.locales.map((_locale) => ({
          id: _locale,
          text: _locale,
        }))}
        trigger={
          <Button onClick={isOpen.setTrue} variant='outlined' text={locale} />
        }
        isOpen={isOpen.value}
        onClose={isOpen.setFalse}
        onSelect={(item) => {
          handleLocaleChange(item.id as Locale);
          isOpen.setFalse();
        }}
      />
    </div>
  );
};
