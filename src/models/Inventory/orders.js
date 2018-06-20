const knex = require('../../../db');

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
  return knex('orders')
  .where({id: orderId})
  .innerJoin('orders_supplies', 'orders.id', 'orders_supplies.order_id')
  }

function createOrder(shopId, body) {
  // let stock = body.stock || 0
  // let category = parseInt(body.categoryId) || null
  // let product = body.productId || null
  // let photo = body.photo || null
  // return (
  //   knex('bundles').insert({
  //   name: body.name,
  //   shop_id: shopId,
  //   stock_qty: stock,
  //   steps: body.steps,
  //   category_id: category,
  //   product_id: product,
  //   photo: photo
  // }).returning('*'))
  // .then(bundles => {
  //   if(body.items){
  //     const itemArray = JSON.parse(body.items)
  //     itemArray.map(ele => {
  //       return (knex('bundles_items')
  //       .insert({item_qty: ele.item_qty, bundles_id: bundles.id, item_id: ele.id})
  //       .returning('*'))
  //     })
  //   }
  //   else return bundles
  // })
}

function updateOrder(orderId, body) {
  const toUpdate = {}
  name ? toUpdate.name = name : null
  deleted ? toUpdate.deleted = deleted : null
  stock ? toUpdate.stock = stock : null
  categoryId ? toUpdate.category_id = categoryId : null
  product_id ? toUpdate.product_id = product_id : null
  steps ? toUpdate.steps = steps : null
  photo ? toUpdate.photo = photo : null
  return (
    knex('bundles')
    .update(toUpdate)
    .where({id: bundleId})
    .returning('*'))
    .then(data => {
      if (items) {
      return (knex('bundles_items')
      .where({bundles_id: bundleId})
      .del())
      .then(newdata => {
          const itemArray = JSON.parse(body.items)
          itemArray.map(ele => {
            return (knex('bundles_items')
            .insert({item_qty: ele.item_qty, bundles_id: bundles.id, item_id: ele.id})
            .returning('*'))
          })
      })
    }
    return data
  })
}

module.exports = {
  getOneOrder,
  getAllOrders,
  createOrder,
  updateOrder
}
