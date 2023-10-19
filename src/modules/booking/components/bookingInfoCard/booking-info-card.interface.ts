type BookingInfoCardVariant = 'light' | 'green';

export type BookingInfoCardProps = {
  name: string;
  serviceName: string;
  date: string;
  variant?: BookingInfoCardVariant;
};
