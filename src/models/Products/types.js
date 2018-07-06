const knex = require('../../../db');

function getOneType(typeId) {
  return (knex('type').where({id: typeId}).first())
}

function getAllTypes(shopId) {
  return (knex('type').where({shop_id: shopId}))
}

function createTypes(body, shopId) {
  return (knex('type').insert({name: body.name, shop_id: shopId}).returning('*'))
}

function removeTypes(typeId) {
  return (knex('type').where({id: typeId}).del())
}

function updateTypes(typeId, name) {
  return (knex('type').update({name: name}).where({id: typeId}).returning('*'))
}

module.exports = {
  getOneType,
  getAllTypes,
  createTypes,
  removeTypes,
  updateTypes
}
