'use client';

import { Icon } from '@/modules/core/components/icon';

export const ClientsList = () => {
  return (
    <div>
      <div className='flex items-center gap-2 rounded-xl bg-gray-light px-3'>
        <Icon name='search' width={20} height={20} className='text-gray' />
        <input
          className='h-[40px] flex-1 bg-transparent outline-none placeholder:text-sm placeholder:font-medium placeholder:text-gray'
          placeholder='Пошук клієнтів'
        />
      </div>
    </div>
  );
};
