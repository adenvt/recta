import Socket from 'socket.io-client'
import Adapter from '../base/adapter.js'

export default class WebSocket extends Adapter {
  constructor ({ key, port }) {
    super()

    this.device = new Socket(`ws://localhost:${port}`, {
      transports  : ['websocket'],
      query       : `token=${key}`,
      autoConnect : false,
      reconnection: false,
    })
    this.device.on('connect', () => {
      this.isOpen = true

      this.emit('open')
    })
    this.device.on('disconnect', () => {
      this.isOpen = false

      this.emit('close')
    })
    this.device.on('error', (e) => {
      if (this.isOpen)
        this.emit('error', e)
    })
  }

  open () {
    return new Promise((resolve, reject) => {
      if (this.isOpen)
        return resolve()

      this.device.open().once('connect', () => {
        this.emit('open')

        return resolve()
      }).once('connect_timeout', (e) => {
        return reject(e)
      }).once('connect_error', (e) => {
        return reject(e)
      }).once('error', (e) => {
        return reject(e)
      })
    })
  }

  close () {
    return new Promise((resolve) => {
      if (!this.isOpen)
        return resolve()

      this.device.close()
      this.emit('close')

      return resolve()
    })
  }

  write (buffer) {
    try {
      if (!this.isOpen)
        throw new Error('Adapter not opened')

      this.device.send(buffer)
    } catch (e) {
      this.emit('error', e)
    }
  }
}
