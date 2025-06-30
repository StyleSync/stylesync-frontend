import { useContext } from 'react';

import { useIntl } from 'react-intl';

import { BookingContext } from '@/modules/booking/providers/booking-provider';
import { Button } from '@/modules/core/components/button';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

export const PointsBookingActions = () => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  // context
  const { book } = useContext(BookingContext);

  if (deviceType !== 'mobile') {
    return (
      <Button
        text={intl.formatMessage({ id: 'button.create' })}
        onClick={() => {
          book();
        }}
        className='absolute right-[36px] top-[16px] sm:!top-[40px]'
      />
    );
  }

  return null;
};
