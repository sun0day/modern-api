# modern-api.timer

<img src="https://img.shields.io/npm/v/modern-api.timer"> <img src="https://img.shields.io/npm/dw/modern-api.timer" > <img src="https://img.shields.io/bundlephobia/minzip/modern-api.timer?label=minzip">

Timer APIs based on `Promise`, `setTimeout`, `setInterval`

## Install

```shell
$ npm i modern-api.timer
```

## Usage

### sleep for n ms

```typescript
import { sleep } from 'modern-api.timer'

(async() => {
  const now = +new Date()
  await sleep(1000)
  console.log(+new Date() - now) // 1000
})()
```

### timeout over n ms
```typescript
import { sleep, timeout } from 'modern-api.timer'

(async() => {
  await timeout(sleep(1000), 2000) // no error
  await timeout(sleep(1000), 500) // reject error: 'timeout over 500ms'
})()
```

### pasue and resume `setTimeout`
```typescript
import { pauseTimeout } from 'modern-api.timer'

(async () => {
  const timer = pauseTimeout(() => console.log('done'), 1000) // timer.isActive = true

  await sleep(500)
  timer.pause() // pause timing, timer.isActive = false

  await sleep(500) // log nothing

  timer.resume() // resume timing, timer.isActive = true

  await sleep(500) // log 'done'
})()
```

### stop `setTimeout` whenever you don't want to continue
```typescript
import { pauseTimeout } from 'modern-api.timer'

(async () => {
  const timer = pauseTimeout(() => console.log('done'), 1000) // timer.isActive = true

  await sleep(500)
  timer.stop() // stop timing, timer.isActive = false

  await sleep(500) // log nothing

  timer.resume() // resume not work after stopping, timer.isActive = false

  await sleep(500) // log nothing
})()
```

### pasue and resume `setInterval`
```typescript
import { pauseInterval } from 'modern-api.timer'

(async () => {
  const timer = pauseInterval(() => console.log('tick'), 1000) // timer.isActive = true

  await sleep(500)
  timer.pause() // pause polling, timer.isActive = false

  await sleep(500) // log nothing

  timer.resume() // resume polling, timer.isActive = true

  await sleep(1000) // log 'tick', timer.isActive = true
  await sleep(1000) // log 'tick', timer.isActive = true
})()
```

### stop `setInterval` whenever you don't want to continue
```typescript
import { pauseInterval } from 'modern-api.timer'

(async () => {
  const timer = pauseInterval(() => console.log('tick'), 1000) // timer.isActive = true

  await sleep(500)
  timer.stop() // stop polling, timer.isActive = false

  await sleep(500) //  log nothing

  timer.resume() // resume not work after stopping, timer.isActive = false

  await sleep(1000) // log nothing
  await sleep(1000) // log nothing
})()
```

## API

```typescript
/**
 * sleep for n ms
 *
 * @param {number} delay - sleep delay, ms
 * @returns {Promise<void>}
 */
declare const sleep: (delay: number) => Promise<unknown>;
/**
 * reject if Promise timeout, otherwise return Promise result
 *
 * @template {T} = Promise return value type
 * @param {PromiseLike<T>} value - Promise instance
 * @param {number} delay - timeout limit
 * @param {Error} error - timeout error, default new Error(`timeout over ${delay}ms`)
 * @returns {Promise<T>}
 */
declare const timeout: <T>(value: PromiseLike<T>, delay: number, error?: Error) => Promise<unknown>;
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
declare const pauseTimeout: (callback: () => any, delay: number) => {
    isActive: boolean;
    pause: () => void;
    resume: () => void;
    stop: () => void;
};
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
declare const pauseInterval: (callback: () => any, delay: number) => {
    isActive: boolean;
    pause: () => void;
    resume: () => void;
    stop: () => void;
};
```