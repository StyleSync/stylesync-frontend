import { type FC } from 'react';

import { RadioButton } from '@/modules/core/components/radio-button';
import { BaseCardWithRadioButton } from '@/modules/booking/components/booking-card-radio-button';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './service-on-professional-select.module.scss';
import { type ServiceOnProfessionalSelectProps } from '@/modules/service/components/service-on-professional-select/service-on-professional-select.interface';

export const ServiceOnProfessionalSelect: FC<
  ServiceOnProfessionalSelectProps
> = ({ value, onChange }) => {
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
    <div className={styles.root}>
      <div className={styles.content}>
        <RadioButton.Group value={value} onChange={onChange} name='cards'>
          <div className={styles.baseCardContainer}>
            {serviceList?.map((service) => (
              <BaseCardWithRadioButton
                key={service.id}
                value={service.id}
                serviceOnProfessional={service}
                // onClick={(currentValue) => onChange(currentValue)}
              />
            ))}
          </div>
        </RadioButton.Group>
      </div>
    </div>
  );
};
