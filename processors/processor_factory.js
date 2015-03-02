var rk = require('rekuire');
var StaticProcessor = rk('processors/static_processor.js');
var EntitiesProcessor = rk('processors/entities_processor.js');

function ProcessorFactory() {
}

ProcessorFactory.prototype.getProcessor = function(entry) {
  if (entry.parent() == '_entities')
    return new EntitiesProcessor(entry);
  else
    return new StaticProcessor(entry);
};

module.exports = new ProcessorFactory();