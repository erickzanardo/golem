var assert = require('assert');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var Golem = rk('golem.js');
var session = rk('session.js');

describe('Golem#Tasks', function() {
  describe('Simple task that create a json file', function() {
    session.clear();
    var utils = new FileUtils('/tmp/static_tasks');
    utils.reset();
    utils.makeFolder('_tasks');
    utils.makeFile('_tasks/t_sync.js', 
      '(function task(session, fileUtils, done) { ' +
      '  fileUtils.makeFile(\'bla.json\', \'{"name": "Jack Sparrow"}\'); ' +
      '  done(); ' +
      '})'
    );

    utils.makeFolder('bla');
    utils.makeFolder('bla/_tasks');
    utils.makeFile('bla/_tasks/t_async.js', 
      '(function task(session, fileUtils, done) {' +
      '  fileUtils.makeFile(\'ble.json\', \'{"name": "James Bond"}\', done); ' +
      '}) '
    );

    var golem = new Golem('/tmp/static_tasks', '/tmp/static_tasks_generated');
    utils = new FileUtils('/tmp/static_tasks_generated');
    it('Tasks must have been executed and files generated on it\'s folder', function(done) {
      session.clear();
      golem.process(function() {
        assert.equal(true, utils.exists('bla.json'));
        assert.equal('Jack Sparrow', JSON.parse(utils.read('bla.json')).name);

        assert.equal(true, utils.exists('bla/ble.json'));
        assert.equal('James Bond', JSON.parse(utils.read('bla/ble.json')).name);

        done();
      });
    });
  });

  describe('More complex task that users template and entities', function() {
    var utils = new FileUtils('/tmp/static_tasks2');
    utils.reset();
    utils.makeFolder('_entities');
    utils.makeFolder('_templates');
    utils.makeFolder('_tasks');
    utils.makeFile('_entities/person.json', JSON.stringify({name: 'James', surname: 'Bond'}));
    utils.makeFile('_templates/person.html', '<h1>My name is {{=it.surname}}, {{=it.name}} {{=it.surname}}</h1>');
    utils.makeFile('_tasks/t_sync.js', 
      '(function task(session, fileUtils, done) { ' +
      '  var jamesBond = session.getEntities(\'\')[0];' +
      '  var html = session.getTemplates(\'\').process(\'person.html\', jamesBond);' +
      '  fileUtils.makeFile(\'page.html\', html); ' +
      '  done(); ' +
      '})'
    );

    var golem = new Golem('/tmp/static_tasks2', '/tmp/static_tasks_generated2');
    utils = new FileUtils('/tmp/static_tasks_generated2');
    it('Tasks must have been executed and files generated on it\'s folder', function(done) {
      session.clear();
      golem.process(function() {
        assert.equal(true, utils.exists('page.html'));
        assert.equal('<h1>My name is Bond, James Bond</h1>', utils.read('page.html'));

        done();
      });
    });
  });
});