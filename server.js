var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');

var routes = require('./lib/routes.js');
var plugins = [
  'inert',
  'vision'
].map(require);

server.connection({ port: process.env.PORT || 8080 });
server.register(plugins, function (err) {
  if (err) throw err;
  server.route(routes);
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: path.join(__dirname, '/public/views'),
    path: '.',
    layout: 'default',
    layoutPath: 'layout',
    helpersPath: 'helpers',
    partialsPath: 'partials'
  });
});

module.exports = server;
