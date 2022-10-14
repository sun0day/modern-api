import { pauseInterval, pauseTimeout, sleep, timeout } from './index'

describe('sleep', () => {
  it('should sleep', async () => {
    const now = +new Date()
    await sleep(100)
    expect(+new Date() - now).toBeGreaterThanOrEqual(100)
  })
})

describe('timeout', () => {
  it('should not timeout', async () => {
    await timeout(sleep(100), 200)
  })

  it('should timeout', async () => {
    expect(await timeout(sleep(100), 50).catch(e => e.message)).toBe('timeout over 50ms')
  })
})

describe('pauseTimeout', () => {
  it('should setTimeout', async () => {
    const cb = vi.fn()
    const timer = pauseTimeout(cb, 100)
    expect(timer.isActive).toBeTruthy()
    await sleep(100)
    expect(timer.isActive).toBeFalsy()
    expect(cb).toBeCalled()
  })

  it('should pause and resume setTimeout', async () => {
    const cb = vi.fn()
    const timer = pauseTimeout(cb, 100)

    await sleep(50)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeTruthy()

    timer.pause()
    expect(timer.isActive).toBeFalsy()

    await sleep(50)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()

    timer.resume()
    expect(timer.isActive).toBeTruthy()
    await sleep(50)
    expect(cb).toHaveBeenCalledTimes(1)
    expect(timer.isActive).toBeFalsy()
  })

  it('should stop setTimeout', async () => {
    const cb = vi.fn()
    const timer = pauseTimeout(cb, 100)

    timer.stop()
    expect(timer.isActive).toBeFalsy()

    await sleep(100)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()

    timer.resume()
    expect(timer.isActive).toBeFalsy()

    await sleep(100)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()
  })
})

describe('pauseInterval', () => {
  it('should setInterval', async () => {
    const cb = vi.fn()
    const timer = pauseInterval(cb, 100)
    expect(timer.isActive).toBeTruthy()
    await sleep(100)
    expect(timer.isActive).toBeTruthy()
    expect(cb).toHaveBeenCalledTimes(1)

    await sleep(100)
    expect(timer.isActive).toBeTruthy()
    expect(cb).toHaveBeenCalledTimes(2)
  })

  it('should pause and resume setInterval', async () => {
    const cb = vi.fn()
    const timer = pauseInterval(cb, 100)

    await sleep(50)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeTruthy()

    timer.pause()
    expect(timer.isActive).toBeFalsy()

    await sleep(50)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()

    timer.resume()
    expect(timer.isActive).toBeTruthy()

    await sleep(100)
    expect(cb).toHaveBeenCalledTimes(1)
    expect(timer.isActive).toBeTruthy()

    await sleep(100)
    expect(cb).toHaveBeenCalledTimes(2)
    expect(timer.isActive).toBeTruthy()
  })

  it('should stop setInterval', async () => {
    const cb = vi.fn()
    const timer = pauseInterval(cb, 100)

    timer.stop()
    expect(timer.isActive).toBeFalsy()

    await sleep(100)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()

    timer.resume()
    expect(timer.isActive).toBeFalsy()

    await sleep(100)
    expect(cb).toHaveBeenCalledTimes(0)
    expect(timer.isActive).toBeFalsy()
  })
})
