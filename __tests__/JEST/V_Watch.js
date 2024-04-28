const delayedAction = require('../helpers/delayedAction')

const { hof_v_watch } = require('../..')
const watch = hof_v_watch()

watch.on('new', (timer) => console.log('Created New Timer: ', timer))
watch.on('stop', (timer) => console.log('Stopped Timer: ', timer))
watch.on('end', () => console.log('Here my Watch has Ended.'))

let runCounter = 0
watch.on('run', (key) => runCounter++)

test('base test run', async () => {
  let counters = {
    test1: 0,
    test2: 0,
    test3: 0,
    intChange: 0
  }

  watch.on('intervalChange', () => counters.intChange++)

  await watch.new('TestTimer', 1, () => counters.test1++, false)
  await watch.create('SecondaryTimer', 10, () => counters.test2++)

  expect(await watch.isActive('TestTimer')).toBe(false)
  expect(await watch.isActive('SecondaryTimer')).toBe(true)

  let testTimer = await watch.get('TestTimer')

  await testTimer.on('start', async () => console.log('testTimer STARTED'))
  await testTimer.on('run', async () => counters.test3++)
  await testTimer.on('run', async () => counters.test3++)
  await testTimer.on('end', async () => console.log('testTimer ENDED'))

  //console.log(testTimer);

  let statsCheck01 = await watch.stats()
  console.log(statsCheck01)

  expect(statsCheck01.activeTimersCount).toBe(1)
  expect(statsCheck01.disabledTimersCount).toBe(1)
  expect(statsCheck01.totalTimersCount).toBe(2)

  await testTimer.start()

  expect(Object.keys(await watch.get()).length).toBe(2)

  expect(await delayedAction(500, async () => await watch.get('yeaMissing'))).toBe(undefined)

  expect(await delayedAction(500, async () => await watch.end())).toBe(true)

  expect(Object.keys(await watch.get()).length).toBe(0)

  expect(counters.test1 * 2).toBe(counters.test3)
  expect(counters.test1).toBeGreaterThan(50)

  console.log(counters)

  console.log(runCounter)
  expect(runCounter).toBe(counters.test1 + counters.test2)

  counters.test1 = 0
  await watch.new('TestTimer', 1, () => counters.test1++, false)
  await watch.run('TestTimer')
  expect(counters.test1).toBe(1)

  expect(await watch.changeInterval('TestTimer', 500)).toBe(true)
  expect(counters.intChange).toBe(1)
})
