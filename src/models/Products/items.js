const knex = require('../../../db')

function getAllItems(shopId) {
  return knex('items').where({shop_id: shopId, archived: false}).then(items => {
    const promises = items.map(item => {
      return knex('items_supplies').join('supplies', 'supplies.id', 'items_supplies.supplies_id').where('items_supplies.item_id', item.id).then(supply => {
        item.supplies = supply
        return item
      })
    })
    return Promise.all(promises)
  })
}

function getAllArchivedItems(shopId) {
  return knex('items').where({shop_id: shopId, archived: true}).then(items => {
    const promises = items.map(item => {
      return knex('items_supplies').join('supplies', 'supplies.id', 'items_supplies.supplies_id').where('items_supplies.item_id', item.id).then(supply => {
        item.supplies = supply
        return item
      })
    })
    return Promise.all(promises)
  })
}

function getOneItem(itemId) {
  return knex('items').where({id: itemId, archived: false}).first()
}

function createItems(body, shopId) {
  let stock = body.stock || 0
  let categoryId = body.categoryId || null
  let productId = body.productId || null
  let photo = body.photo || null
  return (knex('items').insert({
    name: body.name,
    stock_qty: stock,
    steps: body.steps,
    shop_id: shopId,
    category_id: categoryId,
    product_id: productId,
    photo: photo
  }).returning('*')).then(item => {
    if (body.supplies) {
      const suppliesArray = body.supplies
      const suppliesPromise = suppliesArray.map(supply => {
        return (knex('items_supplies').insert({qty: supply.qty, qty_measure: supply.qty_measure, item_id: item[0].id, supplies_id: supply.id}).returning('*'))
      })
      return Promise.all(suppliesPromise)
    }
    return item
  })
}

function removeItems(itemId) {
  return (knex('items_supplies').where({item_id: itemId}).del()).then(data => {
    return (knex('items').where({id: itemId}).del())
  })
}

function updateItems(itemId, name, archived, stock, steps, categoryId, productId, supplies, photo) {
  const toUpdate = {}
  name
    ? toUpdate.name = name
    : null
  categoryId
    ? toUpdate.category_id = categoryId
    : null
  productId
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
  return (knex('items').update(toUpdate).where({id: itemId}).returning('*')).then(data => {
    if (supplies) {
      return (knex('items_supplies').where({item_id: itemId}).del()).then(newdata => {
        const suppliesPromise = supplies.map(supply => {
          return (knex('items_supplies').insert({qty: supply.qty, qty_measure: supply.qty_measure, item_id: data[0].id, supplies_id: supply.id}).returning('*'))
        })
        return Promise.all(suppliesPromise)
      })
    }
    return data
  })
}

module.exports = {
  getOneItem,
  getAllItems,
  getAllArchivedItems,
  createItems,
  removeItems,
  updateItems
}
