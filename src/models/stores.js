const knex = require('../../db');

function getAllStore(shopId) {
  return (
    knex('stores')
    .where({shops_id: shopId})
  )
}

function getOneStore(storeId) {
  return (
    knex('stores')
    .where({id: storeId})
    .first())
}

function createStore(body, shopId){
  //creating the initial relationship

}

function removeStore(storeId){
  return (
    knex('stores')
    .where({id: storeId})
    .del())
}

function updateStore(){
//refreshing the token
}

module.exports = {
  getAllStore,
  getOneStore,
  createStore,
  removeStore,
  updateStore
}
