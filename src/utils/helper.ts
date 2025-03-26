import { randomBytes } from 'crypto';
import { mapKeys, snakeCase } from 'lodash';

/**
 * Generates a random token string of specified length
 * @param length The desired length of the token in characters (default: 32)
 * @returns A random hex string of the specified length
 */
export const generateToken = (length: number = 32): string => {
  return randomBytes(length / 2).toString('hex');
};

/**
 * Converts an object's keys from camelCase to snake_case
 * @param obj The object whose keys need to be converted
 * @returns A new object with all keys converted to snake_case
 */
export function camelToSnake(obj) {
  return mapKeys(obj, (_, key) => snakeCase(key));
}
