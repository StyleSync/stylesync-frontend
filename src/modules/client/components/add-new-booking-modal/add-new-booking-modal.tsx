import React, { type FC, useState } from 'react';

import { addMinutes, getDate, getMonth, getYear } from 'date-fns';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import Bg from '@/assets/images/bg-1.png';
import { ClientSelector } from '@/modules/client/components/client-selector';
import { ClientSelectorModal } from '@/modules/client/components/client-selector-modal';
import { ClientsListModal } from '@/modules/client/components/clients-list-modal';
import { Button } from '@/modules/core/components/button';
import { DateSelect } from '@/modules/core/components/date-select';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { Icon } from '@/modules/core/components/icon';
import { TextField } from '@/modules/core/components/text-field';
import { TimeField } from '@/modules/core/components/time-field';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Time, TimeValue } from '@/modules/core/utils/time.utils';
import { ServiceOnProfessional } from '@/modules/service/types/service.types';
import { mapDateToDayEnum } from '@/server/utils/helpers';
import { AppRouterOutputs } from '@/server/types';
import clsx from 'clsx';

import { type AddNewBookingModalProps } from './add-new-booking-modal.interface';

export const AddNewBookingModal: FC<AddNewBookingModalProps> = ({
  isOpen,
  onOpenChange,
  selectedClient,
  setSelectedClient,
}) => {
  const intl = useIntl();
  const [selectedService, setSelectedService] =
    useState<ServiceOnProfessional | null>(null);
  const [timeValue, setTimeValue] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const isOpenClientsListModal = useBoolean();
  const isOpenServicesSelectorModal = useBoolean();

  const createBooking = trpc.booking.create.useMutation();

  const handleBookingCreate = () => {
    if (!date || !selectedService || !timeValue) return;

    const startTime = new Time(timeValue as TimeValue).setTimeOfDate(date);

    createBooking.mutate(
      {
        startTime: startTime.toISOString(),
        endTime: addMinutes(startTime, selectedService.duration).toISOString(),
        date: date.toISOString(),
        guestFirstName: selectedClient?.firstName || '',
        guestLastName: selectedClient?.lastName || '',
        guestPhone: selectedClient?.phone || '',
        guestEmail: selectedClient?.email || '',
        serviceProfessionalId: selectedService.id,
        clientId: selectedClient?.id,
        day: mapDateToDayEnum(date.toISOString()),
        yearTime: getYear(date),
        monthTime: getMonth(date),
        dayTime: getDate(date),
      },
      {
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: 'Бронювання успішно створено',
          });

          handleCloseModal();
        },
        onError: () => {
          showToast({
            variant: 'error',
            title: intl.formatMessage({
              id: 'create.booking.toast.error.title',
            }),
            description: intl.formatMessage({
              id: 'create.booking.toast.error.description',
            }),
          });
        },
      }
    );
  };

  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
  };

  const handleClientSelect = () => {
    isOpenClientsListModal.setTrue();
  };

  const handleClientClick = (client: AppRouterOutputs['client']['get']) => {
    if (setSelectedClient) {
      setSelectedClient(client);
    }

    isOpenClientsListModal.setFalse();
  };

  const handleCloseService = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setSelectedService) {
      setSelectedService(null);
    }
  };

  const handleCloseModal = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <DialogFullScreen
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classes={{
        overlay: 'z-[20]',
        content: 'w-full p-6',
      }}
      applyMobileBottomTabPadding
    >
      <form className='flex w-full flex-col' onSubmit={handleBookingCreate}>
        <Button
          variant='outlined'
          icon='chevron-left'
          className='absolute left-6 top-[30px] z-[200] -ml-2 !border-none !text-dark'
          onClick={handleCloseModal}
          type='button'
        />
        <h2 className='z-50 mt-3 text-center text-lg font-medium text-dark'>
          Нове бронювання
        </h2>

        <div className='z-50 mt-14 flex flex-1 flex-col gap-7'>
          <ClientSelector
            onSelect={handleClientSelect}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
          />

          <ClientsListModal
            isOpen={isOpenClientsListModal.value}
            onOpenChange={isOpenClientsListModal.setValue}
            onClientClick={handleClientClick}
          />

          <TextField
            endAdornment={
              selectedService ? (
                <Icon
                  className='mr-2 cursor-pointer text-gray'
                  name='close'
                  width={16}
                  height={16}
                  onClick={handleCloseService}
                />
              ) : (
                <Icon
                  className='mr-2 text-gray'
                  name='chevron-right'
                  width={16}
                  height={16}
                />
              )
            }
            className='!w-full'
            label='Сервіс'
            variant='input'
            onClick={() => isOpenServicesSelectorModal.setTrue()}
            value={selectedService?.title || ''}
            readOnly
          />

          <ClientSelectorModal
            isOpen={isOpenServicesSelectorModal.value}
            onOpenChange={isOpenServicesSelectorModal.setValue}
            onServiceSelect={setSelectedService}
          />

          <DateSelect
            value={date}
            onChange={handleDateChange}
            placeholder={'Дата'}
            triggerProps={{
              classes: {
                root: clsx('!w-full !py-6 !justify-between', {
                  '!text-gray hover:!border-primary hover:!text-primary': !date,
                }),
              },
              style: {
                borderColor: '#ced4dc',
                paddingRight: '15px',
              },
            }}
          />

          <TimeField
            inputProps={{
              label: 'Час',
            }}
            value={timeValue}
            onChange={setTimeValue}
          />
        </div>

        <div className='z-50 mt-auto'>
          <Button
            className='!mt-auto !w-full'
            text='Зберегти'
            onClick={handleBookingCreate}
            isLoading={createBooking.isPending}
          />
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
      </form>
    </DialogFullScreen>
  );
};
