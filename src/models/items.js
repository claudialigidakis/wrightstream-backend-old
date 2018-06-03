const knex = require('../../db');

function getAllItems(shopId) {
    return (knex('items')
    .where({shops_id: shopId}))
}

function getOneItem(itemId) {
    return (knex('items')
    .where({id: itemId})
    .first())
}

function createItems(body, shopId) {
  console.log(body, shopId)
  let stock = body.stock || 0
  let category = body.categoryId || 0
  let product = body.productId || null
    return (
      knex('items')
    .insert({name: body.name, stock_qty: stock, steps: body.steps, shop_id: shopId,  category_id: category, product_id: product})
    .returning('*')
  )
  .then(newItem => {
    body.supplies.map(supply => {
      return (
        knex('items_supplies')
        .insert({stock_qty: body.stock_qty, stock_qty_measure: body.stock_qty_measure, item_id: newItem.id, supplies_id: supply.id})
        .returning('*')
      )
    })
  })
}

function removeItems(itemId) {
    return (knex('items')
    .where({id: itemId})
    .del())
}


function updateItems() {
//updating Item
}

module.exports = {
getOneItem,
getAllItems,
createItems,
removeItems,
updateItems
}
