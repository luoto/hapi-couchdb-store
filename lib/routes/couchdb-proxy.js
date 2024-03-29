var Joi = require('joi')

module.exports = {
  method: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  path: '/api/{path*}',
  handler: {
    proxy: {
      passThrough: true,
      mapUri: function (request, next) {
        var path = request.params.path || ''
        var queryString = request.url.search || ''
        var server = request.connection.server
        next(null, server.plugins['couchdb-store'].couchdb + '/' + path + queryString)
      }
    }
  },
  config: {
    validate: {
      params: {
        path: Joi.string().regex(/^[a-zA-Z]/, 'database must start with character')
      }
    }
  }
}
