var rk = require('rekuire');

var processorFactory = rk('processors/processor_factory.js');

function Entry(path, dest) {
  this._path = path;
  this._dest = dest;
  
  var split = path.split('/');
  this._name = split[split.length - 1];
  this._processor = processorFactory.getProcessor(this);
}

Entry.prototype.path = function() {
  return this._path;
};

Entry.prototype.dest = function() {
  return this._dest;
};

Entry.prototype.name = function() {
  return this._name;
};

Entry.prototype.processor = function() {
  return this._processor;
};

module.exports = Entry