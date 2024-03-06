export type BookingInfoCardVariant = 'light' | 'green';

export type BookingInfoCardProps = {
  name: string;
  serviceName: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  variant?: BookingInfoCardVariant;
};
