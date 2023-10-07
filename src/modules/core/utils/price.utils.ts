/**
 * Formats a price as a string with a comma as the thousands separator.
 *
 * @param {string | number} price - The price to format, as a string or number.
 * @returns {string} The formatted price as a string.
 */

export const formatPrice = (price: string | number) => {
  const priceStr = typeof price === 'number' ? price.toString() : price;
  // Split the string into parts before and after the decimal point (if any)
  const parts = priceStr.split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1] || '';

  // Add a comma as the thousands separator
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine the integer and decimal parts with a decimal point
  if (decimalPart !== '') {
    return `${integerPart}.${decimalPart}`;
  }

  return integerPart;
};
