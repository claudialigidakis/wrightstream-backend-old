const knex = require('../../db');

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

function getOneItem(itemId) {
  return knex('items')
  .where({id: itemId})
  .first()
}

function createItems(body, shopId) {
  let stock = body.stock || 0
  let category = body.categoryId || null
  let product = body.productId || null
  let photo = body.photo || null
  return (knex('items').insert({
    name: body.name,
    stock_qty: stock,
    steps: body.steps,
    shop_id: shopId,
    category_id: category,
    product_id: product,
    photo: body.photo
  }).returning('*'))
  .then(newItem => {
    if(body.supplies){
      const suppliesArray = JSON.parse(body.supplies)
      suppliesArray.map(supply => {
        return (knex('items_supplies').insert({stock_qty: suppliesArray.stock_qty, stock_qty_measure: suppliesArray.stock_qty_measure, item_id: newItem.id, supplies_id: supply.id}).returning('*'))
      })
    }
    return newItem
  })
}

function removeItems(itemId) {
  return (knex('items_supplies')
  .where({item_id: itemId})
  .del())
  .then(data => {
    return (
      knex('items')
      .where({id: itemId})
      .del())
  })
}


function updateItems(itemId, name, stock, steps, category, product, supplies, photo) {
  const toUpdate = {}
  name ? toUpdate.name = name : null
  stock ? toUpdate.stock_qty = stock : null
  category ? toUpdate.category_id = category : null
  product ? toUpdate.product_id = product : null
  steps ? toUpdate.steps = steps : null
  photo ? toUpdate.photo = photo : null

  return (knex('items')
  .update(toUpdate)
  .where({id: itemId})
  .returning('*'))
  .then(data => {
    if (supplies) {
      return (knex('items_supplies')
      .where({item_id: itemId})
      .del())
      .then(newdata => {
        supplies.map(supply => {
          return (knex('items_supplies').insert({stock_qty: body.supply_stock_qty, stock_qty_measure: body.supply_stock_qty_measure, item_id: data.id, supplies_id: supply.id}).returning('*'))
        })
      })
    }
    return data
  })
}

module.exports = {
  getOneItem,
  getAllItems,
  createItems,
  removeItems,
  updateItems
}
