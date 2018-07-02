const knex = require('../../../db');

function getPastProducts(shopId) {
  return knex('purchases')
  .where({shop_id: shopId})
  .select('purchases.id', 'store_id', 'purchases.purchase_date')
  .then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_items')
      .innerJoin('items', 'purchases_items.item_id', 'items.id')
      .select('purchases_items.item_id', 'purchases_items.item_qty', 'items.name', )
      .where({'purchases_items.purchase_id': purchase.id})
      .then(items => {
        purchase.items = items
        return purchase
      })
      .then(bundles => {
        return knex('purchases_bundles')
        .innerJoin('bundles', 'bundles.id', 'purchases_bundles.bundle_id')
        .select('bundle_id', 'bundle_qty', 'bundles.name')
        .where({'purchases_bundles.purchase_id': purchase.id})
        .then(bundlesList => {
          purchase.bundles = bundlesList
          return purchase
        })
      })
    })
      return Promise.all(promises)
  })
  .then(products => {
    //add sorting of data here
  })
}


module.exports = {
getPastProducts
}
