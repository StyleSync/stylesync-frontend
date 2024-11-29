import { Button } from '@/modules/core/components/button';
import { Popover } from '@/modules/core/components/popover';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useBoolean } from 'usehooks-ts';
import type { DateSelectCalendarProps } from './data-select-calendat.interface';
import { useState, type FC } from 'react';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';

export const DateSelectCalendar: FC<DateSelectCalendarProps> = ({
  onMonthChange,
}) => {
  const isOpen = useBoolean();

  const [showDate, setShowDate] = useState<string>(
    format(new Date(), 'dd MMMM yyyy')
  );

  return (
    <Popover
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      trigger={
        <Button
          variant='unstyled'
          iconEnd={isOpen.value ? 'chevron-top' : 'chevron-bottom'}
          onClick={isOpen.setTrue}
          text={showDate}
          classes={{
            iconEnd: '!w-5 !h-4',
            root: '!pl-2 !pr-2',
          }}
        />
      }
      align='start'
      backgroundBlurEffect={false}
    >
      <DateCalendar
        // value={value}
        onChange={(date) => {
          if (!date) return;
          setShowDate(format(date, 'dd MMMM yyyy'));

          const starDay = startOfMonth(date);
          const endDay = endOfMonth(date);
          const daysOfMonth = eachDayOfInterval({
            start: starDay,
            end: endDay,
          });

          onMonthChange(daysOfMonth);
          isOpen.setFalse;
        }}
        classes={{}}
      />
    </Popover>
  );
};
