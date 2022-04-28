const { V_Core_Timer } = require('../../..');
const delayedAction = require('../../helpers/delayedAction');


test("basic counter test", async () => {

  let counter = 0;
  let beginCount = 0;
  let runCount = 0;
  let endCount = 0;

  const basic_timer = new V_Core_Timer({ cb: () => counter++, interval: 100, autoStart: false });

  basic_timer.on('begin', async () => beginCount++);
  basic_timer.on('run', async () => runCount++);
  basic_timer.on('end', async () => endCount++);

  expect(await basic_timer.begin()).toBe(true);

  expect(await basic_timer.getInterval()).toBe(100);

  expect(counter).toBe(0);

  expect(await basic_timer.status()).toBe(true);
  expect(await basic_timer.isActive()).toBe(true);

  expect(await delayedAction(50, async () => counter)).toBe(0);

  expect(await basic_timer.run()).toBe(true);
  expect(await basic_timer.execute()).toBe(true);
  expect(counter).toBe(2);
  expect(runCount).toBe(2);

  const rez = await delayedAction(2000, async () => counter);
  expect(rez).toBeLessThanOrEqual(22);
  expect(rez).toBeGreaterThanOrEqual(18);

  expect(await basic_timer.setInterval(50)).toBe(true);
  expect(await basic_timer.getInterval()).toBe(50);

  expect(await basic_timer.end()).toBe(true);
  expect(await basic_timer.status()).toBe(false);
  expect(await basic_timer.isActive()).toBe(false);
  expect(await basic_timer.end()).toBe(false);


  expect(await basic_timer.changeInterval(200)).toBe(true);
  expect(await basic_timer.getInterval()).toBe(200);
  expect(await basic_timer.begin()).toBe(true);
  expect(await basic_timer.start()).toBe(false);
  expect(await basic_timer.stop()).toBe(true);

  expect(await basic_timer.changeInterval()).toBe(false);
});