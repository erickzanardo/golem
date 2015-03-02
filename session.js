function Session() {
  this._entities = {};
}

Session.prototype.addEntity = function(kind, entity) {
  this._entities[kind] = this._entities[kind] || [];
  this._entities[kind].push(entity);
};

Session.prototype.getEntities = function(kind) {
  return this._entities[kind];
}

module.exports = new Session();