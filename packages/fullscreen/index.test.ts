// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck error in different browser
import { exitFullscreen, fullscreenElement, fullscreenSupported, onFullscreen, requestFullscreen } from './index'

describe('fullscreen', () => {
  afterEach(() => {
    document.fullscreenEnabled = false
    document.fullscreenElement = null
    document.webkitFullscreenEnabled = false
    document.webkitFullscreenElement = null
    document.mozFullScreenEnabled = false
    document.mozFullScreenElement = null
    document.msFullscreenEnabled = false
    document.msFullscreenElement = null
  })

  it('should fullscreen disabled by default', () => {
    expect(fullscreenSupported).toBeFalsy()
  })

  function testEnabled(browser: string) {
    function setBrowser() {
      const event = new Event('fullscreenchange')
      const errorEvent = new Event('fullscreenerror')
      const elKey = `${browser}${browser ? 'F' : 'f'}ull${browser === 'moz' ? 'S' : 's'}creenElement`
      const changeKey = `on${browser}fullscreenchange`
      const errorKey = `on${browser}fullscreenerror`
      document[`${browser}${browser ? 'F' : 'f'}ull${browser === 'moz' ? 'S' : 's'}creenEnabled`] = true
      document.documentElement[`${browser}${browser ? 'R' : 'r'}equestFullscreen`] = vi.fn().mockImplementationOnce(async () => {
        await (document[elKey] = document.documentElement)
        document[changeKey] && document[changeKey](event)
      }).mockImplementationOnce(async () => {
        document[errorKey] && document[errorKey](errorEvent)
      })
      document[`${browser}${browser ? 'E' : 'e'}xitFullscreen`] = vi.fn(async () => {
        await (document[elKey] = null)
        document[changeKey] && document[changeKey](event)
      })
    }

    it(`should request and exit fullscreen in ${browser}`, async () => {
      setBrowser()
      expect(fullscreenElement()).toBeNull()
      await requestFullscreen(document.documentElement)
      expect(fullscreenElement()).toBe(document.documentElement)
      await exitFullscreen()
      expect(fullscreenElement()).toBeNull()
    })

    it(`should watch fullscreen change and error ${browser}`, async () => {
      setBrowser()
      const onScreen = vi.fn()
      const onExit = vi.fn()
      const onError = vi.fn()

      onFullscreen({
        onScreen,
        onExit,
        onError,
      })

      await requestFullscreen(document.documentElement)
      expect(onScreen).toHaveBeenCalledTimes(1)
      await exitFullscreen()
      expect(onExit).toHaveBeenCalledTimes(1)
      await requestFullscreen(document.documentElement)
      expect(onError).toHaveBeenCalledTimes(1)
    })
  }

  function testDisabled() {
    it('should fullscreen disabled', () => {
      expect(fullscreenElement()).toBeNull()
    })

    it('should request and exit fullscreen not work', async () => {
      const onScreen = vi.fn()
      const onExit = vi.fn()
      const onError = vi.fn()

      onFullscreen({
        onScreen,
        onExit,
        onError,
      })

      await requestFullscreen(document.documentElement)
      expect(fullscreenElement()).toBeNull()
      expect(onScreen).toHaveBeenCalledTimes(0)

      await exitFullscreen()
      expect(fullscreenElement()).toBeNull()
      expect(onExit).toHaveBeenCalledTimes(0)
      expect(onError).toHaveBeenCalledTimes(0)
    })
  }

  ['', 'webkit', 'moz', 'ms'].forEach(browser => testEnabled(browser))

  testDisabled()
})
