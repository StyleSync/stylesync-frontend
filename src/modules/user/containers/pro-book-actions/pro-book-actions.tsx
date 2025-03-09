'use client';
import { type FC, useContext } from 'react';

import { useParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { BookingContext } from '@/modules/booking/providers/booking-provider';
import { Button } from '@/modules/core/components/button';
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';

import type { ProBookActionsProps } from './pro-book-actions.interface';

import styles from './pro-book-actions.module.scss';

export const ProBookActions: FC<ProBookActionsProps> = ({ userId }) => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  const session = useSession();
  const pathname = usePathname();
  const params = useParams();
  const isContactOpen = useBoolean();

  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  // context
  const { book } = useContext(BookingContext);

  const isProProfile = pathname.includes('/app/profile/') && 'id' in params;
  const isOwner =
    session.status === 'authenticated' && session.data.user.id === userId;

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
        <UserContactPopup
          side='top'
          classes={{ content: '!ml-[23px]' }}
          professional={professional}
          isOpen={isContactOpen.value}
          onClose={isContactOpen.setFalse}
          trigger={
            <Button
              variant='secondary'
              text={intl.formatMessage({ id: 'button.contact' })}
              onClick={isContactOpen.setTrue}
            />
          }
        />
        <Button
          className={styles.action}
          variant='primary'
          text={intl.formatMessage({ id: 'button.reserve' })}
          onClick={() => {
            book();
          }}
        />
      </div>
    </BottomFixedContent.Item>
  );
};
