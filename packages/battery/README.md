# modern-api.battery

<img src="https://img.shields.io/npm/v/modern-api.battery"> <img src="https://img.shields.io/npm/dw/modern-api.battery" > <img src="https://img.shields.io/bundlephobia/minzip/modern-api.battery?label=minzip">

Get and watch battery status via [Web Battery API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API).

## Install

```shell
$ npm i modern-api.battery
```

## Usage

### get and watch battery status

```typescript
import { batterySupported, getBattery } from 'modern-api.battery'

if(batterySupported) {
  const {battery, stop} = await getBattery({
    chargingchange: () => console.log(battery.charging),
    chargingtimechange: () => console.log(battery.chargingtime),
    dischargingtimechange: () => console.log(battery.dischargingtime),
    levelchange: () => console.log(battery.level)
  })
}

// stop watch
stop('chargingchange')
stop('chargingtimechange')
// ...
```

## API

```typescript
interface BatteryManager {
    readonly charging: boolean;
    readonly chargingTime: number;
    readonly dischargingTime: number;
    readonly level: number;
}
declare type BatteryEvent = 'chargingchange' | 'chargingtimechange' | 'dischargingtimechange' | 'levelchange';
/**
 * whether battery APIs is supported
 */
declare const batterySupported: boolean;
/**
 * get BatteryManager instance
 * @see https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
 *
 * @typedef {Object} BatteryResult
 * @property {BatteryManager | null}  BatteryResult.battery - will be null if not support
 * @property {(event: BatteryEvent) => void,} BatteryResult.stop - stop battery event listener
 *
 * @param {Record<BatteryEvent, () => void} listeners- battery event listener
 * @returns {Promise<BatteryResult>}
 */
declare const getBattery: (listeners?: Record<BatteryEvent, () => void>) => Promise<{
    battery: BatteryManager | null;
    stop: (event: BatteryEvent) => void;
}>;
```