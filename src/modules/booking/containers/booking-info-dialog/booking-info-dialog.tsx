import { type FC, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { useQueryClient } from '@tanstack/react-query';
import { useBoolean } from 'usehooks-ts';
// components
import { Button } from '@/modules/core/components/button';
import { DialogBottom } from '@/modules/core/components/dialog-bottom';
import { Dialog } from '@/modules/core/components/dialog';
import { Spinner } from '@/modules/core/components/spinner';
import { Placeholder } from '@/modules/core/components/placeholder';
import { BookingStatus } from '@/modules/booking/components/booking-status';
import { Icon } from '@/modules/core/components/icon';
// containers
import { BookingRescheduleForm } from '@/modules/booking/containers/booking-reschedule-form';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { showToast } from '@/modules/core/providers/toast-provider';
// utils
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
import { trpc } from '@/modules/core/utils/trpc.utils';
// constants
import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';
import { getQueryKey } from '@trpc/react-query';

import type {
  BookingInfoDialogProps,
  Action,
} from './booking-info-dialog.interface';
import styles from './booking-info-dialog.module.scss';

export const BookingInfoDialog: FC<BookingInfoDialogProps> = ({
  bookingId,
  onClose,
  bookingCode,
}) => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  const queryClient = useQueryClient();

  // state
  const isBookingRescheduleActive = useBoolean();
  // memo
  const DialogComponent = useMemo(() => {
    return deviceType === 'mobile' ? DialogBottom : Dialog;
  }, [deviceType]);
  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: [],
  });
  const bookingQuery = trpc.booking.get.useQuery(
    {
      id: bookingId || '',
      expand: ['serviceProfessional'],
    },
    {
      enabled: !!bookingId,
    }
  );

  const bookingStatusUpdateMutation = trpc.booking.status.update.useMutation();
  const bookingDeleteMutation = trpc.booking.delete.useMutation();
  // memo
  const formattedData = useMemo(() => {
    if (!bookingQuery.data) {
      return null;
    }

    const guestName = `${bookingQuery.data?.guestFirstName || ''} ${
      bookingQuery.data?.guestLastName || ''
    }`.trim();

    const startTime = formatI18n(
      bookingQuery.data.startTime,
      'EEEE, d MMM HH:mm',
      intl.locale
    );
    const statusMetadata = bookingStatusMetadata[bookingQuery.data.status];

    return {
      guestName,
      guestEmail: bookingQuery.data.guestEmail,
      guestPhone: bookingQuery.data.guestPhone,
      guestComment: bookingQuery.data.guestComment,
      date: startTime,
      status: bookingQuery.data.status,
      serviceTitle: bookingQuery.data.serviceProfessional.title,
      note: statusMetadata.note,
    };
  }, [bookingQuery.data, intl.locale]);

  const updateBookingStatus = useCallback(
    (status: 'APPROVED' | 'FINISHED' | 'REJECTED' | 'MISSED') => {
      if (!bookingId) return;

      bookingStatusUpdateMutation.mutate(
        {
          id: bookingId,
          status,
        },
        {
          onSuccess: () => {
            const queryKey = trpc.booking.get.getQueryKey({
              id: bookingId || '',
              expand: ['serviceProfessional'],
            });
            const listQueryKey = getQueryKey(trpc.booking.list);

            queryClient.invalidateQueries(queryKey);

            queryClient.invalidateQueries(listQueryKey);
          },
        }
      );
    },
    [bookingId, bookingStatusUpdateMutation, queryClient]
  );

  const deleteBooking = useCallback(() => {
    if (!bookingId) return;

    bookingDeleteMutation.mutate(
      {
        id: bookingId,
      },
      {
        onSuccess: () => {
          const queryKey = trpc.booking.list.getQueryKey();

          onClose();

          queryClient.invalidateQueries(queryKey);

          showToast({
            variant: 'info',
            title: intl.formatMessage({ id: 'booking.toast.removeSuccess' }),
            description: '',
          });
        },
      }
    );
  }, [bookingDeleteMutation, bookingId, intl, onClose, queryClient]);

  const actions: Action[] = useMemo(() => {
    if (!formattedData) return [];

    if (me?.userType === 'CUSTOMER')
      return [
        {
          id: 'info',
          text: intl.formatMessage({ id: 'button.open.details' }),
          icon: 'info',
          variant: 'secondary',
        },
      ];

    if (formattedData.status === 'REJECTED') {
      return [
        {
          id: 'delete',
          text: intl.formatMessage({ id: 'button.remove.history' }),
          icon: 'trash',
          variant: 'danger',
          isLoading: bookingDeleteMutation.isLoading,
        },
      ];
    }

    if (formattedData.status === 'PENDING') {
      return [
        {
          id: 'approve',
          text: intl.formatMessage({ id: 'button.approve' }),
          icon: 'check-mark',
          variant: 'success',
        },
        {
          id: 'reject',
          text: intl.formatMessage({ id: 'button.reject' }),
          icon: 'close',
          variant: 'danger',
        },
      ];
    }

    if (formattedData.status === 'APPROVED') {
      const isEventFinished =
        bookingQuery.data?.endTime &&
        new Date(bookingQuery.data?.endTime) <= new Date();

      if (isEventFinished) {
        return [
          {
            id: 'finished',
            text: intl.formatMessage({ id: 'button.finished' }),
            icon: 'check-mark',
            variant: 'success',
          },
          {
            id: 'missed',
            text: intl.formatMessage({ id: 'button.missed' }),
            icon: 'close',
            variant: 'danger',
          },
        ];
      }

      return [
        {
          id: 'reschedule',
          text: intl.formatMessage({
            id: 'bookingInfo.dialog.actions.reschedule',
          }),
          icon: 'time',
          variant: 'secondary',
        },
      ];
    }

    return [];
  }, [
    formattedData,
    bookingDeleteMutation.isLoading,
    intl,
    me?.userType,
    bookingQuery.data?.endTime,
  ]);

  const handleActionClick = (actionId: string) => {
    if (actionId === 'call') {
      window.location.href = `tel:${bookingQuery.data?.guestPhone}`;
    }

    if (actionId === 'approve') {
      updateBookingStatus('APPROVED');
    }

    if (actionId === 'reject') {
      updateBookingStatus('REJECTED');
    }

    if (actionId === 'delete') {
      deleteBooking();
    }

    if (actionId === 'reschedule') {
      isBookingRescheduleActive.setTrue();
    }

    if (actionId === 'finished') {
      updateBookingStatus('FINISHED');
    }

    if (actionId === 'missed') {
      updateBookingStatus('MISSED');
    }

    if (actionId === 'info') {
      window.open(`/bookings/${`${bookingCode}`}`, '_blank');
    }
  };

  const handleClose = () => {
    isBookingRescheduleActive.setValue(false);
    onClose();
  };

  const accountType =
    me?.userType === 'PROFESSIONAL'
      ? ('professional' as const)
      : ('customer' as const);

  return (
    <>
      <DialogComponent
        isOpen={!!bookingId}
        isCloseButtonVisible
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
      >
        <div className={styles.root}>
          <Placeholder
            isActive={!bookingId || bookingQuery.isLoading || !formattedData}
            placeholder={
              <div className='p-10'>
                <Spinner size='medium' />
              </div>
            }
          >
            {formattedData && (
              <div className='flex flex-col px-6 pb-8 pt-6'>
                <div className='flex flex-col items-center justify-center gap-y-2 pb-4'>
                  <span className='text-xl text-dark'>
                    {formattedData.serviceTitle}
                  </span>
                  <BookingStatus status={formattedData.status} />
                  <div className='flex items-center gap-x-2'>
                    <Icon
                      name='calendar'
                      width={16}
                      height={16}
                      className='text-dark'
                    />
                    <span className='text-sm font-medium capitalize text-dark'>
                      {formattedData.date}
                    </span>
                  </div>
                </div>
                {formattedData.note && (
                  <div className='mb-4 flex w-full max-w-[350px] rounded'>
                    <span className='leading-1 text-xs text-gray-accent'>
                      <span className='font-medium text-primary'>
                        {`${intl.formatMessage({ id: 'general.note' })}: `}
                      </span>
                      {intl.formatMessage({
                        id:
                          typeof formattedData.note === 'string'
                            ? formattedData.note
                            : formattedData.note[accountType],
                      })}
                    </span>
                  </div>
                )}
                <div className='flex flex-col gap-y-2 border-t border-primary-light pt-4'>
                  <div className='flex gap-x-2'>
                    <span className='text-sm text-gray'>
                      {intl.formatMessage({ id: 'booking.details.name' })}
                    </span>
                    <span className='text-sm text-dark'>
                      {formattedData.guestName}
                    </span>
                  </div>
                  <div className='flex gap-x-2'>
                    <span className='text-sm text-gray'>
                      {intl.formatMessage({ id: 'booking.details.phone' })}
                    </span>
                    <span className='text-sm text-dark'>
                      {formattedData.guestPhone}
                    </span>
                  </div>
                  {formattedData.guestEmail && (
                    <div className='flex gap-x-2'>
                      <span className='text-sm text-gray'>
                        {intl.formatMessage({ id: 'booking.details.email' })}
                      </span>
                      <span className='text-sm text-dark'>
                        {formattedData.guestEmail}
                      </span>
                    </div>
                  )}
                  {formattedData.guestComment && (
                    <div className='flex gap-x-2'>
                      <span className='text-sm text-gray'>
                        {' '}
                        {intl.formatMessage({ id: 'booking.details.comment' })}
                      </span>
                      <span className='text-sm text-dark'>
                        {formattedData.guestComment}
                      </span>
                    </div>
                  )}
                </div>
                {isBookingRescheduleActive.value && bookingId && (
                  <BookingRescheduleForm
                    bookingId={bookingId}
                    onClose={handleClose}
                  />
                )}
                {actions.length > 0 && !isBookingRescheduleActive.value && (
                  <div className={styles.actions}>
                    {actions.map((action) => (
                      <Button
                        key={action.id}
                        className={clsx(styles.action, styles[action.variant])}
                        icon={action.icon}
                        text={action.text}
                        variant={action.variant}
                        disabled={
                          bookingStatusUpdateMutation.isLoading &&
                          ['reject', 'approve'].includes(action.id)
                        }
                        typographyProps={{
                          weight: 'medium',
                        }}
                        onClick={() => {
                          handleActionClick(action.id);
                        }}
                        isLoading={action.isLoading}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Placeholder>
        </div>
      </DialogComponent>
    </>
  );
};
