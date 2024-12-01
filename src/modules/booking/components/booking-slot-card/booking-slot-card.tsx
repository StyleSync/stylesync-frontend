import { type FC } from 'react';
import clsx from 'clsx';
// utils
import { formatTime } from '@/modules/core/utils/time.utils';

type BookingSlotCardProps = {
  isActive: boolean;
  startTime: Date | string | number;
  endTime: Date | string | number;
  onClick: () => void;
};

export const BookingSlotCard: FC<BookingSlotCardProps> = ({
  isActive,
  startTime,
  endTime,
  onClick,
}) => {
  const formattedSlot = `${formatTime(startTime)} - ${formatTime(endTime)}`;

  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center justify-center rounded-xl border border-primary-light bg-transparent px-4 py-3 text-sm text-dark transition duration-300 hover:border-primary hover:text-primary',
        {
          '!border-primary !bg-primary text-white hover:text-white': isActive,
        }
      )}
      onClick={onClick}
    >
      <span className='text-inherit'>{formattedSlot}</span>
    </div>
  );
};
