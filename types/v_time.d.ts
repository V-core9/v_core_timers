export default vTime;
declare namespace vTime {
    /**
     * Converts the given value to milliseconds.
     *
     * @param {number} [val=1] - The value to be converted.
     * @returns {number|undefined} - Returns the converted value in milliseconds, or undefined if the input is invalid.
     */
    function seconds(val?: number): number;
    /**
     * Converts the given value to minutes.
     *
     * @param {number} [val=1] - The value to be converted.
     * @returns {number|undefined} - Returns the converted value in minutes, or undefined if the input is invalid.
     */
    function minutes(val?: number): number;
    /**
     * Converts the given value to hours.
     *
     * @param {number} [val=1] - The value to be converted.
     * @returns {number|undefined} - Returns the converted value in hours, or undefined if the input is invalid.
     */
    function hours(val?: number): number;
    /**
     * Converts the given value to days.
     *
     * @param {number} [val=1] - The value to be converted.
     * @returns {number|undefined} - Returns the converted value in days, or undefined if the input is invalid.
     */
    function days(val?: number): number;
    /**
     * Converts the given value to weeks.
     *
     * @param {number} [val=1] - The value to be converted.
     * @returns {number|undefined} - Returns the converted value in weeks, or undefined if the input is invalid.
     */
    function weeks(val?: number): number;
    /**
     * Converts the given value to months.
     *
     * @param {number} [val=1] - The value to be converted.
     * @returns {number|undefined} - Returns the converted value in months, or undefined if the input is invalid.
     */
    function months(val?: number): number;
    /**
     * Converts the given value to years.
     *
     * @param {number} [val=1] - The value to be converted.
     * @returns {number|undefined} - Returns the converted value in years, or undefined if the input is invalid.
     */
    function years(val?: number): number;
}
