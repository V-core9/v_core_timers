# v_core_timers

v_core_timers

## 📑 How to use

    const { V_Watch } = require('v_core_timers');

### Create a new timers controller

    const v_watch = new V_Watch();

### Add a new timer

    v_watch.new('my_timer', 1000, () => console.log('timer is running'));

### Start a timer

    v_watch.start('my_timer');

### Stop a timer

    v_watch.stop('my_timer');

### Delete a timer

    v_watch.delete('my_timer');

### End all timers

    v_watch.end();

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
