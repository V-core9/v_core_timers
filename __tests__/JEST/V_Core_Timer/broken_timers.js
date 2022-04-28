const { V_Core_Timer } = require('../../..');



test("Broken Timer #1", async () => {
  let err = null;
  try {
    const bad_timer = new V_Core_Timer();
  } catch (e) {
    err = e;
  }

  expect(err.message).toBe("Core Timer is Missing a Callback Function");
});




test("Broken Timer #2", async () => {
  let err = null;
  try {
    const bad_timer = new V_Core_Timer({});
  } catch (e) {
    err = e;
  }

  expect(err.message).toBe("Core Timer is Missing a Callback Function");
});




test("Broken Timer #3", async () => {
  let err = null;
  try {
    const bad_timer = new V_Core_Timer({ interval: 'xx', cb: 11 });
  } catch (e) {
    err = e;
  }

  expect(err.message).toBe("Core Timer is Missing a Callback Function");
});