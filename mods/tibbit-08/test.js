const Wiegand = require("./index.js");

const {execSync} = require('child_process');

// socket should be 'S1' for examle
// var sock = '0';
// or
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
