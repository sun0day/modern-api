describe('clipboard', () => {
  const mockGetTypes = vi.fn()
  // @ts-expect-error mock ClipboardItem
  window.ClipboardItem = vi.fn(param => param)
  // @ts-expect-error mock clipboard
  navigator.clipboard = {
    read: vi.fn(() => ([{
      getType: mockGetTypes,
    }])),
    readText: vi.fn(),
    write: vi.fn(),
    writeText: vi.fn(),
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { clipboardSupported, readSupported, readTextSupported, writeSupported, writeTextSupported, read, write } = require('./dist/index.cjs')

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should support', () => {
    expect(clipboardSupported).toBeTruthy()
    expect(readSupported).toBeTruthy()
    expect(readTextSupported).toBeTruthy()
    expect(writeSupported).toBeTruthy()
    expect(writeTextSupported).toBeTruthy()
  })

  it('should read data', async () => {
    await read()
    expect(navigator.clipboard.readText).toHaveBeenCalledWith()

    await read('png')
    expect(navigator.clipboard.read).toHaveBeenCalledWith()
    expect(mockGetTypes).toHaveBeenCalledWith('image/png')
  })

  it('should write data', async () => {
    await write('hello')
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')

    await write('hello', 'png')
    expect(navigator.clipboard.write).toHaveBeenCalledWith([{
      'image/png': 'hello',
    }])
  })
})
