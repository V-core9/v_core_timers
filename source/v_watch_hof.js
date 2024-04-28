import { EventEmitter } from 'events'
import v_core_timer_hof from './v_core_timer_hof'

/**
 * Creates a watch object for managing timers.
 *
 * @param {Object} props - Optional properties for configuring the watch object.
 * @param {boolean} props.withoutEvents - If true, the watch object will not emit events. Default is false.
 * @returns {Object} - The watch object with various methods for managing timers.
 */
export default function v_watch(props = {}) {
  const withoutEvents = props?.withoutEvents ? true : false

  const coreWatch = !withoutEvents ? new EventEmitter() : {}
  //? The Actual List of timers
  const timerList = {}

  coreWatch.get = async (key) => (key !== undefined ? timerList[key] : timerList)

  coreWatch.has = async (key) => timerList[key] !== undefined

  coreWatch.keys = async () => Object.keys(timerList)

  coreWatch.count = async () => (await coreWatch.keys()).length

  //? Create New Timer
  coreWatch.new = async (name, interval, cb, autoStart = true) => {
    let timer = v_core_timer_hof({ interval, cb, autoStart })
    timerList[name] = timer
    if (!withoutEvents) {
      coreWatch.emit('new', name)
      timer.on('run', async () => coreWatch.emit('run', name))
    }
    return true
  }

  //* and alias for new
  coreWatch.create = async (...arg) => await coreWatch.new(...arg)

  //? This deletes a timer from list by ending it first
  coreWatch.delete = async (key) => {
    try {
      await timerList[key].end()
      delete timerList[key]
      if (!withoutEvents) {
        coreWatch.emit('delete', key)
      }
      return true
    } catch (e) {
      console.warn(e)
      return false
    }
  }

  //? Ends all timers
  coreWatch.end = async () => {
    for (let key in timerList) {
      coreWatch.delete(key)
    }
    if (!withoutEvents) {
      coreWatch.emit('end')
    }
    return true
  }

  //? Stop a Timer
  coreWatch.stop = async (key) => {
    try {
      let timer = await coreWatch.get(key)
      await timer.end()
      if (!withoutEvents) {
        coreWatch.emit('stop', key)
      }
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  //? Start a timer from list of timers.
  coreWatch.start = async (key) => {
    try {
      let timer = await coreWatch.get(key)
      await timer.start()
      if (!withoutEvents) {
        coreWatch.emit('start', key)
      }
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  //? Manually RUN a timer
  coreWatch.run = async (key) => {
    try {
      let timer = await coreWatch.get(key)
      await timer.run()
      if (!withoutEvents) {
        coreWatch.emit('run', key)
      }
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  //? Check if a timer is active without getting it.
  coreWatch.isActive = async (key) => {
    try {
      let timer = await coreWatch.get(key)
      return await timer.isActive()
    } catch (err) {
      return false
    }
  }

  //? Active/Running timers count.
  coreWatch.countActive = async () => {
    let count = 0
    for (const timer in timerList) {
      if (await timerList[timer].isActive()) {
        count++
      }
    }
    return count
  }

  //? Inactive/Disabled timers count.
  coreWatch.countInactive = async () => (await coreWatch.count()) - (await coreWatch.countActive())

  //? Total timers stats.
  coreWatch.stats = async () => {
    let timers = []

    for (const timer in timerList) {
      timers.push({
        name: timer,
        active: await timerList[timer].isActive(),
        interval: await timerList[timer].getInterval()
      })
    }

    return {
      disabledTimersCount: await coreWatch.countInactive(),
      activeTimersCount: await coreWatch.countActive(),
      totalTimersCount: await coreWatch.count(),
      timers: timers
    }
  }

  //? Changes Interval for a timer.
  coreWatch.changeInterval = async (key, interval) => {
    try {
      let timer = await coreWatch.get(key)
      await timer.setInterval(interval)
      if (!withoutEvents) {
        coreWatch.emit('intervalChange', { key, interval })
      }
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  return coreWatch
}

