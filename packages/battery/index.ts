interface BatteryManager {
  readonly charging: boolean
  readonly chargingTime: number
  readonly dischargingTime: number
  readonly level: number
}

type BatteryEvent = 'chargingchange' | 'chargingtimechange' | 'dischargingtimechange' | 'levelchange'

/**
 * whether battery APIs is supported
 */
export const batterySupported = 'getBattery' in navigator

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
export const getBattery = async (listeners?: Record<BatteryEvent, () => void>): Promise<{
  battery: BatteryManager | null
  stop: (event: BatteryEvent) => void
}> => {
  // @ts-expect-error getBattery
  const battery = await (navigator.getBattery ? navigator.getBattery() : null)

  if (battery && listeners) {
    for (const event in listeners)
      battery.addEventListener(event, listeners[event])
  }

  return {
    battery,
    stop: (event: BatteryEvent) => {
      if (battery && listeners)
        battery.removeEventListener(event, listeners[event])
    },
  }
}
