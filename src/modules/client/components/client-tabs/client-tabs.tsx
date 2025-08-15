import { type FC } from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { type ClientTabsProps } from './client-tabs.interface';

export const ClientTabs: FC<ClientTabsProps> = ({ activeTab, onChange }) => {
  const intl = useIntl();

  return (
    <div className='relative px-3'>
      <div className='mt-4 flex gap-4'>
        <div
          className={clsx(
            'cursor-pointer px-3 pb-3 font-medium',
            activeTab === 'booking'
              ? 'z-10 border-b-[1px] border-dark text-dark'
              : 'text-gray'
          )}
          onClick={() => onChange('booking')}
        >
          {intl.formatMessage({ id: 'client.booking.tabs.booking' })}
        </div>
        <div
          className={clsx(
            'cursor-pointer px-3 pb-3 font-medium',
            activeTab === 'about'
              ? 'z-10 border-b-[1px] border-dark text-dark'
              : 'text-gray'
          )}
          onClick={() => onChange('about')}
        >
          {intl.formatMessage({ id: 'client.booking.tabs.about' })}
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 z-0 mt-2 px-3'>
        <div className='h-[1px] w-full bg-gray-light' />
      </div>
    </div>
  );
};
