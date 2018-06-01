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
