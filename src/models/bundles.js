const knex = require('../../db');

function getAllBundles(shopId) {
  return knex('bundles')
  .where({shop_id: shopId})
}

function getOneBundle(bundleId) {
  return knex('bundles')
  .where({id: bundleId})
  .first()
  }

function createBundles(body, shopId) {
  let stock = body.stock || 0
  let category = parseInt(body.categoryId) || null
  let product = body.productId || null
  return (
    knex('bundles').insert({
    name: body.name,
    shop_id: shopId,
    stock_qty: stock,
    steps: body.steps,
    category_id: category,
    product_id: product
  }).returning('*'))
  .then(bundles => {
    if(body.items){
      const itemArray = JSON.parse(body.items)
      itemArray.map(ele => {
        return (knex('bundles_items')
        .insert({item_qty: ele.item_qty, bundles_id: bundles.id, item_id: ele.id})
        .returning('*'))
      })
    }
    else return bundles
  })
}

function removeBundles(bundleId) {
  return (knex('bundles_items')
  .where({bundles_id: bundleId})
  .del())
  .then(data => {
    return (
      knex('bundles')
      .where({id: bundleId})
      .del())
  })
}

function updateBundles(bundleId, body) {
  let stock = body.stock || 0
  let category = body.categoryId || 0
  let product = body.product_id || null
  return (
    knex('bundles')
    .update({name: body.name, stock_qty: stock, steps: body.steps, category_id: category, product_id: product})
    .where({id: bundleId})
    .returning('*'))
    .then(data => {
    if (body.items) {
      return (knex('bundles_items')
      .where({bundles_id: bundleId})
      .del())
      .then(newdata => {
        if(body.items){
          const itemArray = JSON.parse(body.items)
          itemArray.map(ele => {
            return (knex('bundles_items')
            .insert({item_qty: ele.item_qty, bundles_id: bundles.id, item_id: ele.id})
            .returning('*'))
          })
        }
      })
    }
  })
}

module.exports = {
  getOneBundle,
  getAllBundles,
  createBundles,
  removeBundles,
  updateBundles
}
