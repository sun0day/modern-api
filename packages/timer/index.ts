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
 * @typedef {Object} Timer
 * @property {boolean} isActive - whether `setTimeout` is timing
 * @property {() => void} pause - `setTimeout` stop timing temporarily
 * @property {() => void} resume - `setTimeout` continue timing
 * @property {() => void} stop - `setTimeout` stop timing permanently
 *
 * @param {() => any} callback - `setTimeout` callback
 * @param {number} delay - `setTimeout` delay, ms
 * @returns {Timer}
 */
export const pauseTimeout = (callback: () => any, delay: number) => {
  let timeId: number | undefined
  let isStop = false
  let now = +new Date()
  let remainTime = delay
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
        // @ts-expect-error ok not match NodeJS.Timeout
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

  // @ts-expect-error ok not match NodeJS.Timeout
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
 * @typedef {Object} Timer
 * @property {boolean} isActive - whether `setInterval` is polling
 * @property {() => void} pause - `setInterval` stop polling temporarily
 * @property {() => void} resume - `setInterval` continue polling
 * @property {() => void} stop - `setInterval` stop polling permanently
 *
 * @param {() => any} callback - `setInterval` callback
 * @param {number} delay - `setInterval` delay, ms
 * @returns {Timer}
 */
export const pauseInterval = (callback: () => any, delay: number) => {
  let timeId: number | undefined
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
    // @ts-expect-error ok not match NodeJS.Timeout
    timeId = setTimeout(() => {
      callback()
      timer.isActive && safeInterval()
    }, delay)
  }

  safeInterval()

  return timer
}
