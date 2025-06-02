'use client';
import {
  type FC,
  Fragment,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react';

import type { Service } from '@prisma/client';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';
import { v4 } from 'uuid';

import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ServiceOnProfessionalEditForm } from '@/modules/service/components/service-on-professional-edit-form';
import { ServiceSelect } from '@/modules/service/components/service-select';
import { ServicesTable } from '@/modules/service/components/service-table';
import { ServiceConstructorTable } from '@/modules/service/containers/service-constructor-table';
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';
import { sortServiceOnProfessionalGroups } from '@/modules/service/utils/service.utils';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';

import type { ProfileSectionServicesLayoutProps } from './profile-section-layout-services.interface';

export const ProfileSectionLayoutServices: FC<
  ProfileSectionServicesLayoutProps
> = ({ userId }) => {
  const isEditServices = useBoolean();
  const isCreateServiceOpen = useBoolean();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const intl = useIntl();

  const { groups, setGroups, isGroupsLoading } =
    useServiceOnProfessionalGroups();

  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  const { data: serviceListQuery, ...serviceListData } =
    trpc.service.list.useInfiniteQuery(
      { limit: 10, offset: 0, professionalId: professional.id },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const serviceList =
    serviceListQuery?.pages.map((page) => page.items).flat() || [];

  const sortedServiceOnProfessionalGroups = useMemo(
    () => sortServiceOnProfessionalGroups(groups),
    [groups]
  );

  const handleServiceSelect = useCallback(
    (service: Service) => {
      setSelectedService(service);
      isCreateServiceOpen.setTrue();
    },
    [isCreateServiceOpen]
  );

  const handleServiceRemove = useCallback(
    (service: Service) => {
      const serviceGroup = sortedServiceOnProfessionalGroups.find(
        (group) => group.service.id === service.id
      );

      setGroups((prev) =>
        prev.filter((item) => item.service.id !== service.id)
      );

      showToast({
        variant: 'success',
        title: intl.formatMessage({
          id:
            serviceGroup?.serviceOnProfessionalList.length === 1
              ? 'service.constructor.delete.group.success'
              : 'service.constructor.delete.success',
        }),
      });
    },
    [setGroups, intl, sortedServiceOnProfessionalGroups]
  );

  const onCancel = () => {
    isEditServices.setFalse();
  };

  const handleCreateFormClose = useCallback(() => {
    isCreateServiceOpen.setFalse();
    setSelectedService(null);
  }, [isCreateServiceOpen]);

  if (isGroupsLoading) {
    return (
      <div className='mx-auto mt-[110px] flex w-full max-w-[924px] flex-col gap-y-1'>
        <div className='skeleton flex h-[133px] w-full rounded' />
        <div className='skeleton flex h-[77px] w-full rounded' />
      </div>
    );
  }

  return (
    <ProfileSectionLayout
      edit={isEditServices.value}
      title='pro.layout.title.services'
      id='profile-services'
      onEdit={isEditServices.toggle}
      onCancel={onCancel}
      onSave={onCancel}
      headerActions={
        isEditServices.value && (
          <ServiceSelect
            services={serviceList ?? []}
            onServiceSelect={handleServiceSelect}
            blackList={sortedServiceOnProfessionalGroups.map(
              (group) => group.service.id
            )}
            isLoading={serviceListData.isPending}
          />
        )
      }
    >
      <Suspense
        fallback={
          <div className='flex flex-col gap-y-2'>
            <div className='skeleton flex h-4 w-[70%] rounded' />
            <div className='skeleton flex h-4 w-[80%] rounded' />
            <div className='skeleton flex h-4 w-[50%] rounded' />
          </div>
        }
      >
        {sortedServiceOnProfessionalGroups.map((group) => (
          <Fragment key={group.service.id}>
            {isEditServices.value ? (
              <ServiceConstructorTable
                {...group}
                onRemove={handleServiceRemove}
              />
            ) : (
              <ServicesTable
                service={group.service}
                serviceOnProfessionalList={group.serviceOnProfessionalList}
                isOwn
              />
            )}
            <InfinityListController
              hasNextPage={serviceListData.hasNextPage || false}
              onLoadMore={serviceListData.fetchNextPage}
              isNextPageLoading={serviceListData.isFetchingNextPage}
            />
          </Fragment>
        ))}
        {selectedService && (
          <ServiceOnProfessionalEditForm
            data={{
              service: selectedService,
              id: `new__${v4()}`,
              title: '',
              duration: 0,
              price: 0,
              currency: 'UAH',
              description: '',
            }}
            isActive={isCreateServiceOpen.value}
            onOpenChange={handleCreateFormClose}
          />
        )}
      </Suspense>
    </ProfileSectionLayout>
  );
};
