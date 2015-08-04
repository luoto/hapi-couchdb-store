# hapi-couchdb-store

> CouchDB REST & front-end API

## Scope

The goal is to create very simplistic server for static apps, that can store,
synchronise and share data only by secure IDs.

Exposes [CouchDB's database & document API](http://couchdb.readthedocs.org/en/stable/api/)* at `/api`,
and a pre-initialised [PouchDB Hoodie Store](https://github.com/hoodiehq/pouchdb-hoodie-store)
at `/store.js`.

*CouchDB is in admin party, sensitive APIs are disabled

## Install

```
npm install --save hapi-couchdb-store
```

## Usage

```js
// my-server.js
var Hapi = require('hapi')
var hapiStore = require('hapi-couchdb-store')

// serve static files from ./public
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
})

server.register({
  register: hapiStore,
  options: {
    // optional. If no options passed, a pouchdb server
    // will be started at http://localhost:5985
    couch: 'http://localhost:5984'
    // Alternatively, pass spawn-pouchdb-server options:
    // https://github.com/gr2m/spawn-pouchdb-server#options
  }
}, function (error) {
  if (error) throw error
})

server.connection({
  port: 8000
})
server.start(function () {
  console.log('Server running at %s', server.info.uri)
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <!-- some pretty app here -->

  <script src="/store.js"></script>
  <script>
    var store = new Store('my-shareable-dbname')
    store.add({note: 'hello world!'})
    // see full API at https://github.com/hoodiehq/pouchdb-hoodie-store
  </script>
</body>
</html>
```

## Local setup & tests

```bash
git clone git@github.com:hoodiehq/hapi-couchdb-store.git
cd hapi-couchdb-store
npm install
npm test
```

To start the [local dev server](bin/server), run

```
npm start
```

## License

MIT
