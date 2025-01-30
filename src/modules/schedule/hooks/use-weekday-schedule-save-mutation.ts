import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { validateDailySchedule } from '@/modules/schedule/utils/daily-schedule.utils';
import { parseTimeRange } from '@/modules/core/utils/time.utils';
import { getCrudActionsOfList } from '@/modules/core/utils/crud.utils';
import { isBreaksEqual } from '@/modules/schedule/utils/breaks.utils';
// types
import type { DailySchedule } from '@/modules/schedule/types/schedule.types';
import type { Day, Break } from '@prisma/client';
import type { Optional } from 'utility-types';

type UseWeekdayScheduleSaveParams = {
  scheduleId?: string;
};

const crudMutationOpts = {
  useErrorBoundary: true,
};

export const useWeekdayScheduleSaveMutation = (
  params: UseWeekdayScheduleSaveParams,
  options?: UseMutationOptions<
    string | undefined,
    Error,
    DailySchedule & { weekday: Day }
  >
) => {
  const intl = useIntl();
  // queries
  const { data: schedule } = trpc.schedule.get.useQuery(
    { id: params.scheduleId ?? '' },
    { enabled: !!params.scheduleId }
  );
  const { data: scheduleBreaks } = trpc.break.getScheduleBreaks.useQuery(
    {
      scheduleId: params.scheduleId ?? '',
    },
    {
      enabled: !!params.scheduleId,
    }
  );
  // mutations
  const { mutateAsync: scheduleCreate } =
    trpc.schedule.create.useMutation(crudMutationOpts);
  const { mutateAsync: scheduleUpdate } =
    trpc.schedule.update.useMutation(crudMutationOpts);
  const { mutateAsync: scheduleRemove } =
    trpc.schedule.delete.useMutation(crudMutationOpts);
  const { mutateAsync: breakCreate } =
    trpc.break.create.useMutation(crudMutationOpts);
  const { mutateAsync: breakUpdate } =
    trpc.break.update.useMutation(crudMutationOpts);
  const { mutateAsync: breakRemove } =
    trpc.break.delete.useMutation(crudMutationOpts);

  return useMutation<
    string | undefined,
    Error,
    DailySchedule & { weekday: Day }
  >(async (scheduleToSave) => {
    const validation = validateDailySchedule(scheduleToSave, intl);

    if (!validation.isValid) {
      throw new Error(validation.error.message);
    }

    if (!scheduleToSave.isActive) {
      // !isActive means this day is day off and need to remove schedule & breaks

      if (scheduleBreaks) {
        for (const breakToRemove of scheduleBreaks) {
          await breakRemove({
            id: breakToRemove.id,
          });
        }
      }

      if (schedule) {
        await scheduleRemove({ id: schedule.id });
      }

      return;
    }

    const [start, end] = parseTimeRange(
      scheduleToSave.workHours,
      'date',
      Date.now()
    );

    let scheduleId: string;

    if (schedule) {
      await scheduleUpdate({
        id: schedule.id,
        start: start.toISOString(),
        end: end.toISOString(),
      });
      scheduleId = schedule.id;
    } else {
      const { id } = await scheduleCreate({
        day: scheduleToSave.weekday,
        start: start.toISOString(),
        end: end.toISOString(),
        isSpecificDay: false,
      });

      scheduleId = id;
    }

    const breaks = scheduleToSave.breaks.map((item) => {
      const [breakStart, breakEnd] = parseTimeRange(
        item.timerange,
        'date',
        Date.now()
      );

      return {
        id: item.id,
        start: breakStart,
        end: breakEnd,
      };
    });

    const { create, update, remove } = getCrudActionsOfList<
      Optional<Break, 'scheduleId' | 'createdAt' | 'updatedAt'>
    >(scheduleBreaks ?? [], breaks, isBreaksEqual);

    for (const item of create) {
      await breakCreate({
        start: item.start.toISOString(),
        end: item.end.toISOString(),
        scheduleId,
      });
    }

    for (const item of update) {
      await breakUpdate({
        id: item.id,
        start: item.start.toISOString(),
        end: item.end.toISOString(),
      });
    }

    for (const item of remove) {
      await breakRemove({
        id: item.id,
      });
    }

    return scheduleId;
  }, options);
};
