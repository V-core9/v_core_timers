/**
 * Checks if the input value is a valid number greater than zero.
 *
 * @param {number} value - The input value to be checked.
 * @returns {boolean} - Returns true if the value is a valid number greater than zero, otherwise returns false.
 */
const confirmInput = (value) => !isNaN(value) && value > 0

const vTime = {}

/**
 * Converts the given value to milliseconds.
 *
 * @param {number} [val=1] - The value to be converted.
 * @returns {number|undefined} - Returns the converted value in milliseconds, or undefined if the input is invalid.
 */
vTime.seconds = (val = 1) => (confirmInput(val) ? val * 1000 : undefined)

/**
 * Converts the given value to minutes.
 *
 * @param {number} [val=1] - The value to be converted.
 * @returns {number|undefined} - Returns the converted value in minutes, or undefined if the input is invalid.
 */
vTime.minutes = (val = 1) => vTime.seconds(val * 60)

/**
 * Converts the given value to hours.
 *
 * @param {number} [val=1] - The value to be converted.
 * @returns {number|undefined} - Returns the converted value in hours, or undefined if the input is invalid.
 */
vTime.hours = (val = 1) => vTime.minutes(val * 60)

/**
 * Converts the given value to days.
 *
 * @param {number} [val=1] - The value to be converted.
 * @returns {number|undefined} - Returns the converted value in days, or undefined if the input is invalid.
 */
vTime.days = (val = 1) => vTime.hours(val * 24)

/**
 * Converts the given value to weeks.
 *
 * @param {number} [val=1] - The value to be converted.
 * @returns {number|undefined} - Returns the converted value in weeks, or undefined if the input is invalid.
 */
vTime.weeks = (val = 1) => vTime.days(val * 7)

/**
 * Converts the given value to months.
 *
 * @param {number} [val=1] - The value to be converted.
 * @returns {number|undefined} - Returns the converted value in months, or undefined if the input is invalid.
 */
vTime.months = (val = 1) => vTime.days(val * 30)

/**
 * Converts the given value to years.
 *
 * @param {number} [val=1] - The value to be converted.
 * @returns {number|undefined} - Returns the converted value in years, or undefined if the input is invalid.
 */
vTime.years = (val = 1) => vTime.days(val * 365)

export default vTime

