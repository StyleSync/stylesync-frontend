import { type FC } from 'react';
// components
import { Button } from '@/modules/core/components/button';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
// types
import { type PointsBookingActionsProps } from './points-booking-actions.interface';

export const PointsBookingActions: FC<PointsBookingActionsProps> = ({
  onSelect,
  items,
  onToggle,
  isOpen,
}) => {
  return (
    <DropdownMenu
      isOpen={isOpen}
      onClose={onToggle}
      onSelect={onSelect}
      trigger={
        <Button
          aria-label='Add event'
          aria-haspopup='true'
          className='!h-6 !w-6'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
          variant='unstyled'
          icon='points'
        />
      }
      items={items}
      popoverProps={{
        align: 'start',
        backgroundBlurEffect: false,
        side: 'bottom',
        classes: { content: '!mr-[22px]' },
      }}
    />
  );
};
