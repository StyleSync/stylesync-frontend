import { getHours, getMinutes, minutesInHour, set } from 'date-fns';
import { type IntlShape } from 'react-intl';

type TimeUnit = `${number}${number}`;

export type TimeValue = `${TimeUnit}:${TimeUnit}`;

type TimeObject = { hours: number; minutes: number };

export class Time {
  private value: TimeValue;
  constructor(value?: Time | TimeValue | TimeObject) {
    if (!value) {
      this.value = '00:00';

      return;
    }

    if (value instanceof Time) {
      this.value = value.getString();

      return;
    }

    if (typeof value === 'object') {
      this.value = new Time().set(value).getString();

      return;
    }

    this.value = value;
  }

  public set(value: Partial<TimeObject> | TimeValue): this {
    if (typeof value === 'object') {
      const time = {
        ...this.getTimeObject(),
        ...value,
      };

      const hours = Time.timeUnitToString(time.hours);
      const minutes = Time.timeUnitToString(time.minutes);

      this.value = `${hours}:${minutes}`;

      return this;
    }

    this.value = value;

    return this;
  }

  public getHours(): number {
    const [h] = this.value.split(':');

    return +h;
  }

  public getMinutes(): number {
    const [, m] = this.value.split(':');

    return +m;
  }

  public getTimeObject(): TimeObject {
    const [h, m] = this.value.split(':');

    return {
      hours: +h,
      minutes: +m,
    };
  }

  public setTimeOfDate(date: Date | number): Date {
    return set(date, {
      hours: this.getHours(),
      minutes: this.getMinutes(),
      seconds: 0,
      milliseconds: 0,
    });
  }

  public getString(): TimeValue {
    return this.value;
  }

  public static timeUnitToString(unit: number): `${number}${number}` {
    const MAX_NUMERIC = 9;

    return unit <= MAX_NUMERIC ? `0${unit}` : (unit.toString() as TimeUnit);
  }

  public static fromMinuteDuration(duration: number): Time {
    return new Time({
      hours: Math.floor(duration / minutesInHour),
      minutes: duration - Math.floor(duration / minutesInHour) * minutesInHour,
    });
  }

  public static fromDate(date: Date | number | string): Time {
    const _date = new Date(date);

    return new Time({ hours: getHours(_date), minutes: getMinutes(_date) });
  }

  public static toMinuteDuration(time: Time | TimeValue | TimeObject): number {
    const _time = new Time(time);

    return _time.getHours() * minutesInHour + _time.getMinutes();
  }

  public static guard(value: string): value is TimeValue {
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    return timeRegex.test(value);
  }
}

/**
 * Formats a time range represented by the provided `startTime` and `endTime` into a string.
 *
 * @param {Time} startTime - The starting time of the range.
 * @param {Time} endTime - The ending time of the range.
 * @returns {string} A formatted string representing the time range in the format "start - end".
 *
 * @example
 * const startTime = new Time(9, 0);
 * const endTime = new Time(12, 30);
 * const formattedRange = formatTimeRange(startTime, endTime);
 * // formattedRange will be "9:00 - 12:30"
 */

export const formatTimeRange = (startTime: Time, endTime: Time): string => {
  return `${startTime.getString()} - ${endTime.getString()}`;
};

export function parseTimeRange(
  timeRange: string,
  returnType?: 'time'
): [Time, Time];
export function parseTimeRange(
  timeRange: string,
  returnType: 'date',
  date: Date | number
): [Date, Date];
export function parseTimeRange(
  timeRange: string,
  returnType?: 'time' | 'date',
  date?: Date | number
) {
  if (!isTimeRangeString(timeRange)) {
    throw new Error(`Time range '${timeRange}' has not correct format`);
  }

  const [start, end] = timeRange
    .split(' - ')
    .map((timeValue) => new Time(timeValue as TimeValue));

  if (returnType === 'date' && date) {
    return [start.setTimeOfDate(date), end.setTimeOfDate(date)];
  }

  return [start, end];
}

/**
 * Checks if the provided string is a valid time range string in the format "hh:mm - hh:mm".
 *
 * @param {string} timeRange - The string to be checked for time range format.
 * @returns {boolean} Returns `true` if the input string is a valid time range format, `false` otherwise.
 *
 * @example
 * const validTimeRange = "09:00 AM - 12:30 PM";
 * const isValid = isTimeRangeString(validTimeRange);
 * // isValid will be true
 *
 * @example
 * const invalidTimeRange = "9:00 AM to 12:30 PM";
 * const isValid = isTimeRangeString(invalidTimeRange);
 * // isValid will be false
 */

export const isTimeRangeString = (timeRange: string): boolean => {
  return /^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/.test(timeRange);
};

/**
 * Formats the duration in minutes to a string representation of hours and minutes.
 * @param {number} minutes - The duration in minutes to be formatted.
 * @returns {string} A string representing the duration in the format 'h hours m minutes'.
 */
export const shortFormatDuration = (
  minutes: number,
  intl?: IntlShape
): string => {
  const h = Math.floor(minutes / minutesInHour);
  const m = minutes % minutesInHour;

  let formatted = '';

  if (h > 0) {
    formatted += intl?.formatMessage(
      { id: 'duration.hour.short' },
      { count: h }
    );
  }

  if (m > 0) {
    if (formatted.length > 0) {
      formatted += ' ';
    }

    formatted += intl?.formatMessage(
      { id: 'duration.minute.short' },
      { count: m }
    );
  }

  return formatted;
};

// constants
export const emptyTimeRange = formatTimeRange(new Time(), new Time());

// formatter duration
export const formatDuration = (duration: number, intl?: IntlShape): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  let formattedDuration = '';

  if (hours > 0) {
    formattedDuration += ` ${intl?.formatMessage(
      { id: 'duration.hour' },
      { count: hours }
    )}`;
  }

  if (minutes > 0) {
    if (formattedDuration.length > 0) {
      formattedDuration += ' ';
    }

    formattedDuration += ` ${intl?.formatMessage(
      { id: 'duration.minute' },
      { count: minutes }
    )}`;
  }

  return formattedDuration;
};

//  formatting time in the 'HH:mm' format.
export const formatTime = (timeString: string | Date | number) => {
  const time = new Date(timeString);

  return `${time.getHours().toString().padStart(2, '0')}:${time
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};
