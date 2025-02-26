'use client';
import { type FC, Fragment, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { Typography } from '@/modules/core/components/typogrpahy';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ServicesTable } from '@/modules/service/components/service-table';
import {
  getGroupOfServiceOnProfessionalList,
  sortServiceOnProfessionalGroups,
} from '@/modules/service/utils/service.utils';

import type { UserServicesProps } from './user-services.interface';

import styles from './user-services.module.scss';

export const UserServices: FC<UserServicesProps> = ({ userId, session }) => {
  const intl = useIntl();
  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: [],
  });

  const serviceListQuery = trpc.serviceOnProfessional.list.useInfiniteQuery(
    {
      limit: 10,
      offset: 0,
      professionalId: professional.id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const serviceList = useMemo(() => {
    return serviceListQuery.data?.pages.map((page) => page.items).flat() || [];
  }, [serviceListQuery]);

  const groups = useMemo(() => {
    const _groups = getGroupOfServiceOnProfessionalList(serviceList);

    return sortServiceOnProfessionalGroups(_groups);
  }, [serviceList]);

  return (
    <div className={styles.root}>
      {groups.length > 0 ? (
        groups.map(({ service, serviceOnProfessionalList }) => (
          <Fragment key={service.id}>
            <ServicesTable
              isOwn={userId === session?.user.id}
              service={service}
              serviceOnProfessionalList={serviceOnProfessionalList}
            />
            <InfinityListController
              hasNextPage={serviceListQuery.hasNextPage || false}
              onLoadMore={serviceListQuery.fetchNextPage}
              isNextPageLoading={serviceListQuery.isFetchingNextPage}
            />
          </Fragment>
        ))
      ) : (
        <Typography className='!text-gray'>
          {intl.formatMessage({ id: 'user.services.noAdded' })}
        </Typography>
      )}
    </div>
  );
};
