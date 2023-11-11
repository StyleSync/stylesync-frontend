/**
 * Generates a full name from the provided data.
 *
 * @template T - The type of the input data object.
 * @param {T} data - The data object containing optional `firstName` and `lastName` properties.
 * @returns {string} - The generated full name, or 'Unknown' if no name is available.
 */

export const getFullName = <
  T extends { firstName?: string | null; lastName?: string | null }
>(
  data: T
) => {
  let res = '';

  if (data.firstName) res += data.firstName;

  if (data.lastName) {
    if (res.length > 0) {
      res += ' ';
    }

    res += data.lastName;
  }

  if (res.length === 0) {
    return 'Unknown';
  }

  return res;
};
