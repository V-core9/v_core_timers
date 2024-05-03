export default function isAsyncFunction(fn) {
  // Check if the function is declared with async keyword
  if (fn.constructor.name === 'AsyncFunction' || fn.constructor.name.trim().startsWith('async')) {
    return true
  }

  // Check if the function returns a promise
  if (fn instanceof Promise) {
    return false
  }

  return false
}

