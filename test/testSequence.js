/**
 * Created by yan on 15-11-15.
 */

var History = require('../lib/History');
var MockFSWatcher = require('../lib/MockFSWatcher');
var path = require('path');
var deepEqual = require('assert').deepEqual;

describe('History', function () {
  it('Meets wrong add sequence', function (done) {
    var watcher = new MockFSWatcher(path.join(__dirname, 'testSequence.txt'));
    var h = new History(watcher);
    watcher.on('end', function () {
      deepEqual(h.history[0].toJSON(), {
        "a": {
          "b": 1
        }
      });
      deepEqual(h.current.toJSON(), {
        "a": {
          "b": 1,
          "c": {}
        }
      });
      done();
    });
  });
})