# Recta

> Direct printing from Browser

[![Build Status](https://travis-ci.org/adenvt/recta.svg?branch=master)](https://travis-ci.org/adenvt/recta)
[![npm version](https://badge.fury.io/js/recta.svg)](https://badge.fury.io/js/recta)

## Introduction

### Reason
I'm web developer, and get project to make some Point Of Sale (POS) software. I have trouble when i need print some receipt especially with POS printer, so i make this project.

### How it work
Recta need desktop software called [Recta Host][recta-host], it serve all hardware connection and bridge with Browser via Websocket

## How to use

### Requirement
* You need to install [Recta Host][recta-host] on every host that will be used for print, checkout [here][recta-host] to more information.

### Standalone
Just include it like other JS library
```html
...
<script src="https://cdn.jsdelivr.net/npm/recta/dist/recta.js"></script>
...
```

### Using Webpack or Browserify
Recta support commonjs module, so if you using webpack for your project. you can easly using it like other module

1. Install package
```bash
$ npm install --save recta
```
2. Import in your code
```js
// using CommonJS
var Recta = require('recta')
// using ES6 style
import Recta from 'recta'
```

## Example

```html
<script type="text/javascript">
  // ...
  var printer = new Recta('APPKEY', '1811')

  function onClick () {
    printer.open().then(function () {
      printer.align('center')
        .text('Hello World !!')
        .bold(true)
        .text('This is bold text')
        .bold(false)
        .underline(true)
        .text('This is underline text')
        .underline(false)
        .barcode('CODE39', '123456789')
        .cut()
        .print()
    })
  }
  // ...
</script>
```

## API

### Class

#### *new* Recta(key, port)
Create a new Recta object, parameter:

* Key: APPKEY used to authentication with Host, You can see on your [Recta Host][recta-host] Configuration
* Port: port of host, *default*: 1811

### Methods

### .open()
open connection to printer host.

*return* **Promise**

### .text('string')
print text.

note: it automaticaly add linefeed *(`\n`)* use `.raw()` instead if you wouldn’t add linefeed.

### .align('align')
set horizontal text align, parameter value can be:

* LEFT
* CENTER
* RIGHT

### .bold(true|false)
turn emphasized mode on / off, **default**: true

### .underline(true|false|2)
turn underline mode on / off, set `2` for set 2-dot width underline, **default**: true

### .font('A'|'B')
select character font `'A'` or `'B'`

### .mode(font, emphasized, doubleHeight, doubleWidth, underline)
select print modes, parameter:

* **font**: select character font, value: `'A'` or `'B'`, *default*: `'A'`
* **emphasized**: turn on / off emphasized / bold mode, value: `true` or `false`, *default*: `false`
* **doubleHeight**: turn on / off double height mode, value: `true` or `false`, *default*: `false`
* **doubleWidth**: turn on / off double width mode, value: `true` or `false`, *default*: `false`
* **underline**: turn on / off underline mode, value: `true` or `false`, *default*: `false`

### .cut(partial, linefeed)
cut paper, parameter:

* **partial**: if `true` execute partial cut (one point left uncut) else cut paper completely (full cut), value: `true` or `false`, *default*: `false`
* **linefeed**: add linefeed, value: **integer**, *default*: 4

### .barcode(type, barcode, barcodeHeight)
print barcode, parameter

* **type**: type of Barcode, value:
    * UPC-A
    * UPC-E
    * EAN13
    * EAN8
    * CODE39
    * ITF
    * CODABAR
    * CODE93
    * CODE128
* **barcode**: content barcode, value: **string**
* **barcodeHeight**: set barcode height *(optional)*, value: **integer**

### .barcodeHeight(height)
set barcode height, value can be range: 1 ≤ n ≤ 255

### .feed(n)
add linefeed as much as n, *default*: 4

### .raw(raw)
print raw text / buffer

### .print()
send print command to printer. ***printer wouldn’t execute until you call this***

### .reset()
send reset instruction to printer

### .flush()
return a sliced Buffer instance and clear buffer

*return* **Buffer**

### .clearBuffer()
clear buffer

### .close()
close connection to host

*return* **Promise**

## Events

### .on('open', function() {})
Fired upon successful connection

### .on('close', function() {})
Fired upon disconnected

### .on('error', function(error) {})
Fired when an error occurs

## Contributing

* Fork this repo
* Clone your repo
* Install dependencies
* Checkout a feature branch
* Feel free to add your features
* Make sure your features are fully tested
* Open a pull request, and enjoy <3

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

[recta-host]: http://github.com/adenvt/recta-host
