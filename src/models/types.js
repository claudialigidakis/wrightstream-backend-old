const typesModel = require('../models/types')


function getOneType(typeId){
  return (knex('type')
  .where({id: typeId})
  .first())
}

function getAllTypes(shopId){
  return (
    knex('type')
  .where({shop_id: shopId})
  )
}

function createTypes(body, shopId){
  return (
    knex('type')
  .insert({name: body.name, shop_id: shopId})
  .returning('*')
)
}

function removeTypes(typesId){
  return (knex('type')
  .where({id: typesId})
  .del())
}

function updateTypes(){

}

module.exports = {
  getOneType,
  getAllTypes,
  createTypes,
  removeTypes,
  updateTypes
}
