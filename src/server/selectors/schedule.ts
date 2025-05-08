import { Prisma } from '@prisma/client';

import { defaultBreakSelect } from '@/server/selectors/break';

export const defaultScheduleSelect = Prisma.validator<Prisma.ScheduleSelect>()({
  id: true,
  start: true,
  end: true,
  day: true,
  isSpecificDay: true,
  isDayOff: true,
  specificDay: true,
  specificMonth: true,
  specificYear: true,
  breaks: { select: defaultBreakSelect },
  createdAt: true,
  updatedAt: true,
});
