const TPSpmap = require( './index.js');

var x = TPSpmap.getRpin( 'S1A');

console.log("Pins:");

var testPin = [
    {value:"s1a", expect:null},
    {value:"s01B", expect:null},
    {value:"S1C", expect:"10"},
    {value:"S15D", expect:"39"},
    {value:"MD", expect:"3"},
    {value:"s11F", expect:null},
    {value:1, expect:null},
]

testPin.forEach(function(test){
 var x = TPSpmap.getRpin( test.value);
 console.log( 'TPSpmap.getRpin(' + test.value + ') => ' + x + ' expected:' + test.expect + ' ' + ( TPSpmap.getRpin( test.value) === test.expect))
})
