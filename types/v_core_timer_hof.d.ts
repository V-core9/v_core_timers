export default V_Core_Timer;
/**
 * Creates a Core Timer object.
 *
 * @param {Object} props - The properties for the Core Timer.
 * @param {Function} props.cb - The callback function to be executed by the Core Timer.
 * @param {boolean} [props.autoStart=true] - Indicates whether the Core Timer should automatically start.
 * @param {number} [props.interval=100] - The interval in milliseconds between each execution of the callback function.
 * @param {boolean} [props.withoutEvents=false] - Indicates whether the Core Timer should emit events.
 * @returns {Object} - The Core Timer object.
 * @throws {Error} - Throws an error if the callback function is missing.
 */
declare function V_Core_Timer(props?: {
    cb: Function;
    autoStart?: boolean;
    interval?: number;
    withoutEvents?: boolean;
}): any;
