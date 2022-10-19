import { sleep } from 'modern-api.timer'
import { StorageEnhancer } from './index'

describe('storage', () => {
  const storage = new StorageEnhancer(window.localStorage)

  afterEach(() => {
    storage.clear()
  })

  it('should get and set item', () => {
    storage.setItem('a', '1')
    storage.setItem('', '2')

    expect(storage.hasItem('a')).toBeTruthy()
    expect(storage.staleItem('a')).toBeFalsy()
    expect(storage.getItem('a')).toBe('1')
    expect(storage.hasItem('')).toBeTruthy()
    expect(storage.staleItem('')).toBeFalsy()
    expect(storage.getItem('')).toBe('2')

    storage.removeItem('a')
    storage.removeItem('')

    expect(storage.hasItem('a')).toBeFalsy()
    expect(storage.staleItem('a')).toBeFalsy()
    expect(storage.getItem('a')).toBeNull()
    expect(storage.hasItem('')).toBeFalsy()
    expect(storage.staleItem('')).toBeFalsy()
    expect(storage.getItem('')).toBeNull()
  })

  it('should get and set json', () => {
    storage.setJson('a', { x: 1 })
    storage.setItem('', '{1}')

    expect(storage.hasItem('a')).toBeTruthy()
    expect(storage.staleItem('a')).toBeFalsy()
    expect(storage.getItem('a')).toBe(JSON.stringify({ x: 1 }))
    expect(storage.getJson('a')).toEqual({ x: 1 })
    expect(storage.hasItem('')).toBeTruthy()
    expect(storage.staleItem('')).toBeFalsy()
    expect(storage.getJson('')).toBeNull()

    storage.removeItem('a')
    storage.removeItem('')

    expect(storage.hasItem('a')).toBeFalsy()
    expect(storage.getJson('a')).toBeNull()
    expect(storage.hasItem('')).toBeFalsy()
    expect(storage.getJson('')).toBeNull()
  })

  it('should set key ttl', async () => {
    storage.setItem('a', '1', { ttl: 100 })

    expect(storage.hasItem('a')).toBeTruthy()
    expect(storage.staleItem('a')).toBeFalsy()
    expect(storage.getItem('a')).toBe('1')

    await sleep(101)

    expect(storage.hasItem('a')).toBeTruthy()
    expect(storage.staleItem('a')).toBeTruthy()
    expect(storage.getItem('a')).toBeNull()
  })

  it('should remove key on get when ttl expire', async () => {
    storage.setItem('a', '1', { ttl: 100 })

    await sleep(101)

    expect(storage.hasItem('a')).toBeTruthy()
    expect(storage.staleItem('a')).toBeTruthy()
    expect(storage.getItem('a', { removeStale: true })).toBeNull()
    expect(storage.hasItem('a')).toBeFalsy()
    expect(storage.staleItem('a')).toBeFalsy()
  })

  it('should delay key ttl', async () => {
    storage.setItem('a', '1', { ttl: 100 })

    await sleep(50)

    expect(storage.hasItem('a')).toBeTruthy()
    expect(storage.staleItem('a')).toBeFalsy()
    expect(storage.getItem('a', { updateAge: true })).toBe('1')

    await sleep(51)
    expect(storage.hasItem('a')).toBeTruthy()
    expect(storage.staleItem('a')).toBeFalsy()
    expect(storage.getItem('a')).toBe('1')

    await sleep(101)

    expect(storage.hasItem('a')).toBeTruthy()
    expect(storage.staleItem('a')).toBeTruthy()
    expect(storage.getItem('a')).toBeNull()
  })
})
