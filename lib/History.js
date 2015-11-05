/**
 * Created by yan on 15-11-5.
 */

var convertPathToObject = require('./convertPathToObject');
var Immutable = require('immutable');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

function History(watcher) {
  var self = this;
  this.history = [];
  this.current = Immutable.Map();

  watcher.on('all', function (eventName, filePath, stat) {
    var keyPath = filePath.split(path.sep).slice(1);
    switch (eventName) {
      case 'add':
      case 'addDir':
        self.add(keyPath, stat);
        self.emit('update');
        break;
      case 'unlink':
      case 'unlinkDir':
        self.unlink(keyPath, stat);
        self.emit('update');
        break;
      default :
        break;
    }
  });
}

History.prototype = Object.create(EventEmitter.prototype);

History.prototype.add = function (keyPath, stat) {

  if (stat && stat.isDirectory) {
    stat.dir = stat.isDirectory();
  }

  var newFS = this.current.setIn(keyPath, Immutable.Map({
    //_stat: stat
  }));

  this.current = newFS;
  this.history.push(newFS);
};

History.prototype.unlink = function (keyPath) {
  var newFS = this.current.deleteIn(keyPath);
  this.current = newFS;
  this.history.push(newFS);
};

module.exports = History;