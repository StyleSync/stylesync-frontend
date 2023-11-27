import type { Optional } from 'utility-types';
// types
import type { Break } from '@prisma/client';

export const isBreaksEqual = (
  break1: Optional<Break, 'scheduleId' | 'createdAt' | 'updatedAt'>,
  break2: Optional<Break, 'id' | 'scheduleId' | 'createdAt' | 'updatedAt'>
): boolean => {
  return (
    break1.id === break2.id &&
    break1.start.toISOString() === break2.start.toISOString() &&
    break1.end.toISOString() === break2.end.toISOString()
  );
};
