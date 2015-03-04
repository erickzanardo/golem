#!/usr/bin/env node
var Golem = require('golem')

var args = process.argv;
var cwd = process.cwd();

var action = args.pop();
// TODO verify if action is a plugin

var path = action;

var golem = new Golem(cwd, path);
golem.process(function() {
  console.log('Golem process finished!');
});