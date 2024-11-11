import type { BookingStatusProps } from '@/modules/booking/components/booking-status/booking-status.interface';

type BookingStatusMetadata = {
  title: string;
  color: string;
  note?: string;
};

export const bookingStatusMetadata: Record<
  BookingStatusProps['status'],
  BookingStatusMetadata
> = {
  PENDING: {
    title: 'booking.status.requested',
    color: 'bg-orange',
    note: 'booking.note.statusRequested',
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
