import React, { type FC, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { getDate, getMonth, getYear, startOfToday } from 'date-fns';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import Bg from '@/assets/images/bg-1.png';
import { BookingTimeSelect } from '@/modules/booking/containers/booking-time-select';
import { ClientSelector } from '@/modules/client/components/client-selector';
import { ClientSelectorModal } from '@/modules/client/components/client-selector-modal';
import { ClientsListModal } from '@/modules/client/components/clients-list-modal';
import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { Icon } from '@/modules/core/components/icon';
import { TextField } from '@/modules/core/components/text-field';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ServiceOnProfessional } from '@/modules/service/types/service.types';
import { AppRouterOutputs, AvailableBookingTime } from '@/server/types';
import { mapDateToDayEnum } from '@/server/utils/helpers';

import { type AddNewBookingModalProps } from './add-new-booking-modal.interface';

export const AddNewBookingModal: FC<AddNewBookingModalProps> = ({
  isOpen,
  onOpenChange,
  selectedClient,
  setSelectedClient,
}) => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const isOpenClientsListModal = useBoolean();
  const isOpenServicesSelectorModal = useBoolean();

  const [selectedService, setSelectedService] =
    useState<ServiceOnProfessional | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(
    startOfToday().toISOString()
  );
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<null | AvailableBookingTime>(null);

  const createBooking = trpc.booking.create.useMutation();

  const handleBookingCreate = () => {
    if (!selectedDay || !selectedService || !selectedTimeRange) return;

    createBooking.mutate(
      {
        startTime: selectedTimeRange.startTime,
        endTime: selectedTimeRange.endTime,
        date: selectedDay || '',
        guestFirstName: selectedClient?.firstName || '',
        guestLastName: selectedClient?.lastName || '',
        guestPhone: selectedClient?.phone || '',
        guestEmail: selectedClient?.email || '',
        serviceProfessionalId: selectedService.id,
        clientId: selectedClient?.id,
        day: mapDateToDayEnum(selectedDay),
        yearTime: getYear(new Date(selectedDay)),
        monthTime: getMonth(new Date(selectedDay)),
        dayTime: getDate(new Date(selectedDay)),
      },
      {
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: 'Бронювання успішно створено',
          });

          handleModalOpenChange(false);

          const listByDayKey = getQueryKey(trpc.booking.list);

          queryClient.resetQueries({
            queryKey: listByDayKey,
            exact: false,
          });
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

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedService(null);
      setSelectedDay(startOfToday().toISOString());
      setSelectedTimeRange(null);
    }

    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  return (
    <DialogFullScreen
      isOpen={isOpen}
      onOpenChange={handleModalOpenChange}
      classes={{
        overlay: 'z-[20]',
        content: 'w-full p-6',
      }}
      applyMobileBottomTabPadding
    >
      <form
        className='flex w-full flex-col overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        onSubmit={handleBookingCreate}
      >
        <div className='z-50 mt-3 flex items-center'>
          <Button
            variant='outlined'
            icon='chevron-left'
            className='-ml-2 !border-none !text-dark'
            onClick={() => handleModalOpenChange(false)}
            type='button'
          />
          <h2 className='z-50 mt-[4px] flex-1 text-center text-lg font-medium text-dark'>
            {intl.formatMessage({ id: 'create.booking.title' })}
          </h2>
        </div>

        <div className='z-50 mt-14 flex flex-1 flex-col gap-7'>
          <ClientSelector
            onSelect={isOpenClientsListModal.setTrue}
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
            label={intl.formatMessage({ id: 'booking.service' })}
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

          {selectedService && (
            <BookingTimeSelect
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedTimeRange={selectedTimeRange}
              setSelectedTimeRange={setSelectedTimeRange}
              serviceOnProfessionalId={selectedService.id}
            />
          )}
        </div>

        <div className='z-50 mt-auto'>
          <Button
            className='!mt-auto !w-full'
            text={intl.formatMessage({ id: 'button.save' })}
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
