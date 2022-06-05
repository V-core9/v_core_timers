# v_core_timers

Simple to use Timers with Events for node and web.

## 📑 How to use

    const { V_Watch } = require('v_core_timers');

### Create a new timers controller

    const v_watch = new V_Watch();

### Add a new timer

Create a task/timer by giving it name, interval and a callback function.

    // Simple Task
    v_watch.new('my_timer', 1000, () => console.log('timer is running'));

    // or
    v_watch.create('my_timer', 1000, () => console.log('timer is running'));

#### Create a disabled/inactive tasks (default is active/enabled)

    v_watch.create('my_timer', 1000, () => console.log('timer is running'), false);

> 🔻 This only adds the timer to the list of timers, it does not start it.

### Start a timer

    v_watch.start('my_timer');

### Has a timer

Check if the timer exists.

    v_watch.has('my_timer');

> 🔻 This will return true even if the timer is not running.

### Is Active Check

Just a passthrough to get the status of it from the timer object.

    v_watch.isActive('my_timer');

### Stop a timer

Stop a task/timer by name. This will not remove it from tasks list.

    v_watch.stop('my_timer');

### Delete a timer

Delete a timer. Stops it if it is running.

    v_watch.delete('my_timer');

### End all timers

This will stop all tasks[timers] and clear the task list.

    v_watch.end();

### Stats

Get some useful information about the timers.

    v_watch.stats();

#### EXAMPLE OUTPUT

    {
      disabledTasksCount: 1,
      activeTasksCount: 1,
      totalTasksCount: 2,
      tasks: [
        { name: 'TestTask', active: false, interval: 1 },
        { name: 'SecondaryTask', active: true, interval: 10 }
      ]
    }

## 🎪 Events

### New / Created a timer

    v_watch.on('new', async (key) => console.log('New timer: '+ key));

### Delete / Removed a timer

    v_watch.on('delete', async (key) => console.log('deleted timer: '+ key));

### End / Stopped all timers

    v_watch.on('end', async () => console.log('Ended All Timers'));

### Timer Started

    v_watch.on('start', async (key) => console.log('Started Timer: '+ key));

### Timer Stopped

    v_watch.on('stop', async (key) => console.log('Ended Timer: '+ key));

### Run / Executed

    v_watch.on('run', async (key) => console.log('Run Timer: ' + key));

### Interval Change

    v_watch.on('intervalChange', async (data) => console.log(data.key + ' interval changed to ' + data.interval));

#

## 🥒 Inner Timer Object Manual Usage

### Get it

    const { V_Core_Timer } = require('v_core_timers');

### Create a new basic interval timer object

    const v_timer = new V_Core_Timer({ cb: () => console.log('timer is running'), interval: 1000, autoStart: true });

### Begin if not active

    v_timer.begin();

> *Alias:* .**start()**

### End if active

    v_timer.end();

> *Alias:* .**stop()**

### Set different Interval for a timer

    v_timer.setInterval(2000);

> *Alias:* .**changeInterval()**

### Get Status of a timer

    v_timer.status();

> *Alias:* .**isActive()**

### Run a callback manually

    v_timer.run();

> *Alias:* .**execute()**

## 🎪 Events

### Begin / Start

    v_timer.on('begin', async () => console.log('started'));

### End / Stop

    v_timer.on('end', async () => console.log('started'));

### Run / Executed

    v_timer.on('run', async () => console.log('started'));

## 📏 Helper **vTime**

Get milliseconds from...

    const { vTime } = require('v_core_timers');

### Seconds

    vTime.seconds(value); //> (value * 1000);

### Minutes

    vTime.minutes(value); //> vTime.seconds(value * 60);

### Hours

    vTime.hours(value); //> vTime.minutes(value * 60);

### Days

    vTime.days(value); //> vTime.hours(value * 24);

### Weeks

    vTime.weeks(value); //> vTime.days(value * 7); 

### Months

    vTime.months(value); //> vTime.days(value * 30); 

### Years

    vTime.years(value); //> vTime.days(value * 365); 

> NOTE: *value* is 1 by default.

### SAMPLE vTime Usage

Just a basic logging to console.

    const { vTime } = require('v_core_timers');
    (async () => {
      console.log(await vTime.seconds(2)); //> 2000
      console.log(await vTime.minutes(2)); //> 12000
      console.log(await vTime.hours(2)); //> 7200000
      console.log(await vTime.days(2)); //> 172800000 
      console.log(await vTime.weeks(2)); //> 1209600000
      console.log(await vTime.months(2)); //> 2592000000
      console.log(await vTime.years(2)); //> 63072000000
    })();
