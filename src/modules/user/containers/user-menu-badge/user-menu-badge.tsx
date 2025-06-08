'use client';
import { type FC, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';
import { Emoji } from '@/modules/core/components/emoji';
import { Icon } from '@/modules/core/components/icon';
import { BurgerMenu } from '@/modules/core/containers/burger-menu';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { LocaleSelect } from '@/modules/internationalization/components/locale-select';
import { ProfileLinksModal } from '@/modules/user/components/profile-links-modal';

import type { UserMenuBadgeProps } from './user-menu-badge.interface';

import styles from './user-menu-badge.module.scss';

export const UserMenuBadge: FC<UserMenuBadgeProps> = ({ session }) => {
  const intl = useIntl();
  // state
  const isOpen = useBoolean();
  const isOpenModalLinks = useBoolean();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
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
        enabled: me?.userType === 'PROFESSIONAL' && !!me.professional,
      }
    );

  const handleSelect = useCallback(
    ({ id }: DropdownItem) => {
      if (id === 'my-profile') {
        router.push(`/app/profile/${me?.nickname || session?.user.id}`);
      }

      if (id === 'my-bookings') {
        router.push(`/app/my-bookings`);
      }

      if (id === 'share') {
        isOpenModalLinks.setTrue();
      }

      if (id === 'settings') {
        router.push(`/app/settings`);
      }

      if (id === 'sign-out') {
        void signOut({ callbackUrl: '/' });
      }

      isOpen.setFalse();
    },
    [isOpen, router, session?.user.id, isOpenModalLinks, me?.nickname]
  );

  const dropdownItems: DropdownItem[] = useMemo(() => {
    if (!me?.onboardingCompleted) {
      return [
        {
          id: 'sign-out',
          text: intl.formatMessage({ id: 'user.menu.budge.signOut' }),
          icon: 'log-out',
          variant: 'danger',
        },
      ];
    }

    if (me.userType === 'CUSTOMER') {
      return [
        {
          id: 'my-bookings',
          icon: 'calendar',
          text: intl.formatMessage({ id: 'burger.menu.btn.myBookings' }),
          variant: 'default',
        },
        {
          id: 'settings',
          icon: 'settings',
          text: intl.formatMessage({ id: 'burger.menu.btn.settings' }),
          variant: 'default',
        },
        {
          id: 'sign-out',
          text: intl.formatMessage({ id: 'user.menu.budge.signOut' }),
          icon: 'log-out',
          variant: 'danger',
        },
      ];
    }

    return [
      {
        id: 'my-profile',
        icon: 'user',
        text: intl.formatMessage({ id: 'user.header.navigation.profile' }),
        variant: 'default',
      },

      {
        id: 'my-bookings',
        icon: 'calendar',
        text: intl.formatMessage({ id: 'burger.menu.btn.myBookings' }),
        variant: 'default',
      },
      {
        id: 'share',
        icon: 'share',
        text: intl.formatMessage({ id: 'burger.menu.btn.shareProfile' }),
        variant: 'default',
      },
      {
        id: 'settings',
        icon: 'settings',
        text: intl.formatMessage({ id: 'burger.menu.btn.settings' }),
        variant: 'default',
      },
      {
        id: 'sign-out',
        text: intl.formatMessage({ id: 'user.menu.budge.signOut' }),
        icon: 'log-out',
        variant: 'danger',
      },
    ];
  }, [intl, me?.onboardingCompleted, me?.userType]);

  const handleSettingsClick = useCallback(() => {
    router.push('/app/settings');
  }, [router]);

  if (deviceType === 'mobile') {
    return <BurgerMenu session={session} />;
  }

  if (!session) {
    return (
      <div className='flex items-center gap-x-2'>
        <LocaleSelect
          renderTrigger={(props) => (
            <Button icon={props.icon} variant='light' onClick={props.toggle} />
          )}
          popoverProps={{ align: 'center' }}
        />
        <Button
          text={intl.formatMessage({
            id: 'button.registration',
          })}
          variant='light'
          onClick={() =>
            signIn(
              'auth0',
              {
                callbackUrl: '/app/profile',
              },
              {
                prompt: 'login',
                screen_hint: 'signup',
                ui_locales: params.lang as string,
              }
            )
          }
        />
        <Button
          text={intl.formatMessage({ id: 'button.sign.in' })}
          variant='light'
          onClick={() =>
            signIn(
              'auth0',
              {
                callbackUrl: '/app/profile',
              },
              {
                prompt: 'login',
                ui_locales: params.lang as string,
              }
            )
          }
        />
      </div>
    );
  }

  return (
    <>
      <div className={styles.root}>
        <LocaleSelect
          renderTrigger={(props) => (
            <Button
              icon={props.icon}
              variant='light'
              onClick={props.toggle}
              className='!rounded-xl'
            />
          )}
          popoverProps={{ align: 'center' }}
        />
        {me?.onboardingCompleted && (
          <div className='relative flex h-fit w-fit'>
            <Button
              aria-label='Settings'
              className={clsx(styles.iconButton, {
                [styles.active]: pathname.includes('/settings'),
              })}
              onClick={handleSettingsClick}
              icon='settings'
              variant='secondary'
            />
            {profileCompletionStatus?.isAllCompleted === false && (
              <div className='absolute -right-0 -top-0 h-2 w-2 rounded-full bg-primary' />
            )}
          </div>
        )}
        <DropdownMenu
          items={dropdownItems}
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
        <ProfileLinksModal
          isOpen={isOpenModalLinks.value}
          onOpenChange={isOpenModalLinks.setValue}
        />
      </div>
    </>
  );
};
