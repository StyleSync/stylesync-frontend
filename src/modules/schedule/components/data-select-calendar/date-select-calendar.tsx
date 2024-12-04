import { Button } from '@/modules/core/components/button';
import { Popover } from '@/modules/core/components/popover';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useBoolean } from 'usehooks-ts';
import type { DateSelectCalendarProps } from './data-select-calendat.interface';
import { type FC } from 'react';
import { format } from 'date-fns';
import { getDaysOfCurrentMonth } from '@/modules/schedule/utils/get-current-month-days';

export const DateSelectCalendar: FC<DateSelectCalendarProps> = ({
  onMonthChange,
  onDateSelect,
  selectedDate,
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
        classes={{}}
      />
    </Popover>
  );
};
