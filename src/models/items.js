const knex = require('../../db');

function getAllItems(shopId) {
  if (body.type === 'item') {
    return (knex('items').where({shops_id: shopId}))
  }
  else if (body.type === 'bundle') {
    return (knex('bundles').where({shops_id: shopId}))
  }
}

function getOneItem(itemId) {
  if (body.type === 'item') {
    return (knex('items').where({id: itemId}).first())
  }
  else if (body.type === 'bundle') {
    return (knex('bundles').where({id: itemId}).first())
  }
}

function createItems(body, shopId) {
  //creating the initial relationship
  }

function removeItems(itemId) {
  if (body.type === 'item') {
    return (knex('items').where({id: itemId}).del())
  }
  else if (body.type === 'bundle') {
    return (knex('bundles').where({id: itemId}).del())
  }
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
