'use client';
import { useContext, type FC } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';
import { useIntl } from 'react-intl';
// context
import { BookingContext } from '@/modules/booking/providers/booking-provider';
// components
import { Button } from '@/modules/core/components/button';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
// container
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

// type
import type { ProBookActionsProps } from './pro-book-actions.interface';
// style
import styles from './pro-book-actions.module.scss';
import { useBoolean } from 'usehooks-ts';

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
        <UserContactPopup
          side='top'
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
