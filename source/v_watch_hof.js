import { EventEmitter } from 'events'
import v_core_timer_hof from './v_core_timer_hof'

/**
 * Creates a watch object for managing tasks.
 *
 * @param {Object} props - Optional properties for configuring the watch object.
 * @param {boolean} props.withoutEvents - If true, the watch object will not emit events. Default is false.
 * @returns {Object} - The watch object with various methods for managing tasks.
 */
export default function v_watch(props = {}) {
  const withoutEvents = props?.withoutEvents ? true : false

  const coreWatch = !withoutEvents ? new EventEmitter() : {}
  //? The Actual List of tasks
  const tasksList = {}

  coreWatch.get = async (key) => (key !== undefined ? tasksList[key] : tasksList)

  coreWatch.has = async (key) => tasksList[key] !== undefined

  coreWatch.keys = async () => Object.keys(tasksList)

  coreWatch.count = async () => (await coreWatch.keys()).length

  //? Create New Task
  coreWatch.new = async (name, interval, cb, autoStart = true) => {
    let task = v_core_timer_hof({ interval, cb, autoStart })
    tasksList[name] = task
    if (!withoutEvents) {
      coreWatch.emit('new', name)
      task.on('run', async () => coreWatch.emit('run', name))
    }
    return true
  }

  //* and alias for new
  coreWatch.create = async (...arg) => await coreWatch.new(...arg)

  //? This deletes a task from list by ending it first
  coreWatch.delete = async (key) => {
    try {
      await tasksList[key].end()
      delete tasksList[key]
      if (!withoutEvents) {
        coreWatch.emit('delete', key)
      }
      return true
    } catch (e) {
      console.warn(e)
      return false
    }
  }

  //? Ends all tasks
  coreWatch.end = async () => {
    for (let key in tasksList) {
      coreWatch.delete(key)
    }
    if (!withoutEvents) {
      coreWatch.emit('end')
    }
    return true
  }

  //? Stop a Task
  coreWatch.stop = async (key) => {
    try {
      let task = await coreWatch.get(key)
      await task.end()
      if (!withoutEvents) {
        coreWatch.emit('stop', key)
      }
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  //? Start a task from list of tasks.
  coreWatch.start = async (key) => {
    try {
      let task = await coreWatch.get(key)
      await task.start()
      if (!withoutEvents) {
        coreWatch.emit('start', key)
      }
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  //? Manually RUN a task
  coreWatch.run = async (key) => {
    try {
      let task = await coreWatch.get(key)
      await task.run()
      if (!withoutEvents) {
        coreWatch.emit('run', key)
      }
      return true
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  //? Check if a task is active without getting it.
  coreWatch.isActive = async (key) => {
    try {
      let task = await coreWatch.get(key)
      return await task.isActive()
    } catch (err) {
      return false
    }
  }

  //? Active/Running tasks count.
  coreWatch.countActive = async () => {
    let count = 0
    for (const task in tasksList) {
      if (await tasksList[task].isActive()) {
        count++
      }
    }
    return count
  }

  //? Inactive/Disabled tasks count.
  coreWatch.countInactive = async () => (await coreWatch.count()) - (await coreWatch.countActive())

  //? Total tasks stats.
  coreWatch.stats = async () => {
    let tasks = []

    for (const task in tasksList) {
      tasks.push({
        name: task,
        active: await tasksList[task].isActive(),
        interval: await tasksList[task].getInterval()
      })
    }

    return {
      disabledTasksCount: await coreWatch.countInactive(),
      activeTasksCount: await coreWatch.countActive(),
      totalTasksCount: await coreWatch.count(),
      tasks: tasks
    }
  }

  //? Changes Interval for a task.
  coreWatch.changeInterval = async (key, interval) => {
    try {
      let task = await coreWatch.get(key)
      await task.setInterval(interval)
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

