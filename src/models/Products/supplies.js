const knex = require('../../../db');

function getOneSupply(supplyId){
  return (knex('supplies')
  .where({id: supplyId})
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
    .insert({name: body.name, stock_qty: stock, stock_qty_measure_type: body.stock_measure_type, measure_type: body.measure_type, shop_id: shopId,  source_id: source, kind_id: kind})
    .returning('*')
  )
}

function removeSupplies(supplyId){
  return (knex('supplies')
  .where({id: supplyId})
  .del())
}

function updateSupplies(supplyId, name, stock_qty, measure_type, stock_qty_measure_type, source_id, kind_id){
  const toUpdate = {}
  name ? toUpdate.name = name : null
  stock_qty ? toUpdate.stock_qty = stock_qty : null
  stock_qty_measure_type ? toUpdate.stock_qty_measure_type = stock_qty_measure_type : null
  measure_type ? toUpdate.measure_type = measure_type : null
  source_id ? toUpdate.source_id = source_id : null
  kind_id ? toUpdate.kind_id = kind_id : null
  return (
    knex('supplies')
    .update(toUpdate)
    .where({id: supplyId})
    .returning('*'))
}

module.exports = {
  getOneSupply,
  getAllSupplies,
  createSupplies,
  removeSupplies,
  updateSupplies
}
