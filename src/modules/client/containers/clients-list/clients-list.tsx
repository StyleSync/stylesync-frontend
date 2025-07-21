'use client';
import { useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { AddClientModal } from '@/modules/client/components/add-client-modal/add-client-modal';
import { AddNewBookingModal } from '@/modules/client/components/add-new-booking-modal';
import { ClientCard } from '@/modules/client/components/clients-card';
import { EditClientInfoModal } from '@/modules/client/components/edit-client-info-modal/edit-client-info-modal';
import { EditClientInfoModalValues } from '@/modules/client/components/edit-client-info-modal/edit-client-info-modal.interface';
import { ClientDetails } from '@/modules/client/containers/client-details';
import {
  groupClientsByFirstLetter,
  sortByFirstAndLastName,
} from '@/modules/client/utils/sort-clients';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { useAvatarUploadMutation } from '@/modules/user/hooks/use-avatar-upload-mutation';
import { AppRouterOutputs } from '@/server/types';

export const ClientsList = () => {
  const intl = useIntl();

  const avatarUpload = useAvatarUploadMutation();
  const queryClient = useQueryClient();

  const isOpenAddClientModal = useBoolean();
  // state
  const [selectedClient, setSelectedClient] = useState<
    AppRouterOutputs['client']['get'] | null
  >(null);
  const [isNewBooking, setIsNewBooking] = useState(false);
  const [isEditClientInfo, setIsEditClientInfo] = useState(false);

  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  const {
    data: clientsListQuery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = trpc.client.list.useInfiniteQuery(
    {
      limit: 100,
      offset: 0,
      professionalId: me?.professional?.id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const { mutate: clientInfoUpdate, isPending } =
    trpc.client.update.useMutation();

  const initialClientValues = useMemo<
    Partial<EditClientInfoModalValues & { image: string }>
  >(
    () => ({
      image: selectedClient?.image ?? '',
      email: selectedClient?.email ?? '',
      lastName: selectedClient?.lastName ?? '',
      firstName: selectedClient?.firstName ?? '',
      phone: selectedClient?.phone ?? '',
      notes: selectedClient?.notes ?? '',
    }),
    [selectedClient]
  );

  const clientsList =
    clientsListQuery?.pages.map((page) => page.items).flat() || [];

  const sortedClients = sortByFirstAndLastName(clientsList);
  const groupedClients = groupClientsByFirstLetter(sortedClients);

  const ukrainianAlphabet = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ'.split('');
  const englishAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const fullAlphabet = [...ukrainianAlphabet, ...englishAlphabet];

  const sortedGroups: [string, AppRouterOutputs['client']['get'][]][] =
    fullAlphabet
      .filter((letter) => groupedClients[letter])
      .map((letter) => [letter, groupedClients[letter]]);

  const handleSubmitForm = useCallback(
    async (
      data: EditClientInfoModalValues & { image: File | string | null },
      onError: (error: any) => void
    ) => {
      let imageUrl: string | null = null;

      if (data.image) {
        if (typeof data.image === 'object') {
          const uploaded = await avatarUpload.mutateAsync(data.image);

          imageUrl = uploaded.url;
        } else if (typeof data.image === 'string') {
          imageUrl = data.image;
        }
      }

      try {
        await clientInfoUpdate(
          {
            ...data,
            image: imageUrl ?? undefined,
            id: selectedClient?.id ?? '',
          },
          {
            onSuccess: () => {
              showToast({
                variant: 'success',
                title: intl.formatMessage({
                  id: 'client.info.update.success',
                }),
              });

              queryClient.invalidateQueries({
                queryKey: getQueryKey(trpc.client.list),
              });

              setIsEditClientInfo(false);
            },
          }
        );
      } catch (error) {
        onError(error);
      }
    },
    [avatarUpload, clientInfoUpdate, queryClient, selectedClient, intl]
  );

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <div className='sticky top-0 z-10 px-4 pb-2 pt-4'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2 rounded-xl bg-gray-light px-3'>
            <Icon name='search' width={20} height={20} className='text-gray' />
            <input
              className='h-[40px] flex-1 bg-transparent outline-none placeholder:text-sm placeholder:font-medium placeholder:text-gray'
              placeholder={intl.formatMessage({
                id: 'client.search.placeholder',
              })}
            />
          </div>
          <AddClientModal
            onOpenChange={isOpenAddClientModal.setValue}
            isOpen={isOpenAddClientModal.value}
            trigger={
              <Button
                className='!pl-0 text-primary'
                icon='plus'
                variant='unstyled'
                text={intl.formatMessage({ id: 'client.add.button' })}
                onClick={isOpenAddClientModal.toggle}
              />
            }
          />
        </div>
      </div>

      <div className='mt-4 flex-1 overflow-auto'>
        {sortedGroups.map(([letter, list]) => (
          <div key={letter}>
            <div className='relative left-1/2 z-50 w-screen -translate-x-1/2 bg-gray-light px-4 py-1'>
              {letter}
            </div>
            {list.map((client, index) => (
              <ClientCard
                isLast={index === list.length - 1}
                image={client.image ?? ''}
                key={client.phone}
                name={`${client.firstName} ${client.lastName}`}
                phone={client.phone ?? ''}
                onClick={() => {
                  setSelectedClient(client);
                }}
              />
            ))}
            <InfinityListController
              hasNextPage={hasNextPage || false}
              onLoadMore={fetchNextPage}
              isNextPageLoading={isFetchingNextPage}
            />
          </div>
        ))}
      </div>

      <ClientDetails
        isOpen={!!selectedClient}
        onOpenChange={() => setSelectedClient(null)}
        clientId={selectedClient?.id || null}
        onAddBooking={() => setIsNewBooking(true)}
        onEditClientInfo={() => setIsEditClientInfo(true)}
      />
      <AddNewBookingModal
        isOpen={isNewBooking && !!selectedClient}
        onOpenChange={() => {
          setIsNewBooking(false);
        }}
      />
      <EditClientInfoModal
        isOpen={isEditClientInfo && !!selectedClient}
        onOpenChange={() => {
          setIsEditClientInfo(false);
        }}
        clientId={selectedClient?.id || null}
        initialValues={initialClientValues}
        onSubmit={handleSubmitForm}
      />
    </div>
  );
};
