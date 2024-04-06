'use client';
import { type FC, useCallback } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
import { signIn, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();
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
  const { data: profileCompletionStatus } =
    trpc.professional.getProfileCompletionStatus.useQuery(
      {
        id: session?.user?.id || '',
      },
      {
        enabled: !!session,
      }
    );

  const handleSelect = useCallback(
    ({ id }: DropdownItem) => {
      if (id === 'profile') {
        router.push('/app/profile');
      }

      if (id === 'sign-out') {
        void signOut({ callbackUrl: '/' });
      }

      isOpen.setFalse();
    },
    [isOpen, router]
  );

  const handleSettingsClick = useCallback(() => {
    router.push('/app/settings');
  }, [router]);

  if (deviceType === 'mobile') {
    return <BurgerMenu />;
  }

  if (!session) {
    return (
      <div className='flex items-center gap-x-2'>
        <Button
          text='Become a Pro'
          variant='light'
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
        <Button
          text='Sign In'
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
      </div>
    );
  }

  return (
    <>
      <div className={styles.root}>
        <div className='flex w-fit h-fit relative'>
          <Button
            className={clsx(styles.iconButton, {
              [styles.active]: pathname.includes('/settings'),
            })}
            onClick={handleSettingsClick}
            icon='settings'
            variant='secondary'
          />
          {profileCompletionStatus?.isAllCompleted === false && (
            <div className='absolute -top-0 -right-0 w-2 h-2 rounded-full bg-primary' />
          )}
        </div>
        <DropdownMenu
          items={[
            // {
            //   id: 'share',
            //   text: intl.formatMessage({ id: 'user.menu.budge.share' }),
            //   icon: 'share',
            // },
            {
              id: 'profile',
              text: 'My profile',
              icon: 'user',
            },
            {
              id: 'sign-out',
              text: intl.formatMessage({ id: 'user.menu.budge.signOut' }),
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
