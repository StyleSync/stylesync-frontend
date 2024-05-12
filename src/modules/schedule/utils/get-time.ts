import { format } from 'date-fns';

export const getTime = (time: Date | null | undefined): string =>
  format(time ? new Date(time) : new Date(), 'HH:mm');
