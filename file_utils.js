var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var fs = require('fs');

function TestUtils(path) {
  this._path = path || '';
}

TestUtils.prototype.makeFolder = function(src, callback) {
  var _f = callback ? mkdirp : mkdirp.sync;
  _f(this.path(src), function (err) {
    if (err) {
      console.error(err)
    } else {
      if (callback) callback();
    }
  });
};

TestUtils.prototype.makeFile = function(src, content, callback) {
  if (!callback)
    fs.writeFileSync(this.path(src), content, 'utf8');
  else
    fs.writeFile(this.path(src), content, 'utf8', callback);
};

TestUtils.prototype.reset = function() {
  rimraf.sync(this._path);
};

TestUtils.prototype.exists = function(src, callback) {
  if (!callback)
    return fs.existsSync(this.path(src));
  else 
    fs.exists(this.path(src), callback);
};

TestUtils.prototype.read = function(src, callback) {
  if (!callback)
    return fs.readFileSync(this.path(src));
  else
    fs.readFile(this.path(src), function(err, data) {
      callback(data);
    });
};

TestUtils.prototype.path = function(path) {
  return this._path + '/' + path;
};

module.exports = TestUtils;