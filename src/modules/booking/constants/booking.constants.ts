import type { BookingStatusProps } from '@/modules/booking/components/booking-status/booking-status.interface';

type BookingStatusMetadata = {
  title: string;
  color: string;
  note?: { professional: string; customer: string } | string;
};

export const bookingStatusMetadata: Record<
  BookingStatusProps['status'],
  BookingStatusMetadata
> = {
  PENDING: {
    title: 'booking.status.requested',
    color: 'bg-orange',
    note: {
      professional: 'booking.note.statusRequested',
      customer: 'booking.note.customerPending',
    },
  },
  APPROVED: {
    title: 'booking.status.approved',
    color: 'bg-green',
    note: 'booking.note.statusApproved',
  },
  FINISHED: {
    title: 'booking.status.finished',
    color: 'bg-gray-accent',
  },
  REJECTED: {
    title: 'booking.status.rejected',
    color: 'bg-destructive',
    note: 'booking.note.statusRejected',
  },
  CANCELED: {
    title: 'booking.status.canceled',
    color: 'bg-destructive',
    note: 'booking.note.statusCanceled',
  },
  MISSED: { title: 'booking.status.missed', color: 'bg-destructive' },
};
