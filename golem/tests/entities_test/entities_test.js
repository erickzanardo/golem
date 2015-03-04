var assert = require('assert');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var Golem = rk('golem.js');
var session = rk('session.js');

describe('Golem#Entities', function() {
  describe('Entities must be in the Session', function() {
    var utils = new FileUtils('/tmp/static_entities');
    utils.reset();
    utils.makeFolder('_entities');
    utils.makeFile('_entities/person1.json', JSON.stringify({name: 'Jack Sparrow'}));
    utils.makeFile('_entities/person2.json', JSON.stringify({name: 'James Bond'}));

    utils.makeFolder('vehicles');
    utils.makeFolder('vehicles/_entities');
    utils.makeFile('vehicles/_entities/vehicle1.json', JSON.stringify({name: 'Black Pearl'}));
    utils.makeFile('vehicles/_entities/vehicle2.json', JSON.stringify({name: 'Aston Martin DB5'}));
    

    var golem = new Golem('/tmp/static_entities', '/tmp/static_entities_generated');
    it('The entities should be stored on the session', function(done) {
      golem.process(function() {
        var persons = session.getEntities(''); // Root
        assert.equal(2, persons.length);
        assert.equal('Jack Sparrow', persons[0].name);
        assert.equal('James Bond', persons[1].name);

        var vehicles = session.getEntities('vehicles'); // Root
        assert.equal(2, vehicles.length);
        assert.equal('Black Pearl', vehicles[0].name);
        assert.equal('Aston Martin DB5', vehicles[1].name);
        done();
      });
    });
  });
});