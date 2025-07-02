import { type FC, useState } from 'react';

import Image from 'next/image';

import Bg from '@/assets/images/bg-1.png';
import { ClientTabs } from '@/modules/client/components/client-tabs/client-tabs';
import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { Tabs } from '@/modules/core/components/tabs';
import type { Tab } from '@/modules/core/components/tabs/tabs.interface';

import { type ClientsDetailProps } from './client-details.interface';

const tabs: Tab[] = [
  {
    key: 'future',
    name: 'Майбутні',
  },
  {
    key: 'past',
    name: 'Минулі',
  },
];

export const ClientDetails: FC<ClientsDetailProps> = ({
  client,
  isOpen,
  onOpenChange,
  onAddBooking,
  onEditClientInfo,
}) => {
  const [activeClientInfoTab, setActiveClientInfoTab] = useState<
    'future' | 'past'
  >('future');

  const [activeClientTab, setActiveClientTab] = useState<'booking' | 'about'>(
    'booking'
  );

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleClientInfoTabChange = (key: string) => {
    if (key === 'future' || key === 'past') {
      setActiveClientInfoTab(key);
    }
  };

  return (
    <DialogFullScreen
      applyMobileBottomTabPadding
      onOpenChange={onOpenChange}
      isOpen={isOpen}
    >
      <div className='z-50 flex w-full flex-col'>
        <div className='z-[50] flex justify-between p-3'>
          <Button
            variant='outlined'
            icon='chevron-left'
            className='-ml-2 !border-none !text-dark'
            onClick={handleClose}
          />
          <Button
            className='!pr-0 text-primary'
            variant='unstyled'
            text='Редагувати'
            onClick={onEditClientInfo}
          />
        </div>

        <div className='z-[100] mt-8 flex flex-col items-center gap-[18px]'>
          <Avatar fallback={client?.name[0]} shadow size='medium' />
          <span>{client?.name}</span>
          <div className='flex gap-5'>
            <Button
              className='!bg-primary-light text-primary'
              variant='unstyled'
              icon='comment'
            />
            <Button
              className='!bg-primary-light text-primary'
              variant='unstyled'
              icon='phone'
            />
            <Button
              className='!bg-primary-light text-primary'
              variant='unstyled'
              icon='mail'
            />
          </div>
        </div>

        <div className='z-[100] mx-3 mb-[15px] mt-8 flex justify-between rounded-2xl bg-white px-4 py-3 shadow-accentShadow'>
          <div className='flex flex-col items-start'>
            <span className='text-base font-medium text-dark'>0</span>
            <span className='text-sm text-gray'>Бронювань</span>
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-base font-medium text-dark'>0</span>
            <span className='text-sm text-gray'>Скасовано</span>
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-base font-medium text-dark'>0.00 UAH</span>
            <span className='text-sm text-gray'>Загальний дохід</span>
          </div>
        </div>

        <div className='z-[100] w-full flex-1 bg-white'>
          <ClientTabs
            activeTab={activeClientTab}
            onChange={setActiveClientTab}
          />

          {activeClientTab === 'booking' && (
            <>
              <Button
                className='mt-4 text-primary'
                icon='plus'
                variant='unstyled'
                text='Додати нове бронювання'
                onClick={onAddBooking}
              />
              <div className='mt-4 w-full px-3'>
                <Tabs
                  value={activeClientInfoTab}
                  onChange={handleClientInfoTabChange}
                  variant='contained'
                  tabs={tabs}
                />
              </div>
            </>
          )}

          {activeClientTab === 'about' && (
            <div className='mt-6 flex flex-col gap-10 px-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-xs text-dark'>Нотатки про клієнта</p>
                <p className='text-dark'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-xs text-dark'>Email</p>
                <p className='text-dark'>s.karina@gmail.com</p>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-xs text-dark'>Phone</p>
                <p className='text-dark'>+380 99 242 55 55</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Image
        className='fixed left-0 top-0 h-full w-full object-cover opacity-[0.1]'
        src={Bg.src}
        width={Bg.width}
        height={Bg.height}
        blurDataURL={Bg.blurDataURL}
        alt='background'
      />

      <div className='fixed left-0 top-0 z-[2] h-full w-full bg-gradient-to-b from-white to-transparent' />
    </DialogFullScreen>
  );
};
