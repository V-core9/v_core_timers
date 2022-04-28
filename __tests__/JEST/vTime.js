const { vTime } = require('../..');

test("Base Test Scenario", async () => {
  expect(await vTime.seconds()).toBe(1000);
  expect(await vTime.seconds(5)).toBe(5000);
  expect(await vTime.seconds('five')).toBe(undefined);

  expect(await vTime.minutes()).toBe(60000);
  expect(await vTime.minutes(5)).toBe(300000);
  expect(await vTime.minutes('five')).toBe(undefined);

  expect(await vTime.hours()).toBe(3600000);
  expect(await vTime.hours(5)).toBe(18000000);
  expect(await vTime.hours('five')).toBe(undefined);

  expect(await vTime.days()).toBe(86400000);
  expect(await vTime.days(5)).toBe(432000000);
  expect(await vTime.days('five')).toBe(undefined);

  expect(await vTime.months()).toBe(2592000000);
  expect(await vTime.months(5)).toBe(12960000000);
  expect(await vTime.months('five')).toBe(undefined);

  expect(await vTime.years()).toBe(31536000000);
  expect(await vTime.years(5)).toBe(157680000000);
  expect(await vTime.years('five')).toBe(undefined);
});
