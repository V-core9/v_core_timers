import { EventEmitter } from 'events'

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
function V_Core_Timer(props = {}) {
  if (typeof props.cb !== 'function') {
    throw new Error('Core Timer is Missing a Callback Function')
  }

  const withoutEvents = props?.withoutEvents ? true : false
  let loop = null
  let autoStart = typeof props.autoStart === 'boolean' ? props.autoStart : true
  let interval = !isNaN(props.interval) && props.interval > 0 ? props.interval : 100
  let cb = props.cb

  const coreTimer = !withoutEvents ? new EventEmitter() : {}

  //* Begin/Start It
  coreTimer.begin = async () => {
    let result = false
    if (loop === null) {
      loop = setInterval(async () => {
        coreTimer.run()
      }, interval)
      result = true
    }
    if (!withoutEvents) coreTimer.emit('start', result)
    return result
  }

  //* End/Stop it
  coreTimer.end = async () => {
    if (loop === null) return false
    clearInterval(loop)
    loop = null
    let result = loop === null
    if (!withoutEvents) coreTimer.emit('end', result)
    return result
  }

  //* Is Running Status Check
  coreTimer.status = async () => loop !== null

  //* Change Interval
  coreTimer.setInterval = async (val = null) => {
    if (isNaN(val) || val <= 0 || val === null) return false

    interval = val

    if (await coreTimer.status()) {
      coreTimer.end()
      coreTimer.begin()
    }

    return true
  }

  //? HELPERS:
  //* Getting Interval
  coreTimer.getInterval = async () => interval

  coreTimer.run = async () => {
    try {
      cb()
      if (!withoutEvents) coreTimer.emit('run')
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //? ALIASES:
  //* coreTimer.end()
  coreTimer.stop = async () => await coreTimer.end()
  //* coreTimer.begin()
  coreTimer.start = async () => await coreTimer.begin()
  //* coreTimer.status()
  coreTimer.isActive = async () => await coreTimer.status()
  //* coreTimer.setInterval()
  coreTimer.changeInterval = async (val) => await coreTimer.setInterval(val)
  //* coreTimer.run()
  coreTimer.execute = async () => await coreTimer.run()

  //! AutoStart if not disabled
  if (autoStart) coreTimer.start()

  return coreTimer
}

export default V_Core_Timer

