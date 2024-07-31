import { type FC, useMemo } from 'react';

import type { DateSelectProps } from './date-select.interface';
import { Popover } from '@/modules/core/components/popover';
import { Button } from '@/modules/core/components/button';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useBoolean } from 'usehooks-ts';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
import { useIntl } from 'react-intl';
import { isSameDay } from 'date-fns';

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
          className=' !w-full'
        />
      }
      align='center'
      backgroundBlurEffect={false}
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
    </Popover>
  );
};
