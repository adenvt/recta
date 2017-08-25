import EventEmitter from 'events'
import Buffer from 'mutable-buffer'

const PRINT_ALIGN = ['LEFT', 'CENTER', 'RIGHT']
const PRINT_BARCODE = ['UPC-A', 'UPC-E', 'EAN13', 'EAN8', 'CODE39', 'ITF', 'CODABAR', 'CODE93', 'CODE128']

export default class Printer extends EventEmitter {
  constructor (adapter) {
    super()

    this.buffer = new Buffer()
    this.adapter = adapter
    this.adapter.on('open', () => {
      this.emit('open')
    })
    this.adapter.on('close', () => {
      this.emit('close')
    })
    this.adapter.on('error', (e) => {
      this.emit('error', e)
    })
  }

  get isOpen () {
    return this.adapter.isOpen
  }

  raw (raw) {
    this.buffer.write(raw)

    return this
  }

  feed (feed = 4) {
    this.buffer.write(Array(feed).fill('\n').join(''))

    return this
  }

  mode (font = 'A', emphasized = false, doubleHeight = false, doubleWidth = false, underline = false) {
    let mode = 0x00 // default mode

    // Select Font
    mode |= font.toUpperCase() === 'B' ? 0x01 : 0x00
    // Emphasized Mode
    mode |= emphasized ? 0x08 : 0x00
    // Double Height Mode
    mode |= doubleHeight ? 0x10 : 0x00
    // Double Width Mode
    mode |= doubleWidth ? 0x20 : 0x00
    // Underline Mode
    mode |= underline ? 0x80 : 0x00

    this.buffer.write([0x1b, 0x21])
    this.buffer.writeUInt8(mode)

    return this
  }

  underline (active = true) {
    this.buffer.write([0x1b, 0x2d])
    this.buffer.writeUInt8(active)

    return this
  }

  bold (active = true) {
    this.buffer.write([0x1b, 0x45])
    this.buffer.writeUInt8(active)

    return this
  }

  text (text = '') {
    this.buffer.write(text)
    this.buffer.write('\n')

    return this
  }

  align (align) {
    const index = PRINT_ALIGN.indexOf(align.toUpperCase())

    if (index < 0)
      throw new Error(`Not support align '${align}', only support 'LEFT', 'CENTER', 'RIGHT'`)

    this.buffer.write([0x1b, 0x61])
    this.buffer.writeUInt8(index)

    return this
  }

  flush () {
    return this.buffer.flush()
  }

  reset () {
    this.buffer.write([0x1b, 0x40])
    this.print()

    return this
  }

  font (font) {
    this.buffer.write([0x1b, 0x4d])
    this.buffer.writeUInt8(font === 'B')

    return this
  }

  cut (partial = false, feed = 4) {
    this.buffer.write([0x1d, 0x56])
    this.buffer.writeUInt8(partial)
    this.feed(feed)

    return this
  }

  barcode (type, barcode, height) {
    const index = PRINT_BARCODE.indexOf(type.toUpperCase())

    if (index < 0)
      throw new Error(`Not support barcode '${type}'`)

    if (height)
      this.barcodeHeight(height)

    this.buffer.write([0x1d, 0x6b])
    this.buffer.writeUInt8(65 + index)
    this.buffer.writeUInt8(barcode.length)
    this.buffer.write(barcode)

    return this
  }

  barcodeHeight (height) {
    this.buffer.write([0x1d, 0x68])
    this.buffer.writeUInt8(height)

    return this
  }

  print () {
    return this.adapter.write(this.flush())
  }

  clearBuffer () {
    this.buffer.clear()

    return this
  }

  open () {
    return this.adapter.open()
  }

  close () {
    return this.adapter.close()
  }
}
