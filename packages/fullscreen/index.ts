const getPrefix = () => {
  if (document.fullscreenEnabled)
    return ''

  // @ts-expect-error in webkit
  if (document.webkitFullscreenEnabled)
    return 'webkit'

  // @ts-expect-error in moz
  if (document.mozFullScreenEnabled)
    return 'moz'

  // @ts-expect-error in ms
  if (document.msFullscreenEnabled)
    return 'ms'
}

/**
 * whether fullscreen APIs is enabled
 */
export const fullscreenSupported = typeof getPrefix() === 'string'

/**
 * get current fullscreen element
 *
 * @returns {Element | null}
 */
export const fullscreenElement = (): Element | null => {
  const prefix = getPrefix()

  if (prefix === undefined)
    return null

  if (prefix === '')
    return document.fullscreenElement

  if (prefix === 'moz') {
    // @ts-expect-error in moz
    return document.mozFullScreenElement
  }

  // @ts-expect-error fullscreen element in different browser
  return document[`${prefix}FullscreenElement`]
}

/**
 * trigger fullscreen
 *
 * @param {Element} el - el to set fullscreen
 * @returns {Promise<void>}
 */
export const requestFullscreen = (el: Element) => {
  const prefix = getPrefix()

  return new Promise((resolve) => {
    if (prefix === undefined)
      return resolve(undefined)

    if (prefix === '')
      return el.requestFullscreen().then(resolve)

    // @ts-expect-error requestFullscreen in different browser
    return el[`${prefix}RequestFullscreen`]().then(resolve)
  })
}

/**
 * exist fullscreen
 *
 * @returns {Promise<void>}
 */
export const exitFullscreen = () => {
  const prefix = getPrefix()

  return new Promise((resolve) => {
    if (prefix === undefined)
      return resolve(undefined)

    if (prefix === '')
      return document.exitFullscreen().then(resolve)

    // @ts-expect-error exitFullscreen in different browser
    return document[`${prefix}ExitFullscreen`]().then(resolve)
  })
}

/**
 * listen fullscreen 'change' and 'error' event
 *
 * @param {Object} callbacks - callback map
 * @param {(e: Event) => void} callbacks.onScreen - trigger when enter fullscreen mode \
 * @param {(e: Event) => void} callbacks.onExit - trigger when quit fullscreen mode
 * @param {(e: Event) => void} callbacks.onError - trigger when fullscreen action fails
 * @returns {void}
 */
export const onFullscreen = ({
  onScreen,
  onExit,
  onError,
}: { onScreen?: (e: Event) => void; onExit?: (e: Event) => void; onError?: (e: Event) => void }) => {
  const prefix = getPrefix()
  if (prefix === undefined)
    return

  if (onScreen || onExit) {
    // @ts-expect-error fullscreenchange in different browser
    document[`on${prefix}fullscreenchange`] = (e: Event) => {
      fullscreenElement() ? onScreen && onScreen(e) : onExit && onExit(e)
    }
  }

  if (onError)
    // @ts-expect-error fullscreenerror in different browser
    document[`on${prefix}fullscreenerror`] = onError
}
