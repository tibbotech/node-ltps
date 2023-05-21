
var fs = require( 'fs');

class Wiegand {
 sock = '';
 fpfx = '';

 constructor( _sock) {
   this.sock = _sock;
   // search for Wiegand interfaces pfx
   this.fpfx = this.search_sysdev( _sock);
 }
 
 read_and_trim( ) {
   var r = fs.readFileSync( this.fpfx+'mode', 'binary');
   r = ( r ? r.trim() : '');
   return( r);   }

 // returns the directory of the SYS socket Wiegand interface
 search_sysdev( _sock) {
   var p = '/sys/devices/platform/soc@B/soc@B:twg_';
   var fp = p + _sock + '/';
   if ( fs.existsSync( fp)) return( fp);
   for ( var i = 0; i < 100; i++) {
     fp = p + i + '/';
     if ( !fs.existsSync( fp)) continue;
     fp = p + i + '/'+'of_node/tps-sock';
     if ( !fs.existsSync( fp)) continue;
     var r = fs.readFileSync( fp, 'binary').replace(/\0/g,'');
     if ( r != _sock) continue;
     return( p + i + '/');   }
   return( '');   }

 // Mode: 0 is Wiegand, 1 is Clock/Data
 // may trow an exception if dev not exist!
 mode_get() {  return( this.read_and_trim( 'mode'));  }
 mode_set( _mode) {  fs.writeFileSync( this.fpfx+'mode', _mode);  }

 // Clear On-Read: delete data after read
 // may trow an exception if dev not exist!
 conr_get() {  return( this.read_and_trim( 'conr'));  }
 conr_set( _mode) {  fs.writeFileSync( this.fpfx+'conr', _mode);  }

 // Output control pin
 // may trow an exception if dev not exist!
 out0_get() {  return( this.read_and_trim( 'out0'));  }
 out0_set( _mode) {  fs.writeFileSync( this.fpfx+'out0', _mode);  }

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
     B = fs.readFileSync( this.fpfx + 'data', null);
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
