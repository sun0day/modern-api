interface GetOptions {
  removeStale?: boolean
  updateAge?: boolean
}

interface SetOptions {
  ttl?: number | string
}

export class StorageEnhancer {
  storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  /**
   * detect whether key is in storage
   *
   * @param {string} key
   * @returns {boolean}
   */
  hasItem(key: string) {
    return typeof this.storage.getItem(key) === 'string'
  }

  /**
   * detect whether key is still alive
   *
   * @param {string} key
   * @returns {boolean} - return true only if key existed and staled
   */
  staleItem(key: string) {
    if (!this.hasItem(key))
      return false

    const { start, ttl } = this._parseValue(this.storage.getItem(key))

    return this._isStale(start, ttl)
  }

  /**
   * get item via key
   *
   * @param {string} key
   * @param {GetOptions} options
   * @param {boolean} options.removeStale - whether remove item when key staled
   * @param {boolean} options.updateAge - whether delay key ttl
   * @returns {string | null}
   */
  getItem(key: string, { removeStale, updateAge }: GetOptions = {}) {
    if (!this.hasItem(key))
      return null

    const { value, start, ttl } = this._parseValue(this.storage.getItem(key))

    if (this._isStale(start, ttl)) {
      removeStale && this.removeItem(key)
      return null
    }

    if (updateAge)
      this.setItem(key, value, { ttl })

    return value
  }

  /**
   * set item via key
   *
   * @param {string} key
   * @param {string} value
   * @param {SetOptions} options
   * @param {number} options.ttl - key's time to live, ms
   * @returns {void}
   */
  setItem(key: string, value: string, { ttl }: SetOptions = {}) {
    this.storage.setItem(key, this._prependExpire(value, ttl))
  }

  /**
   * get json via key
   *
   * @param {string} key
   * @param {GetOptions} options
   * @param {boolean} options.removeStale - whether remove item when key staled
   * @param {boolean} options.updateAge - whether delay key ttl
   * @returns {string | object | null}
   */
  getJson(key: string, options: GetOptions = {}) {
    try {
      return JSON.parse(this.getItem(key, options))
    }
    catch {
      return null
    }
  }

  /**
   * set json via key
   *
   * @param {string} key
   * @param {string} value
   * @param {SetOptions} options
   * @param {number} options.ttl - key's time to live, ms
   * @returns {void}
   */
  setJson(key: string, value: object, options: SetOptions = {}) {
    this.setItem(key, JSON.stringify(value), options)
  }

  /**
   * remove item via key
   *
   * @param {string} key
   * @returns {void}
   */
  removeItem(key: string) {
    this.storage.removeItem(key)
  }

  /**
   * clear all keys and items
   *
   * @returns {void}
   */
  clear() {
    this.storage.clear()
  }

  _prependExpire(value: string, ttl?: number | string) {
    return this._isNumber(ttl) ? `start:${+new Date()}:ttl:${ttl}:${value}` : value
  }

  _parseValue(value: string) {
    const reg = /^start:(\d+):ttl:(\d+):/
    const result = value.match(reg)

    return {
      value: value.replace(reg, ''),
      start: result && result[1],
      ttl: result && result[2],
    }
  }

  _isStale(start?: number | string, ttl?: number | string) {
    return this._isNumber(start) && this._isNumber(ttl) && Number(start) + Number(ttl) < +new Date()
  }

  _isNumber(n: any) {
    return !isNaN(parseFloat(n))
  }
}

