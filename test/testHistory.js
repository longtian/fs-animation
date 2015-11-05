/**
 * Created by yan on 15-11-5.
 */

var History = require('../lib/History');
var MockFSWatcher = require('../lib/MockFSWatcher');
var path = require('path');
var deepEqual = require('assert').deepEqual;

describe('History', function () {
  it('ok', function (done) {
    var watcher = new MockFSWatcher(path.join(__dirname, 'testHistory.txt'));
    var h = new History(watcher);
    watcher.on('end', function () {
      deepEqual(h.history[0].toJSON(), {
        "a": {
          "b": {}
        }
      });
      deepEqual(h._current.toJSON(), {
        "a": {
          "b": {},
          "c": {}
        }
      });
      done();
    });
  });
})