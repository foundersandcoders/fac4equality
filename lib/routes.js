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
    path: '/about',
    config: {
      description: 'this is the about page',
      handler: function (request, reply) {
        return reply.view('about')
      }
    }
  },
  {
    method: 'GET',
    path: '/contact',
    config: {
      description: 'this is the contact page',
      handler: function (request, reply) {
        return reply.view('contact')
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
          return err
            ? console.log('err', err)
            : reply.view('dashboard', { listings })
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
          return err
            ? console.log('err', err)
            : reply.view('listing', { listing: listing[0] })
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/create-listing',
    config: {
      description: 'this is the form to post a listing',
      handler: function (request, reply) {
        return reply.view('create-listing')
      }
    }
  },
  {
    method: 'GET',
    path: '/signup',
    config: {
      description: 'this is the signup page',
      handler: function (request, reply) {
        return reply.view('signup')
      }
    }
  },
  {
    method: 'POST',
    path: '/signup',
    config: {
      description: 'this is the signup page',
      handler: function (request, reply) {
        var payloadData = [
          'first_name',
          'last_name',
          'email',
          'profile_img',
          'phone',
          'address',
          'city',
          'post_code',
          'user_type'
        ].map(field => request.payload[field])
        db.createUser(payloadData)((err, data) => {
          if (err) {
            console.log(err)
            return reply.view('signup', {
              err: 'Please try again.'
            })
          }
          db.getAllListings()((err, listings) => {
            return err
              ? console.log('err', err)
              : reply.view('dashboard', { listings })
          })
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/create-listing',
    config: {
      description: 'endpoint form to post a listing',
      handler: function (request, reply) {
        db.getUserByEmail(request.payload.email)((err, data) => {
          if (err || data.length === 0) {
            console.log(err)
            return reply.view('create-listing', {
              err: 'unknown user, please try again'
            })
          }
          var payloadData = [
            'listing_img',
            'description',
            'availability',
            'title'
          ].map(field => request.payload[field])
          var userId = data[0].user_id
          var values = [ userId, ...payloadData ]

          db.createListing(values)((err, data) => {
            if (err) {
              console.log(err)
              return reply.view('create-listing', {
                err: 'Please try again.'
              })
            }

            db.getAllListings()((err, listings) => {
              return err
                ? console.log('err', err)
                : reply.view('dashboard', { listings })
            })
          })
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
