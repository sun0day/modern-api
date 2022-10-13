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

## Example

## API

