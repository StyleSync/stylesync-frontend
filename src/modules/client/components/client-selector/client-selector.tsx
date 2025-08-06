import React, { forwardRef } from 'react';

import { Avatar } from '@/modules/core/components/avatar';
import { Icon } from '@/modules/core/components/icon';

import { type ClientSelectorProps } from './client-selector.interface';

export const ClientSelector = forwardRef<HTMLDivElement, ClientSelectorProps>(
  ({ onSelect, selectedClient, setSelectedClient, disabled = false }, ref) => {
    const isDisabled = disabled || !!selectedClient;
    const handleClick = () => {
      if (isDisabled) return;
      onSelect?.();
    };

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (setSelectedClient) {
        setSelectedClient(null);
      }
    };

    return (
      <div
        ref={ref}
        className='flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#ced4dc] bg-white p-4'
        onClick={handleClick}
        aria-disabled={isDisabled}
      >
        <Avatar
          url={selectedClient?.image ?? ''}
          size={40}
          fallback={
            selectedClient?.name
              ? selectedClient.name.charAt(0).toUpperCase()
              : undefined
          }
        />
        {selectedClient ? (
          <div className='flex flex-1 flex-col'>
            <span className='text-gray-500'>
              {selectedClient.firstName} {selectedClient.lastName}
            </span>
            <span className='text-gray-500'>{selectedClient.phone}</span>
          </div>
        ) : (
          <span className='flex-1 text-gray-500'>Виберіть клієнта</span>
        )}
        {selectedClient ? (
          <Icon
            className='ml-auto text-gray'
            width={16}
            height={16}
            name='close'
            onClick={handleClose}
          />
        ) : (
          <Icon
            className='ml-auto text-gray'
            width={16}
            height={16}
            name='chevron-right'
          />
        )}
      </div>
    );
  }
);

ClientSelector.displayName = 'ClientSelector';
