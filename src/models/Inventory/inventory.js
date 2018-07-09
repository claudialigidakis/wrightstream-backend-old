const knex = require('../../../db');

function getAllInventorySupplies(shopId) {
  return knex('supplies').join('kinds', 'kinds.id', 'supplies.kind_id').select('supplies.name', 'stock_qty', 'kind_id', 'stock_qty_measure_type', 'measure_type', 'supplies.id').where({'supplies.shop_id': shopId})
}

function getAllInventoryProducts(shopId) {
  let productData = {}
  return knex('items').select('items.name', 'items.stock_qty', 'items.id').where({'items.shop_id': shopId}).then(items => {
    productData.items = items
    return knex('bundles').select('bundles.name', 'bundles.stock_qty', 'bundles.id').where({'bundles.shop_id': shopId})
  }).then(bundles => {
    productData.bundles = bundles
    return productData
  })
}

module.exports = {
  getAllInventorySupplies,
  getAllInventoryProducts
}
