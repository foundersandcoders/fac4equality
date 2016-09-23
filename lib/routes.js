var db = require('../lib/db/db_helpers.js')

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      description: 'this is the home page',
      handler: function (request, reply) {
        return reply.view('landing')
      }
    }
  },
  {
    method: 'GET',
    path: '/dashboard',
    config: {
      description: 'this is the dashboard',
      handler: function (request, reply) {
        db.getAllListings()((err, listings) => {
          err ? console.log('err', err) : console.log('listings', listings)
          return reply.view('dashboard', { listings })
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/listing/{id}',
    config: {
      description: 'this is a city page',
      handler: function (request, reply) {
        var id = request.params.id
        db.getListing([ id ])((err, listing) => {
          err ? console.log('err', err) : console.log('listing', listing)
          return reply.view('listing', { listing: listing[0] })
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/{path*}',
    config: {
      description: 'this is the 404 page',
      handler: function (request, reply) {
        return reply.view('not-found')
      }
    }
  },
  {
    method: 'GET',
    path: '/static/{path*}',
    handler: {
      directory: { path: './' }
    }
  }
]
