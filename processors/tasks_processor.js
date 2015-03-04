var fs = require('fs');
var eval2 = require( 'eval2' );
var rk = require('rekuire');

var FileUtils = rk('file_utils.js');
var session = rk('session.js');

var utils = new FileUtils();

function TasksProcessor(entry) {
  this._entry = entry;
  this._f = null;
}

TasksProcessor.prototype.prepare = function(callback) {
  var e = this._entry;
  var that = this;
  utils.read(e.path(), function(data) {
    that._f = eval2(data);
    callback();
  });
};

TasksProcessor.prototype.process = function(callback) {
  var e = this._entry;
  var split = e.dest().split('/');
  split.pop();
  split.pop();
  var path = split.join('/');
  var fileUtils = new FileUtils(path);
  this._f(session, fileUtils, callback);
};

module.exports = TasksProcessor;