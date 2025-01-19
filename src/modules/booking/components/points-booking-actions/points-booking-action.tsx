import { useContext } from 'react';
import { useBoolean } from 'usehooks-ts';
import { useIntl } from 'react-intl';
// components
import { Button } from '@/modules/core/components/button';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// context
import { BookingContext } from '@/modules/booking/providers/booking-provider';

import { type DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';

export const PointsBookingActions = () => {
  const intl = useIntl();
  const isOpenDropMenu = useBoolean();
  const deviceType = useDeviceType();
  // context
  const { book } = useContext(BookingContext);

  const handleSelect = (item: DropdownItem) => {
    if (item.id === 'add') {
      book();
      isOpenDropMenu.setFalse();
    }
  };

  return (
    <div>
      {deviceType === 'mobile' ? (
        <DropdownMenu
          isOpen={isOpenDropMenu.value}
          onClose={isOpenDropMenu.setFalse}
          onSelect={handleSelect}
          trigger={
            <Button
              aria-label='Add event'
              aria-haspopup='true'
              className='!h-6 !w-6'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                isOpenDropMenu.toggle();
              }}
              variant='unstyled'
              icon='points'
            />
          }
          items={[
            {
              id: 'add',
              variant: 'primary',
              icon: 'plus',
              text: intl.formatMessage({
                id: 'calendar.add.event',
              }),
            },
          ]}
          popoverProps={{
            align: 'start',
            backgroundBlurEffect: false,
            side: 'bottom',
            classes: { content: '!mr-[22px]' },
          }}
        />
      ) : (
        <Button
          text={intl.formatMessage({ id: 'button.create' })}
          onClick={() => {
            book();
          }}
          className='absolute right-[36px] top-[16px] sm:!top-[40px]'
        />
      )}
    </div>
  );
};
