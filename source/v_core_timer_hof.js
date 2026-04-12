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
  const parallelCalls = Boolean(coreTimerProps?.parallelCalls || true)
  let loop = null
  let autoStart = typeof coreTimerProps.autoStart === 'boolean' ? coreTimerProps.autoStart : true
  let interval = !isNaN(coreTimerProps.interval) && coreTimerProps.interval > 0 ? coreTimerProps.interval : 100
  let cb = coreTimerProps.cb
  let isRunning = false

  const coreTimer = !withoutEvents ? new EventEmitter() : {}
  const emitEvent = (event, data = null, emitter = !withoutEvents ? coreTimer : null) =>
    !withoutEvents && emitter !== null ? emitter.emit(event, data) : null

  //* Begin/Start It
  const begin = async () => {
    let result = false

    if (loop !== null) await end()

    if (loop === null) {
      loop = setInterval(run, interval)
      result = true
      emitEvent('start', result)
    }
    return result
  }

  //* End/Stop it
  const end = async () => {
    if (loop === null) return false

    clearInterval(loop)
    loop = null

    let result = loop === null
    emitEvent('end', result)
    return result
  }

  //* Is Running Status Check
  const status = async () => loop !== null

  //* Change Interval
  const setInterval = async (val = null) => {
    if (isNaN(val) || val <= 0 || val === null) return false

    interval = val

    if (await status()) await begin()

    return true
  }

  //? HELPERS:
  //* Getting Interval
  const getInterval = async () => interval

  const run = async () => {
    try {
      if (!parallelCalls && isRunning) return false
      // {
      //   console.log('Already Running the CB FN')
      //   return
      // }

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
  coreTimer.end = end
  coreTimer.stop = end

  //* coreTimer.begin()
  coreTimer.begin = begin
  coreTimer.start = begin

  //* coreTimer.status()
  coreTimer.status = status
  coreTimer.isActive = status

  //* getInterval
  coreTimer.getInterval = getInterval

  //* coreTimer.setInterval()
  coreTimer.setInterval = setInterval
  coreTimer.changeInterval = setInterval

  //* coreTimer.run()
  coreTimer.run = run
  coreTimer.execute = run

  coreTimer.status = status

  //! AutoStart if not disabled
  if (autoStart) coreTimer.start()

  return coreTimer
}

