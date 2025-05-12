import { type FC, useCallback } from 'react';

import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';

import type { DownloadIcsButtonProps } from './add-google-calendar-event.interface';

const MILLISECONDS_IN_MINUTE = 1000;

export const AddGoogleCalendarEventBtn: FC<DownloadIcsButtonProps> = ({
  startEventTime,
  duration,
  title,
  location,
}) => {
  const intl = useIntl();

  const formatGoogleCalendarDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const handleAddToGoogleCalendar = useCallback(() => {
    const startDate = formatGoogleCalendarDate(new Date(startEventTime));

    const durationInMinutes = duration.hours * 60 + duration.minutes;

    const endDate = formatGoogleCalendarDate(
      new Date(startEventTime + durationInMinutes * 60 * MILLISECONDS_IN_MINUTE)
    );

    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&dates=${startDate}/${endDate}&location=${location}`;

    window.open(url, '_blank');
  }, [startEventTime, duration, title, location]);

  return (
    <Button
      variant='outlined'
      text={intl.formatMessage({ id: 'button.add.to.calendar' })}
      onClick={handleAddToGoogleCalendar}
    />
  );
};
