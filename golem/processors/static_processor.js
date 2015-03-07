var fs = require('fs');
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');

function StaticProcessor(entry) {
  this._entry = entry;
}

StaticProcessor.prototype.process = function(done) {
  var path = this._entry.path();
  var dest = this._entry.dest();
  utils = new FileUtils();
  fs.lstat(path, function(err, stat) {
    if (stat.isDirectory()) {
      utils.makeFolder(dest, done);
    } else {
      utils.readRaw(path, function(content) {
        utils.makeFileRaw(dest, content, done);
      });
    }
  });
};

module.exports = StaticProcessor;