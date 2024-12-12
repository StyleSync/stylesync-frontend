import { useMemo, type FC } from 'react';
import clsx from 'clsx';
import { endOfToday, startOfToday } from 'date-fns';
// components
import { Badge } from '@/modules/core/components/badge';
// constants
import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

type BookingsBadgeProps = {
  className?: string;
};

export const BookingsBadge: FC<BookingsBadgeProps> = ({ className }) => {
  const { data: me } = trpc.user.me.useQuery({ expand: ['professional'] });
  const todayBookingsQuery = trpc.booking.list.useQuery(
    {
      startDate: startOfToday().toISOString(),
      endDate: endOfToday().toISOString(),
      professionalId: me?.professional?.id,
    },
    {
      enabled: !!me?.professional,
    }
  );
  const bookingsPendingOrApproved = useMemo(() => {
    return (
      todayBookingsQuery.data?.filter(
        (booking) =>
          booking.status === 'PENDING' || booking.status === 'APPROVED'
      ) || []
    );
  }, [todayBookingsQuery.data]);

  const badgeColor = useMemo(() => {
    const isPendingBookings = bookingsPendingOrApproved.some(
      (booking) => booking.status === 'PENDING'
    );

    if (isPendingBookings) return bookingStatusMetadata.PENDING.color;

    return bookingStatusMetadata.APPROVED.color;
  }, [bookingsPendingOrApproved]);

  if (bookingsPendingOrApproved.length === 0) {
    return null;
  }

  return (
    <Badge className={clsx(className, badgeColor)}>
      {bookingsPendingOrApproved.length}
    </Badge>
  );
};
