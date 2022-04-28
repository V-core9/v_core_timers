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

