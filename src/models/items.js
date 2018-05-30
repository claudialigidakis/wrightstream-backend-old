const knex = require('../../db');

function getAllItems(shopId) {
    return (knex('items').where({shops_id: shopId}))
}

function getOneItem(itemId) {
    return (knex('items').where({id: itemId}).first())
}

function createItems(body, shopId) {
  //creating the initial relationship
  }

function removeItems(itemId) {
    return (knex('items').where({id: itemId}).del())
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
