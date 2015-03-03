var assert = require('assert');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var Golem = rk('golem.js');
var session = rk('session.js');

describe('Golem#Templates', function() {
  describe('Templates must be on compiled on the session', function() {
    var utils = new FileUtils('/tmp/static_templates');
    utils.reset();
    utils.makeFolder('_templates');
    utils.makeFile('_templates/template1.html', '<h1>Here is a sample template {{=it.foo}}</h1>');

    utils.makeFolder('bla');
    utils.makeFolder('bla/_templates');
    utils.makeFile('bla/_templates/template2.html', '<h1>Here is another sample template {{=it.foo}}</h1>');
    

    var golem = new Golem('/tmp/static_templates', '/tmp/static_templates_generated');
    it('Templates must be the session and processing data', function(done) {
      golem.process(function() {
        var templates = session.getTemplates(''); // Root
        assert.equal(1, templates.length());
        assert.equal('<h1>Here is a sample template Sir</h1>', templates.process('template1.html', {foo: 'Sir'}));

        templates = session.getTemplates('bla');
        assert.equal(1, templates.length());
        assert.equal('<h1>Here is another sample template Sir</h1>', templates.process('template2.html', {foo: 'Sir'}));
        done();
      });
    });
  });
});