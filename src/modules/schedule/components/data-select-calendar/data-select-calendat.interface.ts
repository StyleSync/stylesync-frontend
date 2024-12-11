import type { AppRouterOutputs } from '@/server/types';

export type DateSelectCalendarProps = {
  onMonthChange: (dates: Date[]) => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  events: AppRouterOutputs['booking']['list'];
};
