const { hof_v_core_timer } = require('../../..')

test('Broken Timer #1', async () => {
  let err = null
  try {
    const bad_timer = hof_v_core_timer()
  } catch (e) {
    err = e
  }

  expect(err.message).toBe('Core Timer is Missing a Callback Function')
})

test('Broken Timer #2', async () => {
  let err = null
  try {
    const bad_timer = hof_v_core_timer({})
  } catch (e) {
    err = e
  }

  expect(err.message).toBe('Core Timer is Missing a Callback Function')
})

test('Broken Timer #3', async () => {
  let err = null
  try {
    const bad_timer = hof_v_core_timer({ interval: 'xx', cb: 11 })
  } catch (e) {
    err = e
  }

  expect(err.message).toBe('Core Timer is Missing a Callback Function')
})
