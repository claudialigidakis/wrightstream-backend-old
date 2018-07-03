const knex = require('../../../db');
const helperModel = require('../../models/Helper/measurement')
var convert = require('convert-units')


function getAllOrders(shopId) {
  return knex('orders')
  .where({shop_id: shopId})
  .then(orders => {
    const promises = orders.map(order => {
      return knex('orders_supplies')
      .join('supplies', 'supplies.id', 'orders_supplies.supply_id')
      .select('orders_supplies.supply_id', 'orders_supplies.supply_qty', 'orders_supplies.supply_measure_type', 'orders_supplies.supply_status', 'supplies.source_id')
      .orderBy('supplies.source_id', 'asc')
      .where('orders_supplies.order_id', order.id)
      .then(supplies => {
        order.supplies = supplies
        return order
      })
    })
    return Promise.all(promises)
  })
}

function getOneOrder(orderId) {
  return knex('orders').where({id: orderId}).then(orders => {
    const promises = orders.map(order => {
      return knex('orders_supplies')
      .join('supplies', 'supplies.id', 'orders_supplies.supply_id')
      .select('orders_supplies.supply_id', 'orders_supplies.supply_qty', 'orders_supplies.supply_measure_type', 'orders_supplies.supply_status', 'supplies.source_id').orderBy('supplies.source_id', 'asc')
      .where('orders_supplies.order_id', order.id)
      .then(supplies => {
        order.supplies = supplies
        return order
      })
    })
    return Promise.all(promises)
  })
}

function createOrder(shopId, body) {
  return knex('orders')
  .insert({shop_id: shopId})
  .returning('*')
  .then(order => {
    if (body.order) {
      return helperModel.orderPredictor(body.order)
      .then(details => {
        const detailMap = details.map(ele => {
          return (
            knex('orders_supplies')
          .insert({order_id: order[0].id, supply_id: ele.supply_id, supply_qty: ele.supply_qty, supply_measure_type: ele.supply_measure_type})
          .returning('*'))
        })
        return Promise.all(detailMap)
      })
    }
    else
      return order
  })
}

function updateOrder(orderId, body) {
  const toUpdate = {}
  body.status_id ? toUpdate.status_id = body.status_id : null
  return (
    knex('orders')
    .update(toUpdate)
    .where({id: orderId})
    .returning('*')
  )
}


function updateOrderSupply(orderId, body){
  const toUpdate = {}
  supply_qty || supply_qty === 0 ? toUpdate.supply_qty = body.supply_qty : null
  body.supply_measure_type ? toUpdate.supply_measure_type = body.supply_measure_type : null
  body.supply_status ? toUpdate.supply_status = body.supply_status : null
  return (
    knex('orders_supplies')
    .update(toUpdate)
    .where({order_id: orderId, supply_id: body.supply_id})
    .returning('*')
  )
  .catch(err => {
    return err
  })
  .then(supply => {
    if(supply[0].supply_status === 3){
      return addInventory(supply)
    }
    else
    return supply
  })
}


function addInventory(newSupply){
    const newUpdate = {}
    return (
      knex('supplies')
    .where({id: newSupply[0].supply_id})
    .returning('*')
  )
  .then(supply => {
    let newSuppliesNeeded;
    let currentSupply;

    if (supply[0].stock_qty > 0){

      if(supply[0].stock_qty_measure_type === newSupply[0].supply_measure_type){
        newUpdate.stock_qty = parseInt(newSupply[0].supply_qty) + parseInt(supply[0].stock_qty)
      }

      else {
        let newSupplyMeasure = convert().describe(newSupply[0].supply_measure_type)
        let newSupplyType;

        if(newSupplyMeasure.measure === 'volume') {
          newSuppliesNeeded = convert(newSupply[0].supply_qty).from(newSupply[0].supply_measure_type).to('tsp')
          newSupplyType = 'tsp'
        }
        if(newSupplyMeasure.measure === 'length'){
          newSuppliesNeeded = convert(newSupply[0].supply_qty).from(newSupply[0].supply_measure_type).to('ft')
          newSupplyType = 'ft'
        }

        if(newSupplyMeasure.measure === 'mass'){
          newSuppliesNeeded = convert(newSupply[0].supply_qty).from(newSupply[0].supply_measure_type).to('oz')
          newSupplyType = 'oz'
        }

        if(supply[0].measure_type === 'volume') {
          currentSupply = convert(supply[0].stock_qty).from(supply[0].stock_qty_measure_type).to('tsp')
          newSupplyType = 'tsp'
        }
        if(supply[0].measure_type === 'length'){
          currentSupply = convert(supply[0].stock_qty).from(supply[0].stock_qty_measure_type).to('ft')
          newSupplyType = 'ft'
        }

        if(supply[0].measure_type === 'mass'){
          currentSupply = convert(supply[0].stock_qty).from(supply[0].stock_qty_measure_type).to('oz')
          newSupplyType = 'oz'
        }

        newUpdate.stock_qty = Number(currentSupply) + Number(newSuppliesNeeded)
        newUpdate.stock_qty_measure_type = newSupplyType
      }
    }
    else {
      newUpdate.stock_qty = newSupply[0].supply_qty
      newUpdate.stock_qty_measure_type = newSupply[0].supply_measure_type
    }
      return newUpdate
  })
  .then(measurements => {
    return (
      knex('supplies')
    .update(newUpdate)
    .where({id: newSupply[0].supply_id})
    .returning('*')
    )
  })
  }

module.exports = {
  getOneOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  updateOrderSupply
}
