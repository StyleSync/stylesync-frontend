'use client';
import { type FC, useCallback, useMemo } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { Icon } from '@/modules/core/components/icon';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
// types
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';

import type { UserMenuBadgeProps } from './user-menu-badge.interface';
import styles from './user-menu-badge.module.scss';

export const UserMenuBadge: FC<UserMenuBadgeProps> = () => {
  const isOpen = useBoolean();
  // memo
  const options = useMemo<DropdownItem[]>(
    () => [
      {
        id: 'profile',
        text: 'Profile settings',
      },
      {
        id: 'sign-out',
        text: 'Sign out',
      },
    ],
    []
  );

  const handleOptionSelect = useCallback(
    (item: DropdownItem) => {
      if (item.id === 'sign-out') {
        signOut({ callbackUrl: '/' });
      }

      isOpen.setFalse();
    },
    [isOpen]
  );

  return (
    <DropdownMenu
      items={options}
      trigger={
        <button
          className={clsx(
            styles.root,
            { [styles.active]: isOpen.value },
            'focusable'
          )}
          onClick={isOpen.setTrue}
        >
          <Avatar
            className={styles.avatar}
            fallback={<Emoji name='sunglasses' width={30} height={30} />}
          />
          <Icon name='chevron-bottom' width={12} />
        </button>
      }
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      onSelect={handleOptionSelect}
      popoverProps={{
        disablePortal: true,
        sideOffset: 8,
      }}
    />
  );
};
