/* eslint no-console: "off" */
import EventEmitter from 'events'

export default class Adapter extends EventEmitter {
  constructor () {
    super()

    this.isOpen = false
    this.device = null
  }

  open () {
    return new Promise((resolve) => {
      if (this.isOpen)
        return resolve()

      // TODO: implement this method
      console.error('Not Implemented')

      this.isOpen = true
      this.emit('open')
      return resolve()
    })
  }

  close () {
    return new Promise((resolve) => {
      if (!this.isOpen)
        return resolve()

      // TODO: implement this method
      console.error('Not Implemented')

      this.isOpen = false
      this.emit('close')

      return resolve()
    })
  }

  write () {
    // TODO: implement this method
    console.error('Not Implemented')
  }
}
