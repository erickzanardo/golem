var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')


function GolemDevserver() {
}

GolemDevserver.prototype.execute = function(golem) {
  var directory = golem.dest;
  var port = 8080;

  var serve = serveStatic(directory);
 
  // Create server 
  var server = http.createServer(function(req, res){
    var done = finalhandler(req, res)
    serve(req, res, done);
  });
   
  // Listen 
  server.listen(port);
  console.log('Listening on port ' + port +'.');
  var sys = require("sys");

  var stdin = process.openStdin();
  stdin.addListener('data', function(d) {
    var command = d.toString().substring(0, d.length-1);
    if (command == 'reload') {
      golem.process(function() {
        console.log('Reloaded!');
      });
    }
  });
};

module.exports = new GolemDevserver();