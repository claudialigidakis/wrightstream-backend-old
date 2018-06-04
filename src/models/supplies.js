const knex = require('../../db');

function getOneSupply(suppliesId){
  return (knex('supplies')
  .where({id: suppliesId})
  .first())
}

function getAllSupplies(shopId){
  return (
    knex('supplies')
  .where({shop_id: shopId})
  )
}

function createSupplies(body, shopId){
  let stock = body.stock || 0
  let source = body.source_id || null
  let kind = body.kind_id || null
    return (
      knex('supplies')
    .insert({name: body.name, stock_qty: stock, stock_qty_measure_type: body.measure_type, shop_id: shopId,  source_id: source, kind_id: kind})
    .returning('*')
  )
}

function removeSupplies(suppliesId){
  return (knex('supplies')
  .where({id: suppliesId})
  .del())
}

function updateSupplies(suppliesId, body){
  let stock = parseInt(body.stock) || 0
  let source = parseInt(body.source_id) || null
  let kind = parseInt(body.kind_id) || null
  return (
    knex('supplies')
    .update({name: body.name, stock_qty: stock, stock_qty_measure_type: body.measure_type, source_id: source, kind_id: kind})
    .where({id: suppliesId})
    .returning('*'))
}

module.exports = {
  getOneSupply,
  getAllSupplies,
  createSupplies,
  removeSupplies,
  updateSupplies
}
