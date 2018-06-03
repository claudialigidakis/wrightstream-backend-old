const knex = require('../../db');

function getAllProducts(storeId) {
    return (
      knex('products')
    .where({store_id: storeId})
  )
}

function getOneProduts(productId) {
    return (
      knex('products')
    .where({id: productId})
    .first())



function updateProducts(storeId) {
//updating Item
}


module.exports = {
  getOneProduts,
  getAllProducts,
  updateProducts
}
