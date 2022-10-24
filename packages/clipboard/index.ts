const type2Mime = (type: | 'png' | 'jpeg' | 'svg') => ({
  png: 'image/png',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
})[type]

/**
 * whether browser support clipboard APIs
 */
export const clipboardSupported = 'clipboard' in navigator

/**
 * whether browser support clipboard `write` API
 */
export const writeSupported = clipboardSupported && 'write' in navigator.clipboard

/**
 * whether browser support clipboard `writeText` API
 */
export const writeTextSupported = clipboardSupported && 'writeText' in navigator.clipboard

/**
 * whether browser support clipboard `read` API
 */
export const readSupported = clipboardSupported && 'read' in navigator.clipboard

/**
 * whether browser support clipboard `readText` API
 */
export const readTextSupported = clipboardSupported && 'readText' in navigator.clipboard

/**
  * write data to clipboard
  *
  * @param {string|Blob|PromiseLike<string|Blob>} data - data to copy or cut
  * @param {'text' | 'png' | 'jpeg' | 'svg'} type - data type, default 'text'
  *
  * @returns {Promise<void>}
  */
export const write = (data: string | Blob | PromiseLike<string | Blob>, type: 'text' | 'png' | 'jpeg' | 'svg' = 'text') => {
  if (type === 'text')
    return navigator.clipboard.writeText(data as string)

  return navigator.clipboard.write([
    new ClipboardItem({
      [type2Mime(type)]: data,
    }),
  ])
}

/**
 * read data from clipboard
 *
 * @param {'text' | 'png' | 'jpeg' | 'svg'} type - data type, default 'text'
 *
 * @returns {Promise<string | Blob>}
 */
export const read = async (type: 'text' | 'png' | 'jpeg' | 'svg' = 'text') => {
  if (type === 'text')
    return navigator.clipboard.readText()

  const items = await navigator.clipboard.read()
  const mimeType = type2Mime(type)
  const datas = []
  for (const item of items)
    datas.push(await item.getType(mimeType))

  return datas[0]
}

