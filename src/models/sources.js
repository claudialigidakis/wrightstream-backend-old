const knex = require('../../db');

function getOneSource(sourceId){
  return (knex('sources')
  .where({id: sourceId})
  .first())
}

function getAllSources(shopId){
  return (
    knex('sources')
  .where({shop_id: shopId})
  )
}

function createSource(body, shopId){
  return (
    knex('sources')
  .insert({name: body.name, shop_id: shopId, link: body.link, type_id: body.type_id})
  .returning('*')
)
}

function removeSource(sourceId){
  return (knex('sources')
  .where({id: sourceId})
  .del())
}

function updateSource(sourceId, body){
  console.log(body)
  return (
    knex('sources')
    .update({name: body.name, link: body.link, type_id: body.type})
    .where({id: sourceId})
    .returning('*'))
}

module.exports = {
  getOneSource,
  getAllSources,
  createSource,
  removeSource,
  updateSource
}
