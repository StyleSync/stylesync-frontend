import { type FC, Fragment, useState } from 'react';
// components
import { Divider } from '@/modules/core/components/divider';
import { DayScheduleSelect } from '@/modules/schedule/components/day-schedule-select';
// utils
import { formatTimeRange, Time } from '@/modules/core/utils/time.utils';

import type { ProfessionalScheduleFormProps } from './professional-schedule-form.interface';
import styles from './professional-schedule-form.module.scss';

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

// const timezoneOffset = 3;

// const scheduleRRuleSet = new RRuleSet(true);

// const mondayRRule = new RRule({
//   freq: RRule.WEEKLY,
//   byweekday: RRule.MO,
//   byhour: [8 - timezoneOffset, 18 - timezoneOffset],
//   dtstart: set(new Date(), {
//     hours: 8,
//     minutes: 0,
//     seconds: 0,
//     milliseconds: 0,
//   }),
//   tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
// });
//
// scheduleRRuleSet.rrule(mondayRRule);

// const mondayBreakRRule = new RRule({
//   freq: RRule.WEEKLY,
//   byweekday: RRule.MO,
//   byhour: [12 - timezoneOffset, 14 - timezoneOffset],
//   dtstart: set(new Date(), {
//     hours: 8,
//     minutes: 0,
//     seconds: 0,
//     milliseconds: 0,
//   }),
//   tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
// });
//
// scheduleRRuleSet.exrule(mondayBreakRRule);

// const getDaySchedule = (daytime: Date) => {
//   const [startTime, endTime] = scheduleRRuleSet.between(
//     startOfDay(daytime),
//     endOfDay(daytime)
//   );
//
//   return {
//     startTime,
//     endTime,
//   };
// };

// const getDayBreaks = (daytime: Date) => {
//   scheduleRRuleSet.exrules().forEach((rrule) => {
//     const [startTime, endTime] = rrule.between(
//       startOfDay(daytime),
//       endOfDay(daytime)
//     );
//   });
// };

type Schedule = {
  [key in (typeof days)[number]]: {
    workHours: string; // time range 'HH:mm - HH:mm'
    breaks: string[]; // time range array
    isActive: boolean;
  };
};

const initialSchedule: Schedule = days.reduce<Schedule>((res, current) => {
  return {
    ...res,
    [current]: {
      workHours: formatTimeRange(new Time(), new Time()),
      breaks: [],
      isActive: true,
    },
  };
}, {} as any);

export const ProfessionalScheduleForm: FC<
  ProfessionalScheduleFormProps
> = () => {
  // state
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule);

  return (
    <div className={styles.root}>
      {days.map((day, index) => (
        <Fragment key={day}>
          <DayScheduleSelect
            key={day}
            day={day}
            isActive={schedule[day].isActive}
            workHours={schedule[day].workHours}
            breaks={schedule[day].breaks}
            onActiveChange={(isActive) => {
              setSchedule((current) => ({
                ...current,
                [day]: {
                  ...current[day],
                  isActive,
                },
              }));
            }}
            onWorkHoursChange={(workHours) => {
              setSchedule((current) => ({
                ...current,
                [day]: {
                  ...current[day],
                  workHours,
                },
              }));
            }}
            onBreaksChange={(breaks) => {
              setSchedule((current) => ({
                ...current,
                [day]: {
                  ...current[day],
                  breaks,
                },
              }));
            }}
          />
          {index !== days.length - 1 && <Divider variant='horizontal' />}
        </Fragment>
      ))}
    </div>
  );
};
