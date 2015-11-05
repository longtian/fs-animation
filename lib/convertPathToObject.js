/**
 * Created by yan on 15-11-5.
 */

var path = require('path');

/**
 * conver path to object
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