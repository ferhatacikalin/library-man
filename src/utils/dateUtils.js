import moment from 'moment';

/**
 * Format a date to standard format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Get duration between two dates in days
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date (optional, defaults to now)
 * @returns {number} Duration in days
 */
export const getDurationInDays = (startDate, endDate = null) => {
  const start = moment(startDate);
  const end = endDate ? moment(endDate) : moment();
  return end.diff(start, 'days');
};

/**
 * Check if a date is before another date
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {boolean} True if date1 is before date2
 */
export const isDateBefore = (date1, date2) => {
  return moment(date1).isBefore(moment(date2));
};

/**
 * Get current date and time in standard format
 * @returns {string} Current date and time
 */
export const getCurrentDateTime = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Add days to a date
 * @param {Date|string} date - Base date
 * @param {number} days - Number of days to add
 * @returns {string} Resulting date
 */
export const addDays = (date, days) => {
  return moment(date).add(days, 'days').format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Subtract days from a date
 * @param {Date|string} date - Base date
 * @param {number} days - Number of days to subtract
 * @returns {string} Resulting date
 */
export const subtractDays = (date, days) => {
  return moment(date).subtract(days, 'days').format('YYYY-MM-DD HH:mm:ss');
}; 