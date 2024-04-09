'use client';
import { useMemo, type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServicesTable } from '@/modules/service/components/service-table';
// utils
import {
  getGroupOfServiceOnProfessionalList,
  sortServiceOnProfessionalGroups,
} from '@/modules/service/utils/service.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';
import type { UserServicesProps } from './user-services.interface';

import styles from './user-services.module.scss';

export const UserServices: FC<UserServicesProps> = ({ userId, session }) => {
  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: [],
  });

  const [serviceList] = trpc.serviceOnProfessional.list.useSuspenseQuery({
    limit: 10,
    offset: 0,
    professionalId: userId,
  });
  const groups = useMemo(() => {
    const _groups = getGroupOfServiceOnProfessionalList(serviceList);

    return sortServiceOnProfessionalGroups(_groups);
  }, [serviceList]);

  return (
    <div className={styles.root}>
      {groups.length > 0 ? (
        groups.map(({ service, serviceOnProfessionalList }) => (
          <ServicesTable
            professional={professional}
            session={session}
            key={service.id}
            service={service}
            serviceOnProfessionalList={serviceOnProfessionalList}
          />
        ))
      ) : (
        <Typography className='!text-gray'>No added services</Typography>
      )}
    </div>
  );
};
