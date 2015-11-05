/**
 * Created by yan on 15-11-5.
 */

var convertPathToObject = require('./convertPathToObject');
var Immutable = require('immutable');

function History(watcher) {
  var fs = Immutable.Map();
  var self = this;

  this.history = [];
  this._current = fs;


  watcher.on('all', function (eventName, path) {
    switch (eventName) {
      case 'add':
      case 'addDir':
        var newFS = self._current.mergeDeep(convertPathToObject(path));
        self._current = newFS;
        self.history.push(newFS);
        break;
    }
  });
}

module.exports = History;