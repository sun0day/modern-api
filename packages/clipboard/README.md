# modern-api.clipboard

<img src="https://img.shields.io/npm/v/modern-api.clipboard"> <img src="https://img.shields.io/npm/dw/modern-api.clipboard" > <img src="https://img.shields.io/bundlephobia/minzip/modern-api.clipboard?label=minzip">

Clipboard APIs based on [Web Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

## Install

```shell
$ npm i modern-api.clipboard
```

## Usage

### copy and paste text

```typescript
import {read, write} from 'modern-api.clipboard'

(async() => {
  await write('hello world') // set 'hello world' to clipboard
  const data = await read() // get 'hello world' from clipboard
})()
```

### copy and paste image

```typescript
import {read, write} from 'modern-api.clipboard'

(async() => {
  const img = await fetch('/hello.png')
  await write(await img.blob(), 'png') // set 'world.png' to clipboard

  const data = await read('png') // get 'hello.png' Blob
})()
```

## API

```typescript
/**
 * whether browser support clipboard APIs
 */
declare const clipboardSupported: boolean;
/**
 * whether browser support clipboard `write` API
 */
declare const writeSupported: boolean;
/**
 * whether browser support clipboard `writeText` API
 */
declare const writeTextSupported: boolean;
/**
* whether browser support clipboard `read` API
*/
declare const readSupported: boolean;
/**
 * whether browser support clipboard `readText` API
 */
declare const readTextSupported: boolean;
/**
 * write data to clipboard
 *
 * @param {string|Blob|PromiseLike<string|Blob>} data - data to copy or cut
 * @param {'text' | 'png' | 'jpeg' | 'svg'} type - data type, default 'text'
 *
 * @returns {Promise<void>}
 */
declare const write: (data: string | Blob | PromiseLike<string | Blob>, type?: 'text' | 'png' | 'jpeg' | 'svg') => Promise<void>;
/**
 * read data from clipboard
 *
 * @param {'text' | 'png' | 'jpeg' | 'svg'} type - data type, default 'text'
 *
 * @returns {Promise<string | Blob>}
 */
declare const read: (type?: 'text' | 'png' | 'jpeg' | 'svg') => Promise<string | Blob[]>;
```