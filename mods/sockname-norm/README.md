# socket-name-parser

Normilize LTPP socket and pin names

## Methods:

### parseSocketName(name)

Returns socket name or null if name can't be normalized.

E.g. S01 => s1, S110 => null

### parsePinName(name)

Returns pin name or null if name can't be normalized.

E.g. s01A => S1A, s12F => null

### parseSocketNamesList(names)

* names - a single socket name or names array.

Returns list of names or null if any of names can't be normalized.

E.g. S01 => s1, ["s05","S12"] => ["s5","s12"], ["s110",4] => null
