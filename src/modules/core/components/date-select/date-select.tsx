import { type FC, useMemo } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { isSameDay } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/modules/core/components/button';
import { Popover } from '@/modules/core/components/popover';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import type { DateSelectProps } from './date-select.interface';

export const DateSelect: FC<DateSelectProps> = ({
  value,
  onChange,
  triggerProps,
  placeholder,
}) => {
  const isOpen = useBoolean();
  const { locale } = useIntl();

  // memo
  const displayText = useMemo(() => {
    if (!value) {
      return placeholder;
    }

    return formatI18n(value, 'dd MMM yyyy', locale);
  }, [locale, value, placeholder]);

  const dateFnsLocale = useMemo(() => {
    if (locale === 'uk') return uk;

    return enUS;
  }, [locale]);

  return (
    <Popover
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      trigger={
        <Button
          text={displayText}
          variant='outlined'
          type='button'
          iconEnd='calendar'
          onClick={isOpen.setTrue}
          {...triggerProps}
          className='!w-full'
        />
      }
      align='center'
      backgroundBlurEffect={false}
    >
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={dateFnsLocale}
      >
        <DateCalendar
          value={value}
          onChange={(date) => {
            if (!onChange) return;

            if (value && isSameDay(value, date)) {
              onChange(null);

              return;
            }

            onChange(date);
          }}
          classes={{}}
        />
      </LocalizationProvider>
    </Popover>
  );
};
