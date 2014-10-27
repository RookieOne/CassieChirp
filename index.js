var client = require('./cassandraClient');

var Hapi = require("hapi");

port = parseInt(process.env.PORT, 10) || 8000;
var server = new Hapi.Server('0.0.0.0', port, { cors: true });

var plugins = [];

server.pack.register(plugins, function (err) {

  server.route(require("./routes"));

  server.start(function() {
    console.log("Hapi server started " + server.info.uri);
  });
});
