import { type FC } from 'react';
import { faker } from '@faker-js/faker';
import clsx from 'clsx';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceTag } from '@/modules/service/components/service-tag';
import { Icon, type IconName } from '@/modules/core/components/icon';
import { Button } from '@/modules/core/components/button';
import { DialogBottom } from '@/modules/core/components/dialog-bottom';
import { Dialog } from '@/modules/core/components/dialog';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// assets
import Girl from '@/assets/images/girl.png';

import type { BookingInfoDialogProps } from './booking-info-dialog.interface';
import styles from './booking-info-dialog.module.scss';

const actions = [
  {
    id: 'call',
    text: 'Call',
    icon: 'phone',
  },
  {
    id: 'reschedule',
    text: 'Reschedule',
    icon: 'time',
  },
  {
    id: 'cancel',
    text: 'Cancel reservation',
    icon: 'close',
    variant: 'danger',
  },
] satisfies {
  id: string;
  text: string;
  icon?: IconName;
  variant?: 'default' | 'danger';
}[];

export const BookingInfoDialog: FC<BookingInfoDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const deviceType = useDeviceType();
  const DialogComponent = deviceType === 'mobile' ? DialogBottom : Dialog;

  return (
    <DialogComponent isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className={styles.root}>
        <div className={styles.userInfo}>
          <Avatar url={Girl.src} size='medium' />
          <Typography className={styles.name} variant='subtitle'>
            {faker.person.fullName()}
          </Typography>
          <Typography className={styles.email} variant='small'>
            {faker.internet.email()}
          </Typography>
        </div>
        <div className={styles.bookingInfo}>
          <ServiceTag
            // @ts-ignore
            data={{ id: 'test', icon: 'nails', name: 'Evening makeup' }}
          />
          <div className={styles.time}>
            <Icon name='calendar' width={18} height={18} />
            <Typography variant='small'>Friday, 27 Dec at 15:26</Typography>
          </div>
        </div>
        <div className={styles.actions}>
          {actions.map((action) => (
            <Button
              key={action.id}
              className={clsx(styles.action, {
                [styles.danger]: action.variant === 'danger',
              })}
              icon={action.icon}
              text={action.text}
              rippleColor={
                action.variant === 'danger' ? 'rgb(255,200,223)' : undefined
              }
              variant='unstyled'
            />
          ))}
        </div>
      </div>
    </DialogComponent>
  );
};
