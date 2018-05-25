const knex = require('../../db');

function getAllStore(shopId) {
  return (
    knex('stores')
    .where({shops_id: shopId})
    .first())
}

function getOneStore(storeId) {
  return (
    knex('stores')
    .where({id: storeId})
    .first())
}

function createStore(){

}

function removeStore(storeId){
  return (
    knex('stores')
    .where({id: storeId})
    .del())
}

function updateStore(){

}

module.exports = {
  getAllStore,
  getOneStore,
  createStore,
  removeStore,
  updateStore
}
