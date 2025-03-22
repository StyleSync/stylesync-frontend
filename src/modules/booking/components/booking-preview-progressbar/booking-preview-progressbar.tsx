import { type FC } from 'react';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
  const currentDate = new Date();

  // Calculate the remaining time before events in milliseconds
  const timeRemaining = startTime.getTime() - currentDate.getTime();

  const daysRemaining = Math.floor(
    timeRemaining /
      (MILLISECONDS_IN_SECOND *
        SECONDS_IN_MINUTE *
        MINUTES_IN_HOUR *
        HOURS_IN_DAY)
  );

  const hoursRemaining = Math.floor(
    timeRemaining /
      (MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND)
  );

  const minutesRemaning = Math.floor(
    (timeRemaining %
      (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR)) /
      (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE)
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
  let percents = 100;

  if (daysRemaining > 0) {
    percents = (daysWaited * 100) / daysRemaining;
  } else if (timeRemaining > 0) {
    percents = 100 - (minutesRemaning / 60) * 100;
  }

  let timeLeftMessage = '';

  if (timeRemaining > 0) {
    if (daysRemaining > 0) {
      timeLeftMessage = intl.formatMessage(
        { id: 'progressbar.daysRemaining' },
        { count: daysRemaining }
      );
    }

    if (daysRemaining <= 0 && hoursRemaining > 0) {
      timeLeftMessage = intl.formatMessage(
        { id: 'progressbar.hoursRemaining' },
        { count: Number(hoursRemaining) }
      );
    }

    if (daysRemaining <= 0 && hoursRemaining <= 0 && minutesRemaning > 0) {
      timeLeftMessage = intl.formatMessage(
        { id: 'progressbar.minutesRemaning' },
        { count: Number(minutesRemaning) }
      );
    }
  }

  return (
    <div className='relative ml-5 mt-[30px] h-[120px] w-[120px] md:mt-[66px]'>
      <CircularProgressbar
        strokeWidth={5}
        value={percents}
        styles={buildStyles({
          pathColor: daysRemaining >= 0 ? '#3b82ef' : '#4bb543',
          trailColor: '#d8e6fc',
        })}
      />
      <div className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'>
        <span className='text-sm text-gray-accent'>
          {daysRemaining >= 0
            ? intl.formatMessage({ id: 'progressbar.title.lost' })
            : intl.formatMessage({ id: 'progressbar.finished' })}
        </span>

        <Typography variant='small' className='!text-accent'>
          {timeLeftMessage}
        </Typography>
      </div>
    </div>
  );
};
