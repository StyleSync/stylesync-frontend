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
import { type CreateBookingRequestData } from '../../components/service-booking-modal/service-booking-modal.interface';
import { type ButtonVariant } from '@/modules/core/components/button/button.interface';

export const CreateBooking = ({
  isLoadingTrigger,
  btnVariant,
}: {
  isLoadingTrigger?: boolean;
  btnVariant?: ButtonVariant;
}) => {
  const isBookingOpen = useBoolean();
  const isSuccessOpen = useBoolean();

  // mutations
  const bookingCreate = trpc.booking.create.useMutation();
  // query
  const { data: me } = trpc.user.me.useQuery({ expand: ['professional'] });

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
        userId: me?.id,
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
