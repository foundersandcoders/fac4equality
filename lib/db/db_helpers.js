var { connection } = require('./connection.js')

var db = connection => {
  var db = {}
  var query = query => (values = []) => cb => connection.query(query, values, cb)

  db.getAllListings = query('select * from LISTINGS, USERS where LISTINGS.user_id = USERS.user_id;')
  db.getListing = query('select * from LISTINGS, USERS where listing_id = ? and USERS.user_id=LISTINGS.user_id;')

  db.createListing = query('insert into listings (user_id, listing_img, description, availability, title) values (?, ?, ?, ?, ?)')
  return db
}

module.exports = db(connection)
