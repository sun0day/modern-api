/**
 * sleep for n ms
 *
 * @param {number} delay - sleep delay, ms
 * @returns {Promise<void>}
 */
export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

/**
 * reject if Promise timeout, otherwise return Promise result
 *
 * @template {T} = Promise return value type
 * @param {PromiseLike<T>} value - Promise instance
 * @param {number} delay - timeout limit
 * @param {Error} error - timeout error, default new Error(`timeout over ${delay}ms`)
 * @returns {Promise<T>}
 */
export const timeout = <T>(value: PromiseLike<T>, delay: number, error?: Error) => {
  return Promise.race([value, new Promise((resolve, reject) => {
    setTimeout(() => reject(error || new Error(`timeout over ${delay}ms`)), delay)
  })])
}

/**
 * pausable `setTimeout`
 *
 * @param {() => any} callback - `setTimeout` callback
 * @param {number} delay - `setTimeout` delay, ms
 * @returns {{ isActive: boolean, pause: () => void, resume: () => void, stop: () => void }}
 *  isActive - whether `setTimeout` is timing \
 *  pause - `setTimeout` stop timing temporarily \
 *  resume - `setTimeout` continue timing \
 *  stop - `setTimeout` stop timing permanently \
 */
export const pauseTimeout = (callback: () => any, delay: number) => {
  let timeId = null; let isStop = false; let now = +new Date(); let remainTime = delay
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
  }, delay)

  return timer
}

/**
 * pausable and safer `setInterval` \
 * - more flexible \
 * - make sure callback invoke execute in order \
 * - make sure no callback invoke missed \
 * - make sure callback invoke frequency as stable as possible
 *
 * @param {() => any} callback - `setInterval` callback
 * @param {number} delay - `setInterval` delay, ms
 * @returns {{ isActive: boolean, pause: () => void, resume: () => void, stop: () => void }}
 *  isActive - whether `setInterval` is polling \
 *  pause - `setInterval` stop polling temporarily \
 *  resume - `setInterval` continue polling \
 *  stop - `setInterval` stop polling permanently \
 */
export const pauseInterval = (callback: () => any, delay: number) => {
  let timeId = null
  let isStop = false

  const timer = {
    isActive: true,
    pause: () => {
      timer.isActive = false
      clearTimeout(timeId)
    },
    resume: () => {
      if (!isStop) {
        timer.isActive = true
        safeInterval()
      }
    },
    stop: () => {
      timer.isActive = false
      isStop = true
      clearTimeout(timeId)
    },
  }

  function safeInterval() {
    timeId = setTimeout(() => {
      callback()
      timer.isActive && safeInterval()
    }, delay)
  }

  safeInterval()

  return timer
}
