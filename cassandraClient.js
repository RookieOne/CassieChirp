var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'] });

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
      client.execute('CREATE TABLE IF NOT EXISTS chirp.chirps (id uuid PRIMARY KEY, message text);', function(err, result) {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
          console.log("Made Chirps Column / Table");
        }
      });
    }
  });
});

module.exports = exports = client;
