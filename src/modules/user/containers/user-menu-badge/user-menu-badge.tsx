'use client';
import { type FC } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { Icon } from '@/modules/core/components/icon';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';

import type { UserMenuBadgeProps } from './user-menu-badge.interface';
import styles from './user-menu-badge.module.scss';

export const UserMenuBadge: FC<UserMenuBadgeProps> = () => {
  const isOpen = useBoolean();

  return (
    <DropdownMenu
      items={[
        {
          id: 'profile',
          text: 'Profile settings',
          icon: 'settings',
        },
        {
          id: 'sign-out',
          text: 'Sign out',
          variant: 'danger',
        },
      ]}
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
      popoverProps={{
        disablePortal: true,
        sideOffset: 8,
      }}
    />
  );
};
