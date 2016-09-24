var { connection } = require('./connection.js')

var db = connection => {
  var db = {}
  var query = query => (values = []) => cb => connection.query(query, values, cb)

  db.getAllListings = query(
    `SELECT * FROM LISTINGS, USERS
    WHERE
    LISTINGS.user_id = USERS.user_id
    ORDER BY
    listing_id DESC;`
  )

  db.getListing = query(
    `SELECT * FROM LISTINGS, USERS
    WHERE
    listing_id = ? AND USERS.user_id=LISTINGS.user_id
    ORDER BY
    listing_id DESC;`
  )

  db.getUserByEmail = query(
    `SELECT user_id FROM USERS
    WHERE
    USERS.email = ?;`
  )

  db.createListing = query(
    `INSERT INTO LISTINGS
    (user_id, listing_img, description, availability, title)
    VALUES (?, ?, ?, ?, ?)`
  )

  return db
}

module.exports = db(connection)
