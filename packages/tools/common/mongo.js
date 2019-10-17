const MongoClient = require('mongodb').MongoClient

module.exports = (url) => {
  url = url || "mongodb://127.0.0.1:27017"

  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) reject(err)
      else resolve(db)
    })
  })
}
