/**
 * Created by yan on 15-11-5.
 */

var Immutable = require('immutable');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

/**
 * @param watcher {EventEmitter} which will emit file system change events
 *
 * @constructor
 */
function History(watcher) {
  var self = this;

  /**
   * @type {Array}
   */
  this.history = [];

  /**
   * @type {Immutable.Map}
   */
  this.current = Immutable.Map();

  watcher.on('all', function (eventName, filePath, stat) {
    switch (eventName) {
      case 'add':
      case 'addDir':
        self.add(filePath, stat);
        self.emit('update');
        break;

      case 'unlink':
      case 'unlinkDir':
        self.unlink(filePath, stat);
        self.emit('update');
        break;

      default :
        break;
    }
  });
}

History.prototype = Object.create(EventEmitter.prototype);


/**
 * add a record
 *
 * @param filePath
 * @param stat
 */
History.prototype.add = function (filePath, stat) {
  var keyPath = filePath.split(path.sep).slice(1);
  var newFS;

  // if it is not a directory, just set the size
  if (!stat.isDirectory()) {
    newFS = this.current.setIn(keyPath, stat.size);

  // only when it is an unknown directory, then add it
  } else if(!this.current.hasIn(keyPath)) {
    newFS = this.current.setIn(keyPath, Immutable.Map({
      //_stat: stat
    }));
  }

  if(newFS){
    this.current = newFS;
    this.history.push(newFS);
  }
};

/**
 * remove a record
 *
 * @param filePath
 */
History.prototype.unlink = function (filePath) {
  var keyPath = filePath.split(path.sep).slice(1);

  var newFS = this.current.deleteIn(keyPath);
  this.current = newFS;
  this.history.push(newFS);
};

module.exports = History;