const itemsModel = require('../models/items')


function getOneItem(req, res, next) {
  if (!req.params.itemId) {
    return next({status: 400, message: 'No item indicated'})
  }
  itemsModel.getOneItem(req.params.itemId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllItems(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the items"})
  }
  itemsModel.getAllItems(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createItems(req, res, next) {
  if (!req.params.shopId || !req.body) {
    return next({status: 400, message: 'Need proper item inputs'})
  }
  itemsModel.createItem(req.body, parseInt(req.params.shopId))
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateItems(req, res, next) {
  if (!req.params.itemId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  itemsModel.updateItems(req.params.itemId, req.body)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

function removeItems(req, res, next) {
  if (!req.params.itemId) {
    return next({status: 400, message: 'Need to know indicated item'})
  }
  itemsModel.removeItems(parseInt(req.params.itemId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
  getOneItem,
  getAllItems,
  createItems,
  removeItems,
  updateItems
}
