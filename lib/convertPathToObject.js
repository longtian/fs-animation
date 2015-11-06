/**
 * Created by yan on 15-11-5.
 */

var path = require('path');

/**
 * conver path to object
 *
 * @deprecated This class is writtern before awareness of Immutable.Map's setIn deleteIn method which is cool !
 *
 * @param absolutePath
 * @returns {{}}
 */
function convertToObject(absolutePath) {
  absolutePath = path.normalize(absolutePath);

  var o = {};
  var lastDir = o;
  absolutePath.split(path.sep).slice(1).forEach(function (dirname) {
    lastDir[dirname] = {};
    lastDir = lastDir[dirname];
  });
  return o;
}

module.exports = convertToObject;