import { FC } from 'react';

import { useIntl } from 'react-intl';

import type { IconName } from '@/modules/core/components/icon';
import { Tag } from '@/modules/core/components/tag';

import type { ClientSelectorServicesProps } from './client-selector-services.interface';
import { ServiceOnProfessional } from '@/modules/service/types/service.types';

export const ClientSelectorServices: FC<ClientSelectorServicesProps> = ({
  serviceOnProfessionalGroups,
  onServiceSelect,
}) => {
  const intl = useIntl();

  const handleServiceSelect = (service: ServiceOnProfessional) => {
    onServiceSelect?.(service);
  };

  return (
    <>
      {serviceOnProfessionalGroups.map((group) => (
        <div
          key={group.service.id}
          className='mb-3 flex flex-col gap-3 rounded-lg p-3 shadow'
        >
          <div className='flex flex-col gap-2'>
            <Tag
              icon={group.service.icon as IconName}
              text={intl.formatMessage({ id: group.service.name })}
            />
          </div>

          {group.serviceOnProfessionalList.map((service) => (
            <div
              className='cursor-pointer border-b border-primary-light pb-2 last:border-b-0'
              key={service.id}
              onClick={() => handleServiceSelect(service)}
            >
              <div className='flex items-center justify-between gap-2'>
                <span className='text-sm text-dark'>{service.title}</span>
                <span className='text-sm text-dark'>
                  {service.price} {service.currency}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
