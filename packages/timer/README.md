# wodash.timer

<img src="https://img.shields.io/npm/v/wodash.timer"> <img src="https://img.shields.io/npm/dw/wodash.timer" > <img src="https://img.shields.io/bundlephobia/minzip/wodash.timer?label=minzip">

Timer APIs based on `Promise`, `setTimeout`, `setInterval`

## Install

```shell
$ npm i wodash.timer
```

## Usage

### sleep for n ms

```typescript
import { sleep } from 'wodash.timer'

(async() => {
  const now = +new Date()
  await sleep(1000)
  console.log(+new Date() - now) // 1000
})()
```

### timeout over n ms
```typescript
import { sleep, timeout } from 'wodash.timer'

(async() => {
  await timeout(sleep(1000), 2000) // no error
  await timeout(sleep(1000), 500) // reject error: 'timeout over 500ms'
})()
```

### pasue and resume `setTimeout`
```typescript
import { pauseTimeout } from 'wodash.timer'

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
import { pauseTimeout } from 'wodash.timer'

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
import { pauseInterval } from 'wodash.timer'

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
import { pauseInterval } from 'wodash.timer'

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

## Example

## API

