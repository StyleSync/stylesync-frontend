import { type FC } from 'react';
// components
import { Button } from '@/modules/core/components/button';
import { BookingModalSuccess } from '../../components/modal-success/modal-successs';
import { ServiceBookingModal } from '../../components/service-booking-modal';
// hooks
import { useBoolean } from 'usehooks-ts';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
// type
import type { CreateBookingRequestData } from '../../components/service-booking-modal/service-booking-modal.interface';
import type { CreateBookingProps } from './create-booking.interface';

export const CreateBooking: FC<CreateBookingProps> = ({
  isLoadingTrigger,
  btnVariant,
  selectedService,
  professional,
}) => {
  const isBookingOpen = useBoolean();
  const isSuccessOpen = useBoolean();

  // mutation
  const bookingCreate = trpc.booking.create.useMutation();

  const handleConfirm = async ({
    selectedDay,
    serviceOnProfessional,
    selectedTimeRange,
    name,
    lastName,
    phone,
    email,

    ...data
  }: CreateBookingRequestData) => {
    bookingCreate.mutate(
      {
        ...data,
        userId: professional.user?.id,
        guestFirstName: name,
        guestLastName: lastName,
        guestPhone: phone,
        guestEmail: email,
        date: selectedDay,
        startTime: selectedTimeRange.startTime,
        endTime: selectedTimeRange.endTime,
        serviceProfessionalId: serviceOnProfessional,
      },
      {
        onError: () => {
          showToast({
            variant: 'error',
            title: 'Oops, error',
            description: 'Choose another date',
          });
        },
        onSuccess: () => {
          isBookingOpen.setFalse();
          isSuccessOpen.setTrue();
        },
      }
    );
  };

  return (
    <>
      <ServiceBookingModal
        professional={professional}
        selectedService={selectedService}
        onOpenChange={isBookingOpen.setValue}
        isOpen={isBookingOpen.value}
        onConfirm={handleConfirm}
        isLoading={bookingCreate.isLoading}
        trigger={
          <Button
            variant={btnVariant || 'primary'}
            text='Book'
            disabled={isLoadingTrigger}
          />
        }
      />
      <BookingModalSuccess
        isOpen={isSuccessOpen.value}
        onOpenChange={isSuccessOpen.setValue}
        bookingData={bookingCreate.data}
      />
    </>
  );
};
