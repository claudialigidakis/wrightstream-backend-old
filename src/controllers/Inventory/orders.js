const ordersModel = require('../../models/Inventory/orders')


function getOneOrder(req, res, next) {
  if (!req.params.orderId) {
    return next({status: 400, message: 'No order indicated'})
  }
  ordersModel.getOneOrder(req.params.orderId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllOrders(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the orders"})
  }
  ordersModel.getAllOrders(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createOrder(req, res, next) {
  if (!req.params.shopId || !req.body) {
    return next({status: 400, message: 'Need proper order inputs'})
  }
  ordersModel.createOrder(parseInt(req.params.shopId), req.body)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateOrder(req, res, next) {
  if (!req.params.orderId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  ordersModel.updateOrder(req.params.orderId, req.body)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

function updateOrderSupply(req, res, next) {
  if (!req.params.orderId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  ordersModel.updateOrderSupply(req.params.orderId, req.body)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

module.exports = {
getOneOrder,
getAllOrders,
createOrder,
updateOrder,
updateOrderSupply
}
