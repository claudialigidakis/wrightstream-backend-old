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

function updateSource(sourceId, name, link, type){
  const toUpdate = {}
  if (name) {
    toUpdate.name = name
  }
  if (link) {
    toUpdate.link = link
  }
  if (type) {
    toUpdate.type_id = type
  }
  return (
    knex('sources')
    .update(toUpdate)
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
