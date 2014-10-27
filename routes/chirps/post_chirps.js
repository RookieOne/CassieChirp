var cassandra = require('cassandra-driver');
var client = require('../../cassandraClient');

module.exports = {
  method: "POST",
  path: "/chirps",
  config: {
    handler: function(request, reply) {
      var id = cassandra.types.uuid();
      var user = request.payload.user;
      var message = request.payload.message;
      var timestamp = new Date();

      var queries = [{
        query: 'INSERT INTO chirp.chirps (id, user, message) VALUES(?, ?, ?);',
        params: [id, user, message]
      }, {
        query: 'UPDATE chirp.user_chirps SET chirps[?] = ? WHERE id = ?;',
        params: [timestamp, message, user]
      }];

      client.batch(queries, {}, function(err, res) {
          if (err) {
            reply(err.message);
          } else {
            reply('You just chirped!');
          }
        });
    }
  }
};
