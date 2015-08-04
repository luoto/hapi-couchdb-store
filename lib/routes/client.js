var path = require('path')

module.exports = {
  method: ['GET'],
  path: '/store.js',
  handler: function (request, reply) {
    var browserify = require('browserify')
    var b = browserify([], {
      standalone: 'Store'
    })
    b.require(path.resolve(__dirname, '../../client'))
    b.bundle(function (error, buffer) {
      if (error) throw error

      reply(buffer)
        .type('application/javascript')
    })
  }
}
