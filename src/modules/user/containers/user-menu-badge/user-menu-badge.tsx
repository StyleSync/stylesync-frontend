'use client';
import { type FC, useCallback } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { Icon } from '@/modules/core/components/icon';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Button } from '@/modules/core/components/button';
// types
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';

import type { UserMenuBadgeProps } from './user-menu-badge.interface';
import styles from './user-menu-badge.module.scss';

export const UserMenuBadge: FC<UserMenuBadgeProps> = () => {
  const isOpen = useBoolean();
  const session = useSession();

  const handleSelect = useCallback(
    ({ id }: DropdownItem) => {
      if (id === 'profile-settings') {
        // navigation to settings
      }

      if (id === 'sign-out') {
        signOut({ callbackUrl: '/' });
      }

      isOpen.setFalse();
    },
    [isOpen]
  );

  if (session.status === 'loading') {
    return null;
  }

  if (session.status === 'unauthenticated') {
    return (
      <Button
        text='Sign in'
        variant='secondary'
        onClick={() =>
          signIn(
            'auth0',
            {
              callbackUrl: '/app/profile',
            },
            { prompt: 'login' }
          )
        }
      />
    );
  }

  return (
    <DropdownMenu
      items={[
        {
          id: 'profile-settings',
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
      typographyProps={{
        weight: 'medium',
      }}
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      onSelect={handleSelect}
      popoverProps={{
        disablePortal: true,
        sideOffset: 8,
      }}
    />
  );
};
