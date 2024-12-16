import { type FC, useCallback } from 'react';

import { RadioButton } from '@/modules/core/components/radio-button';
import { BaseCardWithRadioButton } from '@/modules/booking/components/booking-card-radio-button';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './service-on-professional-select.module.scss';
import { type ServiceOnProfessionalSelectProps } from '@/modules/service/components/service-on-professional-select/service-on-professional-select.interface';

export const ServiceOnProfessionalSelect: FC<
  ServiceOnProfessionalSelectProps
> = ({ value, onChange, professional }) => {
  const { data: serviceList } = trpc.serviceOnProfessional.list.useQuery({
    limit: 10,
    offset: 0,
    professionalId: professional?.id,
  });

  const handleChange = useCallback(
    (id: string) => {
      const serviceOnProfessional = serviceList?.find((item) => item.id === id);

      if (serviceOnProfessional) {
        onChange(serviceOnProfessional);
      }
    },
    [serviceList, onChange]
  );

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <RadioButton.Group
          value={value?.id || null}
          onChange={handleChange}
          name='cards'
        >
          <div className={styles.baseCardContainer}>
            {serviceList?.items.map((service) => (
              <BaseCardWithRadioButton
                key={service.id}
                value={service.id}
                serviceOnProfessional={service}
              />
            ))}
          </div>
        </RadioButton.Group>
      </div>
    </div>
  );
};
