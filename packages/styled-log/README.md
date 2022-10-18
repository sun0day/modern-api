# modern-api.styledlog

<img src="https://img.shields.io/npm/v/modern-api.styledlog"> <img src="https://img.shields.io/npm/dw/modern-api.styledlog" > <img src="https://img.shields.io/bundlephobia/minzip/modern-api.styledlog?label=minzip">

Log text in custom css style based on [Web Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console_API).

## Install

```shell
$ npm i modern-api.styledlog
```

## Usage

### log text in custom css style

```typescript
import { log, styled } from 'modern-api.styledlog'

const styledText1 = styled({color: 'red', 'background': 'green'})
const styledText2 = styled({color: 'green', 'background': 'red'})

log(styledText1('hello'), styledText2('world'))
```

## API

```typescript
/**
 * create log style
 *
 * @param {Record<string, string>} styles - custom text style
 * @returns {(text: any) => string[]} - callback to format text
 */
declare const styled: (styles: Record<string, string>) => (text: any) => string[];
/**
 * output formatted texts via `console.log`
 *
 * @param {...(string[])} texts - formatted text to output
 * @returns {void}
 */
declare const log: (...texts: (string[])[]) => void;
/**
 * output formatted texts via `console.warn`
 *
 * @param {...(string[])} texts - formatted text to output
 * @returns {void}
 */
declare const warn: (...texts: (string[])[]) => void;
/**
 * output formatted texts via `console.error`
 *
 * @param {...(string[])} texts - formatted text to output
 * @returns {void}
 */
declare const error: (...texts: (string[])[]) => void;
/**
 * output formatted texts via `console.debug`
 *
 * @param {...(string[])} texts - formatted text to output
 * @returns {void}
 */
declare const debug: (...texts: (string[])[]) => void;
```