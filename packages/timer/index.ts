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

/**
 * pausable `setTimeout`
 *
 * @param {() => any} callback - `setTimeout` callback
 * @param {number} time - `setTimeout` time, ms
 * @returns {{ isActive: boolean, pause: () => void, resume: () => void, stop: () => void }}
 *  isActive - whether `setTimeout` is timing
 *  pause - `setTimeout` stop timing temporarily
 *  resume - `setTimeout` continue timing
 *  stop - `setTimeout` stop timing permanently
 */
export const pauseTimeout = (callback: () => any, time: number) => {
  let timeId = null; let isStop = false; let now = +new Date(); let remainTime = time
  const getRemainTime = () => now + remainTime - +new Date()
  const timer = {
    isActive: true,
    pause: () => {
      timer.isActive = false
      clearTimeout(timeId)
      remainTime = getRemainTime()
    },
    resume: () => {
      if (!isStop && remainTime > -1) {
        now = +new Date()
        timer.isActive = true
        timeId = setTimeout(() => {
          timer.isActive = false
          callback()
        }, remainTime)
      }
    },
    stop: () => {
      timer.isActive = false
      isStop = true
      clearTimeout(timeId)
    },
  }

  timeId = setTimeout(() => {
    timer.isActive = false
    callback()
  }, time)

  return timer
}
