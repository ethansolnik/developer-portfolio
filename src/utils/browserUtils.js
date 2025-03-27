/**
 * Safely check if code is running in browser environment
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * Safe document access
 * @param {Function} callback Function that uses document
 * @returns {*} Result of callback or null if not in browser
 */
export const withBrowser = (callback) => {
  if (isBrowser()) {
    return callback();
  }
  return null;
};
