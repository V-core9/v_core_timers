const { hof_v_core_timer } = require('../../..')
const delayedAction = require('../../helpers/delayedAction')

test('Fixed counter test', async () => {
  let counter = 0
  let beginCount = 0
  let runCount = 0
  let endCount = 0

  const fixedTimer = hof_v_core_timer({
    cb: async () => {
      const endTime = Date.now() + 1000
      let loopVal = 0
      while (Date.now() < endTime) {
        loopVal += endTime
      }

      console.log('multiple calls fix', counter)
      counter += 1

      return
    },
    interval: 100,
    autoStart: false,
    parallelCalls: true
  })

  fixedTimer.on('begin', async () => beginCount++)
  fixedTimer.on('run', async () => runCount++)
  fixedTimer.on('end', async () => endCount++)

  expect(await fixedTimer.begin()).toBe(true)

  expect(await fixedTimer.getInterval()).toBe(100)

  expect(counter).toBe(0)

  expect(await fixedTimer.status()).toBe(true)
  expect(await fixedTimer.isActive()).toBe(true)

  expect(await delayedAction(50, async () => counter)).toBe(0)

  expect(await fixedTimer.run()).toBe(true)
  expect(await fixedTimer.execute()).toBe(true)
  expect(counter).toBe(2)
  expect(runCount).toBe(2)

  const rez = await delayedAction(2000, async () => counter)
  expect(rez).toBeLessThanOrEqual(22)
  expect(rez).toBeGreaterThanOrEqual(18)

  expect(await fixedTimer.setInterval(50)).toBe(true)
  expect(await fixedTimer.getInterval()).toBe(50)

  expect(await fixedTimer.end()).toBe(true)
  expect(await fixedTimer.status()).toBe(false)
  expect(await fixedTimer.isActive()).toBe(false)
  expect(await fixedTimer.end()).toBe(false)

  expect(await fixedTimer.changeInterval(200)).toBe(true)
  expect(await fixedTimer.getInterval()).toBe(200)
  expect(await fixedTimer.begin()).toBe(true)
  expect(await fixedTimer.start()).toBe(false)
  expect(await fixedTimer.stop()).toBe(true)

  expect(await fixedTimer.changeInterval()).toBe(false)
})
