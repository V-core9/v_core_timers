const { utils } = require('../../..')

const { isAsyncFunction } = utils

// Test cases
async function asyncFunction() {
  return 1
}

function syncFunction() {
  return 1
}

const arrowAsyncFunction = async () => {
  return 1
}

const arrowSyncFunction = () => {
  return 1
}

const objectTest = {
  syncFunction,
  asyncFunction,

  arrowSyncFunction,
  arrowAsyncFunction
}

test('isAsyncFunction :: asyncFunction', () => {
  console.log('asyncFunction.constructor.name', asyncFunction.constructor.name, asyncFunction.toString())
  expect(isAsyncFunction(asyncFunction)).toBe(true)
})

test('isAsyncFunction :: arrowAsyncFunction', () => {
  console.log('arrowAsyncFunction.constructor.name', arrowAsyncFunction.constructor.name, arrowAsyncFunction.toString())
  expect(isAsyncFunction(arrowAsyncFunction)).toBe(true)
})

test('isAsyncFunction :: syncFunction', () => {
  console.log('syncFunction.constructor.name', syncFunction.constructor.name, syncFunction.toString())
  expect(isAsyncFunction(syncFunction)).toBe(false)
})

test('isAsyncFunction :: arrowSyncFunction', () => {
  console.log('arrowSyncFunction.constructor.name', arrowSyncFunction.constructor.name, arrowSyncFunction.toString())
  expect(isAsyncFunction(arrowSyncFunction)).toBe(false)
})

test('isAsyncFunction :: object.[properties]', () => {
  expect(isAsyncFunction(objectTest.asyncFunction)).toBe(true)
  expect(isAsyncFunction(objectTest.arrowAsyncFunction)).toBe(true)
  expect(isAsyncFunction(objectTest.syncFunction)).toBe(false)
  expect(isAsyncFunction(objectTest.arrowSyncFunction)).toBe(false)
})
