var fs = require('fs');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var session = rk('session.js');

var utils = new FileUtils();

function EntitiesProcessor(entry) {
  this._entry = entry;
}

EntitiesProcessor.prototype.prepare = function(callback) {
  var e = this._entry;
  utils.read(e.path(), function(data) {
    var entity = JSON.parse(data);
    session.addEntity(e.grandParent(), entity);
    callback();
  });
};

module.exports = EntitiesProcessor;