export type BookingTimeSelectProps = {
  selectedDay: null | string;
  setSelectedDay: (date: string) => void;
  selectedTimeRange: number | null;
  setSelectedTimeRange: (index: number) => void;
  professionalId: string;
};
