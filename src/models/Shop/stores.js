const knex = require('../../../db')

function getAllStore(shopId) {
  return (knex('stores').where({shops_id: shopId}))
}

function getOneStore(storeId) {
  return (knex('stores').where({id: storeId}).first())
}

function createStore(body, shopId) {
  //CREATING INITIAL RELATIONSHIP

}

function removeStore(storeId) {
  return (knex('stores').where({id: storeId}).del())
}

function updateStore() {
  //REFRESHING TOKEN
}

module.exports = {
  getAllStore,
  getOneStore,
  createStore,
  removeStore,
  updateStore
}
