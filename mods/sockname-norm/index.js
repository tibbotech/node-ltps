
var parseSocketName = function( _sockname) {
 var p = /^s(\d{1,2})$/i.exec( _sockname);
 if ( p === null) return null;
 return( "s" + p[1].replace(/^0/,""));
}

var parsePinName = function( _pinname) {
 var p = /^S(\d{1,2})([ABCD])$/i.exec( _pinname);
 if ( p === null) return( null);
 return( "S"+p[1].replace(/^0/,"")+p[2].toUpperCase());
}

var parseSocketNamesList = function( _list) {
 if ( typeof _list !== "string" && typeof _list !== "object") return( null);
 if ( typeof _list === "string") _list = [_list];
 var p = _list.map( function( _sock) {
    return parseSocketName( _sock);
 })
 if ( p.filter( function( _s) {  return _s === null  }).length > 0) return( null);
 return( p)
}

module.exports = {
 parseSocketName : parseSocketName,
 parsePinName : parsePinName,
 parseSocketNamesList : parseSocketNamesList
}
