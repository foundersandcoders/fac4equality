module.exports = [

    {
        method: 'GET',
        path: '/',
        config: {
            description: 'this is the home page',
            handler: function(request, reply) {
                return reply.view("landing");
            }
        }
    },

    {
        method: 'GET',
        path: '/dashboard',
        config: {
            description: 'this is the dashboard',
            handler: function(request, reply) {
                return reply.view("dashboard");
            }
        }
    },

    {
        method: 'GET',
        path: '/city/{cityName}',
        config: {
            description: 'this is a city page',
            handler: function(request, reply) {
                console.log(request.params.cityName);
                return reply.view("city");
            }
        }
    },

    {
        method: 'GET',
        path: '/host/{hostName}',
        config: {
            description: 'this is a city page',
            handler: function(request, reply) {
                console.log(request.params.hostName);
                return reply.view("host");
            }
        }
    },

    {
        method: 'GET',
        path: '/{path*}',
        config: {
            description: 'this is the 404 page',
            handler: function(request, reply) {
                return reply.view("not-found");
            }
        }
    },

    {
        method: 'GET',
        path: '/static/{path*}',
        handler:  {
            directory: {
                path: './'
            }
        }
    }
];
