var _ = require("underscore");
var routes = [];

routes.push(require("./chirps"));

module.exports = _.flatten(routes);
