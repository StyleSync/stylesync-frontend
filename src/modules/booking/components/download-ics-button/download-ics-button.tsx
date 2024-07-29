import { type FC, useCallback, useMemo } from 'react';
import { createEvent, type EventAttributes } from 'ics';
// components
import { Button } from '@/modules/core/components/button';
// types
import type { DownloadIcsButtonProps } from './download-ics-button.interface';

export const DownloadIcsButton: FC<DownloadIcsButtonProps> = ({
  startEventTime,
  duration,
  title,
  location,
  organizer,
  attendee,
}) => {
  const event: EventAttributes = useMemo(() => {
    return {
      start: startEventTime,
      duration,
      title,
      location,
      organizer,
      attendees: [
        {
          name: attendee.name,
          email: attendee.email,
          partstat: 'ACCEPTED',
          role: 'REQ-PARTICIPANT',
        },
      ],
    };
  }, [startEventTime, duration, title, location, organizer, attendee]);

  const handleDownloadIcs = useCallback(async () => {
    const filename = 'ExampleEvent.ics';
    const file: File = await new Promise((resolve, reject) => {
      createEvent(event, (error, value) => {
        if (error) {
          reject(error);
        }

        resolve(new File([value], filename, { type: 'text/calendar' }));
      });
    });
    const url = URL.createObjectURL(file);

    // trying to assign the file URL to a window could cause cross-site
    // issues so this is a workaround using HTML5
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  }, [event]);

  return (
    <Button
      variant='outlined'
      text='Add to calendar'
      onClick={handleDownloadIcs}
    />
  );
};
