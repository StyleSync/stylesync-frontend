/**
 * Creates an array of numbers starting from the specified `start` value and having the specified `length`.
 * The resulting array will contain `length` consecutive numbers, starting from `start`.
 *
 * @param {number} length - The number of elements in the range to be generated.
 * @param {number} [start=0] - The starting value of the range. Default is 0 if not provided.
 * @returns {number[]} An array of numbers representing the generated range.
 *
 * @example
 * const result = range(5);
 * // result will be [0, 1, 2, 3, 4]
 *
 * @example
 * const customStart = range(5, 10);
 * // customStart will be [10, 11, 12, 13, 14]
 *
 * @example
 * const negativeRange = range(4, -3);
 * // negativeRange will be [-3, -2, -1, 0]
 */

export const range = (length: number, start = 0): number[] => {
  return Array.from({ length }, (_, i) => i + start);
};
