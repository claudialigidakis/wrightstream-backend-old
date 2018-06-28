const knex = require('../../../db');


function getAllInventorySupplies(shopId) {
  return knex('supplies')
  .join('kinds', 'kinds.id', 'supplies.kind_id')
  .select('supplies.name', 'stock_qty', 'kind_id', 'stock_qty_measure_type', 'measure_type', 'supplies.id')
  .where({'supplies.shop_id': shopId})
}

function getAllInventoryProducts(shopId) {
  let productData = {}
  return knex('items')
  .select('items.name', 'items.stock_qty', 'items.id')
  .where({'items.shop_id': shopId})
  .then(items => {
    productData.items = items
    return knex('bundles')
    .select('bundles.name', 'bundles.stock_qty', 'bundles.id')
    .where({'bundles.shop_id': shopId})
  })
  .then(bundles => {
    productData.bundles = bundles
    return productData
  })
}

function createBacklog(shopId, purchase_ids){
  return knex('purchases')
  .where({shop_id: shopId})
  .andWhere('purchases.inventory', false)
  .then(purchases => {
    const promise = purchases.map(purchase => {
      return knex('purchases_supplies')
      .join('supplies', 'supplies.id', 'purchases_supplies.supplies_id')
      .where('purchases_supplies.purchase_id', purchase.id)
      .andWhere('purchases_supplies.completed', false)
      .select('supplies_id', 'supplies_qty', 'supplies_measurement', 'completed', 'measure_type')
      .then(supply => {
        purchase.supplies = supply
        return purchase
      })
    })
    return Promise.all(promise)
  })
  .then(supplies => {
    return supplies.map(supply => {

      //need to add up all supplies needed and then add it to a list
      return supply.supplies
    })
  })
}


module.exports = {
  getAllInventorySupplies,
  getAllInventoryProducts,
  createBacklog
}
