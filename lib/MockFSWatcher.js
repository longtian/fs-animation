/**
 * Created by yan on 15-11-5.
 */

var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var MockStat = require('./MockStat.js');

/**
 *
 * @link https://github.com/paulmillr/chokidar/blob/1.2.0/index.js#L33
 * @param logFilePath
 * @throw Error is logFilePath does not exist or unaccessable
 *
 * @constructor
 */
function MockFSWatcher(logFilePath) {
  var self = this;

  var log = fs.readFileSync(logFilePath).toString();

  process.nextTick(function () {
    log.split("\n").forEach(function (line) {
      var splited = line.split(' ');
      var eventName = splited[0];
      var path = splited[1];
      var stat = new MockStat(splited[2]);
      self.emit(eventName, path, stat);
      self.emit('all', eventName, path, stat);
    });
    self.emit('end');
  });

}

MockFSWatcher.prototype = Object.create(EventEmitter.prototype);

module.exports = MockFSWatcher