'use strict'

module.exports = (url, callback) => {
  const protocol = /https/.test(url) ? 'https' : 'http'
  const http = require(protocol)
  var chunks = []

  http.get(url, (response) => {
    response.on('data', function (chunk) {
      chunks.push(chunk.toString())
    })

    response.on('end', () => {
      const result = JSON.parse(chunks.join(''))
      return callback(null, result)
    })
  }).on('error', (error) => {
    return callback(error, null)
  })
}
