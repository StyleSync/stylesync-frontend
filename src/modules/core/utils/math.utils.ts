/**
 * Calculates the percentage of a target number in relation to a base number.
 *
 * @param {number} base - The base number.
 * @param {number} target - The target number.
 * @returns {number} The percentage of the target number in relation to the base number.
 * @throws {Error} Throws an error if the base is 1, as it would result in a division by zero.
 */
export const percentOf = (base: number, target: number) => {
  const percents = 100;

  if (base === 1) {
    throw new Error('Base cannot be 1 as it would result in division by zero.');
  }

  return (target * percents) / (base - 1);
};
