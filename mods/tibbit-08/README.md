# Tibbit #08 (Wiegand and clock/data reader port)

The node module for data collection from [Tibbit #08 (Wiegand and clock/data reader port) block](http://tibbo.com/datasheets/tibbits/08.html).

## Installation Instructions
```
npm install @tibbo-tps/tibbit-08
```

## Usage (the complete example)
See test.js and index.js
```js
const Wiegand = require("./index.js");

const {execSync} = require('child_process');

// socket should be 'S5' for example
// var sock = '0';
var sock = 's5';

var W = new Wiegand( sock);

// need to handle the exception for the first access, case
// the device SYS interface may not exist
try {
 console.log( 'Sock:' + sock + ' Mode:' + W.mode_get());
} catch (_e) {  console.log( _e.message);  process.exit( -1);  }

W.mode_set( '1');
console.log( 'Mode now:' + W.mode_get() + ' Out0:' + W.out0_get());
console.log( 'Stats done:' + W.stat_done() + ' over:' + W.stat_over());

console.log( 'waiting for card...');

while ( true) {
 execSync('sleep 1');
 B = W.R();
 if ( B.length < 1) continue;
 console.log( B);
 console.log( 'bits:' + B[ 0] + ' b:' + W.data_lenb( B) + ' B:' + W.data_lenB( B));
 for ( i = 2; i < W.data_lenB( B) + 2; i++) console.log( B[i].toString(16));
}
```

## API Methods:

### constructor( _socket)
* _socket - TPP socket name, 's01' for ex

### .mode_get() / .mode_set(_val)
* get/set the Tibbit-08 mode: 0 - is Wiegand, 1 - is Clock/Data
### .out0_get() / .out0_set(_val)
* get/set the Tibbit-08 Output Control pin value
### .stat_done() / .stat_over()
* get data reads Done / Overruns
### .data_lenB(_B) / .data_lenb(_B)
* _B is the Buffer.
Decodes the value of the length field in data (in Bytes / in bits)
### .R()
* Reads the data Buffer. max length is 514 bytes.
2 first bytes is the data length in bits, so you need to skip it in your app
(see an example).

## Examples:

### General case

```js
var W = new Wiegand( 's21');
while ( true) {
 B = W.R();
 if ( B.length < 1) continue;
 console.log( B);
 console.log( 'bits:' + B[ 0] + ' b:' + W.data_lenb( B) + ' B:' + W.data_lenB( B));
 // print the data buffer in hex
 for ( i = 2; i < W.data_lenB( B) + 2; i++) console.log( B[i].toString(16));
}
```

### Keypad

```js
var W = new Wiegand( 's21');
while ( true) {
 B = W.R();
 if ( B.length < 1) continue;
 var key = parseInt( B.readUInt16LE( 2));
    if(key == 11 && value !== ""){
        console.log(value);
        value = "";
    }else if(key == 10){
        value = ""
    }else{
        value += key;
    }
}
```

## About the Tibbit #08 block

### About

Our programmable devices (such as TPP2 and TPP3) have the unique ability to process input from card readers with clock/data or Wiegand interface. This is achieved through the ser. object running in the clock/data or Wiegand mode. Tibbit #08 implements necessary hardware.

In order to be able to process card reader output, this Tibbit has to be connected to the RX and CTS lines of the CPU's UART (see [SER]).

When connecting a clock/data reader, wire the clock line to IO1, and the data line to IO2. Set the CONTROL line to LOW — this selects the clock/data mode for the Tibbit's hardware.

When connecting a Wiegand reader, wire the W0 line to IO1, W1 line -- to IO2. Set the CONTROL line to HIGH to select the Wiegand mode.

In both cases, the IO3 line must be connected to the external power source. Most card readers with clock/data and Wiegand interfaces have open collector outputs. Such outputs require pull-up resistors on the receiving end. On this Tibbit, the role of pull-up resistors is played by opto-LEDs and resistors connected in series.

The exact voltage of the power source depends on the reader. Very often it is the supply voltage for the reader itself (typically, +12V). In this case just split the reader power line and connect the same power to IO3. Some readers require 12V power and pull-up resistors to 5V. This means IO3 will need to receive +5V.

This Tibbit also has a standalone open collector output controlled through LINE D. Set LINE D LOW to open the transistor. When left unconnected, the line defaults to HIGH (hence, the transistor is closed).

Combine this Tibbit with terminal block devices -- #20 (nine terminal blocks) or #21 (four terminal blocks). Note that #21 doesn't provide the ground line, and using this Tibbit requires the ground line between the reader and your system. Hence, if you use Tibbit #21 you will need to "steal" the ground somewhere else.

Check out the Tibbit #11 (four open collector outputs) if you are looking to emulate clock/data or Wiegand reader output (that is, of you want to turn your device into a reader that outputs data).

### Leds

There are four LEDs: two red and two green. Red LEDs are connected to the CONTROL and OC line. Green LEDs are connected to W0&1 and W1 lines. All LEDs are buffered (with logic gates) and light up for the LOW state of control lines.
