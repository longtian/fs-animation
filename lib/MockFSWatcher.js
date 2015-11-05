/**
 * Created by yan on 15-11-5.
 */

var EventEmitter = require('events').EventEmitter;
var fs = require('fs');

function MockFSWatcher(logFilePath) {
  var self = this;

  var log = fs.readFileSync(logFilePath).toString();

  process.nextTick(function () {
    log.split("\n").forEach(function (line) {
      var splited = line.split(' ');
      var eventName = splited[0];
      var path = splited[1];
      self.emit(eventName, path);
      self.emit('all', eventName, path);
    });
    self.emit('end');
  });

}

MockFSWatcher.prototype = Object.create(EventEmitter.prototype);

module.exports = MockFSWatcher