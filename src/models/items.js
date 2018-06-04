const knex = require('../../db');

function getAllItems(shopId) {
  return (knex('items')
  .where({shop_id: shopId})
)
}

function getOneItem(itemId) {
  return (knex('items').where({id: itemId}).first())
}

function createItems(body, shopId) {
  console.log(body, shopId)
  let stock = body.stock || 0
  let category = body.categoryId || 0
  let product = body.productId || null
  return (knex('items').insert({
    name: body.name,
    stock_qty: stock,
    steps: body.steps,
    shop_id: shopId,
    category_id: category,
    product_id: product
  }).returning('*')).then(newItem => {
    body.supplies.map(supply => {
      return (knex('items_supplies').insert({stock_qty: body.stock_qty, stock_qty_measure: body.stock_qty_measure, item_id: newItem.id, supplies_id: supply}).returning('*'))
    })
  })
}

function removeItems(itemId) {
  return (knex('items').where({id: itemId}).del())
}

function updateItems(itemId, body) {
  let stock = body.stock || 0
  let category = body.categoryId || 0
  let product = body.productId || null
  return (knex('items').update({name: body.name, stock_qty: stock, steps: body.steps, category_id: category, product_id: product})
  .where({id: itemId})
  .returning('*'))
  .then(data => {
    if (body.supplies) {
      return (knex('items_supplies')
      .where({item_id: itemId})
      .del())
      .then(newdata => {
        body.supplies.map(supply => {
          return (knex('items_supplies').insert({stock_qty: body.supply_stock_qty, stock_qty_measure: body.supply_stock_qty_measure, item_id: data.id, supplies_id: supply.id}).returning('*'))
        })
      })
    }
  })
}

module.exports = {
  getOneItem,
  getAllItems,
  createItems,
  removeItems,
  updateItems
}
