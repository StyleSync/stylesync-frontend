'use client';
import { useState } from 'react';

import { useBoolean } from 'usehooks-ts';

import { AddClientModal } from '@/modules/client/components/add-client-modal/add-client-modal';
import { AddNewBookingModal } from '@/modules/client/components/add-new-booking-modal';
import { ClientCard } from '@/modules/client/components/clients-card';
import { EditClientInfoModal } from '@/modules/client/components/edit-client-info-modal/edit-client-info-modal';
import { ClientDetails } from '@/modules/client/containers/client-details';
import {
  type Client,
  groupClientsByFirstLetter,
  sortByFirstAndLastName,
} from '@/modules/client/utils/sort-clients';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';

const clients = [
  { name: 'Андрій Іванов', phone: '380 67 123 45 67' },
  { name: 'Андрій Іванов', phone: '380 67 123 45 64' },
  { name: 'Богдан Бондаренко', phone: '380 99 016 24 44' },
  { name: 'Багдан Бондаренко', phone: '380 99 016 24 34' },
  { name: 'Багдан Бандаренко', phone: '380 99 016 24 34' },
  { name: 'Валентина Мельник', phone: '380 93 876 54 32' },
  { name: 'Ганна Петренко', phone: '380 50 112 33 44' },
  { name: 'Ґеннадій Юрченко', phone: '380 66 998 77 66' },
  { name: 'Дмитро Горобець', phone: '380 96 123 45 67' },
  { name: 'Єлизавета Шевченко', phone: '380 63 444 55 66' },
  { name: 'Жанна Коваль', phone: '380 97 222 11 00' },
  { name: 'Зоряна Литвин', phone: '380 68 111 22 33' },
  { name: 'Ірина Кравченко', phone: '380 95 777 88 99' },
];

export const ClientsList = () => {
  const isOpenAddClientModal = useBoolean();
  // state
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isNewBooking, setIsNewBooking] = useState(false);
  const [isEditClientInfo, setIsEditClientInfo] = useState(false);

  const sortedClients = sortByFirstAndLastName(clients);
  const groupedClients = groupClientsByFirstLetter(sortedClients);

  const ukrainianAlphabet = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ'.split('');

  const sortedGroups: [string, Client[]][] = ukrainianAlphabet
    .filter((letter) => groupedClients[letter])
    .map((letter) => [letter, groupedClients[letter]]);

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <div className='sticky top-0 z-10 px-4 pb-2 pt-4'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2 rounded-xl bg-gray-light px-3'>
            <Icon name='search' width={20} height={20} className='text-gray' />
            <input
              className='h-[40px] flex-1 bg-transparent outline-none placeholder:text-sm placeholder:font-medium placeholder:text-gray'
              placeholder='Пошук клієнтів'
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
                text='Додати нового клієнта'
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
                key={client.phone}
                name={client.name}
                phone={client.phone}
                onClick={() => {
                  setSelectedClient(client);
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <ClientDetails
        isOpen={!!selectedClient}
        onOpenChange={() => setSelectedClient(null)}
        client={selectedClient}
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
      />
    </div>
  );
};
