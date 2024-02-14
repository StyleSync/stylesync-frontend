import { type FC } from 'react';
// components
import { Button } from '@/modules/core/components/button';
import { Divider } from '@/modules/core/components/divider';
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
import { InfoBox } from '../modal-success-infobox/info-box';
//
import { format } from 'date-fns';

// utils
// import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
// style
import styles from './modal-success.module.scss';
// import { type BookingModalSuccessProps } from './modal-success.interface';

export const BookingModalSuccess: FC<Omit<DialogProps, 'children'>> = ({
  bookingData,
  ...props
}) => {
  const handleModalClose = () => {
    if (props.onOpenChange) {
      props.onOpenChange(false);
    }
  };

  const formattedDate = format(
    bookingData?.startTime ? new Date(bookingData?.startTime) : new Date(),
    `d EE`
  );

  const formattedStartTime = format(
    bookingData?.startTime ? new Date(bookingData?.startTime) : new Date(),
    'HH:mm'
  );
  const formattedEndTime = format(
    bookingData?.endTime ? new Date(bookingData?.endTime) : new Date(),
    'HH:mm'
  );

  const statusSuccess =
    bookingData?.status === 'PENDING' ? 'Requested' : 'Approved';

  return (
    <Dialog {...props} classes={{ content: styles.content }}>
      <div className={styles.root}>
        <div className={styles.iconSuccess}>
          <Icon width={60} height={60} name='success' />
          <Typography variant='subtitle'>Booking successful!</Typography>
          <Divider variant='horizontal' />
        </div>
        <div className={styles.containerInfo}>
          <InfoBox
            title='Service'
            content={`${bookingData?.serviceProfessional?.title}`}
          />
          <InfoBox
            title='Price'
            content={`${bookingData?.serviceProfessional.price} ${bookingData?.serviceProfessional.currency}`}
          />
          <InfoBox
            title='Time'
            content={`${formattedDate}, ${formattedStartTime} - ${formattedEndTime}`}
          />
          <InfoBox
            status={bookingData?.status}
            title='Status'
            content={statusSuccess}
          />
        </div>
        <div className={styles.action}>
          <Button
            onClick={handleModalClose}
            variant='unstyled'
            text='Close'
            className={styles.closeBtn}
          />
          <Button
            variant='outlined'
            text='My booking'
            className={styles.booking}
          />
        </div>
      </div>
      <Typography />
    </Dialog>
  );
};
