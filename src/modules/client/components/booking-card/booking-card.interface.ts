import type { AppRouterOutputs } from '@/server/types';

export type BookingCardProps = {
  booking: AppRouterOutputs['booking']['list']['items'][number];
  onClick?: (
    booking: AppRouterOutputs['booking']['list']['items'][number]
  ) => void;
};
