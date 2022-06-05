const delayedAction = require('../helpers/delayedAction');

const { V_Watch } = require('../..');
const watch = new V_Watch();

watch.on('new', (task) => console.log("Created New Task: ", task));
watch.on('stop', (task) => console.log("Stopped Task: ", task));
watch.on('end', () => console.log("Here my Watch has Ended."));

let runCounter = 0;
watch.on('run', (key) => runCounter++);


test("base test run", async () => {

  let counters = {
    test1: 0,
    test2: 0,
    test3: 0,
    intChange: 0,
  };

  watch.on('intervalChange', () => counters.intChange++);

  await watch.new('TestTask', 1, () => counters.test1++, false);
  await watch.create('SecondaryTask', 10, () => counters.test2++);


  expect(await watch.isActive('TestTask')).toBe(false);
  expect(await watch.isActive('SecondaryTask')).toBe(true);

  let testTask = await watch.get('TestTask');

  await testTask.on("start", async () => console.log("testTask STARTED"));
  await testTask.on("run", async () => counters.test3++);
  await testTask.on("run", async () => counters.test3++);
  await testTask.on("end", async () => console.log("testTask ENDED"));

  //console.log(testTask);

  let statsCheck01 = await watch.stats();
  console.log(statsCheck01);

  expect(statsCheck01.activeTasksCount).toBe(1);
  expect(statsCheck01.disabledTasksCount).toBe(1);
  expect(statsCheck01.totalTasksCount).toBe(2);

  await testTask.start();
  

  expect(Object.keys(await watch.get()).length).toBe(2);

  expect(await delayedAction(500, async () => await watch.get("yeaMissing"))).toBe(undefined);

  expect(await delayedAction(500, async () => await watch.end())).toBe(true);

  expect(Object.keys(await watch.get()).length).toBe(0);

  

  expect(counters.test1 * 2).toBe(counters.test3);
  expect(counters.test1).toBeGreaterThan(50);

  console.log(counters);

  console.log(runCounter);
  expect(runCounter).toBe(counters.test1 + counters.test2);


  counters.test1 = 0;
  await watch.new('TestTask', 1, () => counters.test1++, false);
  await watch.run('TestTask');
  expect(counters.test1).toBe(1);

  expect(await watch.changeInterval('TestTask', 500)).toBe(true);
  expect(counters.intChange).toBe(1);

});
