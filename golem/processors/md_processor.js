var fs = require('fs');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var session = rk('session.js');

var utils = new FileUtils();

function MdProcessor(entry) {
  this._entry = entry;
}

MdProcessor.prototype.prepare = function(callback) {
  var e = this._entry;
  utils.read(e.path(), function(data) {
    session.addMd(e.grandParent(), e.name(), data);
    callback();
  });
};

module.exports = MdProcessor;