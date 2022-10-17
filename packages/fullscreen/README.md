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

```typescript
/**
 * whether fullscreen APIs is enabled
 *
 * @returns {boolean}
 */
declare const fullscreenEnabled: () => boolean;
/**
 * get current fullscreen element
 *
 * @returns {Element | null}
 */
declare const fullscreenElement: () => Element | null;
/**
 * trigger fullscreen
 *
 * @param {Element} el - el to set fullscreen
 * @returns {Promise<void>}
 */
declare const requestFullscreen: (el: Element) => Promise<unknown>;
/**
 * exist fullscreen
 *
 * @returns {Promise<void>}
 */
declare const exitFullscreen: () => Promise<unknown>;
/**
 * listen fullscreen 'change' and 'error' event
 *
 * @param {{onScreen: (e: Event) => void, onExit: (e: Event) => void, onError: (e: Event) => void}} callbacks - callback map
 *  onScreen - trigger when enter fullscreen mode \
 *  onExit - trigger when quit fullscreen mode
 *  onError - trigger when fullscreen action fails
 * @returns {void}
 */
declare const onFullscreen: ({ onScreen, onExit, onError, }: {
    onScreen?: (e: Event) => void;
    onExit?: (e: Event) => void;
    onError?: (e: any) => void;
}) => void;
```