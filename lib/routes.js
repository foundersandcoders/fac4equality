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
        path: '/static/{path*}',
        handler:  {
            directory: {
                path: './'
            }
        }
    }
];
