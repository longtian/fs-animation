/**
 * Created by yan on 15-11-5.
 */

var convertPathToObejct = require('../lib/convertPathToObject');
var deepEqual = require('assert').deepEqual;

describe('convertPathToObejct', function () {

  describe('in unix', function () {
    it('should work simple path', function () {
      deepEqual(convertPathToObejct("/a/b/c/d"), {
        "a": {
          "b": {
            "c": {
              "d": {}
            }
          }
        }
      });
    });

    it('should work .. path', function () {
      deepEqual(convertPathToObejct("/a/b/../d"), {
        "a": {
          "d": {}
        }
      });
    });
  });


  describe('in windows', function () {
    it('should work too');
  });

})