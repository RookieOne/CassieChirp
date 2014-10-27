var _ = require("underscore");
var routes = [];

routes.push(require("./chirps"));
routes.push(require("./users"));

module.exports = _.flatten(routes);
