const knex = require('../../db');


function getOnepurchase(purchaseId) {
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

function createPurchases(store_id, shopId, delivery_date, store_id, shop_id, staff_id, purchase_date, order_id, service, tracking) {
    return (
      knex('purchases')
    .insert({store_id, shop_id, staff_id, purchase_date, order_id, service, tracking, delivery_date})
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


function updatePurchases(purchaseId, delivery_date, store_id, shop_id, staff_id, purchase_date, service, tracking) {
  const toUpdate = {}
  delivery_date ? toUpdate.delivery_date = delivery_date : null
  store_id ? toUpdate.store_id = store_id : null
  shop_id ? toUpdate.shop_id = shop_id : null
  staff_id ? toUpdate.staff_id = staff_d : null
  purchase_date ? toUpdate.purchase_date = purchase_date : null
  service ? toUpdate.service = service : null
  tracking ? toUpdate.tracking = tracking : null
  return (knex('purchases')
  .update(toUpdate)
  .where({id: purchaseId})
  .returning('*'))
}


module.exports = {
  getOnepurchase,
  getAllPurchases,
  createPurchases,
  removePurchases,
  updatePurchases
}
