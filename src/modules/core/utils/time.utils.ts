type TimeUnit = `${number}${number}`;

type TimeValue = `${TimeUnit}:${TimeUnit}`;

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

  public getString(): TimeValue {
    return this.value;
  }

  public static timeUnitToString(unit: number): `${number}${number}` {
    const MAX_NUMERIC = 9;

    return unit <= MAX_NUMERIC ? `0${unit}` : (unit.toString() as TimeUnit);
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

/**
 * Parses a time range string into two `Time` objects representing the `startTime` and `endTime`.
 *
 * @param {string} timeRange - The time range string to be parsed. The format should be "start - end".
 * @returns {[startTime: Time, endTime: Time]} An array containing the parsed `startTime` and `endTime`.
 * @throws {Error} If the `timeRange` string does not have the correct format.
 *
 * @example
 * const timeRangeString = "9:00 - 12:30";
 * const [startTime, endTime] = parseTimeRange(timeRangeString);
 * // startTime will be a Time object representing "9:00" and endTime will represent "12:30"
 *
 * @example
 * const invalidTimeRange = "9:00 to 12:30";
 * try {
 *   parseTimeRange(invalidTimeRange);
 * } catch (error) {
 *   console.error(error.message); // Output: "Time range '9:00 AM to 12:30 PM' has not correct format"
 * }
 */

export const parseTimeRange = (
  timeRange: string
): [startTime: Time, endTime: Time] => {
  if (!isTimeRangeString(timeRange)) {
    throw new Error(`Time range '${timeRange}' has not correct format`);
  }

  const [start, end] = timeRange.split(' - ');

  return [new Time(start as TimeValue), new Time(end as TimeValue)];
};

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
