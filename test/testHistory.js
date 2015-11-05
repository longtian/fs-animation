/**
 * Created by yan on 15-11-5.
 */

var History = require('../lib/History');
var MockFSWatcher = require('../lib/MockFSWatcher');
var path = require('path');
var deepEqual = require('assert').deepEqual;

describe('History', function () {
  it('add', function (done) {
    var watcher = new MockFSWatcher(path.join(__dirname, 'testHistoryAdd.txt'));
    var h = new History(watcher);
    watcher.on('end', function () {
      deepEqual(h.history[0].toJSON(), {
        "a": {
          "b": {}
        }
      });
      deepEqual(h.current.toJSON(), {
        "a": {
          "b": {},
          "c": {}
        }
      });
      done();
    });
  });

  it('unlink', function (done) {
    var watcher = new MockFSWatcher(path.join(__dirname, 'testHistoryAddAndUnlink.txt'));
    var h = new History(watcher);
    watcher.on('end', function () {
      deepEqual(h.history[1].toJSON(), {
        "a": {
          "b": {},
          "c": {}
        }
      });
      deepEqual(h.current.toJSON(), {
        "a": {}
      });
      done();
    });
  });
})