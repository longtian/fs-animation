/**
 * Created by yan on 15-11-5.
 */


var Immutable = require('immutable');

var map1 = Immutable.Map({
    a: 1,
    b: 1
});

var map2 = map1.set('b', 50);

console.log(map1.get('b'), map2.get('b'));