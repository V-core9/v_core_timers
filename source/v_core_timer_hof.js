import { EventEmitter } from 'events'
import { isAsyncFunction } from './utils'

/**
 * Creates a Core Timer object.
 *
 * @param {Object} coreTimerProps - The properties for the Core Timer.
 * @param {Function} coreTimerProps.cb - The callback function to be executed by the Core Timer.
 * @param {boolean} [coreTimerProps.autoStart=true] - Indicates whether the Core Timer should automatically start.
 * @param {number} [coreTimerProps.interval=100] - The interval in milliseconds between each execution of the callback function.
 * @param {boolean} [coreTimerProps.withoutEvents=false] - Indicates whether the Core Timer should emit events.
 * @returns {Object} - The Core Timer object.
 * @throws {Error} - Throws an error if the callback function is missing.
 */
export default function V_Core_Timer(coreTimerProps = {}) {
  if (typeof coreTimerProps.cb !== 'function') {
    throw new Error('Core Timer is Missing a Callback Function')
  }

  const withoutEvents = coreTimerProps?.withoutEvents ? true : false
  let loop = null
  let autoStart = typeof coreTimerProps.autoStart === 'boolean' ? coreTimerProps.autoStart : true
  let interval = !isNaN(coreTimerProps.interval) && coreTimerProps.interval > 0 ? coreTimerProps.interval : 100
  let cb = coreTimerProps.cb
  let isRunning = false

  const coreTimer = !withoutEvents ? new EventEmitter() : {}
  const emitEvent = (event, data = null, emitter = !withoutEvents ? coreTimer : null) =>
    !withoutEvents && emitter !== null ? emitter.emit(event, data) : null

  //* Begin/Start It
  coreTimer.begin = async () => {
    let result = false
    if (loop === null) {
      loop = setInterval(async () => {
        coreTimer.run()
      }, interval)
      result = true
    }
    emitEvent('start', result)
    return result
  }

  //* End/Stop it
  coreTimer.end = async () => {
    if (loop === null) return false

    clearInterval(loop)
    loop = null

    let result = loop === null
    emitEvent('end', result)
    return result
  }

  //* Is Running Status Check
  coreTimer.status = async () => loop !== null

  //* Change Interval
  coreTimer.setInterval = async (val = null) => {
    if (isNaN(val) || val <= 0 || val === null) return false

    interval = val

    if (await coreTimer.status()) {
      await coreTimer.end()
      await coreTimer.begin()
    }

    return true
  }

  //? HELPERS:
  //* Getting Interval
  coreTimer.getInterval = async () => interval

  coreTimer.run = async () => {
    try {
      if (isRunning) {
        console.log('Already Running the CB FN')
        return
      }

      isRunning = true
      if (isAsyncFunction(cb)) {
        await cb()
      } else {
        cb()
      }
      emitEvent('run')
      isRunning = false
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

