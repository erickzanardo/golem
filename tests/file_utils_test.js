var rk = require('rekuire');
var assert = require('assert');

var FileUtils = rk('file_utils.js');

describe('FileUtils', function() {
  describe('Sync', function() {
    var utils = new FileUtils('/tmp/test1');
    utils.reset();
    describe('#makeFolder', function() {
      utils.makeFolder('test');
      it('path should exists', function() {
        assert.equal(true, utils.exists('test'));
      });
    });
  
    describe('#makeFile', function() {
      utils.makeFile('test.txt', 'bla bla');
      it('path should exists', function() {
        assert.equal(true, utils.exists('test.txt'));
      });
      it('content should be equals', function() {
        assert.equal('bla bla', utils.read('test.txt'));
      });
    });
  });

  describe('Async', function() {
    var utils = new FileUtils('/tmp/test2');
    utils.reset();
    describe('#makeFolder', function() {
      it('path should exists', function(done) {
        utils.makeFolder('test', function() {
          utils.exists('test', function(data) {
            assert.equal(true, data);
            done();
          });
        });
      });
    });
  
    describe('#makeFile', function() {
      it('path should exists', function(done) {
        utils.makeFile('test.txt', 'bla bla', function() {
          assert.equal(true, utils.exists('test.txt'));
          done();
        });
      });
      it('content should be equals', function(done) {
        utils.read('test.txt', function(content) {
          assert.equal('bla bla', content);
          done();
        })
      });
    });
  });
});