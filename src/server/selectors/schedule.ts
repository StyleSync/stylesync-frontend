import { Prisma } from '@prisma/client';
import { defaultBreakSelect } from '@/server/selectors/break';

export const defaultScheduleSelect = Prisma.validator<Prisma.ScheduleSelect>()({
  id: true,
  start: true,
  end: true,
  day: true,
  isSpecificDay: true,
  date: true,
  breaks: { select: defaultBreakSelect },
  createdAt: true,
  updatedAt: true,
});
