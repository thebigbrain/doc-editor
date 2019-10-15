const MongoClient = require('mongodb').MongoClient


function open(url) {
  url = url || "mongodb://127.0.0.1:27017/test"

  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) reject(err)
      else resolve(db)
    })
  })
}

module.exports = open
