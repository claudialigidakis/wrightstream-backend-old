const knex = require('../../db');

function getAllBundles(shopId) {
  return knex('bundles')
  .where({shop_id: shopId})
  .then(bundles => {
    const promises = bundles.map(bundle => {
      return knex('bundles_items')
        .join('items', 'items.id', 'bundles_items.item_id')
        .where('bundles_items.bundles_id', bundle.id)
        .then(item => {
          bundle.items = item
          return bundle
        })
      })
      return Promise.all(promises)
})
}

function getAllItems(shopId) {
  return knex('items')
  .where({shop_id: shopId})
  .then(items => {
    const promises = items.map(item => {
      return knex('items_supplies')
        .join('supplies', 'supplies.id', 'items_supplies.supplies_id')
        .where('items_supplies.item_id', item.id)
        .then(supply => {
          item.supplies = supply
          return item
        })
      })
      return Promise.all(promises)
})
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
  let photo = body.photo || null
  return (
    knex('bundles').insert({
    name: body.name,
    shop_id: shopId,
    stock_qty: stock,
    steps: body.steps,
    category_id: category,
    product_id: product,
    photo: photo
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

function updateBundles(bundleId, name, stock, categoryId, product_id, steps, items, photo) {
  const toUpdate = {}
  if (name) {
    toUpdate.name = name
  }
  if (stock) {
    toUpdate.stock_qty = stock
  }
  if (categoryId) {
    toUpdate.category_id = categoryId
  }
  if (product_id) {
    toUpdate.product_id = product_id
  }
  if (steps) {
    toUpdate.steps = steps
  }
  if (photo) {
    toUpdate.photo = photo
  }
  return (
    knex('bundles')
    .update(toUpdate)
    .where({id: bundleId})
    .returning('*'))
    .then(data => {
      if (items) {
      return (knex('bundles_items')
      .where({bundles_id: bundleId})
      .del())
      .then(newdata => {
          const itemArray = JSON.parse(body.items)
          itemArray.map(ele => {
            return (knex('bundles_items')
            .insert({item_qty: ele.item_qty, bundles_id: bundles.id, item_id: ele.id})
            .returning('*'))
          })
      })
    }
    return data
  })
}

module.exports = {
  getOneBundle,
  getAllBundles,
  createBundles,
  removeBundles,
  updateBundles
}
