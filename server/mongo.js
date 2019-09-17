const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'docE'

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let db = null


function connect() {
  return new Promise((resolve, reject) => {
    // Use connect method to connect to the Server
    client.connect(function (err) {
      if (err) throw err

      console.log("Connected successfully to server")

      db = client.db(dbName)
      resolve(db)

      // client.close()
    })
  })
}

connect()

module.exports = function (options) {
  return async (req, res, next) => {
    if (!db) await connect()
    const {name, method, params} = req.body
    const collection = db.collection(name)
    const data = await invokeHandler(collection, method, params)
    res.json(data)
  }
}

async function invokeHandler(collection, method, params) {
  switch(method) {
    case 'find':
      return await invokeFind(collection, params)
  }
}

async function invokeFind(collection, {query = {}, options = {}}) {
  const r = collection.find(query, options)
  return await r.toArray()
}
