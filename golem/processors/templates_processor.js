var fs = require('fs');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var session = rk('session.js');

var utils = new FileUtils();

function TemplateProcessor(entry) {
  this._entry = entry;
}

TemplateProcessor.prototype.prepare = function(callback) {
  var e = this._entry;
  utils.read(e.path(), function(data) {
    session.addTemplate(e.grandParent(), e.name(), data);
    callback();
  });
};

module.exports = TemplateProcessor;