import { sleep, timeout } from './index'

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
