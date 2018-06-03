const knex = require('../../db');


function getOnePurchase(purchaseId) {
    return (
      knex('purchases')
    .where({id: purchaseId})
  )
}

function getAllPurchases(shopId) {
    return (
      knex('purchases')
    .where({shop_id: shop_id})
    .first())
}

function createPurchases(body, shopId) {
    return (
      knex('purchases')
    .insert({shopId, name})
    .returning('*')
  )
  }

function removePurchases(purchaseId) {
    return (
      knex('purchases')
      .where({id: purchaseId})
      .del()
    )
}


function updatePurchases(purchaseId) {
//updating Item
}


module.exports = {
  getOnePurchase,
  getAllPurchases,
  createPurchases,
  removePurchases,
  updatePurchases
}
