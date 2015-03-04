var assert = require('assert');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var Golem = rk('golem.js');

describe('Golem#Static resources', function() {
  describe('Static resources should just be copied', function() {
    var utils = new FileUtils('/tmp/static');
    utils.reset();
    utils.makeFolder('emptyfolder');
    utils.makeFolder('assets');
    utils.makeFile('index.html', 'bla');
    utils.makeFile('assets/index.js', 'function bla() {}');

    var golem = new Golem('/tmp/static', '/tmp/static_generated');
    it('Structure should have been copied', function(done) {
      golem.process(function() {
        var dest = new FileUtils('/tmp/static_generated');
        assert.equal(true, dest.exists('emptyfolder'));
        assert.equal(true, dest.exists('assets'));
        assert.equal(true, dest.exists('index.html'));
        assert.equal(true, dest.exists('assets/index.js'));

        assert.equal('bla', dest.read('index.html'));
        assert.equal('function bla() {}', dest.read('assets/index.js'));
        done();
      });
    });
  });
});