var fs = require( 'fs');
var ini = require( 'ini');

const pinmap = new class {
 c = null;
 constructor() {  this.ini( '/opt/tps-shared/hwini/pins.ini');  }

 ini( _x) {
   var fc = null;
   try {
     fc = fs.readFileSync( _x, 'utf-8');
   } catch (_e) {  console.error( _e.message);  return;  }
   this.c = ini.parse( fc);
 }

 getRpin( _pin) {
   var ret = null;
   if ( this.c === null) return( ret);
   for ( const _k in this.c.CPU) {
     if ( _k == _pin) {  ret = this.c.CPU[_k];  break;  }
   }
   return( ret);
 }
};

module.exports = pinmap;
