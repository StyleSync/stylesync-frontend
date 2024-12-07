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

  const badgeColor = useMemo(() => {
    const isPendingBookings = todayBookingsQuery.data?.some(
      (booking) => booking.status === 'PENDING'
    );

    if (isPendingBookings) return bookingStatusMetadata.PENDING.color;

    return bookingStatusMetadata.APPROVED.color;
  }, [todayBookingsQuery.data]);

  if (!todayBookingsQuery.data || !todayBookingsQuery.data.length) {
    return null;
  }

  return (
    <Badge className={clsx(className, badgeColor)}>
      {todayBookingsQuery.data.length}
    </Badge>
  );
};
