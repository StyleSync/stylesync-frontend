import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
import { type trpc } from '@/modules/core/utils/trpc.utils';

export type BookingModalSuccessProps = Omit<DialogProps, 'children'> & {
  bookingData: ReturnType<typeof trpc.booking.create.useMutation>['data'];
};
