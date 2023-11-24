'use client';
import { useMemo, type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServicesTable } from '@/modules/service/components/service-table';
import { ServiceTableSkeleton } from '@/modules/service/components/service-table-skeleton';
import { Placeholder } from '@/modules/core/components/placeholder';
import { ErrorBox } from '@/modules/core/components/error-box';
// utils
import { getGroupOfServiceOnProfessionalList } from '@/modules/service/utils/service.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './user-services.module.scss';

export const UserServices: FC<{ userId: string }> = ({ userId }) => {
  const { data: professional } = trpc.professional.get.useQuery({
    id: userId,
    expand: ['user'],
  });
  const { data: serviceList, ...serviceListQuery } =
    trpc.serviceOnProfessional.list.useQuery(
      {
        limit: 10,
        offset: 0,
        professionalId: professional?.id,
      },
      {
        enabled: Boolean(professional),
      }
    );
  const groups = useMemo(
    () => getGroupOfServiceOnProfessionalList(serviceList ?? []),
    [serviceList]
  );

  return (
    <div className={styles.root}>
      <Placeholder
        isActive={serviceListQuery.isLoading}
        placeholder={<ServiceTableSkeleton rows={3} />}
      >
        <Placeholder
          isActive={serviceListQuery.isError}
          placeholder={
            <ErrorBox
              title='Connection with server has been interrupted'
              description='Please check your internet connection or try refreshing the page. If the issue persists, please contact our support team for assistance.'
            />
          }
        >
          <Placeholder
            isActive={groups.length === 0}
            className={styles.empty}
            placeholder={<Typography>ὣ No added services</Typography>}
          >
            {groups.map(({ service, serviceOnProfessionalList }) => (
              <ServicesTable
                key={service.id}
                service={service}
                serviceOnProfessionalList={serviceOnProfessionalList}
              />
            ))}
          </Placeholder>
        </Placeholder>
      </Placeholder>
    </div>
  );
};
