var client = require('../../cassandraClient');

module.exports = {
  method: "GET",
  path: "/chirps",
  config: {
    handler: function(request, reply) {
      client.execute('SELECT * FROM chirp.chirps', function(err, result) {
        if (err) {
          reply(err.message);
        } else {
          reply(result.rows.map(function(chirp) {
            return {
              message: chirp.message
            };
          }));
        }
      });
    }
  }
};
