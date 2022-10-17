import { batterySupported, getBattery } from './index'

describe('battery', () => {
  let callback, mockBattery, mockAddEventListener, mockRemoveEventListener
  beforeEach(() => {
    callback = vi.fn()
    mockAddEventListener = vi.fn()
    mockRemoveEventListener = vi.fn()
    mockBattery = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }
  })
  it('should supported', () => {
    expect(batterySupported).toBe('getBattery' in navigator)
  })

  function test(event: any) {
    it(`should get battery and watch ${event}`, async () => {
      // @ts-expect-error mock getBattery
      navigator.getBattery = vi.fn(() => Promise.resolve(mockBattery))
      // @ts-expect-error mock callback
      const { battery, stop } = await getBattery({ [event]: callback })

      expect(battery).toEqual(mockBattery)
      expect(mockAddEventListener).toHaveBeenLastCalledWith(event, callback)
      stop(event)
      expect(mockRemoveEventListener).toHaveBeenLastCalledWith(event, callback)
    })

    it(`should not ${event} error when battery api not supported`, async () => {
      // @ts-expect-error mock getBattery
      navigator.getBattery = undefined
      // @ts-expect-error mock callback
      const { battery, stop } = await getBattery({ [event]: callback })

      expect(battery).toBeNull()
      expect(mockAddEventListener).toHaveBeenCalledTimes(0)
      stop(event)
      expect(mockRemoveEventListener).toHaveBeenCalledTimes(0)
    })
  }

  ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'].forEach(e => test(e))
})
