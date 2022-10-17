import { debug, error, log, styled, warn } from './index'

/* eslint no-console: 0 */
describe('styledlog', () => {
  const style = { 'color': 'red', 'font-size': '12px' }
  beforeEach(() => {
    console.log = vi.fn()
    console.warn = vi.fn()
    console.error = vi.fn()
    console.debug = vi.fn()
  })

  it('should styled text', () => {
    const text = styled(style)
    expect(text('hello')).toEqual(['%chello', 'font-size:12px;color:red;'])
  })

  function output(level: 'log' | 'warn' | 'error' | 'debug') {
    it(`should ${level} styled text`, () => {
      const t1 = styled(style)('hello')
      const t2 = styled(style)('world');
      ({ log, warn, error, debug })[level](t1, t2)

      expect(console[level]).toHaveBeenCalledWith('%chello%cworld', 'font-size:12px;color:red;', 'font-size:12px;color:red;')
    })
  }

  ['log', 'warn', 'error', 'debug'].forEach(level => output(level as any))
})
