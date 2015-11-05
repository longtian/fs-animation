/**
 * Created by yan on 15-11-5.
 */
var Immutable = require('immutable');

var originalDir = {
    "home": {
        "wyvernnot": {
            ".ssh": {}
        }
    }
}


var o = Immutable.fromJS(originalDir);

var o2 = o.mergeDeep({
    "home": {
        "wyvernnot": {
            "download": {
                "github.tar": {}
            }
        }
    }
});








