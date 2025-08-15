import { Fragment, useMemo } from 'react';

import { ClientCard } from '@/modules/client/components/clients-card';
import { groupClientsByFirstLetter } from '@/modules/client/utils/sort-clients';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { AppRouterOutputs } from '@/server/types';

type ClientsListProps = {
  clientsList: AppRouterOutputs['client']['list']['items'];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  onClientClick: (client: AppRouterOutputs['client']['get']) => void;
};

export const ClientsList = ({
  clientsList,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  onClientClick,
}: ClientsListProps) => {
  const groupedClients = useMemo(() => {
    const ukrainianAlphabet = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ'.split('');
    const englishAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const fullAlphabet = [...ukrainianAlphabet, ...englishAlphabet];

    const grouped = groupClientsByFirstLetter(clientsList);

    const sortedGroups: [
      string,
      AppRouterOutputs['client']['list']['items'],
    ][] = fullAlphabet
      .filter((letter) => grouped[letter])
      .map((letter) => [letter, grouped[letter]]);

    return sortedGroups;
  }, [clientsList]);

  return (
    <div className='mt-4 flex-1 overflow-auto'>
      {groupedClients.map(([letter, list]) => (
        <Fragment key={letter}>
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
              onClick={() =>
                onClientClick(client as AppRouterOutputs['client']['get'])
              }
            />
          ))}
          <InfinityListController
            hasNextPage={hasNextPage}
            onLoadMore={fetchNextPage ?? (() => {})}
            isNextPageLoading={isFetchingNextPage}
          />
        </Fragment>
      ))}
    </div>
  );
};
