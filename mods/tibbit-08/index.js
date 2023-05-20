
var fs = require( 'fs');

class Wiegand {
 sock = '';

 constructor( _sock) {
   this.sock = _sock;
 }
 
 read_and_trim( ) {
   var r = fs.readFileSync( this.sysdev()+'mode', 'binary');
   r = ( r ? r.trim() : '');
   return( r);   }

 // returns the directory of the SYS socket Wiegand interface
 sysdev() {
   var r = '/sys/devices/platform/soc@B/soc@B:twg_';
   r += this.sock;
   r += '/';
   return( r);  }

 // Mode: 0 is Wiegand, 1 is Clock/Data
 // may trow an exception if dev not exist!
 mode_get() {  return( this.read_and_trim( 'mode'));  }
 mode_set( _mode) {  fs.writeFileSync( this.sysdev()+'mode', _mode);  }

 // Clear On-Read: delete data after read
 // may trow an exception if dev not exist!
 conr_get() {  return( this.read_and_trim( 'conr'));  }
 conr_set( _mode) {  fs.writeFileSync( this.sysdev()+'conr', _mode);  }

 // Output control pin
 // may trow an exception if dev not exist!
 out0_get() {  return( this.read_and_trim( 'out0'));  }
 out0_set( _mode) {  fs.writeFileSync( this.sysdev()+'out0', _mode);  }

 // Stats
 // may trow an exception if dev not exist!
 stat_done() {  return( this.read_and_trim( 'stat_done'));  }
 stat_over() {  return( this.read_and_trim( 'stat_over'));  }

 // returns the data in binary form:
 // [0,1] two-bytes length (in bits) = L
 // [2,2+L/8] = data
 R() {
   var B = '';
   // it handles the exception case if there is no data Driver returns ENXIO
   try {
     B = fs.readFileSync( this.sysdev() + 'data', null);
   } catch (_e) {  return( B);  }
   return( B) }

 // data len in Bytes
 data_lenB( _B) {   return( Math.ceil( this.data_lenb( _B)/8));  }

 // data len in bits
 data_lenb( _B) {
   if ( _B.length < 2) return( 0);
   return( _B.readUInt16LE( 0));  }

}

module.exports = Wiegand;
