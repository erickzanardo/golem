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
  var prepare = [];
  finder.on('path', function (file, stat) {
    var entry = new Entry(file, src, dest);
    if (entry.name().indexOf('_') !== 0) {
      entries.push(entry);
    }
  });

  finder.on('end', function () {
    prepare = [].concat(entries);
    prepareEntries();
  });

  var prepareEntries = function() {
    if (prepare.length) {
      var entry = prepare.shift();
      var processor = entry.processor();
      if (processor.prepare) {
        processor.prepare(prepareEntries);
      } else {
        prepareEntries();
      }
    } else {
      processEntries();
    }
  };

  var processEntries = function() {
    if (entries.length) {
      var entry = entries.shift();
      var processor = entry.processor();
      if (processor.process) {
        processor.process(processEntries);
      } else {
        processEntries();
      }
    } else {
      callback();
    }
  }
};

module.exports = Golem;