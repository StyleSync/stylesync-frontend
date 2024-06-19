import { type FC } from 'react';
import { Currency } from '@prisma/client';
import { useIntl } from 'react-intl';

// components
import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
import { InfoBox } from '@/modules/booking/components/modal-success-infobox';
// type
import { type BookingModalSuccessProps } from './modal-success.interface';
// utils
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
// style
import styles from './modal-success.module.scss';

export const BookingModalSuccess: FC<BookingModalSuccessProps> = ({
  bookingData,
  ...props
}) => {
  const intl = useIntl();

  const handleModalClose = () => {
    if (props.onOpenChange) {
      props.onOpenChange(false);
    }
  };

  const formattedDate = formatI18n(
    bookingData?.startTime ? new Date(bookingData?.startTime) : new Date(),
    `d MMM`,
    intl.locale
  );

  const formattedStartTime = formatI18n(
    bookingData?.startTime ? new Date(bookingData?.startTime) : new Date(),
    'HH:mm',
    intl.locale
  );
  const formattedEndTime = formatI18n(
    bookingData?.endTime ? new Date(bookingData?.endTime) : new Date(),
    'HH:mm',
    intl.locale
  );

  const statusSuccess =
    bookingData?.status === 'PENDING'
      ? intl.formatMessage({ id: 'booking.modal.status.pending' })
      : intl.formatMessage({ id: 'booking.modal.status.approved' });

  const currencies = {
    [Currency.USD]: '$',
    [Currency.UAH]: '₴',
    [Currency.EUR]: '€',
    default: '',
  };

  const currency =
    currencies[bookingData?.serviceProfessional.currency ?? 'default'];

  return (
    <Dialog {...props} classes={{ content: styles.content }}>
      <div className={styles.root}>
        <div className={styles.iconSuccess}>
          <Icon width={60} height={60} name='success' />
          <Typography variant='subtitle'>
            {intl.formatMessage({ id: 'booking.modal.success.title' })}
          </Typography>
        </div>
        <div className={styles.containerInfo}>
          <InfoBox
            title={intl.formatMessage({ id: 'booking.modal.success.service' })}
            content={`${bookingData?.serviceProfessional?.title}`}
          />
          <InfoBox
            title={intl.formatMessage({ id: 'booking.modal.success.price' })}
            content={`${bookingData?.serviceProfessional.price}${currency}`}
          />
          <InfoBox
            title={intl.formatMessage({ id: 'booking.modal.success.time' })}
            content={`${formattedDate}, ${formattedStartTime} - ${formattedEndTime}`}
          />
          <InfoBox
            status={bookingData?.status}
            title={intl.formatMessage({ id: 'booking.modal.success.status' })}
            content={statusSuccess}
          />
        </div>
        <div className={styles.action}>
          <Button
            onClick={handleModalClose}
            variant='unstyled'
            text={intl.formatMessage({
              id: 'button.close',
            })}
            className={styles.closeBtn}
          />
          <Button
            variant='outlined'
            text={intl.formatMessage({
              id: 'booking.modal.success.button.myBooking',
            })}
            className={styles.booking}
          />
        </div>
      </div>
      <Typography />
    </Dialog>
  );
};
