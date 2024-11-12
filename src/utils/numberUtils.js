/**
 * Validates that the given number is a positive number.
 * @param {number} num - The value to check.
 * @param {string} keyName - The name of the key (used in the error message).
 * @throws {Error} Throws an error if the `num` is not a positive number.
 */
export function isValidNumber(num, keyName) {
  if (typeof num !== "number" || num <= 0 || isNaN(num)) {
    throw new Error(`${keyName} must be a positive number.`);
  }
}
