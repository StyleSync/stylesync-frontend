import { type FC, useMemo } from 'react';

import { format } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';

import type { DayOverrideModalProps } from './day-override-modal.interface';

export const DayOverrideModal: FC<
  Omit<DialogProps, 'children'> & DayOverrideModalProps
> = ({
  isOpen,
  onOpenChange,
  handleResetToWeeklySchedule,
  dates,
  ...props
}) => {
  const intl = useIntl();

  const dateLocale = intl.locale === 'uk' ? uk : enUS;
  const formattedDate = useMemo(() => {
    return dates
      .map((date) => format(date, 'd MMMM y', { locale: dateLocale }))
      .join(', ');
  }, [dates, dateLocale]);

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog {...props} isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className='flex w-full flex-col items-center gap-6 p-6 align-middle md:max-w-[370px]'>
        <span className='text-[18px]/6 font-medium'>
          {intl.formatMessage(
            { id: 'modal.reset.custom.schedule' },
            { date: formattedDate }
          )}
        </span>
        <div className='flex w-full justify-between gap-4'>
          <Button
            className='!w-full'
            onClick={handleClose}
            variant='secondary'
            text={intl.formatMessage({ id: 'button.cancel' })}
          />
          <Button
            className='!w-full'
            text={intl.formatMessage({ id: 'button.confirm' })}
            onClick={handleResetToWeeklySchedule}
          />
        </div>
      </div>
    </Dialog>
  );
};
