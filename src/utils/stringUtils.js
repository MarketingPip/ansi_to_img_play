/**
 * Checks if the provided string is valid.
 * @param {string} string - The string to validate.
 * @returns {boolean} True if the string is valid, false otherwise.
 */
export const isValidString = (string) => {
  return typeof string === 'string' && string.trim().length > 0;
};
