var findit = require('findit');
var rk = require('rekuire');

var Entry = rk('entry.js');

function Golem(src, dest) {
  this.src = src;
  this.dest = dest;
}

Golem.prototype.process = function(callback) {
  var src = this.src;
  var dest = this.dest;
  var finder = findit(this.src);

  var entries = [];
  finder.on('path', function (file, stat) {
    var entry = new Entry(file, file.replace(src, dest));
    entries.push(entry);
    if (entry.processor().stop) {
      finder.stop();
    }
  });

  finder.on('end', function () {
    processEntries();
  });

  var processEntries = function() {
    if (entries.length) {
      var entry = entries.shift();
      entry.processor().process(processEntries);
    } else {
      callback();
    }
  }
};

module.exports = Golem;