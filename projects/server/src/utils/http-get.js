const https = require('https')
const http = require('http')
const util = require('util')

function doGet(url, callback) {
  (/^https/.test(url) ? https : http).get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      callback(error, null)
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        // console.log(parsedData);
        callback(null, parsedData)
      } catch (e) {
        console.error(e.message);
        callback(e, null)
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    callback(e, null)
  });
}

module.exports = util.promisify(doGet)