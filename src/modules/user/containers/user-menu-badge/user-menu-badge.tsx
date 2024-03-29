'use client';
import { type FC, useCallback } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
import { signIn, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { Icon } from '@/modules/core/components/icon';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Button } from '@/modules/core/components/button';
// containers
import { BurgerMenu } from '@/modules/core/containers/burger-menu';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';

import type { UserMenuBadgeProps } from './user-menu-badge.interface';
import styles from './user-menu-badge.module.scss';

export const UserMenuBadge: FC<UserMenuBadgeProps> = ({ session }) => {
  // state
  const isOpen = useBoolean();
  const pathname = usePathname();
  const router = useRouter();
  const deviceType = useDeviceType();
  // queries
  const { data: me } = trpc.user.me.useQuery(
    { expand: ['professional'] },
    {
      enabled: !!session,
    }
  );

  const handleSelect = useCallback(
    ({ id }: DropdownItem) => {
      if (id === 'sign-out') {
        void signOut({ callbackUrl: '/' });
      }

      isOpen.setFalse();
    },
    [isOpen]
  );

  const handleSettingsClick = useCallback(() => {
    router.push('/app/settings');
  }, [router]);

  if (deviceType === 'mobile') {
    return <BurgerMenu />;
  }

  if (!session) {
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
    <>
      <div className={styles.root}>
        <Button
          className={clsx(styles.iconButton, {
            [styles.active]: pathname.includes('/settings'),
          })}
          onClick={handleSettingsClick}
          icon='settings'
          variant='secondary'
        />
        <DropdownMenu
          items={[
            {
              id: 'share',
              text: 'Share profile',
              icon: 'share',
            },
            {
              id: 'sign-out',
              text: 'Sign out',
              icon: 'log-out',
              variant: 'danger',
            },
          ]}
          trigger={
            <button
              className={clsx(
                styles.trigger,
                { [styles.active]: isOpen.value },
                'focusable'
              )}
              onClick={isOpen.setTrue}
            >
              <Avatar
                className={styles.avatar}
                url={me?.avatar}
                fallback={<Emoji name='sunglasses' width={24} height={24} />}
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
            sideOffset: 5,
            disablePortal: true,
            backgroundBlurEffect: false,
            align: 'end',
          }}
        />
      </div>
    </>
  );
};
