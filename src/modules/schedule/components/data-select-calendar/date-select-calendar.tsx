import { type FC } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format } from 'date-fns';
import { useBoolean } from 'usehooks-ts';
// components
import { Button } from '@/modules/core/components/button';
import { Popover } from '@/modules/core/components/popover';
import { EventIndicators } from '@/modules/schedule/components/event-indicators';
// utils
import { getDaysOfCurrentMonth } from '@/modules/schedule/utils/get-current-month-days';
// types
import type { DateSelectCalendarProps } from './data-select-calendat.interface';

export const DateSelectCalendar: FC<DateSelectCalendarProps> = ({
  onMonthChange,
  onDateSelect,
  selectedDate,
  events,
}) => {
  const isOpen = useBoolean();

  return (
    <Popover
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      trigger={
        <Button
          variant='unstyled'
          iconEnd={isOpen.value ? 'chevron-top' : 'chevron-bottom'}
          onClick={isOpen.setTrue}
          text={selectedDate ? format(selectedDate, 'dd MMMM yyyy') : ''}
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
        value={selectedDate}
        onChange={(date) => {
          if (!date) return;
          const daysOfMonth = getDaysOfCurrentMonth(date);

          onDateSelect(date);
          onMonthChange(daysOfMonth);
          isOpen.setFalse;
        }}
        slots={
          {
            day: EventIndicators,
          } as any
        }
        slotProps={{
          day: {
            events,
          } as any,
        }}
        classes={{}}
      />
    </Popover>
  );
};
