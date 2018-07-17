const knex = require('../../../db')

function getAllBundles(shopId) {
  return knex('bundles').where({shop_id: shopId, archived: false})
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

function getOneBundle(bundleId) {
  return knex('bundles').where({id: bundleId, archived: false}).first()
}

function getAllArchivedBundles(shopId) {
  return knex('bundles').where({shop_id: shopId, archived: true}).then(bundles => {
    const promises = bundles.map(bundle => {
      return knex('bundles_items').join('items', 'items.id', 'bundles_items.item_id').where('bundles_items.bundles_id', bundle.id).then(item => {
        bundle.items = item
        return bundle
      })
    })
    return Promise.all(promises)
  })
}

function createBundles(body, shopId) {
  let stock = body.stock || 0
  let categoryId = body.categoryId || null
  let productId = body.productId || null
  let photo = body.photo || null
  return (knex('bundles').insert({
    name: body.name,
    stock_qty: stock,
    steps: body.steps,
    shop_id: shopId,
    category_id: categoryId,
    product_id: productId,
    photo: photo
  }).returning('*')).then(bundle => {
    if (body.items) {
      const itemsArray = body.items
      const itemsPromise = itemsArray.map(item => {
        return (knex('bundles_items').insert({item_qty: item.item_qty, bundles_id: bundle[0].id, item_id: item.id}).returning('*'))
      })
      return Promise.all(itemsPromise)
    }
    return bundle
  })
}

function removeBundles(bundleId) {
  return (knex('bundles_items').where({bundles_id: bundleId}).del()).then(data => {
    return (knex('bundles').where({id: bundleId}).del())
  })
}

function updateBundles(bundleId, name, archived, stock, categoryId, productId, steps, items, photo) {
  const toUpdate = {}
  name
    ? toUpdate.name = name
    : null
  categoryId
    ? toUpdate.category_id = categoryId
    : null
  productId || productId === null
    ? toUpdate.product_id = productId
    : null
  steps
    ? toUpdate.steps = steps
    : null
  photo
    ? toUpdate.photo = photo
    : null
  archived || archived === false
    ? toUpdate.archived = archived
    : null
  stock || stock === 0
    ? toUpdate.stock_qty = stock
    : null
  return (knex('bundles').update(toUpdate).where({id: bundleId}).returning('*')).then(data => {
    if (items) {
      return (knex('bundles_items').where({bundles_id: bundleId}).del()).then(newdata => {
        const itemsPromise = items.map(item => {
          return (knex('bundles_items').insert({item_qty: item.item_qty, bundles_id: data[0].id, item_id: item.id}).returning('*'))
        })
        return Promise.all(itemsPromise)
      })
    }
    return data
  })
}

module.exports = {
  getOneBundle,
  getAllArchivedBundles,
  getAllBundles,
  createBundles,
  removeBundles,
  updateBundles
}
