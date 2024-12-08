import { type PickersDayProps } from '@mui/x-date-pickers';
import { type AppRouterOutputs } from '@/server/types';

export type EventIndicatorsProps = PickersDayProps<Date> & {
  events: AppRouterOutputs['booking']['list'];
};
