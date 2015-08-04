module.exports = hapiCouchDbStore
hapiCouchDbStore.attributes = {
  name: 'couchdb-store'
}

var spawnPouchdbServer = require('spawn-pouchdb-server')

var couchdbProxyRoutes = require('./lib/routes/couchdb-proxy')
var clientRoutes = require('./lib/routes/client')

function hapiCouchDbStore (server, options, next) {
  server.route(couchdbProxyRoutes)
  server.route(clientRoutes)

  if (typeof options.couch === 'string') {
    server.log(['couchdb-store'], 'Proxying requests to ' + options.couch)
    server.expose('couchdb', options.couch)
    return next()
  }

  server.log(['couchdb-store'], 'Starting PouchDB Server...')
  spawnPouchdbServer(options.couch, function (error, pouch) {
    if (error) return next(error)

    var couchdb = 'http://localhost:' + pouch.config.httpd.port
    server.log(['couchdb-store'], 'PouchDB Server ready at ' + couchdb + '/_utils')
    server.expose('couchdb', couchdb)
    next()
  })
}
