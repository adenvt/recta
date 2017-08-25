/* eslint-disable no-unused-expressions */
describe('Recta', function () {
  this.timeout(60000)

  it('Should be defined', () => {
    Recta.should.not.be.undefined
  })

  it('Should be connected to server', () => {
    const printer = new Recta('123456789', 1811)

    return printer.open().then(() => {
      printer.isOpen.should.be.true
    })
  })
})
