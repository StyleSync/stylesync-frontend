import type { AppRouterOutputs } from '@/server/types';

export const groupBookingsByDate = (
  bookings: AppRouterOutputs['booking']['list']['items']
) => {
  const groupedBookings = bookings.reduce<
    Record<string, AppRouterOutputs['booking']['list']['items']>
  >((acc, booking) => {
    const date = booking.startTime.toISOString().split('T')[0];

    if (!acc[date]) {
      // eslint-disable-next-line no-param-reassign
      acc[date] = [];
    }

    acc[date].push(booking);

    return acc;
  }, {});

  return groupedBookings;
};
