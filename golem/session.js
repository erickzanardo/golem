var dot = require('dot')
var marked = require('marked');

// Templates
function Templates() {
  this._length = 0;
  this._templates = {};
}

Templates.prototype.addTemplate = function(name, html) {
  this._length++;
  this._templates[name] = {html: html};
};

Templates.prototype.getHtml = function(templateName) {
  var template = this._templates[templateName];
  var html = null;
  if (template) {
    html = template.html;
  }
  return html;
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
// Markdowns
function Markdowns() {
  this._length = 0;
  this._mds = {};
  this._names = [];
}

Markdowns.prototype.addMd = function(name, md) {
  this._length++;
  this._mds[name] = {md: md};
  this._names.push(name);
};

Markdowns.prototype.getName = function(i) {
  return this._names[i];
};

Markdowns.prototype.length = function() {
  return this._length;
};

Markdowns.prototype.process = function(mdName) {
  var md = this._mds[mdName];
  if (md) {
    if (!md.compiledValue) {
      md.compiledValue = marked(md.md);
    }
    return md.compiledValue;
  }
};

function Session() {
  this.clear();
}

Session.prototype.clear = function() {
  this._entities = {};
  this._templates = {};
  this._mds = {};
};

Session.prototype.addEntity = function(kind, entity) {
  this._entities[kind] = this._entities[kind] || [];
  this._entities[kind].push(entity);
};

Session.prototype.addTemplate = function(kind, templateName, html) {
  this._templates[kind] = this._templates[kind] || new Templates();
  this._templates[kind].addTemplate(templateName, html);
};

Session.prototype.addMd = function(kind, mdName, md) {
  this._mds[kind] = this._mds[kind] || new Markdowns();
  this._mds[kind].addMd(mdName, md);
};

Session.prototype.getTemplates = function(kind) {
  return this._templates[kind];
};

Session.prototype.getMds = function(kind) {
  return this._mds[kind];
};

Session.prototype.getEntities = function(kind) {
  return this._entities[kind];
}

module.exports = new Session();
