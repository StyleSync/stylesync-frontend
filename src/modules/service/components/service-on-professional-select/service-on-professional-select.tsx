import { useState } from 'react';
import { RadioButton } from '@/modules/core/components/radio-button';
import { BaseCardWithRadioButton } from '@/modules/booking/components/booking-card-radio-button';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './service-on-professional-select.module.scss';

export const ServiceOnProfessionalSelect = () => {
  const [value, setValue] = useState<string>('');

  const { data: me } = trpc.user.me.useQuery({ expand: ['professional'] });
  const { data: serviceList } = trpc.serviceOnProfessional.list.useQuery(
    {
      limit: 10,
      offset: 0,
      professionalId: me?.professional?.id,
    },
    {
      enabled: Boolean(me?.professional?.id),
    }
  );

  return (
    <RadioButton.Group value={value} onChange={setValue} name='cards'>
      <div className={styles.baseCardContainer}>
        {serviceList?.map((service) => (
          <BaseCardWithRadioButton
            key={service.id}
            value={value}
            serviceOnProfessional={service}
            onClick={(currentValue) => setValue(currentValue)}
          />
        ))}
      </div>
    </RadioButton.Group>
  );
};
