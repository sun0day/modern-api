# modern-api.fullscreen

<img src="https://img.shields.io/npm/v/modern-api.fullscreen"> <img src="https://img.shields.io/npm/dw/modern-api.fullscreen" > <img src="https://img.shields.io/bundlephobia/minzip/modern-api.fullscreen?label=minzip">

More compatibility fullscreen APIs based on [Web Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).

## Install

```shell
$ npm i modern-api.fullscreen
```

## Usage

### request or exit fullscreen

```typescript
import { fullscreenSupported, requestFullscreen, exitFullscreen } from 'modern-api.fullscreen'

if(fullscreenSupported) {
  requestFullscreen(document.documentElement)

  exitFullscreen()
}
```

### watch fullscreen 'change' or 'error' event

```typescript
import { fullscreenSupported, onFullscreen } from 'modern-api.fullscreen'

if(fullscreenSupported) {
  onFullscreen({
    onScreen: e => console.log('enter fullscreen mode'),
    onExit: e => console.log('exit fullscreen mode') ,
    onError: e => console.log('fullscreen error'),
  })
}
```

## API

```typescript
/**
 * whether fullscreen APIs is enabled
 */
declare const fullscreenSupported: boolean;
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
 * @param {Object} callbacks - callback map
 * @param {(e: Event) => void} callbacks.onScreen - trigger when enter fullscreen mode \
 * @param {(e: Event) => void} callbacks.onExit - trigger when quit fullscreen mode
 * @param {(e: Event) => void} callbacks.onError - trigger when fullscreen action fails
 * @returns {void}
 */
declare const onFullscreen: ({ onScreen, onExit, onError, }: {
    onScreen?: ((e: Event) => void) | undefined;
    onExit?: ((e: Event) => void) | undefined;
    onError?: ((e: Event) => void) | undefined;
}) => void;
```