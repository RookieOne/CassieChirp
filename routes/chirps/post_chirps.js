var cassandra = require('cassandra-driver');
var client = require('../../cassandraClient');

module.exports = {
  method: "POST",
  path: "/chirps",
  config: {
    handler: function(request, reply) {
      var id = cassandra.types.uuid();

      client.execute('INSERT INTO chirp.chirps (id, message) VALUES(?, ?);',
        [id, request.payload.message],
        function(err, res) {
          if (err) {
            reply(err.message);
          } else {
            console.log(res);
            reply('You just chirped!');
          }
        });
    }
  }
};
