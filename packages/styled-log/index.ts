/* eslint no-console: 0 */
const output = (level: 'log' | 'warn' | 'error' | 'debug', texts: (string[])[]) => {
  const text = texts.reduce(
    (acc, [t]) => `${acc}${t}`, '',
  )

  console[level](text, ...texts.map(([_, style]) => style))
}
/**
 * create log style
 *
 * @param {Record<string, string>} styles - custom text style
 * @returns {(text: any) => string[]} - callback to format text
 */
export const styled = (styles: Record<string, string>) => {
  return (text: any) => {
    return [`%c${text}`, Object.keys(styles).reduce((acc, key) => `${key}:${styles[key]};${acc}`, '')]
  }
}

/**
 * output formatted texts via `console.log`
 *
 * @param {...(string[])} texts - formatted text to output
 * @returns {void}
 */
export const log = (...texts: (string[])[]) => {
  output('log', texts)
}

/**
 * output formatted texts via `console.warn`
 *
 * @param {...(string[])} texts - formatted text to output
 * @returns {void}
 */
export const warn = (...texts: (string[])[]) => {
  output('warn', texts)
}

/**
 * output formatted texts via `console.error`
 *
 * @param {...(string[])} texts - formatted text to output
 * @returns {void}
 */
export const error = (...texts: (string[])[]) => {
  output('error', texts)
}

/**
 * output formatted texts via `console.debug`
 *
 * @param {...(string[])} texts - formatted text to output
 * @returns {void}
 */
export const debug = (...texts: (string[])[]) => {
  output('debug', texts)
}
