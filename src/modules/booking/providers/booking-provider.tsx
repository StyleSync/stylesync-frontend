'use client';
import {
  createContext,
  type FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';
// components
import { ServiceBookingModal } from '@/modules/booking/components/service-booking-modal';
import { BookingModalSuccess } from '@/modules/booking/components/modal-success';
// types
import type { CreateBookingRequestData } from '@/modules/booking/components/service-booking-modal/service-booking-modal.interface';
import type { ServiceOnProfessionalListItem } from '@/modules/service/types/service.types';
// utils
import { showToast } from '@/modules/core/providers/toast-provider';
import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';

type BookingContextValues = {
  book: (serviceOnProfessional?: ServiceOnProfessionalListItem) => void;
};

export const BookingContext = createContext<BookingContextValues>({
  book: () => {},
});

export const BookingProvider: FC<ChildrenProp & { userId: string }> = ({
  children,
  userId,
}) => {
  const intl = useIntl();
  const isBookingOpen = useBoolean();
  const isSuccessOpen = useBoolean();
  // state
  const [selectedServiceOnProfessional, setSelectedServiceOnProfessional] =
    useState<ServiceOnProfessionalListItem | null>(null);

  const { data: user } = trpc.user.get.useQuery({
    id: userId,
    expand: [],
  });

  const { data: professional } = trpc.professional.get.useQuery(
    {
      id: userId,
      expand: ['user'],
    },
    { enabled: user?.userType === 'PROFESSIONAL' }
  );

  const bookingCreate = trpc.booking.create.useMutation();

  useEffect(() => {
    if (!isBookingOpen.value) {
      setSelectedServiceOnProfessional(null);
    }
  }, [isBookingOpen.value]);

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
        guestFirstName: name,
        guestLastName: lastName || undefined,
        guestPhone: phone,
        guestEmail: email,
        guestComment: data.comment,
        date: selectedDay,
        startTime: selectedTimeRange.startTime,
        endTime: selectedTimeRange.endTime,
        serviceProfessionalId: serviceOnProfessional,
        day: mapDateToDayEnum(selectedDay),
      },
      {
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
        onSuccess: () => {
          isBookingOpen.setFalse();
          isSuccessOpen.setTrue();
        },
      }
    );
  };

  const book = useCallback(
    (serviceOnProfessional?: ServiceOnProfessionalListItem) => {
      if (serviceOnProfessional) {
        setSelectedServiceOnProfessional(serviceOnProfessional);
      }

      isBookingOpen.setTrue();
      isSuccessOpen.setFalse();
    },
    [isBookingOpen, isSuccessOpen]
  );

  return (
    <BookingContext.Provider
      value={{
        book,
      }}
    >
      {children}
      {professional && (
        <ServiceBookingModal
          professional={professional}
          selectedService={selectedServiceOnProfessional}
          onOpenChange={isBookingOpen.setValue}
          isOpen={isBookingOpen.value}
          onConfirm={handleConfirm}
          isLoading={bookingCreate.isLoading}
        />
      )}
      <BookingModalSuccess
        isOpen={isSuccessOpen.value}
        onOpenChange={isSuccessOpen.setValue}
        bookingData={bookingCreate.data}
      />
    </BookingContext.Provider>
  );
};
