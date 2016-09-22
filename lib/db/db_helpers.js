var { connection } = require('./connection.js')

var db = connection => {
  var db = {}
  var query = query => (values = []) => cb => connection.query(query, values, cb)

  db.getAllListings = query('select * from users;')
  db.getListing = query('select * from listings where listing_id = ?;')

  return db
}
// db(connection).getAllListings()((err, data) => err ? console.log(err) : console.log(data))

module.exports = db(connection)
