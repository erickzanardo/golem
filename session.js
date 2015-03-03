var dot = require('dot')

function Templates() {
  this._length = 0;
  this._templates = {};
}

Templates.prototype.addTemplate = function(name, html) {
  this._length++;
  this._templates[name] = {html: html};
};

Templates.prototype.length = function() {
  return this._length;
};

Templates.prototype.process = function(templateName, data) {
  var template = this._templates[templateName];
  if (template) {
    if (!template.compiledFunc) {
      template.compiledFunc = dot.template(template.html);
    }
    return template.compiledFunc(data);
  }
};

function Session() {
  this._entities = {};
  this._templates = {}
}

Session.prototype.addEntity = function(kind, entity) {
  this._entities[kind] = this._entities[kind] || [];
  this._entities[kind].push(entity);
};

Session.prototype.addTemplate = function(kind, templateName, html) {
  this._templates[kind] = this._templates[kind] || new Templates();
  this._templates[kind].addTemplate(templateName, html);
};

Session.prototype.getTemplates = function(kind) {
  return this._templates[kind];
};

Session.prototype.getEntities = function(kind) {
  return this._entities[kind];
}

module.exports = new Session();