/**
 * Created by yan on 15-11-5.
 */

var convertPathToObject = require('./convertPathToObject');
var Immutable = require('immutable');
var path = require('path');

function History(watcher) {
  var fs = Immutable.Map();
  var self = this;

  this.history = [];
  this.current = fs;

  watcher.on('all', function (eventName, filePath) {

    var keyPath = filePath.split(path.sep).slice(1);

    switch (eventName) {
      case 'add':
      case 'addDir':
        self.add(keyPath);
        break;
      case 'unlink':
      case 'unlinkDir':
        self.unlink(keyPath);
        break;
    }
  });
}

History.prototype.add = function (keyPath) {
  var newFS = this.current.setIn(keyPath, {});
  this.current = newFS;
  this.history.push(newFS);
};

History.prototype.unlink = function (keyPath) {
  var newFS = this.current.deleteIn(keyPath);
  this.current = newFS;
  this.history.push(newFS);
};

module.exports = History;