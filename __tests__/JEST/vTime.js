const { v_time } = require('../..')

test('Base Test Scenario', () => {
  expect(v_time.seconds()).toBe(1000)
  expect(v_time.seconds(5)).toBe(5000)
  expect(v_time.seconds('five')).toBe(undefined)

  expect(v_time.minutes()).toBe(60000)
  expect(v_time.minutes(5)).toBe(300000)
  expect(v_time.minutes('five')).toBe(undefined)

  expect(v_time.hours()).toBe(3600000)
  expect(v_time.hours(5)).toBe(18000000)
  expect(v_time.hours('five')).toBe(undefined)

  expect(v_time.days()).toBe(86400000)
  expect(v_time.days(5)).toBe(432000000)
  expect(v_time.days('five')).toBe(undefined)

  expect(v_time.months()).toBe(2592000000)
  expect(v_time.months(5)).toBe(12960000000)
  expect(v_time.months('five')).toBe(undefined)

  expect(v_time.years()).toBe(31536000000)
  expect(v_time.years(5)).toBe(157680000000)
  expect(v_time.years('five')).toBe(undefined)
})
