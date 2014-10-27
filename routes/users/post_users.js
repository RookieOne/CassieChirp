var cassandra = require('cassandra-driver');
var client = require('../../cassandraClient');

module.exports = {
  method: "POST",
  path: "/users",
  config: {
    handler: function(request, reply) {
      var username = request.payload.username;
      var email = request.payload.email;

      var queries = [{
        query: 'INSERT INTO chirp.users (id, email) VALUES(?, ?);',
        params: [username, email]
      }, {
        query: 'INSERT INTO chirp.user_chirps (id) VALUES(?);',
        params: [username]
      }];

      client.batch(queries, {}, function(err, res) {
          if (err) {
            reply(err.message);
          } else {
            console.log(res);
            reply('Account created! Start chirping');
          }
        });
    }
  }
};
