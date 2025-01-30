import { type IntlShape } from 'react-intl';
// utils
import { parseTimeRange, Time } from '@/modules/core/utils/time.utils';
import { isArrContainDuplications } from '@/modules/core/utils/array.utils';
// types
import type { DailySchedule } from '@/modules/schedule/types/schedule.types';

type ValidationResult =
  | {
      isValid: true;
      error?: undefined;
    }
  | {
      isValid: false;
      error: {
        ERROR_CODE: string;
        message: string;
      };
    };

export const validateDailySchedule = (
  dailySchedule: DailySchedule,
  intl: IntlShape
): ValidationResult => {
  const [workStart, workEnd] = parseTimeRange(dailySchedule.workHours);
  const workStartDuration = Time.toMinuteDuration(workStart);
  const workEndDuration = Time.toMinuteDuration(workEnd);

  if (!dailySchedule.isActive) {
    return {
      isValid: true,
    };
  }

  if (
    isArrContainDuplications(dailySchedule.breaks.map((item) => item.timerange))
  ) {
    return {
      isValid: false,
      error: {
        ERROR_CODE: 'BREAK_SLOT_DUPLICATIONS',
        message: intl.formatMessage({
          id: 'validation.break.slot.duplications',
        }),
      },
    };
  }

  for (const breakSlot of dailySchedule.breaks) {
    const [breakStart, breakEnd] = parseTimeRange(breakSlot.timerange);
    const breakStartDuration = Time.toMinuteDuration(breakStart);
    const breakEndDuration = Time.toMinuteDuration(breakEnd);

    if (
      workStartDuration >= breakStartDuration ||
      workEndDuration <= breakEndDuration
    ) {
      return {
        isValid: false,
        error: {
          ERROR_CODE: 'BREAK_SLOT_OVERLAP_WORK_HOURS',
          message: intl.formatMessage({
            id: 'validation.break.slot.overlap.work.hours',
          }),
        },
      };
    }

    const isBreakSlotOverlapOthers = dailySchedule.breaks.some((_breakSlot) => {
      const [_breakStart, _breakEnd] = parseTimeRange(_breakSlot.timerange);
      const _breakStartDuration = Time.toMinuteDuration(_breakStart);
      const _breakEndDuration = Time.toMinuteDuration(_breakEnd);

      if (
        breakStartDuration === _breakStartDuration &&
        breakEndDuration === _breakEndDuration
      ) {
        // skip same element
        return false;
      }

      if (
        breakStartDuration >= _breakStartDuration &&
        breakStartDuration <= _breakEndDuration
      ) {
        // break start time defined in the middle of another break
        return true;
      }

      if (
        breakEndDuration > _breakStartDuration &&
        breakEndDuration < _breakEndDuration
      ) {
        // break end time defined in the middle of another break
        return true;
      }

      return false;
    });

    if (isBreakSlotOverlapOthers) {
      return {
        isValid: false,
        error: {
          ERROR_CODE: 'BREAK_SLOTS_OVERLAP_EACH_OTHER',
          message: intl.formatMessage({
            id: 'validation.break.slots.overap.each.other',
          }),
        },
      };
    }
  }

  return {
    isValid: true,
  };
};
