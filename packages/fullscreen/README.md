# wodash.fullscreen

<img src="https://img.shields.io/npm/v/wodash.fullscreen"> <img src="https://img.shields.io/npm/dw/wodash.fullscreen" > <img src="https://img.shields.io/bundlephobia/minzip/wodash.fullscreen?label=minzip">

More compatibility fullscreen APIs based on [Web Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).

## Install

```shell
$ npm i wodash.fullscreen
```

## Usage

### judge whether fullscreen APIs is supported

```typescript
import { fullscreenEnabled } from 'wodash.fullscreen'

fullscreenEnabled() // true or false
```

### request or exit fullscreen

```typescript
import { fullscreenEnabled } from 'wodash.fullscreen'

requestFullscreen(document.documentElement)

exitFullscreen()
```

### watch fullscreen 'change' or 'error' event

```typescript
import { onFullscreen } from 'wodash.fullscreen'

onFullscreen({
  onScreen: e => console.log('enter fullscreen mode'),
  onExit: e => console.log('exit fullscreen mode') ,
  onError: e => console.log('fullscreen error'),
})
```


## API

