import { type FC, type ReactNode, useMemo } from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// components
import { Divider } from '@/modules/core/components/divider';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
import { Spinner } from '@/modules/core/components/spinner';
import { Placeholder } from '@/modules/core/components/placeholder';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useSettingsNavigation } from '@/modules/user/hooks/use-settings-navigation';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import type { ProfileSettingsTabContentLayoutProps } from './profile-settings-tab-content-layout.interface';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
// style
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
        enabled: !!me,
      }
    );
  // memo
  const _actions = useMemo<(ButtonProps | { actionNode: ReactNode })[]>(() => {
    if (deviceType === 'mobile') {
      return [
        {
          text: intl.formatMessage({ id: 'button.back' }),
          variant: 'secondary',
          onClick: reset,
        },
        ...(actions ?? []),
      ];
    }

    const filterActions = actions?.filter((item) => !item.isMobile);

    return filterActions ?? [];
  }, [actions, deviceType, reset, intl]);

  return (
    <div className={styles.root}>
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
        <Typography variant='body1' weight='medium'>
          {title}
        </Typography>
      </div>
      <div className='flex flex-1 gap-x-6 overflow-auto'>
        <div className={styles.content}>
          <div className={styles.scrolledContent}>
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
