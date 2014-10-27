var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'] });

var logResult = function(message) {
  return function(err, res) {
    if (err) {
      console.log(err.message);
    } else {
      console.log(message);
    }
  }
};

client.connect(function(err, result) {
  console.log('Connected!');
  info = client.hosts.slice(0).map(function(node) {
    return { address: node.address, rack: node.rack, datacenter: node.datacenter };
  });
  console.log(info);

  client.execute("CREATE KEYSPACE IF NOT EXISTS chirp WITH replication = {'class' : 'SimpleStrategy', 'replication_factor' : 3};", function(err, result) {
    if (err) {
      console.log(err.message);
    } else {
      console.log(result);
      console.log("Made keyspace");

      client.execute('CREATE TABLE IF NOT EXISTS chirp.chirps (id uuid PRIMARY KEY, message text, user text);', function(err, result) {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Made Chirps Tables");
          client.execute('ALTER TABLE chirp.chirps ADD user text', logResult("Add user column to chirp.chirps"));
        }
      });
      client.execute('CREATE TABLE IF NOT EXISTS chirp.users (id text PRIMARY KEY, email text);', function(err, result) {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Made Users Tables");
        }
      });
      client.execute('CREATE TABLE IF NOT EXISTS chirp.user_chirps (id text PRIMARY KEY);', function(err, result) {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Made User Chirps Tables");
          client.execute('ALTER TABLE chirp.user_chirps ADD chirps map<timestamp, text>', logResult("Add chirps column to chirp.user_chirps"));
        }
      });
    }
  });
});

module.exports = exports = client;
