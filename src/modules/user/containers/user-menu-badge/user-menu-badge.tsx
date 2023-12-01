'use client';
import { type FC, useCallback } from 'react';
import { useBoolean, useEffectOnce } from 'usehooks-ts';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { Icon } from '@/modules/core/components/icon';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Button } from '@/modules/core/components/button';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';

import type { UserMenuBadgeProps } from './user-menu-badge.interface';
import styles from './user-menu-badge.module.scss';
import { BurgerMenu } from '@/modules/core/containers/burger-menu';

export const UserMenuBadge: FC<UserMenuBadgeProps> = () => {
  // state
  const isOpen = useBoolean();
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  // queries
  const { data: me } = trpc.user.me.useQuery(undefined, {
    enabled: session.status === 'authenticated',
  });

  useEffectOnce(() => {
    router.prefetch('/app/profile-settings');
  });

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
    router.push('/app/profile-settings');
  }, [router]);

  if (session.status === 'loading') {
    return <div className={clsx(styles.skeleton, 'skeleton')} />;
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
    <>
      <div className={styles.root}>
        <Button
          className={clsx(styles.iconButton, {
            [styles.active]: pathname.includes('/profile-settings'),
          })}
          onClick={handleSettingsClick}
          icon='settings'
          variant='secondary'
        />
        <DropdownMenu
          items={[
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
            sideOffset: 5,
            disablePortal: true,
            backgroundBlurEffect: false,
            align: 'end',
          }}
        />
      </div>
      <BurgerMenu />
    </>
  );
};
