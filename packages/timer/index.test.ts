import { pauseTimeout, sleep, timeout } from './index'

describe('sleep', () => {
  it('should sleep', async () => {
    const now = +new Date()
    await sleep(1000)
    expect(+new Date() - now).toBeGreaterThanOrEqual(1000)
  })
})

describe('timeout', () => {
  it('should not timeout', async () => {
    await timeout(sleep(1000), 2000)
  })

  it('should timeout', async () => {
    expect(await timeout(sleep(1000), 500).catch(e => e.message)).toBe('timeout over 500ms')
  })
})

describe('pauseTimeout', () => {
  it('should setTimeout', async () => {
    const cb = vi.fn()
    const timer = pauseTimeout(cb, 1000)
    expect(timer.isActive).toBeTruthy()
    await sleep(1000)
    expect(timer.isActive).toBeFalsy()
    expect(cb).toBeCalled()
  })

  it('should pause and resume setTimeout', async () => {
    const cb = vi.fn()
    const timer = pauseTimeout(cb, 1000)

    await sleep(500)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeTruthy()

    timer.pause()
    expect(timer.isActive).toBeFalsy()

    await sleep(500)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()

    timer.resume()
    expect(timer.isActive).toBeTruthy()
    await sleep(500)
    expect(cb).toHaveBeenCalledTimes(1)
    expect(timer.isActive).toBeFalsy()
  })

  it('should stop setTimeout', async () => {
    const cb = vi.fn()
    const timer = pauseTimeout(cb, 1000)

    timer.stop()
    expect(timer.isActive).toBeFalsy()

    await sleep(1000)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()

    timer.resume()
    expect(timer.isActive).toBeFalsy()

    await sleep(1000)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()
  })
})
