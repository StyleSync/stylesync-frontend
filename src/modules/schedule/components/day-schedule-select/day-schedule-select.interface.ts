export type DayScheduleSelectProps = {
  day: string;
  workHours: string;
  breaks: string[];
  isActive: boolean;
  onActiveChange: (isActive: boolean) => void;
  onWorkHoursChange: (workHours: string) => void;
  onBreaksChange: (breaks: string[]) => void;
};
