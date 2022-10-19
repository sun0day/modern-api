# modern-api.storage

<img src="https://img.shields.io/npm/v/modern-api.storage"> <img src="https://img.shields.io/npm/dw/modern-api.storage" > <img src="https://img.shields.io/bundlephobia/minzip/modern-api.storage?label=minzip">

Client storage APIs based on [Web localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Install

```shell
$ npm i modern-api.storage
```

## Usage

### get and set item

```typescript
import { StorageEnhancer } from 'modern-api.storage'

const storage = new StorageEnhancer(window.localStorage);

storage.setItem('a', '1')
storage.hasItem('a') // true
storage.getItem('a') // get '1'
```

### get and set json

```typescript
import { StorageEnhancer } from 'modern-api.storage'

const storage = new StorageEnhancer(window.localStorage);

storage.setJson('a', {x: 1})
storage.hasItem('a') // true
storage.getItem('a') // get '{"x":1}'
storage.getJson('a') // get {x: 1}
```

### set key ttl

```typescript
import { StorageEnhancer } from 'modern-api.storage'

const storage = new StorageEnhancer(window.localStorage);

storage.setItem('a', '1', {ttl: 100}) // a will expire after 100ms
storage.hasItem('a') // true
storage.getItem('a') // get '1'

// after 100ms
storage.hasItem('a') // true
storage.staleItem('a') // true

storage.getItem('a', {removeStale: true}) // remove stale a on get
storage.hasItem('a') // false
storage.staleItem('a') // false
```

### delay key ttl on get

```typescript
import { StorageEnhancer } from 'modern-api.storage'

const storage = new StorageEnhancer(window.localStorage);

storage.setItem('a', '1', {ttl: 100}) // a will expire after 100ms
storage.hasItem('a') // true
storage.getItem('a') // get '1'

// after 50ms
storage.hasItem('a') // true
storage.staleItem('a') // false

storage.getItem('a', {updateAge: true}) // delay a ttl on get
storage.hasItem('a') // true
storage.staleItem('a') // false

// after another 50ms
storage.hasItem('a') // true
storage.staleItem('a') // false, a is still alive
```

## API

```typescript
interface GetOptions {
    removeStale?: boolean;
    updateAge?: boolean;
}
interface SetOptions {
    ttl?: number | string;
}
declare class StorageEnhancer {
    storage: Storage;
    constructor(storage: Storage);
    /**
     * detect whether key is in storage
     *
     * @param {string} key
     * @returns {boolean}
     */
    hasItem(key: string): boolean;
    /**
     * detect whether key is still alive
     *
     * @param {string} key
     * @returns {boolean} - return true only if key existed and staled
     */
    staleItem(key: string): boolean;
    /**
     * get item via key
     *
     * @param {string} key
     * @param {GetOptions} options
     * @param {boolean} options.removeStale - whether remove item when key staled
     * @param {boolean} options.updateAge - whether delay key ttl
     * @returns {string | null}
     */
    getItem(key: string, { removeStale, updateAge }?: GetOptions): string;
    /**
     * set item via key
     *
     * @param {string} key
     * @param {string} value
     * @param {SetOptions} options
     * @param {number} options.ttl - key's time to live, ms
     * @returns {void}
     */
    setItem(key: string, value: string, { ttl }?: SetOptions): void;
    /**
     * get json via key
     *
     * @param {string} key
     * @param {GetOptions} options
     * @param {boolean} options.removeStale - whether remove item when key staled
     * @param {boolean} options.updateAge - whether delay key ttl
     * @returns {string | object | null}
     */
    getJson(key: string, options?: GetOptions): any;
    /**
     * set json via key
     *
     * @param {string} key
     * @param {string} value
     * @param {SetOptions} options
     * @param {number} options.ttl - key's time to live, ms
     * @returns {void}
     */
    setJson(key: string, value: object, options?: SetOptions): void;
    /**
     * remove item via key
     *
     * @param {string} key
     * @returns {void}
     */
    removeItem(key: string): void;
    /**
    * clear all keys and items
    *
    * @returns {void}
    */
    clear(): void;
}
```