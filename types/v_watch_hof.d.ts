/**
 * Creates a watch object for managing tasks.
 *
 * @param {Object} props - Optional properties for configuring the watch object.
 * @param {boolean} props.withoutEvents - If true, the watch object will not emit events. Default is false.
 * @returns {Object} - The watch object with various methods for managing tasks.
 */
export default function v_watch(props?: {
    withoutEvents: boolean;
}): any;
