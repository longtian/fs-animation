/**
 * Created by wyvern on 15/11/15.
 */

/**
 *
 * @param size file size
 * @constructor
 */
function Stat(size) {
  this.size = parseInt(size, 10) || 0;
}

/**
 * if fileSize is below zero, it is a folder
 * @returns {boolean}
 */
Stat.prototype.isDirectory = function () {
  return this.size < 0;
}

module.exports = Stat;