var rk = require('rekuire');

var processorFactory = rk('processors/processor_factory.js');

function Entry(path, golemSrc, golemDest) {
  this._path = path;
  this._dest = path.replace(golemSrc, golemDest);
  
  var split = path.replace(golemSrc, '').split('/');
  this._name = split[split.length - 1];
  this._parent = split[split.length - 2];
  this._grandParent = split[split.length - 3];

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

Entry.prototype.parent = function() {
  return this._parent;
};

Entry.prototype.grandParent = function() {
  return this._grandParent;
};

Entry.prototype.processor = function() {
  return this._processor;
};

module.exports = Entry