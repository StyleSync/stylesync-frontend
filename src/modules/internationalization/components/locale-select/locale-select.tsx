'use client';
import { type FC } from 'react';

import clsx from 'clsx';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useBoolean } from 'usehooks-ts';

// components
import { Button } from '@/modules/core/components/button';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import type { IconName } from '@/modules/core/components/icon';
// types
import type { Locale } from '@/modules/internationalization/types/i18n.types';
// utils
import {
  getLocalePathname,
  saveLocale,
} from '@/modules/internationalization/utils/language.utils';

import type { LocaleSelectProps } from './locale-select.interface';

const LocaleUIMap: Record<
  Locale,
  { id: Locale; name: string; icon: IconName }
> = {
  en: {
    id: 'en',
    name: 'English (US)',
    icon: 'flag-usa',
  },
  uk: {
    id: 'uk',
    name: 'Українська (Ukraine)',
    icon: 'flag-ukraine',
  },
};

export const LocaleSelect: FC<LocaleSelectProps> = ({
  renderTrigger,
  popoverProps,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = LocaleUIMap[(params.lang as Locale) || 'en'];
  // state
  const isOpen = useBoolean();

  const handleLocaleChange = (_locale: Locale) => {
    saveLocale(_locale);

    router.push(getLocalePathname(_locale, pathname));
    router.refresh();
  };

  return (
    <DropdownMenu
      items={Object.values(LocaleUIMap).map((item) => ({
        id: item.id,
        icon: item.icon,
        text: item.name,
      }))}
      trigger={
        renderTrigger ? (
          renderTrigger({
            ...currentLocale,
            isOpen: isOpen.value,
            toggle: isOpen.toggle,
          })
        ) : (
          <Button
            icon={currentLocale.icon}
            text={currentLocale.name}
            onClick={isOpen.toggle}
            variant='unstyled'
            iconEnd='chevron-bottom'
            classes={{
              root: clsx('!rounded-xl !w-full transition hover:bg-black/5', {
                '!bg-black/5': isOpen.value,
              }),
              iconEnd: clsx('ml-auto !text-gray transition !w-4 !h-4', {
                'rotate-180': isOpen.value,
              }),
            }}
          />
        )
      }
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      onSelect={({ id }) => {
        handleLocaleChange(id as Locale);
      }}
      popoverProps={{
        followTriggerWidth: true,
        align: 'start',
        ...popoverProps,
      }}
    />
  );
};
