var { connection } = require('./connection.js')

var db = connection => {
  var db = {}
  var query = query => (values = []) => cb => connection.query(query, values, cb)

  db.getAllListings = query('select * from users;')
  db.getListing = query('select * from listings where listing_id = ?;')

  return db
}

module.exports = db(connection)
