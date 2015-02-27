var rk = require('rekuire');
var StaticProcessor = rk('processors/static_processor.js');

function ProcessorFactory() {
}

ProcessorFactory.prototype.getProcessor = function(entry) {
  return new StaticProcessor(entry);
};

module.exports = new ProcessorFactory();