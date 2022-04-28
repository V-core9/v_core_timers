const EventEmitter = require('events');


module.exports = class V_Core_Timer extends EventEmitter {

  constructor(props = {}) {

    super(props);

    if (typeof props.cb !== 'function') {
      throw new Error("Core Timer is Missing a Callback Function");
    }

    let loop = null;

    let autoStart = (typeof props.autoStart === 'boolean') ? props.autoStart : true;

    let interval = (!isNaN(props.interval) && props.interval > 0) ? props.interval : 100;
    let cb = props.cb;

    //* Begin/Start It
    this.begin = async () => {
      let result = false;
      if (loop === null) {
        loop = setInterval(async () => {
          this.run();
        }, interval);
        result = true;
      }
      this.emit('start', result);
      return result;
    };


    //* End/Stop it
    this.end = async () => {
      if (loop === null) return false;
      clearInterval(loop);
      loop = null;
      let result = (loop === null);
      this.emit('end', result);
      return result;
    };


    //* Is Running Status Check
    this.status = async () => (loop !== null);


    //* Change Interval
    this.setInterval = async (val = null) => {
      if (isNaN(val) || val <= 0 || val === null) return false;

      interval = val;

      if (await this.status()) {
        this.end();
        this.begin();
      }

      return true;
    };


    //? HELPERS:
    //* Getting Interval
    this.getInterval = async () => interval;

    this.run = async () => {
      try {
        cb();
        this.emit('run');
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };


    //? ALIASES:
    //* this.end()
    this.stop = async () => await this.end();
    //* this.begin()
    this.start = async () => await this.begin();
    //* this.status()
    this.isActive = async () => await this.status();
    //* this.setInterval()
    this.changeInterval = async (val) => await this.setInterval(val);
    //* this.run()
    this.execute = async () => await this.run();

    //! AutoStart if not disabled
    if (autoStart) this.start();

  }

};
