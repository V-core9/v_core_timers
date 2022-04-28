const confirmInput = async (value) => (!isNaN(value) && value > 0);

const vTime = {
  seconds: async (val = 1) => (await confirmInput(val)) ? val * 1000 : undefined,
  minutes: async (val = 1) => vTime.seconds(val * 60),
  hours: async (val = 1) => vTime.minutes(val * 60),
  days: async (val = 1) => vTime.hours(val * 24),
  weeks: async (val = 1) => vTime.days(val * 7),
  months: async (val = 1) => vTime.days(val * 30),
  years: async (val = 1) => vTime.days(val * 365),
};

module.exports = vTime;
