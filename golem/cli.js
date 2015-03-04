#!/usr/bin/env node
var Golem = require('golem')

var args = process.argv;
var cwd = process.cwd();

var pluginName = null;
var path = null;

var validUsage = false;
if (args.length == 4) {
  pluginName = args.pop();
  path = args.pop();
  validUsage = true;
} else if(args.length == 3) {
  path = args.pop();
  validUsage = true;
}

if (validUsage) {
  var golem = new Golem(cwd, path);

  golem.process(function() {
    if (pluginName) {
      try {
        var plugin = require('golem-' + pluginName);
        plugin.execute(golem);
      } catch (e) {
        console.log(e);
        if (e.code == 'MODULE_NOT_FOUND') {
          console.log(' There is no plugin "' + pluginName + '" installed ');
          console.log(' Maybe you need to install it running "npm instal golem-'+ pluginName +  ' -g" ');
        } else {
          throw e;
        }
      }
    } else {
      console.log('Golem process finished!');
    }
  });
} else {
  console.log(' Invalid command ');
  console.log('  Usage: golem /DEST/PATH [plugin_name] ');
}
