import { type FC, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { Placeholder } from '@/modules/core/components/placeholder';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { getFullName } from '@/modules/user/utils/user.utils';
// types
import type { DialogFullScreenAnimationConfig } from '@/modules/core/components/dialog-full-screen/dialog-full-screen.interface';

import type {
  BurgerMenuAction,
  BurgerMenuProps,
} from './burger-menu.interface';
import styles from './burger-menu.module.scss';

const publicActions: BurgerMenuAction[] = [
  {
    id: 'sign-in',
    icon: 'log-out',
    text: 'Sign in',
    variant: 'primary',
  },
];

const dialogAnimationConfig: Partial<DialogFullScreenAnimationConfig> = {
  overlay: {
    cssOpen: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    },
    cssHidden: {
      backgroundColor: 'rgba(255,255,255,0)',
      backdropFilter: 'saturate(100%) blur(0px)',
      WebkitBackdropFilter: 'saturate(100%) blur(0px)',
    },
    springConfig: {
      duration: 200,
    },
    getCssByVisibilityPercent: (percent) => {
      const MAX_OPACITY = 0.8;
      const MAX_SATURATE_OFFSET = 80;
      const DEFAULT_SATURATE = 100;
      const MAX_BLUR = 20;
      const opacity = (MAX_OPACITY * percent) / 100;
      const saturate = DEFAULT_SATURATE + MAX_SATURATE_OFFSET * (percent / 100);
      const blur = MAX_BLUR * (percent / 100);

      return {
        backgroundColor: `rgba(255,255,255,${opacity})`,
        backdropFilter: `saturate(${saturate}%) blur(${blur}px)`,
        WebkitBackdropFilter: `saturate(${saturate}%) blur(${blur}px)`,
      };
    },
  },
  content: {
    cssOpen: {
      right: '0%',
      opacity: '1',
    },
    cssHidden: {
      right: '-80%',
      opacity: '0',
    },
    springConfig: {
      duration: 200,
    },
    getCssByVisibilityPercent: (percent) => {
      const ratio = 0.8;
      const hiddenPercent = 100 - percent;
      const rightPercent = hiddenPercent * ratio;

      return {
        right: `-${rightPercent}%`,
      };
    },
  },
};

export const BurgerMenu: FC<BurgerMenuProps> = ({ session }) => {
  const intl = useIntl();
  const router = useRouter();
  const isOpen = useBoolean();
  const { status } = useSession();

  // query
  const { data: me, ...meQuery } = trpc.user.me.useQuery(
    {
      expand: [],
    },
    {
      enabled: status === 'authenticated',
    }
  );

  // memo
  const proActions = useMemo<BurgerMenuAction[]>(() => {
    if (me?.userType !== 'PROFESSIONAL') {
      return [
        {
          id: 'my-bookings',
          icon: 'list',
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
          icon: 'log-out',
          text: intl.formatMessage({ id: 'burger.menu.btn.signOut' }),
          variant: 'danger',
        },
      ];
    }

    return [
      {
        id: 'my-profile',
        icon: 'user',
        text: intl.formatMessage({ id: 'burger.menu.btn.myProfile' }),
        variant: 'default',
      },
      {
        id: 'my-bookings',
        icon: 'list',
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
        icon: 'log-out',
        text: intl.formatMessage({ id: 'burger.menu.btn.signOut' }),
        variant: 'danger',
      },
    ];
  }, [intl, me?.userType]);

  const actions = status === 'authenticated' ? proActions : publicActions;
  const isLoading = status === 'loading' || meQuery.isInitialLoading;

  const handleActionClick = useCallback(
    (action: BurgerMenuAction) => () => {
      if (action.id === 'my-profile') {
        router.push(`/app/profile/${session?.user.id}`);
      }

      if (action.id === 'my-bookings') {
        router.push(`/app/my-bookings`);
      }

      if (action.id === 'sign-out') {
        void signOut({ callbackUrl: '/' });
      }

      if (action.id === 'settings') {
        router.push(`/app/settings`);
      }

      if (action.id === 'sign-in') {
        router.push('/auth/sign-in');
      }

      isOpen.setFalse();
    },
    [isOpen, router, session?.user.id]
  );

  return (
    <DialogFullScreen
      isOpen={isOpen.value}
      onOpenChange={isOpen.setValue}
      trigger={
        <Button
          className={styles.trigger}
          icon='menu'
          variant='unstyled'
          rippleColor='transparent'
          onClick={isOpen.toggle}
        />
      }
      classes={{
        content: styles.dialogContent,
        overlay: styles.dialogOverlay,
      }}
      animationConfig={dialogAnimationConfig}
      closeOnOutsideClick
    >
      <div className={styles.root}>
        <div className={styles.top}>
          <Placeholder
            className={clsx(styles.avatarSkeleton, 'skeleton')}
            isActive={isLoading}
          >
            <Avatar
              size={60}
              className={styles.avatar}
              url={me?.avatar}
              fallback={<Emoji name='sunglasses' width={34} height={34} />}
            />
          </Placeholder>
          <div className={styles.info}>
            <Placeholder
              className={styles.unauthPlaceholder}
              isActive={status === 'unauthenticated'}
              placeholder={
                <Typography className={styles.name}>
                  {intl.formatMessage({ id: 'burger.menu.notAuthenticated' })}
                </Typography>
              }
            >
              <Placeholder
                className={clsx(styles.nameSkeleton, 'skeleton')}
                isActive={isLoading}
              >
                <Typography
                  className={styles.name}
                  variant='body1'
                  weight='medium'
                >
                  {getFullName(me ?? {})}
                </Typography>
              </Placeholder>
              <Placeholder
                className={clsx(styles.emailSkeleton, 'skeleton')}
                isActive={isLoading}
              >
                <Typography className={styles.email} variant='small' cutText>
                  {me?.email}
                </Typography>
              </Placeholder>
            </Placeholder>
          </div>

          <Button
            className={styles.close}
            icon='arrow-right'
            variant='unstyled'
            rippleColor='#fff'
            onClick={isOpen.setFalse}
          />
        </div>
        <div className={styles.content}>
          <Placeholder
            className={styles.placeholder}
            isActive={isLoading}
            placeholder={
              <>
                <div className={styles.button}>
                  <div className={clsx(styles.skeleton, 'skeleton')} />
                </div>
                <div className={styles.button}>
                  <div className={clsx(styles.skeleton, 'skeleton')} />
                </div>
              </>
            }
          >
            {actions.map((action) => (
              <Button
                key={action.id}
                className={clsx(styles.button, {
                  [styles.danger]: action.variant === 'danger',
                  [styles.primary]: action.variant === 'primary',
                })}
                icon={action.icon}
                text={action.text}
                variant='unstyled'
                onClick={handleActionClick(action)}
                typographyProps={{
                  weight: 'medium',
                }}
              />
            ))}
          </Placeholder>
        </div>
      </div>
    </DialogFullScreen>
  );
};
