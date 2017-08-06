import Adapter from './adapter/websocket.js'
import Printer from './printer.js'

export default class Recta extends Printer {
  constructor (key, port = 1811) {
    super(new Adapter({ key, port }))
  }
}
