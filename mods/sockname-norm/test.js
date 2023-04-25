var parser = require("./index.js");

console.log("Pins:")

var testPin = [
    {value:"s1a", expect:"S1A"},
    {value:"s01B", expect:"S1B"},
    {value:"s12c", expect:"S12C"},
    {value:"S15D", expect:"S15D"},
    {value:"S015D", expect:null},
    {value:"s11F", expect:null},
    {value:1, expect:null},
]

testPin.forEach(function(test){
    console.log(test.value+" => "+(parser.parsePinName(test.value) === test.expect))
})

console.log("Sockets:")

var testSocket = [
    {value:"s5", expect:"s5"},
    {value:"s02", expect:"s2"},
    {value:"S12", expect:"s12"},
    {value:"01", expect:null},
    {value:"S12D", expect:null},
    {value:"z01", expect:null},
    {value:1, expect:null},
]

testSocket.forEach(function(test){
    console.log(test.value+" => "+(parser.parseSocketName(test.value) === test.expect))
})

console.log("Socket lists:")

var testLists = [
    {value:"s5", expect:["s5"]},
    {value:["s02","S12","S3"], expect:["s2","s12","s3"]},
    {value:1, expect:null},
    {value:["s11","S12D"], expect:null}
]

testLists.forEach(function(test){
    console.log(test.value+" => "+parser.parseSocketNamesList(test.value)+" === "+test.expect)
})

