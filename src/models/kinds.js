const kindsModel = require('../models/kinds')

function getOneKind(kindId) {
  return (knex('kinds')
  .where({id: kindId})
  .first())
}

function getAllKinds(shopId) {
  return (
    knex('kinds')
  .where({shop_id: shopId})
  )
}

function createKinds(body, shopId) {
    return (
      knex('kinds')
    .insert({shop_id: shopId, name: body.name})
    .returning('*')
  )
}

function removeKinds(kindId) {
  return (knex('kinds')
  .where({id: kindId})
  .del())
}

function updateKinds() {}

module.exports = {
  getOneKind,
  getAllKinds,
  createKinds,
  removeKinds,
  updateKinds
}
