var client = require('../../cassandraClient');

module.exports = {
  method: "GET",
  path: "/{user}/chirps",
  config: {
    handler: function(request, reply) {
      var query = 'SELECT id, chirps FROM chirp.user_chirps WHERE id = ?';
      var params = [request.params.user];

      client.execute(query, params, function(err, result) {
        if (err) {
          reply(err.message);
        } else {
          var chirps = result.rows[0].chirps;
          reply(chirps);
        }
      });
    }
  }
};
