/* global location */

var Store = require('pouchdb-hoodie-store')
var humbleLocalStorage = require('humble-localstorage')
var uuid = require('./lib/uuid')

var storeId = humbleLocalStorage.getItem('_storeId')
if (!storeId) {
  storeId = uuid(7).toLowerCase()
  humbleLocalStorage.setItem('_storeId', storeId)
}

var CustomStore = Store.defaults({
  remoteBaseUrl: location.origin + '/api'
})
global.store = new CustomStore(storeId)

module.exports = CustomStore
