var assert = require('assert');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var Golem = rk('golem.js');
var session = rk('session.js');

describe('Golem#Markdowns', function() {
  describe('Markdowns must be on on the session', function() {
    var utils = new FileUtils('/tmp/static_mds');
    utils.reset();
    utils.makeFolder('_mds');
    utils.makeFile('_mds/bla.md', 'I am using __markdown__.');

    utils.makeFolder('bla');
    utils.makeFolder('bla/_mds');
    utils.makeFile('bla/_mds/bla2.md', 'I am using __markdown__ too.');

    var golem = new Golem('/tmp/static_mds', '/tmp/static_mds_generated');
    it('Markdown must be in the session and generating html', function(done) {
      session.clear();
      golem.process(function() {
        var mds = session.getMds(''); // Root
        assert.equal(1, mds.length());
        assert.equal('<p>I am using <strong>markdown</strong>.</p>\n', mds.process('bla.md'));

        mds = session.getMds('bla');
        assert.equal(1, mds.length());
        assert.equal('<p>I am using <strong>markdown</strong> too.</p>\n', mds.process('bla2.md'));
        done();
      });
    });
  });
});