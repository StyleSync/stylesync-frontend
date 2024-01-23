export type BookingTimeSelectProps = {
  selectedDay: number | null;
  setSelectedDay: (index: number) => void;
  selectedTimeBox: number | null;
  setSelectedTimeBox: (index: number) => void;
  onClickNext: () => void;
  onClickBack: () => void;
};
