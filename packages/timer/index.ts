/**
 * sleep for n ms
 *
 * @param {number} time - sleep time, ms
 * @returns {Promise<void>}
 */
export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/**
 * reject if Promise timeout, otherwise return Promise result
 *
 * @template {T} = Promise return value type
 * @param {PromiseLike<T>} value - Promise instance
 * @param {number} time - timeout limit
 * @param {Error} error - timeout error, default new Error(`timeout over ${time}ms`)
 * @returns {Promise<T>}
 */
export const timeout = <T>(value: PromiseLike<T>, time: number, error?: Error) => {
  return Promise.race([value, new Promise((resolve, reject) => {
    setTimeout(() => reject(error || new Error(`timeout over ${time}ms`)), time)
  })])
}
