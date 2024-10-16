import { type FC, useMemo } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Tag } from '../../../core/components/tag';
import { Icon } from '@/modules/core/components/icon';
import { Button } from '@/modules/core/components/button';
import { DialogBottom } from '@/modules/core/components/dialog-bottom';
import { Dialog } from '@/modules/core/components/dialog';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

import type {
  BookingInfoDialogProps,
  Action,
} from './booking-info-dialog.interface';
import styles from './booking-info-dialog.module.scss';

export const BookingInfoDialog: FC<BookingInfoDialogProps> = ({
  isOpen,
  onOpenChange,
  name,
  serviceName,
  email,
  startDate,
  startTime,
  phone,
  comment,
}) => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  // const bookingDeleteMutation = trpc.booking.delete.useMutation();
  const DialogComponent = deviceType === 'mobile' ? DialogBottom : Dialog;

  const actions: Action[] = useMemo(
    () => [
      {
        id: 'call',
        text: intl.formatMessage({ id: 'bookingInfo.dialog.actions.call' }),
        icon: 'phone',
        variant: 'secondary',
      },
      {
        id: 'reschedule',
        text: intl.formatMessage({
          id: 'bookingInfo.dialog.actions.reschedule',
        }),
        icon: 'time',
        variant: 'secondary',
      },
      {
        id: 'cancel',
        text: intl.formatMessage({ id: 'bookingInfo.dialog.actions.cancel' }),
        icon: 'close',
        variant: 'danger',
      },
    ],
    [intl]
  );

  return (
    <DialogComponent isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className={styles.root}>
        <div className={styles.userInfo}>
          <Typography className={styles.name} variant='subtitle'>
            {name}
          </Typography>
          <Typography className={styles.email} variant='small'>
            {email}
          </Typography>
          <Typography className={styles.email} variant='small'>
            {phone}
          </Typography>
          {comment && (
            <div className='mt-4 flex max-w-[400px] rounded-lg border border-gray-light px-4 py-3 shadow'>
              <span className='text-sm font-normal leading-[18px] text-dark'>
                <span className='font-bold'>Comment: </span>
                {comment}
              </span>
            </div>
          )}
        </div>
        <div className={styles.bookingInfo}>
          <Tag icon='nails' text={serviceName} />
          <div className={styles.time}>
            <Icon
              name='calendar'
              width={18}
              height={18}
              className='!border-none'
            />
            <Typography variant='small'>
              {startDate} at {startTime}
            </Typography>
          </div>
        </div>
        <div className={styles.actions}>
          {actions.map((action) => (
            <Button
              key={action.id}
              className={clsx(styles.action, styles[action.variant])}
              icon={action.icon}
              text={action.text}
              variant={action.variant}
              typographyProps={{
                weight: 'medium',
              }}
              onClick={() => {
                if (action.id === 'call') {
                  window.location.href = `tel:${phone}`;
                }

                if (action.id === 'cancel') {
                  onOpenChange(false);
                }
              }}
            />
          ))}
        </div>
      </div>
    </DialogComponent>
  );
};
