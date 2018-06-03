const knex = require('../../db');

function getAllBundles(shopId) {
    return (
      knex('bundles')
    .where({shop_id: shopId})
  )
}

function getOneBundle(bundleId) {
    return (
      knex('bundles')
    .where({id: bundleId})
    .innerJoin('bundles_items', 'bundles_id', 'bundles.id')
    .innerJoin('items', 'items_id', 'items.id')
    .first())
}

function createBundles(body, shopId) {
  let stock = body.stock || 0
  let category = body.categoryId || 0
  let product = body.productId || null
    return (
      knex('bundles')
    .insert({name: body.name, shop_id: shopId, stock_qty: stock, steps: body.steps,  category_id: category, product_id: product})
    .returning('*')
  )
  .then(bundles => {
    body.items.map(ele => {
      return (
        knex('bundles_items')
      .insert({item_qty: body.item_qty, bundles_id: bundles.id, item_id: body.item_id})
      .returning('*')
      )
    })
  })
  }

function removeBundles(bundleId) {
  return (
    knex('bundles_items')
    .where({bundles_id: bundleId})
    .del()
  )
  .then(data => {
    return (
      knex('bundles')
      .where({id: bundleId})
      .del()
    )
  })
}


function updateBundles(bundleId) {
//updating Item
}

module.exports = {
getOneBundle,
getAllBundles,
createBundles,
removeBundles,
updateBundles
}
