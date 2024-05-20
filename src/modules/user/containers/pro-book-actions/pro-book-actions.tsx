'use client';
import { type FC } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';
import { useIntl } from 'react-intl';
// components
import { Button } from '@/modules/core/components/button';
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// type
import type { ProBookActionsProps } from './pro-book-actions.interface';
// style
import styles from './pro-book-actions.module.scss';

export const ProBookActions: FC<ProBookActionsProps> = () => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  const session = useSession();
  const pathname = usePathname();
  const params = useParams();

  const isProProfile = pathname.includes('/app/profile/') && 'id' in params;
  const isOwner =
    session.status === 'authenticated' && session.data.user.id === params.id;

  if (deviceType !== 'mobile') {
    return null;
  }

  if (session.status === 'loading') {
    return;
  }

  if (!isProProfile) {
    return;
  }

  if (isOwner) {
    return;
  }

  return (
    <BottomFixedContent.Item orderIndex={1}>
      <div className={styles.root}>
        <Button
          className={styles.action}
          variant='secondary'
          text={intl.formatMessage({ id: 'button.contact' })}
        />
        <Button
          className={styles.action}
          variant='primary'
          text={intl.formatMessage({ id: 'button.reserve' })}
        />
      </div>
    </BottomFixedContent.Item>
  );
};
