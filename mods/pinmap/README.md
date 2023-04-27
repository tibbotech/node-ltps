# pinmap

Converts the LTPP S<x><y> pin reference into real SoC value and vise-versa.

## Usage

```
const TPSpmap = require( './index.js');

var x = TPSpmap.getRpin( 'S1A');
console.log( 'CPU pin #:' + x);
```

## Requirements:

* /opt/tps-shared/hwini/pins.ini file or user-defined file (see ini() method)
should exist

## Methods:

### getRpin( _p)

Returns the real pin# for the S<N>{ABCD} virtual reference.

Ex: TPSpmap.getRpin( 'S1A') => 8

### ini( _pinsinifilename)

Parse pins.ini file at alternative location.

Ex: TPSpmap.ini( './pins.ini')
