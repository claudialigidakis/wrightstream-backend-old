const knex = require('../../db');

function getAllCategories(shopId) {
    return (
      knex('bundles')
    .where({shop_id: shopId})
  )
}

function getOneCategory(bundleId) {
    return (
      knex('bundles')
    .where({id: bundleId})
    .first())
}

function createCategories(name, shopId) {
    return (
      knex('categories')
    .insert({shopId, name})
    .returning('*')
  )
  }

function removeCategories(categoryId) {
    return (
      knex('categories')
      .where({id: categoryId})
      .del()
    )
}


function updateCategories(bundleId) {
//updating Item
}

module.exports = {
getOneCategory,
getAllCategories,
createCategories,
removeCategories,
updateCategories
}
