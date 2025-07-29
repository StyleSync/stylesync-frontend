import { type FC } from 'react';

import { Avatar } from '@/modules/core/components/avatar';
import { Icon } from '@/modules/core/components/icon';

import { type ClientSelectorProps } from './client-selector.interface';

export const ClientSelector: FC<ClientSelectorProps> = ({
  onSelect,
  selectedClient,
  placeholder = 'Виберіть клієнта',
  disabled = false,
}) => {
  const handleClick = () => {
    console.log('ClientSelector clicked');
    if (!disabled && onSelect) {
      onSelect();
    }
  };

  return (
    <div
      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      <Avatar
        url={selectedClient?.avatar}
        size={32}
        fallback={
          selectedClient?.name
            ? selectedClient.name.charAt(0).toUpperCase()
            : undefined
        }
      />
      <span className='flex-1 text-gray-500'>
        {selectedClient?.name || placeholder}
      </span>
      <Icon className='text-gray' width={16} height={16} name='chevron-right' />
    </div>
  );
};
