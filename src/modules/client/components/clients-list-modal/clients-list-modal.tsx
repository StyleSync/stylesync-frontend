import { type FC } from 'react';

import { ClientsList } from '@/modules/client/components/clients-list';
import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { trpc } from '@/modules/core/utils/trpc.utils';

import { type ClientsListModalProps } from './clients-list-modal.interface';

export const ClientsListModal: FC<ClientsListModalProps> = ({
  isOpen,
  onOpenChange,
  onClientClick,
}) => {
  const {
    data: clientListQuery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = trpc.client.list.useInfiniteQuery(
    {
      limit: 100,
      offset: 0,
      sortFields: [
        { field: 'lastName', order: 'asc' },
        { field: 'firstName', order: 'asc' },
      ],
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const clientList =
    clientListQuery?.pages.map((page) => page.items).flat() || [];

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <DialogFullScreen
      applyMobileBottomTabPadding
      classes={{
        overlay: 'z-[30]',
        content: 'w-full',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className='z-50 flex w-full flex-col'>
        <Button
          variant='outlined'
          icon='chevron-left'
          className='!border-none !pt-3 !text-dark'
          onClick={handleClose}
        />
        <ClientsList
          clientsList={clientList}
          hasNextPage={hasNextPage || false}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onClientClick={onClientClick}
        />
      </div>
    </DialogFullScreen>
  );
};
