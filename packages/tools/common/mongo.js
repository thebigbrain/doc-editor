const MongoClient = require('mongodb').MongoClient

module.exports = async (url) => {
  url = url || "mongodb://127.0.0.1:27017"

  return await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
