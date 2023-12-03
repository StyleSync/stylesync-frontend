'use client';
import { type FC } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';
// components
import { Button } from '@/modules/core/components/button';
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

import type { ProBookActionsProps } from './pro-book-actions.interface';
import styles from './pro-book-actions.module.scss';

export const ProBookActions: FC<ProBookActionsProps> = () => {
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
        <Button className={styles.action} variant='secondary' text='Contact' />
        <Button className={styles.action} variant='primary' text='Reserve' />
      </div>
    </BottomFixedContent.Item>
  );
};
