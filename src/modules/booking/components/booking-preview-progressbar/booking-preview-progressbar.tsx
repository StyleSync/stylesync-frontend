import { type FC } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
// type
import type { BookingPreviewProgressbarProps } from './booking-preview-progressbar.interface';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

export const BookingPreviewProgressbar: FC<BookingPreviewProgressbarProps> = ({
  createdAt,
  startTime,
}) => {
  const currentDate = new Date();

  const daysRemaining = Math.ceil(
    (startTime.getTime() - currentDate.getTime()) /
      (MILLISECONDS_IN_SECOND *
        SECONDS_IN_MINUTE *
        MINUTES_IN_HOUR *
        HOURS_IN_DAY)
  );

  // Calculate the number of days that have passed since the reservation was created
  const daysWaited = Math.ceil(
    (currentDate.getTime() - createdAt.getTime()) /
      (MILLISECONDS_IN_SECOND *
        SECONDS_IN_MINUTE *
        MINUTES_IN_HOUR *
        HOURS_IN_DAY)
  );

  // Calculate the percentage of time passed
  const percents = (daysWaited * 100) / daysRemaining;

  return (
    <div className='relative ml-5 mt-[66px] h-[120px] w-[120px]'>
      <CircularProgressbar
        strokeWidth={3}
        value={percents}
        styles={buildStyles({
          pathColor: '#64e841',
          trailColor: '#d8e6fc',
        })}
      />
      <div className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'>
        <Typography>Залишилось</Typography>
        <Typography weight='semibold'>{`${daysRemaining} д.`}</Typography>
      </div>
    </div>
  );
};
