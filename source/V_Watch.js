const EventEmitter = require('events');
const V_Core_Timer = require('./V_Core_Timer');
class V_Watch extends EventEmitter {
  constructor(props = {}) {

    super(props);

    //? The Actual List of tasks
    const tasksList = {};

    this.get = async (key) => (key !== undefined) ? tasksList[key] : tasksList;

    this.has = async (key) => (tasksList[key] !== undefined);

    this.keys = async () => Object.keys(tasksList);

    this.count = async () => (await this.keys()).length;

    //? Create New Task
    this.new = async (name, interval, cb, autoStart = true) => {
      let task = new V_Core_Timer({ interval, cb, autoStart });
      tasksList[name] = task;
      this.emit('new', name);
      task.on('run', async () => this.emit('run', name));
      return true;
    };

    //* and alias for new
    this.create = async (...arg) => await this.new(...arg);

    //? This deletes a task from list by ending it first
    this.delete = async (key) => {
      try {
        await tasksList[key].end();
        delete tasksList[key];
        this.emit('delete', key);
        return true;
      } catch (e) {
        console.warn(e);
        return false;
      }
    };


    //? Ends all tasks
    this.end = async () => {
      for (let key in tasksList) {
        this.delete(key);
      }
      this.emit('end');
      return true;
    };


    //? Stop a Task 
    this.stop = async (key) => {
      try {
        let task = await this.get(key);
        await task.end();
        this.emit('stop', key);
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }

    };


    //? Start a task from list of tasks.
    this.start = async (key) => {
      try {
        let task = await this.get(key);
        await task.start();
        this.emit('start', key);
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    };


    //? Manually RUN a task
    this.run = async (key) => {
      try {
        let task = await this.get(key);
        await task.run();
        this.emit('run', key);
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    };


    //? Check if a task is active without getting it.
    this.isActive = async (key) => {
      try {
        let task = await this.get(key);
        return await task.isActive();
      } catch (err) {
        return false;
      }
    };


    //? Active/Running tasks count.
    this.countActive = async () => {
      let count = 0;
      for (const task in tasksList) {
        if (await tasksList[task].isActive()) {
          count++;
        }
      }
      return count;
    };


    //? Inactive/Disabled tasks count.
    this.countInactive = async () => (await this.count() - await this.countActive());


    //? Total tasks stats.
    this.stats = async () => {
      let tasks = [];

      for (const task in tasksList) { 
        tasks.push({
          name: task,
          active: await tasksList[task].isActive(),
          interval: await tasksList[task].getInterval(),
        });
      }

      return {
        disabledTasksCount: await this.countInactive(),
        activeTasksCount: await this.countActive(),
        totalTasksCount: await this.count(),
        tasks: tasks,
      };
    };


    //? Changes Interval for a task.
    this.changeInterval = async (key, interval) => {
      try {
        let task = await this.get(key);
        await task.setInterval(interval);
        this.emit('intervalChange', {key, interval});
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    };

  }
}


module.exports = V_Watch;
module.exports.default = V_Watch;