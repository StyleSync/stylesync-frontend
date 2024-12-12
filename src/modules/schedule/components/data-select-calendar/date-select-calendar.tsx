import { useMemo, type FC } from 'react';
import { useBoolean } from 'usehooks-ts';
import { useIntl } from 'react-intl';
import { uk, enUS } from 'date-fns/locale';
// mui calendar
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
  const { locale, formatDate } = useIntl();

  const dateFnsLocale = useMemo(() => {
    if (locale === 'uk') return uk;

    return enUS;
  }, [locale]);

  const formattedDate = selectedDate
    ? formatDate(selectedDate, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <Popover
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      trigger={
        <Button
          variant='unstyled'
          iconEnd={isOpen.value ? 'chevron-top' : 'chevron-bottom'}
          onClick={isOpen.setTrue}
          text={formattedDate}
          classes={{
            iconEnd: '!w-5 !h-4',
            root: '!pl-2 !pr-2',
          }}
        />
      }
      align='start'
      backgroundBlurEffect={false}
    >
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={dateFnsLocale}
      >
        <DateCalendar
          value={selectedDate}
          onChange={(date) => {
            if (!date) return;
            const daysOfMonth = getDaysOfCurrentMonth(date);

            onDateSelect(date);
            onMonthChange(daysOfMonth);
            isOpen.setFalse();
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
      </LocalizationProvider>
    </Popover>
  );
};