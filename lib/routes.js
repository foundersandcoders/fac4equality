var dummyData = require('./listingsData.js')
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
        db.getAllListings()((err, data) => {
          err ? console.log('err', err) : console.log('data', data[0])
          return reply.view('dashboard', { listings: dummyData.listings, data: data[0].email })
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
        var listing = dummyData.listings.find(x => x.id === Number(id))
        return reply.view('listing', { listing })
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
