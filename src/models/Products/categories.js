const knex = require('../../../db')

function getAllCategories(shopId) {
  return (knex('categories').where({shop_id: shopId}))
}

function getOneCategory(categoryId) {
  return (knex('categories').where({id: categoryId}).first())
}

function createCategories(name, shopId) {
  return (knex('categories').insert({shop_id: shopId, name}).returning('*'))
}

function removeCategories(categoryId) {
  return (knex('categories').where({id: categoryId}).del())
}

function updateCategories(categoryId, body) {
  return (knex('categories').update({name: body.name}).where({id: categoryId}).returning('*'))
}

module.exports = {
  getOneCategory,
  getAllCategories,
  createCategories,
  removeCategories,
  updateCategories
}
