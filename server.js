var Hapi = require('hapi');
var Inert = require('inert');
var routes = require('./lib/routes.js');

var server = new Hapi.Server();


server.register(Inert, function () {
    server.connection({
        port: process.env.PORT || 8080
    });
    server.route(routes);
});

server.start(function() {
    console.log('Server running at: ' + server.info.uri + '!');
});

module.exports = server;
