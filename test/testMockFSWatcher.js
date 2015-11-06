/**
 * Created by yan on 15-11-5.
 */
var MockFSWatcher = require('../lib/MockFSWatcher');
var path = require('path');

describe('MockFS', function () {
  it('should', function (done) {
    var watcher = new MockFSWatcher(path.join(__dirname, 'testMockFSWatcher.txt'));
    watcher.once('all', function () {
      done();
    });
  });
})