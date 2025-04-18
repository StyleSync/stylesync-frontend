import { type FC, type ReactNode, useMemo } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useIntl } from 'react-intl';

import Bg from '@/assets/images/bg-1.png';
import { Button } from '@/modules/core/components/button';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import { Divider } from '@/modules/core/components/divider';
import { Icon } from '@/modules/core/components/icon';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { useSettingsNavigation } from '@/modules/user/hooks/use-settings-navigation';

import type { ProfileSettingsTabContentLayoutProps } from './profile-settings-tab-content-layout.interface';

import 'react-circular-progressbar/dist/styles.css';
import styles from './profile-settings-tab-content-layout.module.scss';

export const ProfileSettingsTabContentLayout: FC<
  ProfileSettingsTabContentLayoutProps
> = ({ icon, title, actions, isLoading = false, hideActions, children }) => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  const { reset } = useSettingsNavigation();
  // queries
  const { data: me } = trpc.user.me.useQuery({ expand: ['professional'] });
  const { data: profileCompletionStatus } =
    trpc.professional.getProfileCompletionStatus.useQuery(
      {
        id: me?.id || '',
      },
      {
        enabled: me?.userType === 'PROFESSIONAL',
      }
    );
  // memo
  const _actions = useMemo<(ButtonProps | { actionNode: ReactNode })[]>(() => {
    const filterActions = actions?.filter((item) => !item.isMobile);

    return filterActions ?? [];
  }, [actions]);

  return (
    <div className={styles.root}>
      {deviceType === 'mobile' && (
        <Image
          className='absolute bottom-0 left-0 right-0 top-0 z-[-1] h-full w-full object-cover opacity-20'
          src={Bg.src}
          width={Bg.width}
          height={Bg.height}
          blurDataURL={Bg.blurDataURL}
          alt='background'
        />
      )}
      <div className={styles.title}>
        {deviceType === 'mobile' && (
          <Button
            className={styles.backButton}
            icon='chevron-left'
            variant='secondary'
            onClick={reset}
          />
        )}
        {icon && deviceType !== 'mobile' && <Icon name={icon} />}
        {title && (
          <Typography variant='body1' weight='medium'>
            {intl.formatMessage({
              id: title,
            })}
          </Typography>
        )}
      </div>
      <div className='flex flex-1 gap-x-6 overflow-y-auto pb-0 md:overflow-y-visible'>
        <div className={styles.content}>
          <div className={styles.scrolledContent}>
            {deviceType === 'mobile' && title && (
              <span className='text-2xl font-medium text-dark'>
                {intl.formatMessage({
                  id: title,
                })}
              </span>
            )}
            <Placeholder
              isActive={isLoading}
              placeholder={<Spinner size='medium' />}
            >
              <div className={styles.childrenWrapper}>{children}</div>
            </Placeholder>
          </div>
          {_actions.length > 0 && !hideActions && (
            <>
              <Divider className={styles.divider} variant='horizontal' />
              <div className={styles.actions}>
                {_actions.map((action, index) =>
                  'actionNode' in action ? (
                    action.actionNode
                  ) : (
                    <Button key={index} {...action} />
                  )
                )}
              </div>
            </>
          )}
        </div>
        {profileCompletionStatus && !profileCompletionStatus.isAllCompleted && (
          <div className='hidden w-[300px] flex-col gap-y-6 rounded-[20px] bg-white p-8 shadow xl:flex'>
            <span className='text-base font-medium text-dark'>
              {intl.formatMessage({
                id: 'professional.settings.profileRequirements.title',
              })}
            </span>
            <div className='mx-auto w-[70%]'>
              <CircularProgressbar
                strokeWidth={6}
                value={
                  (profileCompletionStatus.completedCount /
                    profileCompletionStatus.requirements.length) *
                  100
                }
                styles={buildStyles({
                  pathColor: '#3b82ef',
                  trailColor: '#d8e6fc',
                  textColor: '#3b82ef',
                })}
                text={`${Math.floor(
                  (profileCompletionStatus.completedCount /
                    profileCompletionStatus.requirements.length) *
                    100
                )}%`}
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              {profileCompletionStatus.requirements.map(
                ({ requirementCompleted, requirementTitle }, index) => (
                  <div
                    className={clsx('flex items-start gap-x-2 text-gray', {
                      'text-green': requirementCompleted,
                    })}
                    key={index}
                  >
                    <Icon
                      name={requirementCompleted ? 'check-mark' : 'close'}
                      width={18}
                      color='inherit'
                      className='mt-[2px] shrink-0'
                    />
                    <span className='text-sm font-medium text-inherit'>
                      {intl.formatMessage({ id: requirementTitle })}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
