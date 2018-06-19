const knex = require('../../db');


function getAllInventorySupplies(shopId) {
  return knex('supplies')
  .select('name', 'stock_qty', 'stock_qty_measure_type', 'measure_type', 'id')
  .where({shop_id: shopId})
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


module.exports = {
  getAllInventorySupplies,
  getAllInventoryProducts
}
