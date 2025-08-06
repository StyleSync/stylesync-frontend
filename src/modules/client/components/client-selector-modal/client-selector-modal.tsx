import { FC, useMemo } from 'react';

import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { ClientSelectorServices } from '@/modules/client/components/client-selector-services';
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';
import { sortServiceOnProfessionalGroups } from '@/modules/service/utils/service.utils';
import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

import { type ClientSelectorModalProps } from './client-selector-modal.inderface';

export const ClientSelectorModal: FC<ClientSelectorModalProps> = ({
  isOpen,
  onOpenChange,
  onServiceSelect,
}) => {
  const { groups } = useServiceOnProfessionalGroups();

  const sortedServiceOnProfessionalGroups = useMemo(
    () => sortServiceOnProfessionalGroups(groups),
    [groups]
  );

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleServiceSelect = (service: ServiceOnProfessional) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    }

    onOpenChange(false);
  };

  return (
    <DialogFullScreen
      applyMobileBottomTabPadding
      classes={{
        overlay: 'z-[30]',
        content: 'w-full p-6',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className='flex w-full flex-col'>
        <div className='relative mb-8 mt-3 flex items-center'>
          <Button
            variant='outlined'
            icon='chevron-left'
            className='absolute left-0 z-10 !border-none !text-dark'
            onClick={handleClose}
          />
          <span className='flex-1 text-center text-lg font-medium text-dark'>
            Виберіть сервіс
          </span>
        </div>
        <ClientSelectorServices
          serviceOnProfessionalGroups={sortedServiceOnProfessionalGroups}
          onServiceSelect={handleServiceSelect}
        />
      </div>
    </DialogFullScreen>
  );
};
