const debounce = (fn, ms = 0) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

const isEmpty = val => val == null || !(Object.keys(val) || val).length

export { debounce, isEmpty }
