var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var Handlebars = require('handlebars');

var routes = require('./lib/routes.js');

var server = new Hapi.Server();

server.register(Inert, function () {
    server.connection({
        port: process.env.PORT || 8080
    });

    server.route(routes);

});

server.register(Vision, function() {
    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname + '/public/views',
        path: '.',
        layout: 'default',
        layoutPath: 'layout',
        helpersPath: 'helpers',
        partialsPath: 'partials'
    });

});

server.start(function() {
    console.log('Server running at: ' + server.info.uri + '!');

});

module.exports = server;
