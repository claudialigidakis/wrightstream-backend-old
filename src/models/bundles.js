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
    .first())
}

function createBundles(body, shopId) {
  console.log(body, shopId)
  let stock = body.stock || 0
  let category = body.categoryId || 0
  let product = body.productId || null
    return (
      knex('bundles')
    .insert({name: body.name, shop_id: shopId, stock_qty: stock, steps: body.steps,  category_id: category, product_id: product})
    .returning('*')
  )
  }

function removeBundles(bundleId) {
    return (
      knex('bundles')
      .where({id: bundleId})
      .del()
    )
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
