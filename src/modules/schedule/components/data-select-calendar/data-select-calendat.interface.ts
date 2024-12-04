export type DateSelectCalendarProps = {
  onMonthChange: (dates: Date[]) => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
};
