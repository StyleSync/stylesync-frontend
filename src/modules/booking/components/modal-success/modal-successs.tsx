import { type FC } from 'react';

import { Currency } from '@prisma/client';
import { useIntl } from 'react-intl';

import { BookingStatus } from '@/modules/booking/components/booking-status';
import { InfoBox } from '@/modules/booking/components/modal-success-infobox';
import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import { type BookingModalSuccessProps } from './modal-success.interface';

import styles from './modal-success.module.scss';

export const BookingModalSuccess: FC<BookingModalSuccessProps> = ({
  bookingData,
  ...props
}) => {
  const intl = useIntl();
  // route
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
        {bookingData && (
          <div className={styles.containerInfo}>
            <InfoBox
              title={intl.formatMessage({
                id: 'booking.modal.success.service',
              })}
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
              content={<BookingStatus status={bookingData.status} />}
            />
          </div>
        )}
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
            onClick={() =>
              window.open(`/bookings/${bookingData?.code}`, '_blank')
            }
            variant='outlined'
            type='button'
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
